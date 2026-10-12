import * as XLSX from 'xlsx';
import { Student, Teacher, Gender } from '../types';
import { generateNextStudentId } from './studentIdGenerator';

export interface ParsedStudentRow {
  fullName: string;
  gender: Gender;
  age: number;
  grade: string;
  section: string;
  academicYear: string;
  parentPhone: string;
  address: string;
}

export interface ParsedTeacherRow {
  name: string;
  phone: string;
  pin: string;
  isHomeroom: boolean;
  homeroomGrade?: string;
  homeroomSection?: string;
  assignedGrade?: string;
  assignedSection?: string;
  assignedSubject?: string;
}

/**
 * Downloads a sample Excel template for Student Registration
 */
export function downloadStudentTemplate() {
  const sampleData = [
    {
      'ስም ከነ አያት (Full Name)': 'ታሪኩ አሰፋ ደስታ',
      'ጾታ (Gender: ወንድ/ሴት)': 'ወንድ',
      'ዕድሜ (Age)': 7,
      'የክፍል ደረጃ (Grade)': '1ኛ ክፍል',
      'ሴክሽን (Section: ሀ/ለ/ሐ)': 'ሀ',
      'የትምህርት ዘመን (Year)': '2020',
      'የወላጅ ስልክ (Parent Phone)': '0911223344',
      'አድራሻ (Address)': 'ብርብር ከተማ ቀበሌ 01',
    },
    {
      'ስም ከነ አያት (Full Name)': 'ሄለን ብርሃኑ ተስፋዬ',
      'ጾታ (Gender: ወንድ/ሴት)': 'ሴት',
      'ዕድሜ (Age)': 7,
      'የክፍል ደረጃ (Grade)': '1ኛ ክፍል',
      'ሴክሽን (Section: ሀ/ለ/ሐ)': 'ሀ',
      'የትምህርት ዘመን (Year)': '2020',
      'የወላጅ ስልክ (Parent Phone)': '0922334455',
      'አድራሻ (Address)': 'ብርብር ከተማ ቀበሌ 02',
    },
    {
      'ስም ከነ አያት (Full Name)': 'ዮሴፍ ዳንኤል ገብሬ',
      'ጾታ (Gender: ወንድ/ሴት)': 'ወንድ',
      'ዕድሜ (Age)': 4,
      'የክፍል ደረጃ (Grade)': 'ማቆያ',
      'ሴክሽን (Section: ሀ/ለ/ሐ)': 'ሀ',
      'የትምህርት ዘመን (Year)': '2020',
      'የወላጅ ስልክ (Parent Phone)': '0933445566',
      'አድራሻ (Address)': 'ብርብር ከተማ ቀበሌ 01',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  // Auto-fit column widths
  ws['!cols'] = [
    { wch: 26 },
    { wch: 22 },
    { wch: 12 },
    { wch: 20 },
    { wch: 22 },
    { wch: 22 },
    { wch: 26 },
    { wch: 26 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'የተማሪዎች ቅጽ');
  XLSX.writeFile(wb, 'የተማሪዎች_ምዝገባ_ቅጽ_Template.xlsx');
}

/**
 * Downloads a sample Excel template for Teacher Registration
 */
export function downloadTeacherTemplate() {
  const sampleData = [
    {
      'የመምህሩ ሙሉ ስም (Teacher Name)': 'መ/ር ሰለሞን ተፈራ አበበ',
      'ስልክ ቁጥር (Phone)': '0911556677',
      'የመግቢያ ቁልፍ (PIN)': '2001',
      'የክፍል ስም ጠሪ ነው? (አዎ/አይደለም)': 'አዎ',
      'ስም ጠሪ የሚሆንበት ክፍል': '2ኛ ክፍል',
      'ስም ጠሪ ሴክሽን': 'ሀ',
      'የሚያስተምረው ክፍል': '2ኛ ክፍል',
      'የሚያስተምረው ሴክሽን': 'ሀ',
      'የትምህርት ዓይነት': 'እንግሊዝኛ',
    },
    {
      'የመምህሩ ሙሉ ስም (Teacher Name)': 'መ/ርት ቤተልሔም ግርማ ለማ',
      'ስልክ ቁጥር (Phone)': '0922667788',
      'የመግቢያ ቁልፍ (PIN)': '2002',
      'የክፍል ስም ጠሪ ነው? (አዎ/አይደለም)': 'አይደለም',
      'ስም ጠሪ የሚሆንበት ክፍል': '',
      'ስም ጠሪ ሴክሽን': '',
      'የሚያስተምረው ክፍል': '7ኛ ክፍል',
      'የሚያስተምረው ሴክሽን': 'ሀ',
      'የትምህርት ዓይነት': 'ፊዚክስ',
    },
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  ws['!cols'] = [
    { wch: 28 },
    { wch: 18 },
    { wch: 18 },
    { wch: 26 },
    { wch: 20 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 20 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'የመምህራን ቅጽ');
  XLSX.writeFile(wb, 'የመምህራን_ምዝገባ_ቅጽ_Template.xlsx');
}

/**
 * Parses uploaded Excel/CSV file for Students
 */
export async function parseStudentsExcelFile(file: File, defaultYear: string = '2020'): Promise<ParsedStudentRow[]> {
  const arrayBuffer = await file.arrayBuffer();
  const wb = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = wb.SheetNames[0];
  const ws = wb.Sheets[firstSheetName];
  const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(ws);

  const parsedStudents: ParsedStudentRow[] = [];

  for (const row of rawRows) {
    // Look up fields with flexible header matching (Amharic or English)
    const fullName =
      row['ስም ከነ አያት (Full Name)'] ||
      row['ስም ከነ አያት'] ||
      row['ሙሉ ስም'] ||
      row['Full Name'] ||
      row['Name'] ||
      row['student_name'];

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) continue;

    const rawGender =
      row['ጾታ (Gender: ወንድ/ሴት)'] ||
      row['ጾታ'] ||
      row['Gender'] ||
      row['Sex'] ||
      'ወንድ';
    
    let gender: Gender = 'ወንድ';
    const gStr = String(rawGender).trim().toLowerCase();
    if (gStr.includes('ሴ') || gStr === 'f' || gStr === 'female') {
      gender = 'ሴት';
    }

    const ageRaw =
      row['ዕድሜ (Age)'] ||
      row['ዕድሜ'] ||
      row['Age'] ||
      7;
    const age = parseInt(ageRaw, 10) || 7;

    const grade =
      row['የክፍል ደረጃ (Grade)'] ||
      row['የክፍል ደረጃ'] ||
      row['ክፍል'] ||
      row['Grade'] ||
      '1ኛ ክፍል';

    const section =
      row['ሴክሽን (Section: ሀ/ለ/ሐ)'] ||
      row['ሴክሽን'] ||
      row['Section'] ||
      'ሀ';

    const year =
      row['የትምህርት ዘመን (Year)'] ||
      row['የትምህርት ዘመን'] ||
      row['Academic Year'] ||
      row['Year'] ||
      defaultYear;

    const parentPhone =
      row['የወላጅ ስልክ (Parent Phone)'] ||
      row['የወላጅ ስልክ'] ||
      row['ስልክ ቁጥር'] ||
      row['ስልክ'] ||
      row['Phone'] ||
      row['parent_phone'] ||
      '';

    const address =
      row['አድራሻ (Address)'] ||
      row['አድራሻ'] ||
      row['Address'] ||
      'ብርብር ከተማ ቀበሌ 01';

    parsedStudents.push({
      fullName: String(fullName).trim(),
      gender,
      age,
      grade: String(grade).trim(),
      section: String(section).trim(),
      academicYear: String(year).trim(),
      parentPhone: String(parentPhone).trim(),
      address: String(address).trim(),
    });
  }

  return parsedStudents;
}

/**
 * Parses uploaded Excel/CSV file for Teachers
 */
export async function parseTeachersExcelFile(file: File): Promise<ParsedTeacherRow[]> {
  const arrayBuffer = await file.arrayBuffer();
  const wb = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = wb.SheetNames[0];
  const ws = wb.Sheets[firstSheetName];
  const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(ws);

  const parsedTeachers: ParsedTeacherRow[] = [];

  for (const row of rawRows) {
    const name =
      row['የመምህሩ ሙሉ ስም (Teacher Name)'] ||
      row['የመምህሩ ሙሉ ስም'] ||
      row['የመምህሩ ስም'] ||
      row['ስም'] ||
      row['Teacher Name'] ||
      row['Name'];

    if (!name || typeof name !== 'string' || !name.trim()) continue;

    const phone =
      row['ስልክ ቁጥር (Phone)'] ||
      row['ስልክ ቁጥር'] ||
      row['ስልክ'] ||
      row['Phone'] ||
      '';

    const pin =
      row['የመግቢያ ቁልፍ (PIN)'] ||
      row['የመግቢያ ቁልፍ'] ||
      row['PIN'] ||
      row['Pin'] ||
      String(Math.floor(1000 + Math.random() * 9000));

    const isHomeroomRaw =
      row['የክፍል ስም ጠሪ ነው? (አዎ/አይደለም)'] ||
      row['የክፍል ስም ጠሪ ነው?'] ||
      row['ስም ጠሪ'] ||
      row['Is Homeroom'] ||
      row['is_homeroom'];

    const isHomeroom =
      String(isHomeroomRaw).trim().toLowerCase() === 'አዎ' ||
      String(isHomeroomRaw).trim().toLowerCase() === 'yes' ||
      String(isHomeroomRaw).trim() === 'true';

    const homeroomGrade =
      row['ስም ጠሪ የሚሆንበት ክፍል'] ||
      row['ስም ጠሪ ክፍል'] ||
      row['Homeroom Grade'];

    const homeroomSection =
      row['ስም ጠሪ ሴክሽን'] ||
      row['Homeroom Section'] ||
      'ሀ';

    const assignedGrade =
      row['የሚያስተምረው ክፍል'] ||
      row['ክፍል'] ||
      row['Assigned Grade'] ||
      '1ኛ ክፍል';

    const assignedSection =
      row['የሚያስተምረው ሴክሽን'] ||
      row['ሴክሽን'] ||
      row['Assigned Section'] ||
      'ሀ';

    const assignedSubject =
      row['የትምህርት ዓይነት'] ||
      row['ትምህርት'] ||
      row['Subject'] ||
      'እንግሊዝኛ';

    parsedTeachers.push({
      name: String(name).trim(),
      phone: String(phone).trim(),
      pin: String(pin).trim(),
      isHomeroom,
      homeroomGrade: isHomeroom && homeroomGrade ? String(homeroomGrade).trim() : undefined,
      homeroomSection: isHomeroom ? String(homeroomSection).trim() : undefined,
      assignedGrade: assignedGrade ? String(assignedGrade).trim() : undefined,
      assignedSection: assignedSection ? String(assignedSection).trim() : undefined,
      assignedSubject: assignedSubject ? String(assignedSubject).trim() : undefined,
    });
  }

  return parsedTeachers;
}

/**
 * Export all students to Excel
 */
export function exportStudentsToExcel(students: Student[], fileName: string = 'የተማሪዎች_ዝርዝር.xlsx') {
  const exportData = students.map((s, idx) => ({
    'ተ.ቁ': idx + 1,
    'መለያ ኮድ (ID)': s.id,
    'ስም ከነ አያት': s.fullName,
    'ጾታ': s.gender,
    'ዕድሜ': s.age,
    'የክፍል ደረጃ': s.grade,
    'ሴክሽን': s.section,
    'የትምህርት ዘመን': `${s.academicYear} ዓ/ም`,
    'የወላጅ ስልክ': s.parentPhone || '',
    'አድራሻ': s.address || '',
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'ተማሪዎች');
  XLSX.writeFile(wb, fileName);
}

/**
 * Export all teachers to Excel
 */
export function exportTeachersToExcel(teachers: Teacher[], fileName: string = 'የመምህራን_ዝርዝር.xlsx') {
  const exportData = teachers.map((t, idx) => ({
    'ተ.ቁ': idx + 1,
    'የመምህር ስም': t.name,
    'ስልክ ቁጥር': t.phone,
    'የመግቢያ ቁልፍ (PIN)': t.pin,
    'የክፍል ስም ጠሪ': t.isHomeroom ? `አዎ (${t.homeroomGrade} ${t.homeroomSection})` : 'አይደለም',
    'የተመደቡ ክፍሎች': t.assignments.map(a => `${a.grade}(${a.section})-${a.subjectName}`).join(', '),
  }));

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'መምህራን');
  XLSX.writeFile(wb, fileName);
}
