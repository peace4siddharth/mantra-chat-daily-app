// Lightweight i18n for Divine Chant Companion. Hindi + English are first-class;
// regional Indian languages are listed and translated for key UI strings.
// Missing keys fall back to English. Selection is persisted to localStorage
// and broadcast via an event so any component can react.

export type LangCode =
  | "en" | "hi"
  | "as" | "bn" | "brx" | "doi" | "gu" | "kn" | "ks" | "kok" | "mai"
  | "ml" | "mni" | "mr" | "ne" | "or" | "pa" | "sa" | "sat" | "sd"
  | "ta" | "te" | "ur";

export interface LangOption {
  code: LangCode;
  label: string;     // native script
  english: string;   // english name
  states?: string;   // hint where it's commonly spoken
}

// Hindi & English on top, then other Indian languages alphabetical by English.
export const LANGUAGES: LangOption[] = [
  { code: "hi", label: "हिन्दी", english: "Hindi", states: "National" },
  { code: "en", label: "English", english: "English", states: "National" },
  { code: "as", label: "অসমীয়া", english: "Assamese", states: "Assam" },
  { code: "bn", label: "বাংলা", english: "Bengali", states: "West Bengal, Tripura" },
  { code: "brx", label: "बर'", english: "Bodo", states: "Assam" },
  { code: "doi", label: "डोगरी", english: "Dogri", states: "Jammu & Kashmir" },
  { code: "gu", label: "ગુજરાતી", english: "Gujarati", states: "Gujarat" },
  { code: "kn", label: "ಕನ್ನಡ", english: "Kannada", states: "Karnataka" },
  { code: "ks", label: "کٲشُر", english: "Kashmiri", states: "Jammu & Kashmir" },
  { code: "kok", label: "कोंकणी", english: "Konkani", states: "Goa" },
  { code: "mai", label: "मैथिली", english: "Maithili", states: "Bihar" },
  { code: "ml", label: "മലയാളം", english: "Malayalam", states: "Kerala" },
  { code: "mni", label: "মৈতৈলোন্", english: "Manipuri", states: "Manipur" },
  { code: "mr", label: "मराठी", english: "Marathi", states: "Maharashtra" },
  { code: "ne", label: "नेपाली", english: "Nepali", states: "Sikkim" },
  { code: "or", label: "ଓଡ଼ିଆ", english: "Odia", states: "Odisha" },
  { code: "pa", label: "ਪੰਜਾਬੀ", english: "Punjabi", states: "Punjab" },
  { code: "sa", label: "संस्कृतम्", english: "Sanskrit", states: "Classical" },
  { code: "sat", label: "ᱥᱟᱱᱛᱟᱲᱤ", english: "Santali", states: "Jharkhand" },
  { code: "sd", label: "سنڌي", english: "Sindhi", states: "—" },
  { code: "ta", label: "தமிழ்", english: "Tamil", states: "Tamil Nadu" },
  { code: "te", label: "తెలుగు", english: "Telugu", states: "Andhra, Telangana" },
  { code: "ur", label: "اُردُو", english: "Urdu", states: "J&K, Telangana" },
];

// BCP-47 codes the browser's SpeechSynthesis API expects.
export const BCP47: Record<LangCode, string> = {
  en: "en-IN", hi: "hi-IN", as: "as-IN", bn: "bn-IN", brx: "hi-IN",
  doi: "hi-IN", gu: "gu-IN", kn: "kn-IN", ks: "ur-IN", kok: "kok-IN",
  mai: "hi-IN", ml: "ml-IN", mni: "hi-IN", mr: "mr-IN", ne: "ne-NP",
  or: "or-IN", pa: "pa-IN", sa: "sa-IN", sat: "hi-IN", sd: "sd-IN",
  ta: "ta-IN", te: "te-IN", ur: "ur-IN",
};

type Dict = Record<string, string>;

