export interface Company {
  name: string;
  metrics: { [key: string]: Metric[] };
}

export interface Metric {
  date: Date;
  value: string;
}
