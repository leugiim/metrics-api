import { Company } from "../Domain/Company";
import { CompanyRepository } from "../Domain/CompanyRepository";

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async findByName(name: string): Promise<Company | null> {
    const company = await this.companyRepository.findByName(name);
    return company;
  }
}
