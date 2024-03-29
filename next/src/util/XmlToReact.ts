import { ReactNode, ReactElement } from 'react';
import type { Null } from './null';

import { isDev } from 'env';
import { createElement } from 'react';
import { toStyleObject } from './string';

import { Fragment } from 'react';
import { DOMParser } from 'xmldom';

export type Components = Record<string, unknown>;

export default class XmlToReact {
  private readonly parser: DOMParser;

  constructor(private readonly components: Components) {
    this.parser = new DOMParser({
      errorHandler: (level: string, message: unknown) => {
        console.warn('Failed to parse XML: ', { level, message });
        if (isDev) throw new Error(`${level}: ${String(message)}`);
      },
    });
  }

  public parse(xml: string): ReactElement {
    const document = this.parser.parseFromString(xml, 'text/xml');

    return createElement(
      Fragment,
      null,
      this.visitNode(document.documentElement)
    );
  }

  private visitNode(node: Node | Element, index?: number): ReactNode {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
     */
    switch (node.nodeType) {
      // Node.TEXT_NODE
      case 3: {
        return node.nodeValue;
      }

      // Node.ELEMENT_NODE
      case 1: {
        if (node === node.ownerDocument?.documentElement) {
          return createElement(Fragment, { children: this.getChildren(node) });
        }

        const props = { ...this.getProps(node), key: index };

        if (node.nodeName in this.components) {
          const Component = this.components[node.nodeName];
          return createElement(
            Component as Parameters<typeof createElement>[0],
            props
          );
        }

        return createElement(node.nodeName, props);
      }

      default: {
        console.warn('Unhandled node type', node.nodeType, node);
        return null;
      }
    }
  }

  private getChildren(node: Node | Element | Null): ReactNode {
    const children =
      node == null
        ? undefined
        : node.childNodes.length === 1
        ? this.visitNode(node.childNodes[0])
        : Array.from(node.childNodes).map(this.visitNode.bind(this));

    return Array.isArray(children) && children.length === 0
      ? undefined
      : children;
  }

  private getProps(node: Node | Element | Null): Record<string, unknown> {
    return {
      ...this.getAttributes(node),
      children: this.getChildren(node),
    };
  }

  private getAttributes(node: Node | Element | Null): Record<string, unknown> {
    if (node == null || !('attributes' in node)) return {};

    const obj: Record<string, unknown> = {};
    Array.from(node.attributes).forEach(({ name, value }) => {
      // Adjust attribute names colliding with React
      switch (name) {
        case 'class':
          obj.className = value;
          break;
        case 'style':
          obj.style = toStyleObject(value);
          break;
        case 'for':
          obj.htmlFor = value;
          break;
        case 'ref':
          obj.xref = value;
          break;
        default:
          obj[name] = value;
          break;
      }
    });
    return obj;
  }
}
