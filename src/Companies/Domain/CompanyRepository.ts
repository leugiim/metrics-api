import { Company, Metric } from "./Company";

export interface CompanyRepository {
  findByName(companyName: string): Promise<Company | null>;
  createByName(companyName: string): Promise<Company | null>;
  createCompany(company: Company): Promise<Company | null>;
  createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null>;
}
