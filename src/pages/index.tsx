import type { ReactElement } from 'react';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Heading from 'components/Heading';
import Prose from 'components/Prose';
import { HeartIcon } from '@heroicons/react/outline';

// TODO: getServerProps or getStaticProps -> /dates -> find week -> get memory verse (fallback block?)

export default function Home(): ReactElement {
  return (
    <Page>
      <Title title={null} />
      <Heading variant="h1" title="Velkommen til bibelstudium" />
      <p className="p-12 my-8 text-5xl bg-red-400">
        {'// TODO Memory verse and link'}
      </p>

      <Prose>
        <h2>Støtt Norsk Bokforlag</h2>

        <p>
          Bibelstudiene her kommer fra{' '}
          <a href="https://www.norskbokforlag.no">Norsk Bokforlag</a> og vi har
          fått lov til å bruke det helt gratis. Men, det koster penger å
          produsere materialet. Oversetting, innlesning, osv, koster både tid og
          penger. Derfor håper vi alle dere som bruker denne siden, og har
          mulighet til det, også kan støtte Norsk Bokforlag i det arbeidet som
          de gjør.
        </p>
        <p>
          Du kan for eksempel gjøre dette ved å abonnere på et{' '}
          <a href="https://www.norskbokforlag.no/Produkter/Abonnementer/Bibelstudieabonnement">
            Bibelstudieabonnement
          </a>
          . Det koster 300 NOK i året, mindre enn 6 kr i uka, og da får du også
          det fysiske heftet i posten hvert kvartal.
        </p>
        <p>
          Håper du, og mange andre, vil støtte arbeidet deres <em>der</em> slik
          at vi kan fortsette å tilby kvalitetsmaterialet åpent og gratis{' '}
          <em>her</em> :)
        </p>
      </Prose>

      <div className="flex justify-center mt-7 max-w-prose">
        <a
          className="flex items-center py-4 mx-auto space-x-3 text-xl no-underline bg-gray-100 border border-gray-300 shadow-sm hover:text-blue-600 hover:border-blue-300 px-7 md:text-2xl"
          href="https://www.norskbokforlag.no/Produkter/Abonnementer/Bibelstudieabonnement"
          title="Abonnér på Bibelstudiene fra Norsk Bokforlag"
        >
          <span className="mt-[-0.2em]">Bibelstudie­abonnement</span>
          <span className="mt-[-0.1em] text-3xl md:text-5xl">
            <HeartIcon className="w-9 h-9" />
          </span>
        </a>
      </div>
    </Page>
  );
}