// English is the source of truth — every key must exist here.
const en: Dict = {
  namaste: "Namaste 🙏",
  today: "Today",
  chant: "Chant",
  calendar: "Calendar",
  progress: "Progress",
  more: "More",
  streak: "Streak",
  longest: "Longest",
  total: "Total",
  chants: "chants",
  days: "days",
  day_streak: "day streak",
  todays_focus: "Today's Focus",
  recommended_mantra: "Recommended Mantra",
  begin_chant: "Begin Today's Chant",
  count: "Count",
  best: "Best",
  local_sun_times: "Local sun times",
  use_current_location: "Use current location",
  sunrise: "Sunrise",
  sunset: "Sunset",
  allow_location: "Allow location to show today's sunrise and sunset.",
  location_denied: "Location permission is needed for current sunrise and sunset.",
  upcoming: "Upcoming",
  view_all: "View all",
  auspicious: "Auspicious Time",
  inauspicious: "Inauspicious Time",
  abhijit: "Abhijit Muhurta",
  rahu_kaal: "Rahu Kaal",
  good_for_actions: "Best window to start important actions",
  avoid_starting: "Avoid starting new important work",
  wednesday_skipped: "Traditionally skipped on Wednesdays",
  language: "Language",
  festival_today: "Festival today",
  deity: "Deity",
  // Chant page
  chanting_session: "Chanting Session",
  prepare_your_chant: "Prepare your chant",
  mantra: "Mantra",
  add_chant: "+ Add chant",
  cancel: "Cancel",
  chant_text_placeholder: "Chant / mantra text",
  deity_optional: "Deity (optional)",
  save_chant: "Save chant",
  delete_chant: "Delete chant",
  favorite: "Favorite",
  unfavorite: "Unfavorite",
  target_count: "Target count",
  mala: "Mala",
  start_chanting: "Start Chanting",
  begin_in: "Begin in",
  center_yourself: "Center yourself…",
  listening: "Listening",
  voice_off: "Voice off",
  voice_on: "Turn voice on",
  voice_off_action: "Turn voice off",
  begin_chanting_aloud: "Begin chanting aloud…",
  remaining: "remaining",
  sadhana_complete: "Sadhana complete",
  chants_offered_to: "chants offered to",
  done: "Done",
  decrease: "Decrease count",
  increase: "Increase count",
  stop: "Stop session",
  voice_unavailable: "Voice recognition not available — use the + button to count manually.",
  // Spoken
  spoken_begin: "Begin chanting",
  spoken_complete: "{name} complete. {count} chants offered.",
  // Calendar
  panchang: "Panchang",
  hindu_calendar: "Hindu Calendar",
  prev_month: "Previous month",
  next_month: "Next month",
  this_month: "This Month",
  upcoming_festivals: "Upcoming Festivals",
  // Progress
  sadhana_journey: "Sadhana Journey",
  your_practice: "Your Practice",
  last_7_days: "Last 7 Days",
  most_chanted: "Most Chanted",
  achievements: "Achievements",
  sessions: "Sessions",
  prayer_minutes: "Prayer minutes",
  todays_divine_guide: "Today's Divine Guide",
  start_journey_hint: "Start your first chanting session to begin tracking your journey.",
  weekday_short_0: "S",
  weekday_short_1: "M",
  weekday_short_2: "T",
  weekday_short_3: "W",
  weekday_short_4: "T",
  weekday_short_5: "F",
  weekday_short_6: "S",
  kind_festival: "Festival",
  kind_ekadashi: "Ekadashi",
  kind_pradosham: "Pradosham",
  kind_purnima: "Purnima",
  kind_amavasya: "Amavasya",
  kind_fasting: "Fasting",
  achievement_first_108: "First 108",
  achievement_first_108_desc: "Complete your first full mala",
  achievement_1000: "1,000 Chants",
  achievement_1000_desc: "Cross 1,000 lifetime chants",
  achievement_10k: "10,000 Chants",
  achievement_10k_desc: "Reach the 10K milestone",
  achievement_100k: "100,000 Chants",
  achievement_100k_desc: "A Lakh of devotion",
  achievement_7_day: "7-Day Streak",
  achievement_7_day_desc: "Chant every day for a week",
  achievement_30_day: "30-Day Streak",
  achievement_30_day_desc: "A month of daily sadhana",
  achievement_100_day: "100-Day Streak",
  achievement_100_day_desc: "Deep commitment",
  devotional_readings_title: "Devotional Readings (Aartis & Chalisas)",
  section_major_aartis: "Major Aartis",
  section_chalisas: "Chalisas",
  read_lyrics: "Read lyrics",
  open_read_track: "Read & track",
  mantra_om_suryaya: "Om Suryaya Namaha",
  mantra_om_namah_shivaya: "Om Namah Shivaya",
  mantra_hare_krishna: "Hare Krishna Hare Rama",
  mantra_om_hanumate: "Om Hanumate Namaha",
  mantra_jai_hanuman: "Jai Hanuman",
  mantra_gayatri:
    "Om Bhur Bhuvah Svaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat",
  mantra_ganesha: "Om Gam Ganapataye Namaha",
  mantra_vasudevaya: "Om Namo Bhagavate Vasudevaya",
  mantra_mahalakshmi: "Om Shreem Mahalakshmiyei Namaha",
  mantra_shani: "Om Sham Shanaischaraya Namaha",
  deity_surya: "Surya",
  deity_shiva: "Shiva",
  deity_krishna: "Krishna",
  deity_hanuman: "Hanuman",
  deity_gayatri: "Gayatri Devi",
  deity_ganesha: "Ganesha",
  deity_vishnu_guru: "Vishnu / Guru",
  deity_lakshmi: "Devi (Lakshmi)",
  deity_shani_hanuman: "Shani / Hanuman",
  read_full_text: "Full text",
  back_to_list: "Back",
  verse: "Verse",
  custom_mantras: "Custom mantras",
  mala_rudraksha: "Rudraksha",
  mala_tulsi: "Tulsi",
  mala_crystal: "Crystal",
  mala_sandalwood: "Sandalwood",
  aarti_om_jai_jagdish_title: "Om Jai Jagdish Hare",
  aarti_om_jai_jagdish_sub: "Evening aarti — Vishnu",
  aarti_jai_ganesh_title: "Jai Ganesh Deva",
  aarti_jai_ganesh_sub: "Lord Ganesha",
  aarti_shiv_omkara_title: "Om Jai Shiv Omkara",
  aarti_shiv_omkara_sub: "Lord Shiva",
  aarti_lakshmi_title: "Om Jai Lakshmi Mata",
  aarti_lakshmi_sub: "Diwali & Lakshmi Puja",
  aarti_hanuman_title: "Aarti Kije Hanuman Lala Ki",
  aarti_hanuman_sub: "Lord Hanuman",
  aarti_ambe_title: "Jai Ambe Gauri",
  aarti_ambe_sub: "Goddess Durga — Navratri",
  aarti_krishna_title: "Aarti Kunj Bihari Ki",
  aarti_krishna_sub: "Lord Krishna",
  chalisa_hanuman_title: "Hanuman Chalisa",
  chalisa_hanuman_sub: "40 verses — Hanuman",
  chalisa_shiv_title: "Shiv Chalisa",
  chalisa_shiv_sub: "Lord Shiva",
  chalisa_durga_title: "Durga Chalisa",
  chalisa_durga_sub: "Goddess Durga",
  chalisa_ganesh_title: "Ganesh Chalisa",
  chalisa_ganesh_sub: "Lord Ganesha",
  chalisa_lakshmi_title: "Lakshmi Chalisa",
  chalisa_lakshmi_sub: "Goddess Lakshmi",
  chalisa_sai_title: "Sai Chalisa",
  chalisa_sai_sub: "Sai Baba",
  chalisa_ram_title: "Ram Chalisa",
  chalisa_ram_sub: "Lord Rama",
  chalisa_krishna_title: "Krishna Chalisa",
  chalisa_krishna_sub: "Lord Krishna",
  chalisa_shani_title: "Shani Chalisa",
  chalisa_shani_sub: "Lord Shani",
  chalisa_saraswati_title: "Saraswati Chalisa",
  chalisa_saraswati_sub: "Goddess Saraswati",
  spoken_devotional_complete: "{title} complete. {count} verses offered.",
  talking_assistant: "Talking Assistant",
  assist_enabled: "Talking assistant is on. Tap or hover buttons for guidance.",
  assist_tapped: "Tapped: {label}",
  assist_focused: "{label}",
  assist_nav_today: "Home page",
  assist_nav_chant: "Chant page",
  assist_nav_calendar: "Calendar page",
  assist_nav_streak: "Streak page",
  assist_mantra_selected: "Mantra selected: {name}",
  assist_listen_reading: "Listen to full reading",
  assist_stop_reading: "Stop reading aloud",
  listen: "Listen",
};

