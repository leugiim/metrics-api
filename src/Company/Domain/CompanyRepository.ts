import { Company } from "./Company";

export interface CompanyRepository {
  findByName(name: string): Promise<Company | null>;
}
