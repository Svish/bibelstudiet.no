import type { ReactElement } from 'react';
import type { GetStaticProps } from 'next';

import { byString } from 'util/sort';
import { getById, Year } from 'api/endpoints';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading, { Level } from 'components/Heading';
import { QuarterCard } from './[year]/index';

interface Props {
  years: Year[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const root = await getById();
  const years = await Promise.all(root.years.map(({ id }) => getById(id)));

  years
    .sort(byString(({ id: [year] }) => year, 'desc'))
    .forEach((year) =>
      year.quarters.sort(byString(({ id: [, quarter] }) => quarter, 'asc'))
    );

  return {
    props: { years },
  };
};

export default function StudierPage({ years }: Props): ReactElement {
  return (
    <Page>
      <Title title="Studiehefter" />
      <Breadcrumbs />
      <Heading variant="sr-only" title="Studiehefter" />
      <div className="space-y-8">
        <Level>
          {years.map((year) => (
            <YearSection key={year.id[0]} year={year} />
          ))}
        </Level>
      </div>
    </Page>
  );
}

function YearSection(props: { year: Year }): ReactElement {
  const {
    id: [year],
    quarters,
  } = props.year;
  return (
    <section>
      <Heading variant="h1" title={year} />
      <div className="grid gap-4 mt-5 -mx-4 lg:grid-cols-2 xl:grid-cols-4">
        {quarters.map((quarter) => (
          <QuarterCard key={quarter.id[1]} quarter={quarter} />
        ))}
      </div>
    </section>
  );
}
