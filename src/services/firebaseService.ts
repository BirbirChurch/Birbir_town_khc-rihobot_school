import { db, auth } from '../firebase.js';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
  getDocFromServer,
  writeBatch,
} from 'firebase/firestore';
import {
  Student,
  Teacher,
  GradeEntry,
  SchoolSettings,
  ParentFeedback,
  TeacherLetter,
  SchoolSubject,
  Announcement,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_GRADES,
  INITIAL_FEEDBACKS,
  INITIAL_LETTERS,
  INITIAL_ANNOUNCEMENTS,
} from '../data/initialData';
import { INITIAL_SUBJECTS } from '../data/initialSubjects';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connectivity test
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Please check your Firebase configuration.');
    }
    return false;
  }
}

// -------------------------------------------------------------
// Real-time Subscriptions (onSnapshot)
// -------------------------------------------------------------

export function subscribeToStudents(
  onData: (students: Student[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'students';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        // If empty in Firestore, pass fallback data & seed in background
        onData(INITIAL_STUDENTS);
        seedCollectionIfEmpty('students', INITIAL_STUDENTS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as Student);
        // Sort by seqNo
        items.sort((a, b) => (a.seqNo || 0) - (b.seqNo || 0));
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on students:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToTeachers(
  onData: (teachers: Teacher[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'teachers';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_TEACHERS);
        seedCollectionIfEmpty('teachers', INITIAL_TEACHERS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as Teacher);
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on teachers:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToGrades(
  onData: (grades: GradeEntry[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'grades';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_GRADES);
        seedCollectionIfEmpty('grades', INITIAL_GRADES);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as GradeEntry);
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on grades:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToAnnouncements(
  onData: (announcements: Announcement[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'announcements';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_ANNOUNCEMENTS);
        seedCollectionIfEmpty('announcements', INITIAL_ANNOUNCEMENTS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as Announcement);
        items.sort((a, b) => b.date.localeCompare(a.date));
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on announcements:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToLetters(
  onData: (letters: TeacherLetter[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'letters';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_LETTERS);
        seedCollectionIfEmpty('letters', INITIAL_LETTERS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as TeacherLetter);
        items.sort((a, b) => b.date.localeCompare(a.date));
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on letters:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToSubjects(
  onData: (subjects: SchoolSubject[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'subjects';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_SUBJECTS);
        seedCollectionIfEmpty('subjects', INITIAL_SUBJECTS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as SchoolSubject);
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on subjects:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToFeedbacks(
  onData: (feedbacks: ParentFeedback[]) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'feedbacks';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_FEEDBACKS);
        seedCollectionIfEmpty('feedbacks', INITIAL_FEEDBACKS);
      } else {
        const items = snapshot.docs.map((docSnap) => docSnap.data() as ParentFeedback);
        items.sort((a, b) => b.date.localeCompare(a.date));
        onData(items);
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on feedbacks:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeToSettings(
  onData: (settings: SchoolSettings) => void,
  onError?: (error: unknown) => void
): () => void {
  const path = 'settings';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const configDoc = snapshot.docs.find((d) => d.id === 'general');
      if (configDoc) {
        onData(configDoc.data() as SchoolSettings);
      } else {
        onData(INITIAL_SETTINGS);
        saveSettingsToFirestore(INITIAL_SETTINGS).catch((e) =>
          console.warn('Failed to seed settings to Firestore', e)
        );
      }
    },
    (error) => {
      console.warn('Firestore onSnapshot error on settings:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// -------------------------------------------------------------
// Direct Firestore Mutations
// -------------------------------------------------------------

export async function saveStudentToFirestore(student: Student): Promise<void> {
  const path = `students/${student.id}`;
  try {
    await setDoc(doc(db, 'students', student.id), student);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function bulkSaveStudentsToFirestore(students: Student[]): Promise<void> {
  const path = 'students';
  try {
    const chunkSize = 400;
    for (let i = 0; i < students.length; i += chunkSize) {
      const chunk = students.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      chunk.forEach((st) => {
        batch.set(doc(db, 'students', st.id), st);
      });
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteStudentFromFirestore(studentId: string): Promise<void> {
  const path = `students/${studentId}`;
  try {
    await deleteDoc(doc(db, 'students', studentId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveTeacherToFirestore(teacher: Teacher): Promise<void> {
  const path = `teachers/${teacher.id}`;
  try {
    await setDoc(doc(db, 'teachers', teacher.id), teacher);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function bulkSaveTeachersToFirestore(teachers: Teacher[]): Promise<void> {
  const path = 'teachers';
  try {
    const batch = writeBatch(db);
    teachers.forEach((t) => {
      batch.set(doc(db, 'teachers', t.id), t);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteTeacherFromFirestore(teacherId: string): Promise<void> {
  const path = `teachers/${teacherId}`;
  try {
    await deleteDoc(doc(db, 'teachers', teacherId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveGradeToFirestore(grade: GradeEntry): Promise<void> {
  const path = `grades/${grade.id}`;
  try {
    await setDoc(doc(db, 'grades', grade.id), grade);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function bulkSaveGradesToFirestore(grades: GradeEntry[]): Promise<void> {
  const path = 'grades';
  try {
    const chunkSize = 400;
    for (let i = 0; i < grades.length; i += chunkSize) {
      const chunk = grades.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      chunk.forEach((g) => {
        batch.set(doc(db, 'grades', g.id), g);
      });
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveAnnouncementToFirestore(announcement: Announcement): Promise<void> {
  const path = `announcements/${announcement.id}`;
  try {
    await setDoc(doc(db, 'announcements', announcement.id), announcement);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteAnnouncementFromFirestore(announcementId: string): Promise<void> {
  const path = `announcements/${announcementId}`;
  try {
    await deleteDoc(doc(db, 'announcements', announcementId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveLetterToFirestore(letter: TeacherLetter): Promise<void> {
  const path = `letters/${letter.id}`;
  try {
    await setDoc(doc(db, 'letters', letter.id), letter);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveFeedbackToFirestore(feedback: ParentFeedback): Promise<void> {
  const path = `feedbacks/${feedback.id}`;
  try {
    await setDoc(doc(db, 'feedbacks', feedback.id), feedback);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveSubjectToFirestore(subject: SchoolSubject): Promise<void> {
  const path = `subjects/${subject.id}`;
  try {
    await setDoc(doc(db, 'subjects', subject.id), subject);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function bulkSaveSubjectsToFirestore(subjects: SchoolSubject[]): Promise<void> {
  const path = 'subjects';
  try {
    const batch = writeBatch(db);
    subjects.forEach((s) => {
      batch.set(doc(db, 'subjects', s.id), s);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveSettingsToFirestore(settings: SchoolSettings): Promise<void> {
  const path = 'settings/general';
  try {
    await setDoc(doc(db, 'settings', 'general'), settings);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// -------------------------------------------------------------
// Seeding Helper
// -------------------------------------------------------------
let isSeeding: Record<string, boolean> = {};

async function seedCollectionIfEmpty(
  collectionName: string,
  initialData: Array<{ id: string } & Record<string, any>>
): Promise<void> {
  if (isSeeding[collectionName]) return;
  isSeeding[collectionName] = true;
  try {
    const existing = await getDocs(collection(db, collectionName));
    if (existing.empty && initialData.length > 0) {
      const chunkSize = 400;
      for (let i = 0; i < initialData.length; i += chunkSize) {
        const chunk = initialData.slice(i, i + chunkSize);
        const batch = writeBatch(db);
        chunk.forEach((item) => {
          batch.set(doc(db, collectionName, item.id), item);
        });
        await batch.commit();
      }
      console.log(`Successfully seeded ${collectionName} to Firestore (${initialData.length} documents)`);
    }
  } catch (e) {
    console.warn(`Firestore seeding skipped for ${collectionName}:`, e);
  } finally {
    isSeeding[collectionName] = false;
  }
}
