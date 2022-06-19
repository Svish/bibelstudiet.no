/* eslint-disable no-irregular-whitespace */
import type { ReactElement } from 'react';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading, { H, Level } from 'components/Heading';
import Prose from 'components/Prose';

export default function OmPage(): ReactElement {
  return (
    <Page>
      <Title title="Om …" />
      <Breadcrumbs />
      <Heading variant="h1" className="sr-only" title="Om …" />
      <Level>
        <div className="grid gap-8 lg:grid-cols-2">
          <section>
            <Heading variant="h1" title="Bibelstudiet.no" />
            <Prose className="mt-4">
              <p>
                Målet med denne nettsiden er en digital versjon av heftene
                «Bibelstudier» som …
              </p>
              <ul>
                <li>Er stilren og fokusert.</li>
                <li>Fungerer godt på alle skjermer.</li>
                <li>Fjerner behovet for plattformavhengige apps.</li>
                <li>
                  Gjør det enkelt å &quot;bare lese litt i leksa&quot;, uansett
                  hvor du er.
                </li>
              </ul>

              <p>
                Håper vi er i nærheten av å oppfylle disse målene, og om du
                synes vi <em>ikke</em> er det,{' '}
                <a href="https://sdaweb.no/kontakt-oss">kontakt oss</a> gjerne!
                Både lure ideer, ros <em>og</em> ris tas hjertelig imot.
                Egentlig helst det siste, ettersom det gir muligheter for
                forbedring c&apos;&apos;,)
              </p>

              <dl>
                <dt>Bibelstudier</dt>
                <dd>
                  <a href="https://www.norskbokforlag.no">Norsk Bokforlag</a>
                </dd>
                <dt>Layout/Design/Utvikling</dt>
                <dd>
                  <a href="https://www.geekality.net">Torleif Berger</a>
                </dd>
                <dd>
                  <a href="https://sdaweb.no">SDAweb</a>
                </dd>
                <dt>Kildekode</dt>
                <dd>
                  <a href="https://github.com/Svish/bibelstudiet.no">GitHub</a>
                </dd>
              </dl>
            </Prose>
          </section>
          <section>
            <Heading variant="h1" title="«Bibelstudier»" />
            <Level>
              <Prose className="mt-4">
                <p>
                  Studieheftene «Bibelstudier», også kjent som
                  «Sabbatskoleleksa», utgis av{' '}
                  <a href="https://www.adventist.org">
                    Syvendedags Adventistkirkens
                  </a>{' '}
                  <a href="https://www.sabbathschoolpersonalministries.org/sabbathschool">
                    Sabbatskoleavdeling
                  </a>
                  . Den norske utgaven «Bibelstudier» settes oversettes og
                  settes sammen av{' '}
                  <a href="https://www.norskbokforlag.no">Norsk Bokforlag</a>.
                </p>
                <p>
                  Om du ønsker å støtte arbeidet som kreves for å få ut den
                  norske utgaven kan du gjøre dette gjennom et{' '}
                  <a href="https://www.norskbokforlag.no/Produkter/Abonnementer/Bibelstudieabonnement">
                    Bibelstudieabonnement
                  </a>{' '}
                  fra{' '}
                  <a href="https://www.norskbokforlag.no">Norsk Bokforlag</a>.
                </p>

                <H>Om utarbeidelsen</H>

                <p>
                  Utarbeidelsen av bibelstudiene ledes av en komité med
                  medlemmer fra verdensfeltet. Komiteens medlemmer er rådgivende
                  redaktører, og de studiene som utgis hvert kvartal,
                  gjenspeiler komiteens synspunkter og representerer ikke bare
                  eller nødvendigvis forfatterens hensikter.
                </p>

                <H>Henvisninger</H>

                <p>
                  Der forfatternavn ikke er oppgitt, men bare tittelen på en bok
                  eller en artikkel, er henvisningen til en av Ellen G. Whites
                  skrifter. Der en norsk oversettelse foreligger, er
                  henvisningen til denne, men i parentes står også henvisningen
                  til den engelske originalen, med standard forkortelse for
                  tittelen, for eksempel: AA står for Acts of the Apostles.
                </p>

                <H>Bibeloversettelser</H>

                <p>
                  Det norske bibelselskaps oversettelse av 2011 er brukt der
                  ikke annet er nevnt. Der det har vært ønskelig med en mer
                  konkordant (bokstavtro) oversettelse, har vi brukt Bibelen Den
                  hellige skrift, utgitt av Norsk Bibel A/S (forkortet NBK).
                </p>
              </Prose>
            </Level>
          </section>
        </div>
      </Level>
    </Page>
  );
}
