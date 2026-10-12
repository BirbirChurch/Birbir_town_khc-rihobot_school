import { Student, Teacher, GradeEntry, SchoolSettings, ParentFeedback, TeacherLetter } from '../types';

export const INITIAL_SETTINGS: SchoolSettings = {
  schoolName: 'የብርብር ከተማ ቃለ ሕይወት ርኆቦት መካከለኛና የመጀመሪያ ደረጃ ትምህርት ቤት',
  customLogo: '/kale_heywet_logo.jpg',
  currentAcademicYear: '2019',
  availableAcademicYears: ['2019', '2020'],
  currentSemester: 1,
  failThresholdSubjects: 2, // If failing in 2 or more subjects (<50), student fails the year
  passAverageThreshold: 50,
  mandatoryFailingSubjects: ['እንግሊዝኛ', 'ሒሳብ'],
  gradePromotionRules: {
    'ማቆያ': { failThresholdSubjects: 99, passAverageThreshold: 40, mandatoryFailingSubjects: [] },
    'ኬጂ-1': { failThresholdSubjects: 99, passAverageThreshold: 40, mandatoryFailingSubjects: [] },
    'ኬጂ-2': { failThresholdSubjects: 99, passAverageThreshold: 40, mandatoryFailingSubjects: [] },
    '8ኛ ክፍል': { failThresholdSubjects: 2, passAverageThreshold: 50, mandatoryFailingSubjects: ['እንግሊዝኛ', 'ሒሳብ'] },
    '12ኛ ክፍል': { failThresholdSubjects: 1, passAverageThreshold: 50, mandatoryFailingSubjects: ['እንግሊዝኛ', 'ሒሳብ'] },
  },
  resultsApprovedForStudents: true,
  kgResultsApproved: true,
  passwords: {
    super_admin: 'admin2020',
    principal: 'principal2020',
    vice_principal: 'vp2020',
    kg_director: 'kg2020',
    parent_general_pin: 'parent2020',
  },
};

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-01',
    name: 'መ/ር ታሪኩ በቀለ ገብሬ',
    phone: '0911223344',
    pin: '1001',
    isHomeroom: true,
    homeroomGrade: '1ኛ ክፍል',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: '1ኛ ክፍል', section: 'ሀ', subjectName: 'እንግሊዝኛ' },
      { grade: '1ኛ ክፍል', section: 'ለ', subjectName: 'እንግሊዝኛ' },
      { grade: '1ኛ ክፍል', section: 'ሀ', subjectName: 'አካባቢ ሳይንስ' },
    ],
  },
  {
    id: 'tch-02',
    name: 'መ/ርት መሰረት አለሙ ወልዴ',
    phone: '0922334455',
    pin: '1002',
    isHomeroom: true,
    homeroomGrade: '7ኛ ክፍል',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: '7ኛ ክፍል', section: 'ሀ', subjectName: 'ሂሳብ' },
      { grade: '7ኛ ክፍል', section: 'ሀ', subjectName: 'ፊዚክስ' },
      { grade: '8ኛ ክፍል', section: 'ሀ', subjectName: 'ሂሳብ' },
    ],
  },
  {
    id: 'tch-03',
    name: 'መ/ር ብርሃኑ ዮሐንስ ታምሬ',
    phone: '0933445566',
    pin: '1003',
    isHomeroom: true,
    homeroomGrade: '8ኛ ክፍል',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: '8ኛ ክፍል', section: 'ሀ', subjectName: 'ባዮሎጂ' },
      { grade: '8ኛ ክፍል', section: 'ሀ', subjectName: 'ኬሚስትሪ' },
      { grade: '7ኛ ክፍል', section: 'ሀ', subjectName: 'ባዮሎጂ' },
    ],
  },
  {
    id: 'tch-04',
    name: 'መ/ርት ጽጌረዳ ተስፋዬ ለማ',
    phone: '0944556677',
    pin: '1004',
    isHomeroom: true,
    homeroomGrade: 'ማቆያ',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: 'ማቆያ', section: 'ሀ', subjectName: 'ጋሞኛ (የአካባቢ ቋንቋ)' },
      { grade: 'ማቆያ', section: 'ሀ', subjectName: 'ሂሳብ (የመጀመሪያ)' },
      { grade: 'ማቆያ', section: 'ሀ', subjectName: 'አካባቢ ሳይንስ' },
      { grade: 'ማቆያ', section: 'ሀ', subjectName: 'እንግሊዝኛ' },
    ],
  },
  {
    id: 'tch-05',
    name: 'መ/ርት ሰላማዊት አበበ ጥላሁን',
    phone: '0955667788',
    pin: '1005',
    isHomeroom: true,
    homeroomGrade: 'ደረጃ 1',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: 'ደረጃ 1', section: 'ሀ', subjectName: 'ሂሳብ (የመጀመሪያ)' },
      { grade: 'ደረጃ 1', section: 'ሀ', subjectName: 'እንግሊዝኛ' },
      { grade: 'ደረጃ 2', section: 'ሀ', subjectName: 'እንግሊዝኛ' },
    ],
  },
  {
    id: 'tch-06',
    name: 'መ/ር ገላውዲዎስ ደስታ ተፈራ',
    phone: '0966778899',
    pin: '1006',
    isHomeroom: true,
    homeroomGrade: '9ኛ ክፍል',
    homeroomSection: 'ሀ',
    assignments: [
      { grade: '9ኛ ክፍል', section: 'ሀ', subjectName: 'ኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ (ICT)' },
      { grade: '9ኛ ክፍል', section: 'ሀ', subjectName: 'ዜግነት ትምህርት' },
      { grade: '10ኛ ክፍል', section: 'ሀ', subjectName: 'ኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ (ICT)' },
    ],
  },
  {
    id: 'tch-07',
    name: 'መ/ር ዳዊት ከበደ አባተ',
    phone: '0977889900',
    pin: '1007',
    isHomeroom: false,
    assignments: [
      { grade: '7ኛ ክፍል', section: 'ሀ', subjectName: 'ማህበራዊ ሳይንስ' },
      { grade: '8ኛ ክፍል', section: 'ሀ', subjectName: 'ማህበራዊ ሳይንስ' },
      { grade: '7ኛ ክፍል', section: 'ሀ', subjectName: 'ዜግነት ትምህርት' },
    ],
  },
];