type Key = keyof typeof en;

const hi: Dict = {
  namaste: "नमस्ते 🙏",
  today: "आज", chant: "जप", calendar: "पंचांग", progress: "प्रगति", more: "और",
  streak: "श्रृंखला", longest: "सबसे लंबा", total: "कुल", chants: "जप", days: "दिन",
  day_streak: "दिन की श्रृंखला",
  todays_focus: "आज का ध्यान", recommended_mantra: "अनुशंसित मंत्र",
  begin_chant: "आज का जप शुरू करें", count: "संख्या", best: "उत्तम समय",
  local_sun_times: "स्थानीय सूर्य समय", use_current_location: "वर्तमान स्थान का उपयोग करें",
  sunrise: "सूर्योदय", sunset: "सूर्यास्त",
  allow_location: "आज के सूर्योदय और सूर्यास्त के लिए स्थान की अनुमति दें।",
  location_denied: "सूर्योदय और सूर्यास्त के लिए स्थान की अनुमति आवश्यक है।",
  upcoming: "आगामी", view_all: "सभी देखें",
  auspicious: "शुभ काल", inauspicious: "अशुभ काल",
  abhijit: "अभिजित मुहूर्त", rahu_kaal: "राहु काल",
  good_for_actions: "शुभ कार्य आरंभ करने का श्रेष्ठ समय",
  avoid_starting: "नया महत्वपूर्ण कार्य आरंभ करने से बचें",
  wednesday_skipped: "बुधवार को परंपरागत रूप से नहीं माना जाता",
  language: "भाषा", festival_today: "आज का पर्व", deity: "देवता",
  chanting_session: "जप सत्र", prepare_your_chant: "जप की तैयारी करें",
  mantra: "मंत्र", add_chant: "+ नया जप जोड़ें", cancel: "रद्द करें",
  chant_text_placeholder: "जप / मंत्र", deity_optional: "देवता (वैकल्पिक)",
  save_chant: "जप सहेजें", delete_chant: "जप हटाएँ",
  favorite: "पसंदीदा", unfavorite: "पसंदीदा हटाएँ",
  target_count: "लक्ष्य संख्या", mala: "माला", start_chanting: "जप आरंभ करें",
  begin_in: "आरंभ", center_yourself: "स्वयं को केंद्रित करें…",
  listening: "सुन रहे हैं", voice_off: "ध्वनि बंद",
  voice_on: "ध्वनि चालू करें", voice_off_action: "ध्वनि बंद करें",
  begin_chanting_aloud: "ऊँचे स्वर में जप आरंभ करें…",
  remaining: "शेष", sadhana_complete: "साधना सम्पन्न",
  chants_offered_to: "जप समर्पित", done: "पूर्ण",
  decrease: "संख्या घटाएँ", increase: "संख्या बढ़ाएँ", stop: "सत्र रोकें",
  voice_unavailable: "ध्वनि पहचान उपलब्ध नहीं — + बटन से गिनें।",
  spoken_begin: "जप आरंभ कीजिए",
  spoken_complete: "{name} सम्पन्न। {count} जप समर्पित।",
  panchang: "पंचांग", hindu_calendar: "हिन्दू पंचांग",
  prev_month: "पिछला माह", next_month: "अगला माह",
  this_month: "इस माह", upcoming_festivals: "आगामी पर्व",
  sadhana_journey: "साधना यात्रा", your_practice: "आपका अभ्यास",
  last_7_days: "पिछले 7 दिन", most_chanted: "सर्वाधिक जप",
  achievements: "उपलब्धियाँ", sessions: "सत्र", prayer_minutes: "प्रार्थना मिनट",
  todays_divine_guide: "आज का दिव्य मार्गदर्शन",
  start_journey_hint: "अपनी यात्रा ट्रैक करने के लिए पहला जप सत्र शुरू करें।",
  weekday_short_0: "र", weekday_short_1: "सो", weekday_short_2: "मं", weekday_short_3: "बु",
  weekday_short_4: "गु", weekday_short_5: "शु", weekday_short_6: "श",
  kind_festival: "पर्व", kind_ekadashi: "एकादशी", kind_pradosham: "प्रदोष",
  kind_purnima: "पूर्णिमा", kind_amavasya: "अमावस्या", kind_fasting: "व्रत",
  achievement_first_108: "पहली 108", achievement_first_108_desc: "पहली पूर्ण माला",
  achievement_1000: "1,000 जप", achievement_1000_desc: "1,000 जीवनकालीन जप",
  achievement_10k: "10,000 जप", achievement_10k_desc: "10K मील का पत्थर",
  achievement_100k: "100,000 जप", achievement_100k_desc: "एक लाख भक्ति",
  achievement_7_day: "7-दिन श्रृंखला", achievement_7_day_desc: "एक सप्ताह दैनिक जप",
  achievement_30_day: "30-दिन श्रृंखला", achievement_30_day_desc: "एक महीने की साधना",
  achievement_100_day: "100-दिन श्रृंखला", achievement_100_day_desc: "गहरी प्रतिबद्धता",
  devotional_readings_title: "भक्ति पाठ (आरती और चालीसा)",
  section_major_aartis: "प्रमुख आरतियाँ",
  section_chalisas: "चालीसा",
  read_lyrics: "पाठ पढ़ें",
  open_read_track: "पढ़ें और गिनें",
  mantra_om_suryaya: "ॐ सूर्याय नमः",
  mantra_om_namah_shivaya: "ॐ नमः शिवाय",
  mantra_hare_krishna: "हरे कृष्ण हरे राम",
  mantra_om_hanumate: "ॐ हनुमते नमः",
  mantra_jai_hanuman: "जय हनुमान",
  mantra_gayatri:
    "ॐ भूर्भुवः स्वः, तत्सवितुर्वरेण्यं, भर्गो देवस्य धीमहि, धियो यो नः प्रचोदयात्",
  mantra_ganesha: "ॐ गं गणपतये नमः",
  mantra_vasudevaya: "ॐ नमो भगवते वासुदेवाय",
  mantra_mahalakshmi: "ॐ श्रीं महालक्ष्म्यै नमः",
  mantra_shani: "ॐ शं शनैश्चराय नमः",
  deity_surya: "सूर्य",
  deity_shiva: "शिव",
  deity_krishna: "कृष्ण",
  deity_hanuman: "हनुमान",
  deity_gayatri: "गायत्री देवी",
  deity_ganesha: "गणेश",
  deity_vishnu_guru: "विष्णु / गुरु",
  deity_lakshmi: "देवी (लक्ष्मी)",
  deity_shani_hanuman: "शनि / हनुमान",
  read_full_text: "पूर्ण पाठ",
  back_to_list: "वापस",
  verse: "श्लोक",
  custom_mantras: "कस्टम मंत्र",
  mala_rudraksha: "रुद्राक्ष", mala_tulsi: "तुलसी", mala_crystal: "स्फटिक", mala_sandalwood: "चंदन",
  aarti_om_jai_jagdish_title: "ॐ जय जगदीश हरे", aarti_om_jai_jagdish_sub: "संध्या आरती — विष्णु",
  aarti_jai_ganesh_title: "जय गणेश देवा", aarti_jai_ganesh_sub: "भगवान गणेश",
  aarti_shiv_omkara_title: "ॐ जय शिव ओंकारा", aarti_shiv_omkara_sub: "भगवान शिव",
  aarti_lakshmi_title: "ॐ जय लक्ष्मी माता", aarti_lakshmi_sub: "दीवाली और लक्ष्मी पूजा",
  aarti_hanuman_title: "आरती कीजै हनुमान लला की", aarti_hanuman_sub: "भगवान हनुमान",
  aarti_ambe_title: "जय अम्बे गौरी", aarti_ambe_sub: "दुर्गा माँ — नवरात्रि",
  aarti_krishna_title: "आरती कुंजबिहारी की", aarti_krishna_sub: "भगवान कृष्ण",
  chalisa_hanuman_title: "हनुमान चालीसा", chalisa_hanuman_sub: "40 छंद — हनुमान",
  chalisa_shiv_title: "शिव चालीसा", chalisa_shiv_sub: "भगवान शिव",
  chalisa_durga_title: "दुर्गा चालीसा", chalisa_durga_sub: "माँ दुर्गा",
  chalisa_ganesh_title: "गणेश चालीसा", chalisa_ganesh_sub: "भगवान गणेश",
  chalisa_lakshmi_title: "लक्ष्मी चालीसा", chalisa_lakshmi_sub: "माँ लक्ष्मी",
  chalisa_sai_title: "साईं चालीसा", chalisa_sai_sub: "साईं बाबा",
  chalisa_ram_title: "राम चालीसा", chalisa_ram_sub: "भगवान राम",
  chalisa_krishna_title: "कृष्ण चालीसा", chalisa_krishna_sub: "भगवान कृष्ण",
  chalisa_shani_title: "शनि चालीसा", chalisa_shani_sub: "शनि देव",
  chalisa_saraswati_title: "सरस्वती चालीसा", chalisa_saraswati_sub: "माँ सरस्वती",
  spoken_devotional_complete: "{title} सम्पन्न। {count} श्लोक समर्पित।",
  talking_assistant: "बोलने वाला सहायक",
  assist_enabled: "बोलने वाला सहायक चालू है। मार्गदर्शन के लिए बटन पर टैप या होवर करें।",
  assist_tapped: "टैप किया: {label}",
  assist_focused: "{label}",
  assist_nav_today: "होम पेज",
  assist_nav_chant: "जप पेज",
  assist_nav_calendar: "पंचांग पेज",
  assist_nav_streak: "श्रृंखला पेज",
  assist_mantra_selected: "मंत्र चुना: {name}",
  assist_listen_reading: "पूरा पाठ सुनें",
  assist_stop_reading: "पढ़ना बंद करें",
  listen: "सुनें",
};

