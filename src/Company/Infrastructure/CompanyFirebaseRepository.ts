import { Company } from "../Domain/Company";
import { CompanyRepository } from "../Domain/CompanyRepository";
import { firebaseConfig } from "../../_Shared/Infrastructure/Firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore/lite";

export class CompanyFirebaseRepository implements CompanyRepository {
  private firebase = initializeApp(firebaseConfig);
  private firestore = getFirestore(this.firebase);
  private companiesCollection = collection(this.firestore, "companies");

  async findByName(name: string): Promise<Company | null> {
    const queryResult = doc(this.companiesCollection, name);
    const companyDoc = await getDoc(queryResult);

    if (companyDoc.exists()) {
      return { name, metrics: { ...companyDoc.data() } } as Company;
    } else {
      return null;
    }
  }
}
