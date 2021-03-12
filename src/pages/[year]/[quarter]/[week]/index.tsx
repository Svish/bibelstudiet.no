import type { ReactElement } from 'react';
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { getIndex, getById, Week, Day } from 'api/endpoints';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading, { H, Level } from 'components/Heading';

interface Params extends ParsedUrlQuery {
  year: string;
  quarter: string;
  week: string;
}

interface Props {
  week: Week & { days: Day[] };
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const index = await getIndex('week');
  return {
    fallback: false,
    paths: index.map(([year, quarter, week]) => ({
      params: { year, quarter, week },
    })),
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { year, quarter, week } = context.params as Params;
  const res = await getById([year, quarter, week]);
  const days = await Promise.all(res.days.map(({ id }) => getById(id)));

  return {
    props: {
      week: { ...res, days },
    },
  };
};

export default function WeekPage(props: Props): ReactElement {
  const {
    id: [year, quarter, week],
    title,
  } = props.week;

  return (
    <Page>
      <Title title={[`Studium ${week}`, `${quarter}. Kvartal`, year]} />
      <Breadcrumbs subject={props.week} />
      <Heading variant="h1">
        <div className="whitespace-nowrap">
          <span>Studium</span> <span className="text-primary-500">{week}</span>
        </div>
        <div className="text-gray-500 text-xl lg:text-2xl">{title}</div>
      </Heading>
      <Level>
        <section></section>
      </Level>
      <pre>{JSON.stringify(props.week, undefined, 2)}</pre>
    </Page>
  );
}