const bn: Dict = {
  today: "আজ", chant: "জপ", calendar: "পঞ্জিকা", progress: "অগ্রগতি", more: "আরও",
  language: "ভাষা",
  start_chanting: "জপ শুরু করুন", begin_in: "শুরু",
  sadhana_complete: "সাধনা সম্পূর্ণ", done: "সম্পন্ন",
  listening: "শুনছি", voice_off: "ভয়েস বন্ধ",
  spoken_begin: "জপ শুরু করুন",
  spoken_complete: "{name} সম্পূর্ণ। {count} জপ অর্পিত।",
  hindu_calendar: "হিন্দু পঞ্জিকা", this_month: "এই মাস",
  upcoming_festivals: "আসন্ন উৎসব", achievements: "অর্জন",
  last_7_days: "গত ৭ দিন", most_chanted: "সর্বাধিক জপ",
  your_practice: "আপনার সাধনা", day_streak: "দিনের ধারা",
  target_count: "লক্ষ্য সংখ্যা", mala: "মালা", mantra: "মন্ত্র",
  prepare_your_chant: "জপের প্রস্তুতি",
};

const ta: Dict = {
  today: "இன்று", chant: "ஜபம்", calendar: "பஞ்சாங்கம்", progress: "முன்னேற்றம்", more: "மேலும்",
  language: "மொழி",
  start_chanting: "ஜபம் தொடங்கு", begin_in: "தொடக்கம்",
  sadhana_complete: "சாதனை முடிந்தது", done: "முடிந்தது",
  listening: "கேட்கிறது", voice_off: "குரல் நிறுத்து",
  spoken_begin: "ஜபம் தொடங்குக",
  spoken_complete: "{name} நிறைவு. {count} ஜபம் அர்ப்பணம்.",
  hindu_calendar: "இந்து பஞ்சாங்கம்", this_month: "இம்மாதம்",
  upcoming_festivals: "வரவிருக்கும் பண்டிகைகள்", achievements: "சாதனைகள்",
  last_7_days: "கடந்த 7 நாட்கள்", most_chanted: "அதிக ஜபம்",
  your_practice: "உங்கள் சாதனை", day_streak: "நாள் தொடர்",
  target_count: "இலக்கு எண்ணிக்கை", mala: "மாலை", mantra: "மந்திரம்",
  prepare_your_chant: "ஜபத்திற்கு தயாராகுக",
};

