import { Company } from "./Company";

export interface CompanyRepository {
  findByName(name: string): Promise<Company | null>;
  createByName(name: string): Promise<Company | null>;
}