export const INITIAL_STUDENTS: Student[] = [
  // 1ኛ ክፍል 2020 ተማሪዎች
  {
    id: 'bkhrsf1-101',
    seqNo: 1,
    fullName: 'ዮናስ ታደሰ አበበ',
    gender: 'ወንድ',
    age: 7,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0911002233',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [
      {
        id: 'cn-1',
        date: '2020-01-15',
        author: 'መ/ር ታሪኩ በቀለ',
        authorRole: 'የክፍል ስም ጠሪ',
        note: 'በትምህርት ላይ እጅግ ንቁና በስነ-ስርዓት የታነጸ ተማሪ ነው፤ ማበረታታት ይቀጥል።',
      },
    ],
  },
  {
    id: 'bkhrsf1-102',
    seqNo: 2,
    fullName: 'ቤተልሔም ካሳሁን ወርቁ',
    gender: 'ሴት',
    age: 7,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0912112233',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [
      {
        id: 'cn-2',
        date: '2020-01-20',
        author: 'መ/ር ታሪኩ በቀለ',
        authorRole: 'የክፍል ስም ጠሪ',
        note: 'የትምህርት ሰዓት በማክበር እና በንጽህና አርአያ ናት።',
      },
    ],
  },
  {
    id: 'bkhrsf1-103',
    seqNo: 3,
    fullName: 'ናትናኤል ታምራት ሞላ',
    gender: 'ወንድ',
    age: 8,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0913223344',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsf1-104',
    seqNo: 4,
    fullName: 'ኤልሳቤጥ ኃይሌ ለማ',
    gender: 'ሴት',
    age: 7,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0914334455',
    address: 'ብርብር ከተማ ቀበሌ 03',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsf1-105',
    seqNo: 5,
    fullName: 'ዳንኤል አስራት ገብሬ',
    gender: 'ወንድ',
    age: 7,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0915445566',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsf1-106',
    seqNo: 6,
    fullName: 'መቅደስ ፍቃዱ ተሾመ',
    gender: 'ሴት',
    age: 8,
    academicYear: '2020',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0916556677',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // 7ኛ ክፍል 2020 ተማሪዎች
  {
    id: 'bkhrsm7-101',
    seqNo: 1,
    fullName: 'ካሌብ ሙሉጌታ ኃይሉ',
    gender: 'ወንድ',
    age: 13,
    academicYear: '2020',
    grade: '7ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0920112233',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [
      {
        id: 'cn-3',
        date: '2020-02-01',
        author: 'መ/ርት መሰረት አለሙ',
        authorRole: 'የክፍል ስም ጠሪ',
        note: 'በሂሳብና በሳይንስ የላቀ ተሳትፎ ያሳያል፤ ታታሪ ነው።',
      },
    ],
  },
  {
    id: 'bkhrsm7-102',
    seqNo: 2,
    fullName: 'ሰላም ዳንኤል ንጉሴ',
    gender: 'ሴት',
    age: 13,
    academicYear: '2020',
    grade: '7ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0921223344',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [
      {
        id: 'cn-4',
        date: '2020-02-05',
        author: 'መ/ርት መሰረት አለሙ',
        authorRole: 'የክፍል ስም ጠሪ',
        note: 'የክፍሏ ከፍተኛ ውጤት አስመዝጋቢ እና አርአያ ተማሪ ናት።',
      },
    ],
  },
  {
    id: 'bkhrsm7-103',
    seqNo: 3,
    fullName: 'በረከት ተስፋሁን ደበበ',
    gender: 'ወንድ',
    age: 14,
    academicYear: '2020',
    grade: '7ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0922334455',
    address: 'ብርብር ከተማ ቀበሌ 03',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsm7-104',
    seqNo: 4,
    fullName: 'ሜሮን ብርሃኑ መኮንን',
    gender: 'ሴት',
    age: 13,
    academicYear: '2020',
    grade: '7ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0923445566',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // 8ኛ ክፍል 2020 ተማሪዎች
  {
    id: 'bkhrsm8-101',
    seqNo: 1,
    fullName: 'ተመስገን አሰፋ ወርቅነህ',
    gender: 'ወንድ',
    age: 14,
    academicYear: '2020',
    grade: '8ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0930112233',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsm8-102',
    seqNo: 2,
    fullName: 'ሃና አለማየሁ ታደለ',
    gender: 'ሴት',
    age: 14,
    academicYear: '2020',
    grade: '8ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0931223344',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // ማቆያ 2020 ተማሪዎች (KG1)
  {
    id: 'kg1-101',
    seqNo: 1,
    fullName: 'አቤል ሳሙኤል ተረፈ',
    gender: 'ወንድ',
    age: 4,
    academicYear: '2020',
    grade: 'ማቆያ',
    section: 'ሀ',
    parentPhone: '0940112233',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [
      {
        id: 'cn-5',
        date: '2020-01-10',
        author: 'መ/ርት ጽጌረዳ ተስፋዬ',
        authorRole: 'የክፍል ስም ጠሪ',
        note: 'ጨዋታና ጓደኝነት ወዳድ ነው፤ የክፍል ተግባራትን በትጋት ያከናውናል።',
      },
    ],
  },
  {
    id: 'kg1-102',
    seqNo: 2,
    fullName: 'ሊዲያ ያዕቆብ ዳዊት',
    gender: 'ሴት',
    age: 4,
    academicYear: '2020',
    grade: 'ማቆያ',
    section: 'ሀ',
    parentPhone: '0941223344',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // ደረጃ 1 2020 ተማሪዎች (KG2)
  {
    id: 'kg2-101',
    seqNo: 1,
    fullName: 'ሚካኤል ተስፋዬ አያሌው',
    gender: 'ወንድ',
    age: 5,
    academicYear: '2020',
    grade: 'ደረጃ 1',
    section: 'ሀ',
    parentPhone: '0950112233',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'kg2-102',
    seqNo: 2,
    fullName: 'ሩት በቀለ ሃይሌ',
    gender: 'ሴት',
    age: 5,
    academicYear: '2020',
    grade: 'ደረጃ 1',
    section: 'ሀ',
    parentPhone: '0951223344',
    address: 'ብርብር ከተማ ቀበሌ 03',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // ደረጃ 2 2020 ተማሪዎች (KG3)
  {
    id: 'kg3-101',
    seqNo: 1,
    fullName: 'ኤፍሬም ዘውዱ ወልደስላሴ',
    gender: 'ወንድ',
    age: 6,
    academicYear: '2020',
    grade: 'ደረጃ 2',
    section: 'ሀ',
    parentPhone: '0960112233',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // 9ኛ ክፍል 2020 ተማሪዎች
  {
    id: 'bkhrsh9-101',
    seqNo: 1,
    fullName: 'አብዲሳ ጌታቸው ደረጀ',
    gender: 'ወንድ',
    age: 15,
    academicYear: '2020',
    grade: '9ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0970112233',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'pending',
    conductNotes: [],
  },
  {
    id: 'bkhrsh9-102',
    seqNo: 2,
    fullName: 'ሳባ ተክለማርያም ገብሩ',
    gender: 'ሴት',
    age: 15,
    academicYear: '2020',
    grade: '9ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0971223344',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'pending',
    conductNotes: [],
  },

  // -------------------------------------------------------------------------
  // 2019 ዓ/ም ተማሪዎች (ለማሻገር ሞተር ሙከራ - 2019 Students for Promotion Demonstration)
  // -------------------------------------------------------------------------
  {
    id: 'bkhrsf1-107',
    seqNo: 7,
    fullName: 'ጳውሎስ ጴጥሮስ ዮሴፍ',
    gender: 'ወንድ',
    age: 7,
    academicYear: '2019',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0917667788',
    address: 'ብርብር ከተማ ቀበሌ 01',
    promotionStatus: 'promoted',
    conductNotes: [],
  },
  {
    id: 'bkhrsf1-108',
    seqNo: 8,
    fullName: 'ራሔል ሰለሞን ዳባ',
    gender: 'ሴት',
    age: 7,
    academicYear: '2019',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0918778899',
    address: 'ብርብር ከተማ ቀበሌ 02',
    promotionStatus: 'promoted',
    conductNotes: [],
  },
  {
    id: 'bkhrsf1-109',
    seqNo: 9,
    fullName: 'ቢንያም ወርቁ ካሳ',
    gender: 'ወንድ',
    age: 8,
    academicYear: '2019',
    grade: '1ኛ ክፍል',
    section: 'ሀ',
    parentPhone: '0919889900',
    address: 'ብርብር ከተማ ቀበሌ 03',
    promotionStatus: 'repeated', // Low scores in 2019 to demonstrate retention
    conductNotes: [],
  },
];

// Helper to make assessment marks conforming strictly to: 10 + 10 + 10 + 10 + 20 + 10 + 10 + 20 = 100
function createMarks(t1: number, t2: number, mid: number, ass: number, proj: number, q: number, hw: number, fin: number) {
  return {
    test1: t1,
    test2: t2,
    midExam: mid,
    assignment: ass,
    project: proj,
    quiz: q,
    homework: hw,
    finalExam: fin,
    total: t1 + t2 + mid + ass + proj + q + hw + fin,
  };
}

export const INITIAL_GRADES: GradeEntry[] = [
  // 1ኛ ክፍል - ዮናስ ታደሰ (bkhrsf1-101) - Top student
  {
    id: 'grd-01',
    studentId: 'bkhrsf1-101',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 10, 19), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-02',
    studentId: 'bkhrsf1-101',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 10, 10, 9, 19, 10, 10, 18), // 96
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-03',
    studentId: 'bkhrsf1-101',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 9, 8, 10, 17, 8, 9, 18), // 88
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-04',
    studentId: 'bkhrsf1-101',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 9, 9, 9, 18, 9, 9, 19), // 90
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-05',
    studentId: 'bkhrsf1-101',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 10, 9, 10, 19, 10, 10, 19), // 97
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-06',
    studentId: 'bkhrsf1-101',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 9, 10, 10, 18, 9, 10, 18), // 93
    updatedAt: '2020-01-25',
  },

  // 1ኛ ክፍል - ቤተልሔም ካሳሁን (bkhrsf1-102) - Top Female student
  {
    id: 'grd-07',
    studentId: 'bkhrsf1-102',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 9, 10, 10, 19, 10, 10, 20), // 98
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-08',
    studentId: 'bkhrsf1-102',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 10, 19), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-09',
    studentId: 'bkhrsf1-102',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 9, 10, 10, 19, 10, 9, 18), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-10',
    studentId: 'bkhrsf1-102',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 10, 19), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-11',
    studentId: 'bkhrsf1-102',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 9, 10, 10, 19, 10, 10, 20), // 98
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-12',
    studentId: 'bkhrsf1-102',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 9, 18), // 92
    updatedAt: '2020-01-25',
  },

  // 1ኛ ክፍል - ናትናኤል ታምራት (bkhrsf1-103) - Medium
  {
    id: 'grd-13',
    studentId: 'bkhrsf1-103',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(6, 7, 6, 7, 13, 7, 7, 14), // 67
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-14',
    studentId: 'bkhrsf1-103',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 8, 7, 8, 14, 7, 8, 13), // 72
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-15',
    studentId: 'bkhrsf1-103',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 6, 7, 6, 12, 6, 6, 12), // 62
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-16',
    studentId: 'bkhrsf1-103',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(6, 6, 6, 7, 13, 6, 7, 13), // 64
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-17',
    studentId: 'bkhrsf1-103',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 7, 8, 7, 14, 7, 8, 14), // 72
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-18',
    studentId: 'bkhrsf1-103',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 6, 7, 7, 13, 7, 7, 14), // 68
    updatedAt: '2020-01-25',
  },

  // 1ኛ ክፍል - ኤልሳቤጥ ኃይሌ (bkhrsf1-104)
  {
    id: 'grd-19',
    studentId: 'bkhrsf1-104',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 8, 8, 9, 16, 8, 8, 17), // 82
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-20',
    studentId: 'bkhrsf1-104',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 8, 7, 8, 15, 8, 8, 16), // 78
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-21',
    studentId: 'bkhrsf1-104',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 7, 8, 8, 16, 7, 8, 16), // 78
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-22',
    studentId: 'bkhrsf1-104',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 9, 8, 9, 17, 8, 9, 16), // 84
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-23',
    studentId: 'bkhrsf1-104',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 8, 9, 8, 17, 8, 8, 17), // 83
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-24',
    studentId: 'bkhrsf1-104',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 8, 8, 8, 16, 8, 8, 16), // 80
    updatedAt: '2020-01-25',
  },

  // 1ኛ ክፍል - ዳንኤል አስራት (bkhrsf1-105) - struggling/needs help
  {
    id: 'grd-25',
    studentId: 'bkhrsf1-105',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(4, 4, 4, 5, 8, 4, 4, 8), // 41 (< 50)
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-26',
    studentId: 'bkhrsf1-105',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(4, 5, 4, 4, 9, 4, 4, 9), // 43 (< 50)
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-27',
    studentId: 'bkhrsf1-105',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(5, 5, 5, 5, 11, 5, 5, 11), // 52
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-28',
    studentId: 'bkhrsf1-105',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(5, 5, 6, 5, 10, 5, 5, 10), // 51
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-29',
    studentId: 'bkhrsf1-105',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(5, 5, 5, 6, 12, 5, 5, 12), // 55
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-30',
    studentId: 'bkhrsf1-105',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(5, 5, 5, 5, 11, 5, 5, 11), // 52
    updatedAt: '2020-01-25',
  },

  // 1ኛ ክፍል - መቅደስ ፍቃዱ (bkhrsf1-106)
  {
    id: 'grd-31',
    studentId: 'bkhrsf1-106',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 7, 7, 8, 14, 7, 7, 15), // 72
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-32',
    studentId: 'bkhrsf1-106',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 8, 7, 7, 15, 7, 8, 15), // 74
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-33',
    studentId: 'bkhrsf1-106',
    subjectName: 'አካባቢ ሳይንስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 7, 7, 8, 15, 8, 7, 16), // 76
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-34',
    studentId: 'bkhrsf1-106',
    subjectName: 'አማርኛ (የፌዴራል ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 8, 8, 7, 15, 7, 8, 15), // 75
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-35',
    studentId: 'bkhrsf1-106',
    subjectName: 'ጋሞኛ (አፍ መፈቻ ቋንቋ)',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 8, 8, 8, 16, 8, 8, 16), // 82
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-36',
    studentId: 'bkhrsf1-106',
    subjectName: 'ሥነ-ዜጋና ሥነ-ምግባር',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(7, 7, 8, 7, 14, 7, 7, 15), // 72
    updatedAt: '2020-01-25',
  },

  // 7ኛ ክፍል - ካሌብ ሙሉጌታ (bkhrsm7-101)
  {
    id: 'grd-37',
    studentId: 'bkhrsm7-101',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 10, 19), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-38',
    studentId: 'bkhrsm7-101',
    subjectName: 'ፊዚክስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 9, 10, 9, 18, 9, 10, 18), // 92
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-39',
    studentId: 'bkhrsm7-101',
    subjectName: 'ባዮሎጂ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(8, 9, 9, 9, 17, 9, 9, 18), // 88
    updatedAt: '2020-01-25',
  },

  // 7ኛ ክፍል - ሰላም ዳንኤል (bkhrsm7-102)
  {
    id: 'grd-40',
    studentId: 'bkhrsm7-102',
    subjectName: 'ሂሳብ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 10, 10, 10, 19, 10, 10, 20), // 99
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-41',
    studentId: 'bkhrsm7-102',
    subjectName: 'ፊዚክስ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(9, 10, 9, 10, 18, 9, 10, 19), // 94
    updatedAt: '2020-01-25',
  },
  {
    id: 'grd-42',
    studentId: 'bkhrsm7-102',
    subjectName: 'ባዮሎጂ',
    academicYear: '2020',
    semester: 1,
    marks: createMarks(10, 9, 10, 10, 19, 10, 10, 19), // 97
    updatedAt: '2020-01-25',
  },

  // 2019 ዓ/ም Grades (to demonstrate the promotion calculation)
  {
    id: 'grd-2019-01',
    studentId: 'bkhrsf1-107',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(8, 8, 8, 8, 16, 8, 8, 16), // 80
    updatedAt: '2019-06-20',
  },
  {
    id: 'grd-2019-02',
    studentId: 'bkhrsf1-107',
    subjectName: 'ሂሳብ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(8, 8, 8, 8, 16, 8, 8, 16), // 80
    updatedAt: '2019-06-20',
  },
  {
    id: 'grd-2019-03',
    studentId: 'bkhrsf1-108',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(9, 9, 9, 9, 18, 9, 9, 18), // 90
    updatedAt: '2019-06-20',
  },
  {
    id: 'grd-2019-04',
    studentId: 'bkhrsf1-108',
    subjectName: 'ሂሳብ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(9, 9, 9, 9, 18, 9, 9, 18), // 90
    updatedAt: '2019-06-20',
  },
  // Student failing 2 subjects in 2019:
  {
    id: 'grd-2019-05',
    studentId: 'bkhrsf1-109',
    subjectName: 'እንግሊዝኛ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(4, 4, 4, 4, 8, 4, 4, 8), // 36 (<50)
    updatedAt: '2019-06-20',
  },
  {
    id: 'grd-2019-06',
    studentId: 'bkhrsf1-109',
    subjectName: 'ሂሳብ',
    academicYear: '2019',
    semester: 1,
    marks: createMarks(4, 4, 4, 4, 8, 4, 4, 8), // 36 (<50)
    updatedAt: '2019-06-20',
  },
];

