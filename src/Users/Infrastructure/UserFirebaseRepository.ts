import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";
import { firebaseConfig } from "../../_Shared/Infrastructure/Firebase";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";

export class UserFirebaseRepository implements UserRepository {
  private firebase = initializeApp(firebaseConfig);
  private firestore = getFirestore(this.firebase);
  private usersCollection = collection(this.firestore, "users");

  async findByUsername(username: string): Promise<User | null> {
    const queryResult = doc(this.usersCollection, username);
    const userDoc = await getDoc(queryResult);

    if (userDoc.exists()) {
      return { username, ...userDoc.data() } as User;
    } else {
      return null;
    }
  }

  async addCompanyPermission(user: User, companyName: string): Promise<User> {
    user.companiesPermissions.push(companyName);

    const userRef = doc(this.usersCollection, user.username);
    await updateDoc(userRef, {
      companiesPermissions: user.companiesPermissions,
    });

    return await this.findByUsername(user.username);
  }
}
