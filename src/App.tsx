import React, { useState, useEffect } from 'react';
import {
  UserRole,
  Student,
  Teacher,
  SchoolSubject,
  GradeEntry,
  SchoolSettings,
  ParentFeedback,
  TeacherLetter,
  Announcement,
} from './types';
import {
  loadSettings,
  saveSettings,
  loadStudents,
  saveStudents,
  loadTeachers,
  saveTeachers,
  loadGrades,
  saveGrades,
  loadSubjects,
  saveSubjects,
  loadFeedbacks,
  saveFeedbacks,
  loadLetters,
  saveLetters,
  resetAllDataToDefault,
} from './utils/storage';
import {
  testConnection,
  subscribeToStudents,
  subscribeToTeachers,
  subscribeToGrades,
  subscribeToAnnouncements,
  subscribeToLetters,
  subscribeToSubjects,
  subscribeToFeedbacks,
  subscribeToSettings,
  bulkSaveStudentsToFirestore,
  deleteStudentFromFirestore,
  bulkSaveTeachersToFirestore,
  deleteTeacherFromFirestore,
  bulkSaveGradesToFirestore,
  saveLetterToFirestore,
  saveFeedbackToFirestore,
  bulkSaveSubjectsToFirestore,
  saveSettingsToFirestore,
} from './services/firebaseService';
import { INITIAL_ANNOUNCEMENTS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { LoginScreen } from './components/LoginScreen';
import { AdminPortal } from './components/AdminPortal';
import { PrincipalPortal } from './components/PrincipalPortal';
import { KgDirectorPortal } from './components/KgDirectorPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { ParentPortal } from './components/ParentPortal';
import { AnnouncementsBoard } from './components/AnnouncementsBoard';
import { RotateCcw } from 'lucide-react';

export default function App() {
  // Persistent data state
  const [settings, setSettings] = useState<SchoolSettings>(() => loadSettings());
  const [students, setStudents] = useState<Student[]>(() => loadStudents());
  const [teachers, setTeachers] = useState<Teacher[]>(() => loadTeachers());
  const [grades, setGrades] = useState<GradeEntry[]>(() => loadGrades());
  const [subjects, setSubjects] = useState<SchoolSubject[]>(() => loadSubjects());
  const [feedbacks, setFeedbacks] = useState<ParentFeedback[]>(() => loadFeedbacks());
  const [letters, setLetters] = useState<TeacherLetter[]>(() => loadLetters());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => INITIAL_ANNOUNCEMENTS);

  // Real-time connection status
  const [isFirebaseLive, setIsFirebaseLive] = useState<boolean>(true);

  // -------------------------------------------------------------
  // Real-Time Firebase Firestore Subscriptions (onSnapshot)
  // -------------------------------------------------------------
  useEffect(() => {
    testConnection().then((ok) => setIsFirebaseLive(ok));

    const unsubStudents = subscribeToStudents(
      (data) => setStudents(data),
      () => setIsFirebaseLive(false)
    );

    const unsubTeachers = subscribeToTeachers(
      (data) => setTeachers(data),
      () => setIsFirebaseLive(false)
    );

    const unsubGrades = subscribeToGrades(
      (data) => setGrades(data),
      () => setIsFirebaseLive(false)
    );

    const unsubAnnouncements = subscribeToAnnouncements(
      (data) => setAnnouncements(data),
      () => setIsFirebaseLive(false)
    );

    const unsubLetters = subscribeToLetters(
      (data) => setLetters(data),
      () => setIsFirebaseLive(false)
    );

    const unsubSubjects = subscribeToSubjects(
      (data) => setSubjects(data),
      () => setIsFirebaseLive(false)
    );

    const unsubFeedbacks = subscribeToFeedbacks(
      (data) => setFeedbacks(data),
      () => setIsFirebaseLive(false)
    );

    const unsubSettings = subscribeToSettings(
      (data) => setSettings(data),
      () => setIsFirebaseLive(false)
    );

    return () => {
      unsubStudents();
      unsubTeachers();
      unsubGrades();
      unsubAnnouncements();
      unsubLetters();
      unsubSubjects();
      unsubFeedbacks();
      unsubSettings();
    };
  }, []);

  // Sync to localStorage as offline fallback
  useEffect(() => { saveSettings(settings); }, [settings]);
  useEffect(() => { saveStudents(students); }, [students]);
  useEffect(() => { saveTeachers(teachers); }, [teachers]);
  useEffect(() => { saveGrades(grades); }, [grades]);
  useEffect(() => { saveSubjects(subjects); }, [subjects]);
  useEffect(() => { saveFeedbacks(feedbacks); }, [feedbacks]);
  useEffect(() => { saveLetters(letters); }, [letters]);

  // Auth / Active user state
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentStudent, setCurrentStudent] = useState<Student | undefined>(undefined);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | undefined>(undefined);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // -------------------------------------------------------------
  // Data Mutation Handlers (Direct Firestore Writes)
  // -------------------------------------------------------------
  const handleSetStudents: React.Dispatch<React.SetStateAction<Student[]>> = (action) => {
    setStudents((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveStudents(next);

      // Handle deletions in Firestore
      const nextIds = new Set(next.map((s) => s.id));
      prev.forEach((p) => {
        if (!nextIds.has(p.id)) {
          deleteStudentFromFirestore(p.id).catch(console.error);
        }
      });

      // Write updated collection to Firestore
      bulkSaveStudentsToFirestore(next).catch(console.error);
      return next;
    });
  };

  const handleSetTeachers: React.Dispatch<React.SetStateAction<Teacher[]>> = (action) => {
    setTeachers((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveTeachers(next);

      // Handle deletions in Firestore
      const nextIds = new Set(next.map((t) => t.id));
      prev.forEach((p) => {
        if (!nextIds.has(p.id)) {
          deleteTeacherFromFirestore(p.id).catch(console.error);
        }
      });

      // Write updated collection to Firestore
      bulkSaveTeachersToFirestore(next).catch(console.error);
      return next;
    });
  };

  const handleSetGrades: React.Dispatch<React.SetStateAction<GradeEntry[]>> = (action) => {
    setGrades((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveGrades(next);
      bulkSaveGradesToFirestore(next).catch(console.error);
      return next;
    });
  };

  const handleSetSettings: React.Dispatch<React.SetStateAction<SchoolSettings>> = (action) => {
    setSettings((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveSettings(next);
      saveSettingsToFirestore(next).catch(console.error);
      return next;
    });
  };

  const handleSetSubjects: React.Dispatch<React.SetStateAction<SchoolSubject[]>> = (action) => {
    setSubjects((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveSubjects(next);
      bulkSaveSubjectsToFirestore(next).catch(console.error);
      return next;
    });
  };

  const handleSetLetters: React.Dispatch<React.SetStateAction<TeacherLetter[]>> = (action) => {
    setLetters((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveLetters(next);
      next.forEach((letter) => {
        saveLetterToFirestore(letter).catch(console.error);
      });
      return next;
    });
  };

  const handleSetFeedbacks: React.Dispatch<React.SetStateAction<ParentFeedback[]>> = (action) => {
    setFeedbacks((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      saveFeedbacks(next);
      next.forEach((fb) => {
        saveFeedbackToFirestore(fb).catch(console.error);
      });
      return next;
    });
  };

  // Login handler
  const handleLoginSuccess = (
    role: UserRole,
    userName: string,
    studentData?: Student,
    teacherData?: Teacher
  ) => {
    setCurrentRole(role);
    setCurrentUserName(userName);
    setCurrentStudent(studentData);
    setCurrentTeacher(teacherData);

    // Set initial default tab for role
    switch (role) {
      case 'super_admin':
        setActiveTab('promotion');
        break;
      case 'principal':
      case 'vice_principal':
        setActiveTab('roster');
        break;
      case 'kg_director':
        setActiveTab('kg_sections');
        break;
      case 'teacher':
        setActiveTab('marks_entry');
        break;
      case 'parent':
        setActiveTab('report_card');
        break;
      default:
        setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentUserName('');
    setCurrentStudent(undefined);
    setCurrentTeacher(undefined);
    setActiveTab('home');
  };

  const handleUpdateLogo = (newLogo: string) => {
    handleSetSettings((prev) => ({
      ...prev,
      customLogo: newLogo,
    }));
  };

  // Strictly Nothing shown on dashboard until logged in
  if (!currentRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 p-4">
        <LoginScreen
          settings={settings}
          teachers={teachers}
          students={students}
          onLoginSuccess={handleLoginSuccess}
          onUpdateLogo={handleUpdateLogo}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* 3-zone Top Bar Contract Navigation */}
      <Navbar
        currentRole={currentRole}
        currentUserName={currentUserName}
        academicYear={settings.currentAcademicYear}
        semester={settings.currentSemester}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logoUrl={settings.customLogo}
        isFirebaseConnected={isFirebaseLive}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Real-time Announcements Board */}
        <AnnouncementsBoard
          announcements={announcements}
          currentRole={currentRole}
          currentUserName={currentUserName}
        />

        {/* 1. Super Admin View */}
        {currentRole === 'super_admin' && (
          <AdminPortal
            students={students}
            setStudents={handleSetStudents}
            teachers={teachers}
            setTeachers={handleSetTeachers}
            subjects={subjects}
            setSubjects={handleSetSubjects}
            settings={settings}
            setSettings={handleSetSettings}
            grades={grades}
            setGrades={handleSetGrades}
            feedbacks={feedbacks}
            setFeedbacks={handleSetFeedbacks}
            letters={letters}
            setLetters={handleSetLetters}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}

        {/* 2 & 3. Principal & Vice Principal View */}
        {(currentRole === 'principal' || currentRole === 'vice_principal') && (
          <PrincipalPortal
            isVicePrincipal={currentRole === 'vice_principal'}
            students={students}
            setStudents={handleSetStudents}
            teachers={teachers}
            setTeachers={handleSetTeachers}
            subjects={subjects}
            settings={settings}
            setSettings={handleSetSettings}
            grades={grades}
            feedbacks={feedbacks}
            setFeedbacks={handleSetFeedbacks}
            letters={letters}
            setLetters={handleSetLetters}
            activeTab={activeTab}
          />
        )}

        {/* 4. KG Director View */}
        {currentRole === 'kg_director' && (
          <KgDirectorPortal
            students={students}
            setStudents={handleSetStudents}
            teachers={teachers}
            setTeachers={handleSetTeachers}
            subjects={subjects}
            settings={settings}
            setSettings={handleSetSettings}
            grades={grades}
            feedbacks={feedbacks}
            setFeedbacks={handleSetFeedbacks}
            activeTab={activeTab}
          />
        )}

        {/* 5. Teacher View */}
        {currentRole === 'teacher' && currentTeacher && (
          <TeacherPortal
            currentTeacher={currentTeacher}
            students={students}
            setStudents={handleSetStudents}
            grades={grades}
            setGrades={handleSetGrades}
            subjects={subjects}
            settings={settings}
            activeTab={activeTab}
          />
        )}

        {/* 6. Parent View */}
        {currentRole === 'parent' && currentStudent && (
          <ParentPortal
            currentStudent={currentStudent}
            students={students}
            grades={grades}
            subjects={subjects}
            settings={settings}
            feedbacks={feedbacks}
            setFeedbacks={handleSetFeedbacks}
            activeTab={activeTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">
              የብርብር ከተማ ቃለ ሕይወት ርኆቦት መካከለኛና የመጀመሪያ ደረጃ ትምህርት ቤት
            </span>
            <span>·</span>
            <span>© {settings.currentAcademicYear} ዓ/ም</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Firebase Firestore የተገናኘ
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => resetAllDataToDefault()}
              title="ሁሉንም መረጃ ወደ መጀመሪያው የሙከራ ዳታ መልስ"
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ዳታ ወደ ነባሪ መልስ (Reset Demo)</span>
            </button>
            <span>·</span>
            <span>የውጤትና ሮስተር ስርዓት</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
