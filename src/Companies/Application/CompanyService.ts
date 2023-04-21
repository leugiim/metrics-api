import { Company, Metric } from "../Domain/Company";
import { CompanyRepository } from "../Domain/CompanyRepository";

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async findByName(companyName: string): Promise<Company | null> {
    return await this.companyRepository.findByName(companyName);
  }

  async createByName(companyName: string): Promise<Company | null> {
    return await this.companyRepository.createByName(companyName);
  }

  async createCompany(company: Company): Promise<Company | null> {
    return await this.companyRepository.createCompany(company);
  }

  async createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null> {
    return await this.companyRepository.createMetric(
      companyName,
      metricName,
      description
    );
  }
}
