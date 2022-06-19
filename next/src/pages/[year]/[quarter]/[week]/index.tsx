import type { ReactElement } from 'react';
import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next';

import {
  getIndex,
  getById,
  Week,
  Introduction,
  Study,
  Story,
} from 'api/endpoints';
import { formatDate } from 'util/format';

import Page from 'components/layout/Page';
import Title from 'components/Title';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import Heading, { H, Level } from 'components/Heading';
import Prose from 'components/Prose';
import Xml from 'components/Xml';
import Ref from 'components/xml/Ref';

interface Params extends ParsedUrlQuery {
  year: string;
  quarter: string;
  week: string;
}

type Days = [
  introduction: Introduction,
  sunday: Study,
  monday: Study,
  tuesday: Study,
  wednesday: Study,
  thursday: Study,
  friday: Study,
  story: Story
];

interface Props {
  week: Omit<Week, 'days'> & { days: Days };
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

  const days = await Promise.all([
    getById(res.days[0].id),
    getById(res.days[1].id),
    getById(res.days[2].id),
    getById(res.days[3].id),
    getById(res.days[4].id),
    getById(res.days[5].id),
    getById(res.days[6].id),
    getById(res.days[7].id),
  ]);

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
    days,
    date,
    sabbath,
    memory,
    background,
  } = props.week;

  // TODO: Show dates!

  return (
    <Page>
      <Title title={[`Studium ${week}`, `${quarter}. Kvartal`, year]} />
      <Breadcrumbs subject={props.week} />
      <Heading
        variant="h1"
        title={`Studium ${week}`}
        subtitle={title}
        right={`${formatDate(sabbath, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}`}
      />
      <Level>
        <div className="space-y-16">
          <Prose>
            <blockquote>
              <Xml>{memory}</Xml>
            </blockquote>
            <ul>
              {background.map((ref, i) => (
                <li key={i}>
                  <Ref>{ref}</Ref>
                </li>
              ))}
            </ul>
          </Prose>
          {days.map((day) => {
            switch (day.type) {
              case 'introduction':
                return (
                  <article key={day.id[3]}>
                    <Heading variant="h2" title="Introduksjon" />
                    <Prose>
                      <Xml>{day.introduction.xml}</Xml>
                    </Prose>
                  </article>
                );
              case 'study':
                return (
                  <article key={day.id[3]}>
                    <Heading
                      variant="h2"
                      title={day.study.title}
                      right={formatDate(day.date, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    />
                    <Prose>
                      <Xml>{day.study.xml}</Xml>
                    </Prose>
                  </article>
                );
              case 'story':
                return (
                  <article key={day.id[3]}>
                    <Heading
                      variant="h2"
                      title={day.story.title}
                      top="Misjonsfortelling"
                      subtitle={day.story.about}
                      right={formatDate(day.date, {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    />
                    <Prose>
                      <Xml>{day.story.xml}</Xml>
                    </Prose>
                  </article>
                );
            }
          })}
        </div>
      </Level>
    </Page>
  );
}
