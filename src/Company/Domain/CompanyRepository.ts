import { Company, Metric } from "./Company";

export interface CompanyRepository {
  findByName(name: string): Promise<Company | null>;
  createByName(name: string): Promise<Company | null>;
  createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null>;
}
