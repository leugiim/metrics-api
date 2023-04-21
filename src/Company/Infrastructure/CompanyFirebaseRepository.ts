import { Company, Metric } from "../Domain/Company";
import { CompanyRepository } from "../Domain/CompanyRepository";
import { firebaseConfig } from "../../_Shared/Infrastructure/Firebase";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import { date } from "zod";

export class CompanyFirebaseRepository implements CompanyRepository {
  private firebase = initializeApp(firebaseConfig);
  private firestore = getFirestore(this.firebase);

  async findByName(companyName: string): Promise<Company | null> {
    const companyNameId = companyName.toLowerCase();

    const companiesCollection = collection(this.firestore, companyNameId);
    const companyDocs = await getDocs(companiesCollection);

    if (companyDocs.empty) throw new Error("Company not found");

    const company: Company = { name: companyName, metrics: {} };

    companyDocs.forEach((doc) => {
      if (doc.id === "name") {
        company.name = doc.data()?.name ?? companyName;
      } else {
        company.metrics[doc.id] = (doc.data()?.metrics ?? []).map((metric) => ({
          date: metric.date.toDate(),
          description: metric.description,
        })) as Metric[];
      }
    });

    return company;
  }

  async createByName(companyName: string): Promise<Company | null> {
    const companyNameId = companyName.toLowerCase();
    
    const companiesCollection = collection(this.firestore, companyNameId);
    const companyDocs = await getDocs(companiesCollection);

    if (!companyDocs.empty) throw new Error("Company already exists");

    const company: Company = { name: companyName, metrics: {} };
    await setDoc(doc(this.firestore, companyNameId, "name"), {
      name: companyName,
    });
    return company;
  }

  async createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null> {
    const companyNameId = companyName.toLowerCase();
    const metricNameId = metricName.toLowerCase();

    const companiesCollection = collection(this.firestore, companyNameId);
    const metricDocRef = doc(companiesCollection, metricNameId);
    const metricDoc = await getDoc(metricDocRef);
    const date = Timestamp.now();
    const metric: Metric = { date: date.toDate(), description };

    if (!metricDoc.exists()) {
      await setDoc(metricDocRef, {
        name: metricName,
        metrics: [{ date, description }],
      });
    } else {
      const metricData = metricDoc.data();
      const metrics = metricData?.metrics ?? [];

      metrics.push({ date, description });
      await updateDoc(metricDocRef, { metrics });
    }
    return metric;
  }
}