export const INITIAL_FEEDBACKS: ParentFeedback[] = [
  {
    id: 'fb-01',
    studentId: 'bkhrsf1-101',
    studentName: 'ዮናስ ታደሰ አበበ',
    parentName: 'አቶ ታደሰ አበበ',
    phone: '0911002233',
    date: '2020-01-28',
    message: 'ሰላም ለትምህርት ቤቱ አስተዳደር። የልጃችን የንባብ መጽሐፍ ተጨማሪ ማግኘት እንችላለን? በቤት ውስጥ በደንብ እንዲለማመድ ፈልገን ነው። እናመሰግናለን።',
    reply: 'ጤና ይስጥልን አቶ ታደሰ። የልጅዎ የትምህርት ፍላጎት ያስደስታል፤ ከክፍል ስም ጠሪ መምህሩ ጋር ተነጋግረን ተጨማሪ የንባብ ማጣቀሻዎችን ነገ በደብተሩ ልከን እንሰጣለን።',
    replyDate: '2020-01-29',
    repliedBy: 'ዋና ር/መምህር',
    targetRole: 'principal',
  },
  {
    id: 'fb-02',
    studentId: 'kg1-101',
    studentName: 'አቤል ሳሙኤል ተረፈ',
    parentName: 'ወ/ሮ ማርታ ጌታሁን',
    phone: '0940112233',
    date: '2020-02-02',
    message: 'ለኬጂ ትምህርት ቤት ር/መምህርት። አቤል ወደ ቤት ሲመለስ የውሃ ጠርሙሱን ረስተዋል፤ ነገ በክፍል ውስጥ ተፈልጎ እንዲሰጠው በትህትና እጠይቃለሁ።',
    reply: 'ጤና ይስጥልን ወ/ሮ ማርታ። የውሃ ጠርሙሱ በክፍል አስተማሪዋ እጅ በጥንቃቄ ተይዟል፤ ነገ ጥዋት ይሰጠዋል።',
    replyDate: '2020-02-03',
    repliedBy: 'የኬጂ ር/መምህርት',
    targetRole: 'kg_director',
  },
];