const te: Dict = {
  today: "ఈరోజు", chant: "జపం", calendar: "పంచాంగం", progress: "ప్రగతి", more: "మరిన్ని",
  language: "భాష",
  start_chanting: "జపం ప్రారంభించండి", begin_in: "ప్రారంభం",
  sadhana_complete: "సాధన పూర్తి", done: "పూర్తి",
  listening: "వింటోంది", voice_off: "వాయిస్ ఆఫ్",
  spoken_begin: "జపం ప్రారంభించండి",
  spoken_complete: "{name} పూర్తయింది. {count} జపాలు సమర్పించబడ్డాయి.",
  hindu_calendar: "హిందూ పంచాంగం", this_month: "ఈ నెల",
  upcoming_festivals: "రాబోయే పండుగలు", achievements: "విజయాలు",
  last_7_days: "గత 7 రోజులు", most_chanted: "ఎక్కువ జపం",
  your_practice: "మీ సాధన", day_streak: "రోజుల ధార",
  target_count: "లక్ష్య సంఖ్య", mala: "మాల", mantra: "మంత్రం",
  prepare_your_chant: "జపానికి సిద్ధం",
};

const mr: Dict = {
  today: "आज", chant: "जप", calendar: "पंचांग", progress: "प्रगती", more: "अधिक",
  language: "भाषा",
  start_chanting: "जप सुरू करा", begin_in: "सुरुवात",
  sadhana_complete: "साधना पूर्ण", done: "पूर्ण",
  listening: "ऐकत आहे", voice_off: "आवाज बंद",
  spoken_begin: "जप सुरू करा",
  spoken_complete: "{name} पूर्ण. {count} जप अर्पण.",
  hindu_calendar: "हिंदू पंचांग", this_month: "हा महिना",
  upcoming_festivals: "आगामी सण", achievements: "यश",
  last_7_days: "मागील 7 दिवस", most_chanted: "सर्वाधिक जप",
  your_practice: "तुमची साधना", day_streak: "दिवसांची मालिका",
  target_count: "लक्ष्य संख्या", mala: "माळ", mantra: "मंत्र",
  prepare_your_chant: "जपाची तयारी",
};

