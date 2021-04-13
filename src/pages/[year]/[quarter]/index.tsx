import type { ReactElement } from 'react';
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { byString } from 'util/sort';
import { formatDate } from 'util/format';
import { getIndex, getById, Quarter } from 'api/endpoints';
import { getSizes } from 'util/breakpoints';
import classNames from 'classnames';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading, { Level } from 'components/Heading';
import Xml from 'components/Xml';
import Image from 'next/image';
import CardLink from 'components/CardLink';
import DownloadButton from 'components/DownloadButton';
import Prose from 'components/Prose';

interface Params extends ParsedUrlQuery {
  year: string;
  quarter: string;
}

interface Props {
  quarter: Quarter;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const index = await getIndex('quarter');
  return {
    fallback: false,
    paths: index.map(([year, quarter]) => ({ params: { year, quarter } })),
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { year, quarter } = context.params as Params;
  const res = await getById([year, quarter]);

  res.weeks.sort(byString(({ id: [, , week] }) => week, 'asc'));

  return {
    props: {
      quarter: res,
    },
  };
};

export default function QuarterPage(props: Props): ReactElement {
  const {
    id: [year, quarter],
    title,
    forword,
    pdf,
    image,
    meta,
    weeks,
  } = props.quarter;
  return (
    <Page>
      <Title title={[`${quarter}. Kvartal`, year]} />
      <Breadcrumbs subject={props.quarter} />
      <Heading variant="h1" title={`${quarter}. Kvartal`} subtitle={title} />
      <div className="flex flex-col gap-16 lg:grid-cols-3 xl:grid-cols-4">
        <Level>
          <section className="md:col-span-2 lg:col-span-1">
            <Heading variant="sr-only">Innhold</Heading>
            <div className="flex flex-col gap-4 -mx-4 md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {weeks.map((week) => (
                <WeekCard
                  key={week.id[2]}
                  week={week}
                  className={
                    // ? This is for centering the always odd prime number week 13
                    week.id[2] !== '13'
                      ? 'md:col-span-2'
                      : weeks.length === 13
                      ? // ? When there are 13 weeks
                        'md:col-start-2 md:col-end-4 lg:col-start-3 lg:col-end-5 xl:col-start-4 xl:col-end-6'
                      : // ? When there are 14 weeks
                        'md:col-start-1 md:col-end-3 lg:col-start-2 lg:col-end-4 xl:col-start-3 xl:col-end-5'
                  }
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-8 md:gap-12 lg:grid lg:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            <article className="lg:col-span-2">
              <Heading variant="h2">
                <div className="text-xl text-gray-500">Forord</div>
                <div className="text-3xl">{forword.title}</div>
              </Heading>
              <Prose className="mt-4">
                <Xml>{forword.xml}</Xml>
                <p className="small">{forword.about}</p>
              </Prose>
            </article>
            <div className="flex flex-col justify-end gap-12 md:grid md:grid-cols-2 lg:flex lg:flex-col-reverse lg:gap-4 lg:mt-20 xl:grid xl:gap-8 xl:col-span-2">
              <div>
                <dl className="prose-sm prose lg:prose">
                  <dt>Original&shy;tittel</dt>
                  <dd>{meta.title}</dd>
                  <dt>Studie&shy;forfatter</dt>
                  <dd>{meta.author.name}</dd>
                  <dt>Redaktør</dt>
                  <dd>{meta.editor.name}</dd>
                  <dt>Oversetter</dt>
                  <dd>{meta.translator.name}</dd>
                </dl>
                <DownloadButton
                  className="m-auto mt-4"
                  file={pdf}
                  filename={`Bibelstudier ${quarter}. Kvartal ${year}.pdf`}
                >
                  Last ned som PDF
                </DownloadButton>
              </div>
              <div>
                {image != null && (
                  <Image
                    alt=""
                    layout="responsive"
                    className="object-cover object-center rounded-lg shadow-xl"
                    sizes={getSizes(50, 33, 25)}
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    loading="eager"
                  />
                )}
              </div>
            </div>
          </section>
        </Level>
      </div>
    </Page>
  );
}
export function WeekCard(props: {
  week: Quarter['weeks'][0];
  className?: string;
}): ReactElement {
  const {
    id: [, , week],
    title,
    sabbath,
  } = props.week;

  const name = `Studium ${week}`;

  return (
    <CardLink
      className={classNames('px-4 py-3', props.className)}
      to={props.week}
      aria-label={`${name} – ${title}`}
    >
      <div className="flex items-baseline justify-between">
        <div className="text-xl leading-none whitespace-nowrap">{name}</div>
        <div className="text-base">
          {formatDate(sabbath, { day: 'numeric' })}{' '}
          <span className="text-secondary-600">
            {formatDate(sabbath, { month: 'long' })}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-500 truncate">{title}</div>
    </CardLink>
  );
}
