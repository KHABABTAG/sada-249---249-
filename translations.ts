
type Translation = {
  en: string;
  ar: string;
};

type Translations = {
  [key: string]: Translation;
};

export const translations: Translations = {
  home: { en: "Home", ar: "الرئيسية" },
  submitTestimony: { en: "Submit Testimony", ar: "أرسل شهادتك" },
  viewArchive: { en: "View Archive", ar: "عرض الأرشيف" },
  admin: { en: "Admin Dashboard", ar: "لوحة الإشراف" },
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
  gridView: { en: "Grid View", ar: "عرض الشبكة" },
  tableView: { en: "Table View", ar: "عرض الجدول" },
  table_header_date: { en: "Date", ar: "التاريخ" },
  table_header_title: { en: "Title", ar: "العنوان" },
  table_header_location: { en: "Location", ar: "الموقع" },
  table_header_event: { en: "Event", ar: "الحدث" },
  table_header_author: { en: "Author", ar: "الناشر" },
  table_header_status: { en: "Status", ar: "الحالة" },
  table_header_actions: { en: "Actions", ar: "الإجراءات" },
  status_approved: { en: "Approved", ar: "مقبول" },
  status_pending: { en: "Pending", ar: "قيد المراجعة" },
  status_rejected: { en: "Rejected", ar: "مرفوض" },
  status_anonymous: { en: "Anonymous", ar: "مجهول" },
  event: { en: "Event", ar: "الحدث" },
  date: { en: "Date", ar: "التاريخ" },
  location: { en: "Location", ar: "الموقع" },
  
  // New Impactful Home Translations
  home_title: { 
    en: "Sada 249: Humanity from the Heart of War", 
    ar: "صدى 249: حين يتحدث الإنسان من قلب الحرب" 
  },
  home_subtitle: { 
    en: "Beyond the smoke of battle and casualty counts, there are millions of human stories left untold. Sada 249 is your window to hear Sudan's true pulse.", 
    ar: "خلف دخان المعارك وأرقام الضحايا، توجد ملايين القصص الإنسانية التي لم تُروَ. \"صدى 249\" هو نافذتكم لسماع نبض السودان الحقيقي." 
  },
  
  home_section1_title: { en: "Who We Are", ar: "من نحن؟" },
  home_section1_p1: { 
    en: "Sada 249 is not just a news site; it is an 'echo' of the Sudanese human experience.", 
    ar: "صدى 249 (Sada 249) ليس مجرد موقع إخباري، بل هو \"صدى\" التجربة الإنسانية السودانية." 
  },
  home_section1_p2: { 
    en: "We are an independent platform born from suffering, believing that the most powerful weapon against forgetting is 'the story'. Our name combines 'Sada' (echo), which we strive to convey to the world, and '249', Sudan's international dialing code, to affirm that we are still here, and our voice is still alive.", 
    ar: "نحن منصة مستقلة وُلدت من رحم المعاناة، نؤمن بأن أقوى سلاح ضد النسيان هو \"القصة\". اسمنا يجمع بين \"الصدى\" الذي نسعى لإيصاله للعالم، و \"249\" مفتاح الاتصال الدولي للسودان، لنؤكد أننا ما زلنا هنا، وما زال صوتنا حياً." 
  },
  home_section1_p3: { 
    en: "We document life amidst death, hope amidst despair, and the extraordinary resilience of a people who insist on surviving.", 
    ar: "نحن نوثق الحياة وسط الموت، والأمل وسط اليأس، والصمود الاستثنائي لشعب يُصر على البقاء." 
  },

  home_section2_title: { en: "Our Mission: To Let the World Hear", ar: "رسالتنا: أن نُسمِع العالم" },
  home_section2_p1: { 
    en: "Our mission is clear: to break the wall of silence and isolation surrounding the human experience in Sudan.", 
    ar: "مهمتنا واضحة: كسر جدار الصمت والعزلة المفروضة حول التجربة الإنسانية في السودان." 
  },
  home_section2_p2: { 
    en: "We don't just report news; we dive into the depth of 'what it means to be human' under this war:", 
    ar: "نحن لا نكتفي بنقل الخبر، بل نغوص في عمق \"ماذا يعني أن تكون إنساناً\" في ظل هذه الحرب:" 
  },
  home_section2_li1_title: { en: "Human Documentation", ar: "التوثيق الإنساني" },
  home_section2_li1_text: { en: "Recording tales of displacement, loss, fear, and daily courage.", ar: "تسجيل روايات النزوح، الفقد، الخوف، والشجاعة اليومية." },
  home_section2_li2_title: { en: "Building Bridges", ar: "بناء الجسور" },
  home_section2_li2_text: { en: "Translating these stories to build global empathy beyond language barriers.", ar: "ترجمة هذه القصص للعالم، لتجاوز حواجز اللغة والثقافة وبناء تعاطف عالمي حقيقي." },
  home_section2_li3_title: { en: "Humanizing Numbers", ar: "أنسنة الأرقام" },
  home_section2_li3_text: { en: "Turning cold statistics into faces, dreams, and destinies.", ar: "تحويل الإحصائيات الباردة إلى وجوه وأحلام ومصائر." },
  home_section2_li4_title: { en: "A Platform for All", ar: "منصة للجميع" },
  home_section2_li4_text: { en: "Giving the microphone to mothers in camps and doctors in field hospitals.", ar: "إعطاء الميكروفون للأم في مخيم النزوح، وللطبيب في المستشفى الميداني." },

  home_section3_title: { en: "Voices from Within: Experience as it is", ar: "أصوات من الداخل: التجربة كما هي" },
  home_section3_p1: { 
    en: "War in Sudan is not just a political conflict; it's a soul-altering event.", 
    ar: "الحرب في السودان ليست مجرد صراع سياسي أو عسكري؛ إنها حدث يغير شكل الروح." 
  },
  home_section3_p2: { 
    en: "In 'Sada 249', we focus on:", 
    ar: "في \"صدى 249\"، نركز على:" 
  },
  home_section3_li1_title: { en: "Resilience", ar: "الصمود" },
  home_section3_li1_text: { en: "How people innovate survival, education, and mutual aid.", ar: "كيف يبتكر الناس طرقاً للنجاة، والتعليم، ومساعدة بعضهم البعض." },
  home_section3_li2_title: { en: "Hope", ar: "الأمل" },
  home_section3_li2_text: { en: "Stories of social solidarity that keep humanity alight.", ar: "قصص التكافل الاجتماعي والمبادرات الفردية التي تُبقي شعلة الإنسانية متقدة." },
  home_section3_li3_title: { en: "Pain & Loss", ar: "الألم والفقدان" },
  home_section3_li3_text: { en: "Honest accounts of farewells and the search for safety.", ar: "الروايات الصادقة عن لحظات الوداع، وتدمير الذكريات، والبحث عن الأمان." },
  home_section3_li4_title: { en: "Memory", ar: "الذاكرة" },
  home_section3_li4_text: { en: "Preserving identity and culture from being lost in chaos.", ar: "كيف يحاول السودانيون الحفاظ على هويتهم وتاريخهم وثقافتهم من الضياع." },
  home_section3_quote: { 
    en: "Every story we tell is a step towards ending international indifference.", 
    ar: "نحن نؤمن بأن كل قصة نرويها هي خطوة نحو إنهاء اللامبالاة الدولية." 
  },

  home_section4_title: { en: "Be the Echo", ar: "كن الصدى" },
  home_section4_p1: { 
    en: "The world needs to hear, and you can help convey this voice.", 
    ar: "العالم يحتاج أن يسمع، وأنت يمكنك المساعدة في إيصال هذا الصوت." 
  },
  home_box1_title: { en: "Spread the Word", ar: "انشر الخبر" },
  home_box1_p: { en: "Share this platform with the world.", ar: "شارك هذه المنصة مع العالم لإيصال الصوت." },
  home_box2_title: { en: "Document Your Story", ar: "وثق قصتك" },
  home_box2_p: { en: "Your story is part of history. Don't let it fade.", ar: "قصتك هي جزء من التاريخ. لا تدعها تتلاشى في النسيان." },

  admin_stats_total: { en: "Total Stories", ar: "إجمالي القصص" },
  admin_stats_pending: { en: "Pending", ar: "قيد المراجعة" },
  admin_stats_approved: { en: "Published", ar: "منشور" },
  admin_filter_all: { en: "All", ar: "الكل" },
  action_approve: { en: "Approve", ar: "موافقة" },
  action_reject: { en: "Reject", ar: "رفض" },
  action_delete: { en: "Delete", ar: "حذف" },
  action_view: { en: "View", ar: "عرض" },
  modal_close: { en: "Close", ar: "إغلاق" },
  confirm_delete: { en: "Confirm Delete?", ar: "هل أنت متأكد من الحذف؟" },
  
  // Locations
  loc_alfashir: { en: "Al Fashir", ar: "الفاشر" },
  loc_gezira: { en: "Gezira", ar: "الجزيرة" },
  loc_khartoum: { en: "Khartoum", ar: "الخرطوم" },
  select_location: { en: "Select Location", ar: "اختر الموقع" },
};
