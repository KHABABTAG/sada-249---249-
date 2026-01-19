
type Translation = {
  en: string;
  ar: string;
};

type Translations = {
  [key: string]: Translation;
};

export const translations: Translations = {
  // Existing...
  home: { en: "Home", ar: "الرئيسية" },
  submitTestimony: { en: "Submit Testimony", ar: "أرسل شهادتك" },
  viewArchive: { en: "View Archive", ar: "عرض الأرشيف" },
  footerText: { en: "The Sada 249 archive is managed by an independent team of moderators.", ar: "تتم إدارة أرشيف صدى 249 من قبل فريق مستقل من المشرفين." },
  contactAdmin: { en: "Contact the Admin Team", ar: "اتصل بفريق الإدارة" },
  formTitle: { en: "Document Your Experience", ar: "وثّق تجربتك" },
  formSubtitle: { en: "All submissions are encrypted and sent securely.", ar: "جميع الشهادات مشفرة وتُرسل بأمان." },
  titleLabel: { en: "1. Title (Optional)", ar: "١. العنوان (اختياري)" },
  eventLabel: { en: "2. The Specific Event", ar: "٢. الحدث المحدد" },
  dateLabel: { en: "3. Date(s)", ar: "٣. التاريخ" },
  locationLabel: { en: "4. Location", ar: "٤. الموقع" },
  writtenLabel: { en: "5. Written Testimony", ar: "٥. شهادتك المكتوبة" },
  audioLabel: { en: "6. Audio (Optional)", ar: "٦. تسجيل صوتي" },
  recordAudio: { en: "Record", ar: "تسجيل" },
  stopRecording: { en: "Stop", ar: "إيقاف" },
  uploadAudio: { en: "Upload", ar: "تحميل" },
  imageLabel: { en: "7. Image (Optional)", ar: "٧. صورة" },
  consentLabel: { en: "8. Consent", ar: "٨. الموافقة" },
  publishAnonymously: { en: "Publish anonymously", ar: "نشر بهوية مجهولة" },
  consentCheckbox: { en: "I give my consent for review and publication.", ar: "أوافق على المراجعة والنشر." },
  submissionSuccess: { en: "Sent securely to our team.", ar: "تم الإرسال بأمان لفريقنا." },
  archiveTitle: { en: "The Public Archive", ar: "الأرشيف العام" },
  archiveSubtitle: { en: "Anonymized experiences from Sudan.", ar: "تجارب مجهولة من السودان." },
  searchPlaceholder: { en: "Search...", ar: "ابحث..." },
  allLocations: { en: "All Locations", ar: "كل المواقع" },
  noStoriesFound: { en: "No Stories Found", ar: "لم يتم العثور على قصص" },

  // New Table Translations
  gridView: { en: "Grid View", ar: "عرض الشبكة" },
  tableView: { en: "Table View", ar: "عرض الجدول" },
  table_header_date: { en: "Date", ar: "التاريخ" },
  table_header_title: { en: "Title", ar: "العنوان" },
  table_header_location: { en: "Location", ar: "الموقع" },
  table_header_event: { en: "Event", ar: "الحدث" },
  table_header_author: { en: "Author", ar: "الناشر" },
  table_header_status: { en: "Status", ar: "الحالة" },
  status_approved: { en: "Approved", ar: "مقبول" },
  status_pending: { en: "Pending", ar: "قيد المراجعة" },
  status_rejected: { en: "Rejected", ar: "مرفوض" },
  event: { en: "Event", ar: "الحدث" },
  date: { en: "Date", ar: "التاريخ" },
  location: { en: "Location", ar: "الموقع" },
  home_title: { en: "Sada 249: Humanity from the Heart of War", ar: "صدى 249: الإنسان من قلب الحرب" },
  home_subtitle: { en: "Beyond the numbers, stories of survival.", ar: "خلف الأرقام، قصص عن البقاء." },
};
