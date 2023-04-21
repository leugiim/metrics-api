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

  async findByName(name: string): Promise<Company | null> {
    const companiesCollection = collection(this.firestore, name);
    const companyDocs = await getDocs(companiesCollection);

    if (!companyDocs.empty) {
      const company: Company = { name, metrics: {} };

      companyDocs.forEach((doc) => {
        if (doc.id === "name") return;
        company.metrics[doc.id] = (doc.data()?.metrics ?? []).map((metric) => ({
          date: metric.date.toDate(),
          description: metric.description,
        })) as Metric[];
      });

      return company;
    } else {
      return null;
    }
  }

  async createByName(name: string): Promise<Company | null> {
    const companiesCollection = collection(this.firestore, name);
    const companyDocs = await getDocs(companiesCollection);

    if (companyDocs.empty) {
      const company: Company = { name, metrics: {} };

      await setDoc(doc(this.firestore, name, "name"), { name });

      return company;
    } else {
      return null;
    }
  }

  async createMetric(
    companyName: string,
    metricName: string,
    description: string
  ): Promise<Metric | null> {
    const companiesCollection = collection(this.firestore, companyName);
    const metricDocRef = doc(companiesCollection, metricName);
    const metricDoc = await getDoc(metricDocRef);
    const date = Timestamp.now();

    if (!metricDoc.exists()) {
      await setDoc(metricDocRef, { metrics: [{ date, description }] });
      const metric: Metric = { date: date.toDate(), description };
      return metric;
    } else {
      const metricData = metricDoc.data();
      const metrics = metricData?.metrics ?? [];

      metrics.push({ date, description });
      await updateDoc(metricDocRef, { metrics });
      const metric: Metric = { date: date.toDate(), description };
      return metric;
    }
  }
}
