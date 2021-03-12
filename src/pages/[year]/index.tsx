import type { ReactElement } from 'react';
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { getIndex, getById, Year } from 'api/endpoints';
import { byString } from 'util/sort';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading from 'components/Heading';
import CardLink from 'components/CardLink';
import Image from 'next/image';

interface Params extends ParsedUrlQuery {
  year: string;
}

interface Props {
  year: Year;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const index = await getIndex('year');
  return {
    fallback: false,
    paths: index.map(([year]) => ({ params: { year } })),
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { year } = context.params as Params;
  const res = await getById([year]);
  res.quarters.sort(byString(({ id: [, quarter] }) => quarter, 'asc'));

  return { props: { year: res } };
};

export default function YearPage(props: Props): ReactElement {
  const {
    id: [year],
    quarters,
  } = props.year;
  return (
    <Page>
      <Title title={year} />
      <Breadcrumbs subject={props.year} />
      <Heading variant="h1">{year}</Heading>
      <div className="grid gap-4 -mx-4 lg:grid-cols-2 xl:grid-cols-4">
        {quarters.map((quarter) => (
          <QuarterCard key={quarter.id[1]} quarter={quarter} />
        ))}
      </div>
    </Page>
  );
}

export function QuarterCard(props: {
  quarter: Year['quarters'][0];
}): ReactElement {
  const {
    id: [year, quarter],
    title,
    image,
  } = props.quarter;
  const name = `${quarter}. Kvartal`;

  return (
    <CardLink
      className="flex justify-between px-4 py-3"
      to={props.quarter}
      aria-label={`${name} ${year} – ${title}`}
    >
      <div className="">
        <div className="whitespace-nowrap text-xl md:text-2xl xl:text-xl">
          {name} <span className="text-secondary-500">{year}</span>
        </div>
        <div className="text-gray-500 text-sm md:text-lg lg:text-base xl:text-sm">
          {title}
        </div>
      </div>
      <div className="w-[64px] h-[90px] lg:w-[90px] lg:h-[128px] relative flex-shrink-0 ml-5">
        {image != null && (
          <Image
            alt=""
            layout="intrinsic"
            className="rounded shadow-md object-cover object-center"
            src={image.src}
            width={90}
            height={128}
            quality={25}
          />
        )}
      </div>
    </CardLink>
  );
}
