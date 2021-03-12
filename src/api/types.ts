export type Subject = Year | Quarter | Week | Day;

export const isYear = (subject: Pick<Subject, 'id'>): subject is Year =>
  'id' in subject && subject.id.length === 1;
export const isQuarter = (subject: Pick<Subject, 'id'>): subject is Quarter =>
  'id' in subject && subject.id.length === 2;
export const isWeek = (subject: Pick<Subject, 'id'>): subject is Week =>
  'id' in subject && subject.id.length === 3;
export const isDay = (subject: Pick<Subject, 'id'>): subject is Day =>
  'id' in subject && subject.id.length === 4;

export interface Root {
  years: Pick<Year, 'type' | 'id'>[];
}

export interface Year {
  type: 'year';
  id: [year: string];
  quarters: Pick<Quarter, 'type' | 'id' | 'title' | 'image'>[];
}

export interface Quarter {
  type: 'quarter';
  id: [year: string, quarter: string];
  title: string;
  forword: { title: string; xml: string };
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
  days: Pick<Day, 'id' | 'type'>[];
}

export type Day = {
  id: [year: string, quarter: string, week: string, day: string];
  pageNumber: string;
  audio?: Audio;
} & (
  | {
      type: 'introduction';
      introduction: { xml: string };
    }
  | {
      type: 'study';
      title: string;
      date: string;
      study: { title: string; xml: string };
    }
  | {
      type: 'story';
      title: string;
      date: string;
      story: { title: string; xml: string };
    }
);

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
