export type Subject = Year | Quarter | Week | Introduction | Study | Story;

export interface Root {
  years: Pick<Year, 'type' | 'id'>[];
}

export interface Year {
  type: 'year';
  id: [year: string];
  quarters: Pick<Quarter, 'type' | 'id' | 'title' | 'image'>[];
}

export type Xml = string;

export interface Quarter {
  type: 'quarter';
  id: [year: string, quarter: string];
  title: string;
  forword: { title: string; about: string; xml: Xml };
  image?: Image;
  pdf: Pdf;
  meta: {
    title: string;
    author: { name: string };
    editor: { name: string; email: string };
    translator: { name: string; email: string };
  };
  weeks: Pick<Week, 'type' | 'id' | 'title' | 'date' | 'sabbath'>[];
}

export interface Week {
  type: 'week';
  id: [year: string, quarter: string, week: string];
  title: string;
  date: string;
  sabbath: string;
  memory: Xml;
  background: string[];
  days: [
    introduction: Pick<Introduction, 'id' | 'type'>,
    sunday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    monday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    tuesday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    wednesday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    thursday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    friday: Pick<Study, 'id' | 'type' | 'title' | 'date'>,
    story: Pick<Story, 'id' | 'type' | 'title' | 'date'>
  ];
}

export interface Day {
  pageNumber: number;
  audio?: Audio;
}

export interface Introduction extends Day {
  id: [year: string, quarter: string, week: string, day: '0'];
  type: 'introduction';
  introduction: { xml: Xml };
}

export interface Study extends Day {
  id: [
    year: string,
    quarter: string,
    week: string,
    day: '1' | '2' | '3' | '4' | '5' | '6'
  ];
  type: 'study';
  title: string;
  date: string;
  study: { title: string; xml: Xml };
}

export interface Story extends Day {
  id: [year: string, quarter: string, week: string, day: '7'];
  type: 'story';
  title: string;
  date: string;
  story: { title: string; about: string; xml: Xml };
}

export interface Pdf {
  href: string;
  size: number;
}

export interface Image {
  src: string;
  height: number;
  width: number;
}

export interface Audio {
  src: string;
  size: number;
  bitrate: number;
  playtime: { string: string; seconds: number };
}