const gu: Dict = {
  today: "આજે", chant: "જપ", calendar: "પંચાંગ", progress: "પ્રગતિ", more: "વધુ",
  language: "ભાષા",
  start_chanting: "જપ શરૂ કરો", begin_in: "શરૂઆત",
  sadhana_complete: "સાધના પૂર્ણ", done: "પૂર્ણ",
  listening: "સાંભળે છે", voice_off: "અવાજ બંધ",
  spoken_begin: "જપ શરૂ કરો",
  spoken_complete: "{name} પૂર્ણ. {count} જપ અર્પણ.",
  hindu_calendar: "હિન્દુ પંચાંગ", this_month: "આ મહિનો",
  upcoming_festivals: "આગામી તહેવારો", achievements: "સિદ્ધિઓ",
  last_7_days: "છેલ્લા 7 દિવસ", most_chanted: "સૌથી વધુ જપ",
  your_practice: "તમારી સાધના", day_streak: "દિવસોની શ્રેણી",
  target_count: "લક્ષ્ય સંખ્યા", mala: "માળા", mantra: "મંત્ર",
  prepare_your_chant: "જપની તૈયારી",
};

const kn: Dict = {
  today: "ಇಂದು", chant: "ಜಪ", calendar: "ಪಂಚಾಂಗ", progress: "ಪ್ರಗತಿ", more: "ಇನ್ನಷ್ಟು",
  language: "ಭಾಷೆ",
  start_chanting: "ಜಪ ಪ್ರಾರಂಭಿಸಿ", begin_in: "ಪ್ರಾರಂಭ",
  sadhana_complete: "ಸಾಧನೆ ಪೂರ್ಣ", done: "ಪೂರ್ಣ",
  listening: "ಆಲಿಸುತ್ತಿದೆ", voice_off: "ಧ್ವನಿ ಆಫ್",
  spoken_begin: "ಜಪ ಪ್ರಾರಂಭಿಸಿ",
  spoken_complete: "{name} ಪೂರ್ಣ. {count} ಜಪಗಳು ಸಮರ್ಪಣೆ.",
  hindu_calendar: "ಹಿಂದೂ ಪಂಚಾಂಗ", this_month: "ಈ ತಿಂಗಳು",
  upcoming_festivals: "ಮುಂಬರುವ ಹಬ್ಬಗಳು", achievements: "ಸಾಧನೆಗಳು",
  last_7_days: "ಕಳೆದ 7 ದಿನಗಳು", most_chanted: "ಹೆಚ್ಚು ಜಪ",
  your_practice: "ನಿಮ್ಮ ಸಾಧನೆ", day_streak: "ದಿನಗಳ ಸರಣಿ",
  target_count: "ಗುರಿ ಸಂಖ್ಯೆ", mala: "ಮಾಲೆ", mantra: "ಮಂತ್ರ",
  prepare_your_chant: "ಜಪಕ್ಕೆ ಸಿದ್ಧತೆ",
};