export const INITIAL_LETTERS: TeacherLetter[] = [
  {
    id: 'ltr-01',
    title: 'የ1ኛ ሰሚስተር ማጠቃለያ የውጤት ማስረከቢያ ቀን ማሳሰቢያ',
    content: 'ለሁሉም የትምህርት ቤታችን መምህራን፡ የ1ኛ ሰሚስተር የተከታታይ ምዘና እና ማጠቃለያ ውጤቶችን በወቅቱ በማጠናቀቅ ለየክፍሉ ስም ጠሪ መምህራን እንድታስረክቡ እናሳስባለን። የሮስተር ዝግጅት በታቀደው መሰረት ይካሄዳል።',
    date: '2020-01-20',
    sender: 'ም/ር/መምህር ጽ/ቤት',
    replies: [
      {
        teacherId: 'tch-01',
        teacherName: 'መ/ር ታሪኩ በቀለ',
        text: 'የ1ኛ ክፍል እንግሊዝኛ እና አካባቢ ሳይንስ ውጤቶች ተጠናቀው ተዘጋጅተዋል።',
        date: '2020-01-21',
      },
    ],
  },
  {
    id: 'ltr-02',
    title: 'የክፍል ውስጥ የተከታታይ ምዘና (Continuous Assessment) አያያዝ መመሪያ',
    content: 'ውድ መምህራን፣ የተማሪዎችን ውጤት በ10+10+10+10+20+10+10+20 ቀመር መሰረት በእያንዳንዱ ክፍል በጥንቃቄ እንድትመዘግቡና ተማሪዎችን በወቅቱ ግብረ-መልስ እንድትሰጡ እንጠይቃለን።',
    date: '2020-01-10',
    sender: 'ም/ር/መምህር ጽ/ቤት',
    replies: [],
  },
];
