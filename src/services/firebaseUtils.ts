import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore';
import { getFirebaseConfig } from './firebaseConfig';
import type { AppDatas, FirestoreData, FirestoreElement } from '../types';

initializeApp(getFirebaseConfig());

const db = getFirestore();
const auth = getAuth();

export const tasksRef = collection(db, 'tasks');
export const projectsRef = collection(db, 'projects');

export function signInWithGoogle(): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export async function SignInAsGuest(): Promise<void> {
  await signInWithEmailAndPassword(auth, 'emilia@tan.com', 'emt123');
}

export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

export function getUserId(): string {
  return auth.currentUser!.uid;
}

export function getUsername(): string {
  return auth.currentUser!.displayName!;
}

export function getUserPhoto(): string {
  return auth.currentUser!.photoURL!;
}

export async function getDataFromDb(): Promise<FirestoreData | null> {
  const userId = getUserId();

  const docRef = doc(tasksRef, userId);

  const taskDoc = await getDoc(docRef);

  if (!taskDoc.exists()) {
    createNewData();
    return null;
  }

  const projectDoc = await getDoc(doc(projectsRef, userId));

  const rawData = [taskDoc.data(), projectDoc.data()] as FirestoreElement[];
  const filteredData = rawData.map((data) => data.data) as FirestoreData;

  const isDataEmpty = filteredData!.every((data) => !data.length);

  return isDataEmpty ? null : filteredData;
}

async function createNewData(): Promise<void> {
  const userId = getUserId();

  const defaultData = {
    data: [],
    username: getUsername(),
    timestamp: serverTimestamp()
  };

  await Promise.all(
    [tasksRef, projectsRef].map((ref) => setDoc(doc(ref, userId), defaultData))
  );
}

export async function updateDb(
  dataType: 'tasks' | 'projects',
  newData: AppDatas
): Promise<void> {
  const userId = getUserId();

  const docRef = doc(dataType === 'tasks' ? tasksRef : projectsRef, userId);

  await updateDoc(docRef, {
    data: newData,
    timestamp: serverTimestamp()
  });
}