const ml: Dict = {
  today: "ഇന്ന്", chant: "ജപം", calendar: "പഞ്ചാംഗം", progress: "പുരോഗതി", more: "കൂടുതൽ",
  language: "ഭാഷ",
  start_chanting: "ജപം ആരംഭിക്കുക", begin_in: "ആരംഭം",
  sadhana_complete: "സാധന പൂർണ്ണം", done: "പൂർത്തിയായി",
  listening: "ശ്രവിക്കുന്നു", voice_off: "ശബ്ദം ഓഫ്",
  spoken_begin: "ജപം ആരംഭിക്കുക",
  spoken_complete: "{name} പൂർണ്ണം. {count} ജപങ്ങൾ സമർപ്പിച്ചു.",
  hindu_calendar: "ഹിന്ദു പഞ്ചാംഗം", this_month: "ഈ മാസം",
  upcoming_festivals: "വരാനിരിക്കുന്ന ഉത്സവങ്ങൾ", achievements: "നേട്ടങ്ങൾ",
  last_7_days: "കഴിഞ്ഞ 7 ദിവസം", most_chanted: "കൂടുതൽ ജപം",
  your_practice: "നിങ്ങളുടെ സാധന", day_streak: "ദിന ശൃംഖല",
  target_count: "ലക്ഷ്യ സംഖ്യ", mala: "മാല", mantra: "മന്ത്രം",
  prepare_your_chant: "ജപത്തിന് തയ്യാറാകുക",
};

