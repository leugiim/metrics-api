import { Company, Metric } from "../Domain/Company";
import { CompanyRepository } from "../Domain/CompanyRepository";

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async findByName(companyName: string): Promise<Company | null> {
    const company = await this.companyRepository.findByName(companyName);
    return company;
  }

  async createByName(companyName: string): Promise<Company | null> {
    const company = await this.companyRepository.createByName(companyName);
    return company;
  }

  async createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null> {
    const company = await this.companyRepository.createMetric(
      companyName,
      metricName,
      description
    );
    return company;
  }
}