const pa: Dict = {
  today: "ਅੱਜ", chant: "ਜਾਪ", calendar: "ਪੰਚਾਂਗ", progress: "ਪ੍ਰਗਤੀ", more: "ਹੋਰ",
  language: "ਭਾਸ਼ਾ",
  start_chanting: "ਜਾਪ ਸ਼ੁਰੂ ਕਰੋ", begin_in: "ਸ਼ੁਰੂ",
  sadhana_complete: "ਸਾਧਨਾ ਪੂਰੀ", done: "ਮੁਕੰਮਲ",
  listening: "ਸੁਣ ਰਿਹਾ", voice_off: "ਆਵਾਜ਼ ਬੰਦ",
  spoken_begin: "ਜਾਪ ਸ਼ੁਰੂ ਕਰੋ",
  spoken_complete: "{name} ਪੂਰਾ। {count} ਜਾਪ ਅਰਪਿਤ।",
  hindu_calendar: "ਹਿੰਦੂ ਪੰਚਾਂਗ", this_month: "ਇਹ ਮਹੀਨਾ",
  upcoming_festivals: "ਆਉਣ ਵਾਲੇ ਤਿਉਹਾਰ", achievements: "ਪ੍ਰਾਪਤੀਆਂ",
  last_7_days: "ਪਿਛਲੇ 7 ਦਿਨ", most_chanted: "ਸਭ ਤੋਂ ਵੱਧ ਜਾਪ",
  your_practice: "ਤੁਹਾਡੀ ਸਾਧਨਾ", day_streak: "ਦਿਨਾਂ ਦੀ ਲੜੀ",
  target_count: "ਟੀਚਾ ਗਿਣਤੀ", mala: "ਮਾਲਾ", mantra: "ਮੰਤਰ",
  prepare_your_chant: "ਜਾਪ ਦੀ ਤਿਆਰੀ",
};

const or: Dict = {
  today: "ଆଜି", chant: "ଜପ", calendar: "ପଞ୍ଜିକା", progress: "ପ୍ରଗତି", more: "ଅଧିକ",
  language: "ଭାଷା",
  start_chanting: "ଜପ ଆରମ୍ଭ କରନ୍ତୁ", begin_in: "ଆରମ୍ଭ",
  sadhana_complete: "ସାଧନା ସମ୍ପୂର୍ଣ୍ଣ", done: "ସମ୍ପୂର୍ଣ୍ଣ",
  listening: "ଶୁଣୁଛି", voice_off: "ସ୍ୱର ବନ୍ଦ",
  spoken_begin: "ଜପ ଆରମ୍ଭ କରନ୍ତୁ",
  spoken_complete: "{name} ସମାପ୍ତ। {count} ଜପ ଅର୍ପଣ।",
  hindu_calendar: "ହିନ୍ଦୁ ପଞ୍ଜିକା", this_month: "ଏହି ମାସ",
  upcoming_festivals: "ଆଗାମୀ ପର୍ବ", achievements: "ସଫଳତା",
  last_7_days: "ଗତ 7 ଦିନ", most_chanted: "ସର୍ବାଧିକ ଜପ",
  your_practice: "ଆପଣଙ୍କ ସାଧନା", day_streak: "ଦିନର ଧାରା",
  target_count: "ଲକ୍ଷ୍ୟ ସଂଖ୍ୟା", mala: "ମାଳା", mantra: "ମନ୍ତ୍ର",
  prepare_your_chant: "ଜପ ପାଇଁ ପ୍ରସ୍ତୁତ ହୁଅନ୍ତୁ",
};

const DICTS: Partial<Record<LangCode, Dict>> = {
  en, hi, bn, ta, te, mr, gu, kn, ml, pa, or,
};

/** Languages without a dedicated UI pack inherit Hindi strings (Devanagari devotional text uses hi). */
const INDIAN_LANGS = new Set<LangCode>(
  LANGUAGES.map((l) => l.code).filter((c) => c !== "en"),
);

function resolveDict(code: LangCode): Dict {
  if (code === "en") return en;
  const specific = DICTS[code] ?? {};
  const hindiBase = INDIAN_LANGS.has(code) ? hi : {};
  return { ...en, ...hindiBase, ...specific };
}

export function localeForLang(code: LangCode): string {
  return BCP47[code] ?? "en-IN";
}

const KEY = "divine-chant:lang";

export function getLang(): LangCode {
  if (typeof window === "undefined") return "en";
  const v = window.localStorage.getItem(KEY) as LangCode | null;
  return v && LANGUAGES.some((l) => l.code === v) ? v : "en";
}

export function setLang(code: LangCode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, code);
  window.dispatchEvent(new CustomEvent("divine-chant:lang"));
}

export function translate(
  code: LangCode,
  key: Key,
  params?: Record<string, string | number>,
): string {
  const dict = resolveDict(code);
  let s = dict[key] ?? en[key] ?? String(key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return s;
}
