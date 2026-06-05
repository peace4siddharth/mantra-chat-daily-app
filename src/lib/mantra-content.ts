import type { Mantra } from "@/lib/storage";
import type { LangCode } from "@/lib/i18n";
import { contentLocaleFor, type ContentLocale } from "@/lib/content-locale";

type MantraText = { name: string; deity: string };

const MANTRAS: Record<string, Partial<Record<ContentLocale, MantraText>>> = {
  "om-suryaya": {
    en: { name: "Om Suryaya Namaha", deity: "Surya" },
    hi: { name: "ॐ सूर्याय नमः", deity: "सूर्य" },
    bn: { name: "ওঁ সূর্যায় নমঃ", deity: "সূর্য" },
    ta: { name: "ஓம் சூர்யாய நமஹா", deity: "சூரியன்" },
    te: { name: "ఓం సూర్యాయ నమః", deity: "సూర్యుడు" },
    mr: { name: "ॐ सूर्याय नमः", deity: "सूर्य" },
    gu: { name: "ૐ સૂર્યાય નમઃ", deity: "સૂર્ય" },
    kn: { name: "ಓಂ ಸೂರ್ಯಾಯ ನಮಃ", deity: "ಸೂರ್ಯ" },
    ml: { name: "ഓം സൂര്യായ നമഃ", deity: "സൂര്യൻ" },
    pa: { name: "ਓਮ ਸੂਰਿਆਇ ਨਮਹਾ", deity: "ਸੂਰਜ" },
    or: { name: "ଓଁ ସୂର୍ଯ୍ୟାୟ ନମଃ", deity: "ସୂର୍ଯ୍ୟ" },
    ur: { name: "اوم سوریائے نمہ", deity: "سورج" },
  },
  "om-namah-shivaya": {
    en: { name: "Om Namah Shivaya", deity: "Shiva" },
    hi: { name: "ॐ नमः शिवाय", deity: "शिव" },
    bn: { name: "ওঁ নমঃ শিবায়", deity: "শিব" },
    ta: { name: "ஓம் நமசிவாய", deity: "சிவன்" },
    te: { name: "ఓం నమః శివాయ", deity: "శివుడు" },
    mr: { name: "ॐ नमः शिवाय", deity: "शिव" },
    gu: { name: "ૐ નમઃ શિવાય", deity: "શિવ" },
    kn: { name: "ಓಂ ನಮಃ ಶಿವಾಯ", deity: "ಶಿವ" },
    ml: { name: "ഓം നമഃ ശിവായ", deity: "ശിവൻ" },
    pa: { name: "ਓਮ ਨਮਃ ਸ਼ਿਵਾਯ", deity: "ਸ਼ਿਵ" },
    or: { name: "ଓଁ ନମଃ ଶିବାୟ", deity: "ଶିବ" },
    ur: { name: "اوم نمہ شیوائے", deity: "شیو" },
  },
  "hare-krishna": {
    en: { name: "Hare Krishna Hare Rama", deity: "Krishna" },
    hi: { name: "हरे कृष्ण हरे राम", deity: "कृष्ण" },
    bn: { name: "হরে কৃষ্ণ হরে রাম", deity: "কৃষ্ণ" },
    ta: { name: "ஹரே கிருஷ்ண ஹரே ராமா", deity: "கிருஷ்ணர்" },
    te: { name: "హరే కృష్ణ హరే రామ", deity: "కృష్ణుడు" },
    mr: { name: "हरे कृष्ण हरे राम", deity: "कृष्ण" },
    gu: { name: "હરે કૃષ્ણ હરે રામ", deity: "કૃષ્ણ" },
    kn: { name: "ಹರೇ ಕೃಷ್ಣ ಹರೇ ರಾಮ", deity: "ಕೃಷ್ಣ" },
    ml: { name: "ഹരേ കൃഷ്ണ ഹരേ രാമ", deity: "കൃഷ്ണൻ" },
    pa: { name: "ਹਰੇ ਕ੍ਰਿਸ਼ਨ ਹਰੇ ਰਾਮ", deity: "ਕ੍ਰਿਸ਼ਨ" },
    or: { name: "ହରେ କୃଷ୍ଣ ହରେ ରାମ", deity: "କୃଷ୍ଣ" },
    ur: { name: "ہری کرشن ہری رام", deity: "کرشن" },
  },
  "om-hanumate": {
    en: { name: "Om Hanumate Namaha", deity: "Hanuman" },
    hi: { name: "ॐ हनुमते नमः", deity: "हनुमान" },
    bn: { name: "ওঁ হনুমতে নমঃ", deity: "হনুমান" },
    ta: { name: "ஓம் ஹனுமதே நமஹா", deity: "அனுமன்" },
    te: { name: "ఓం హనుమతే నమః", deity: "హనుమంతుడు" },
    mr: { name: "ॐ हनुमते नमः", deity: "हनुमान" },
    gu: { name: "ૐ હનુમતે નમઃ", deity: "હનુમાન" },
    kn: { name: "ಓಂ ಹನುಮತೇ ನಮಃ", deity: "ಹನುಮಂತ" },
    ml: { name: "ഓം ഹനുമതേ നമഃ", deity: "ഹനുമാൻ" },
    pa: { name: "ਓਮ ਹਨੁਮਤੇ ਨਮਹਾ", deity: "ਹਨੂਮਾਨ" },
    or: { name: "ଓଁ ହନୁମତେ ନମଃ", deity: "ହନୁମାନ" },
    ur: { name: "اوم ہنومتے نمہ", deity: "ہنومان" },
  },
  "hanuman-chalisa": {
    en: { name: "Jai Hanuman", deity: "Hanuman" },
    hi: { name: "जय हनुमान", deity: "हनुमान" },
    bn: { name: "জয় হনুমান", deity: "হনুমান" },
    ta: { name: "ஜெய் ஹனுமான்", deity: "அனுமன்" },
    te: { name: "జై హనుమాన్", deity: "హనుమంతుడు" },
    mr: { name: "जय हनुमान", deity: "हनुमान" },
    gu: { name: "જય હનુમાન", deity: "હનુમાન" },
    kn: { name: "ಜಯ ಹನುಮಾನ್", deity: "ಹನುಮಂತ" },
    ml: { name: "ജയ ഹനുമാൻ", deity: "ഹനുമാൻ" },
    pa: { name: "ਜੈ ਹਨੂਮਾਨ", deity: "ਹਨੂਮਾਨ" },
    or: { name: "ଜୟ ହନୁମାନ", deity: "ହନୁମାନ" },
    ur: { name: "جے ہنومان", deity: "ہنومان" },
  },
  gayatri: {
    en: {
      name: "Om Bhur Bhuvah Svaha, Tat Savitur Varenyam, Bhargo Devasya Dheemahi, Dhiyo Yo Nah Prachodayat",
      deity: "Gayatri Devi",
    },
    hi: {
      name: "ॐ भूर्भुवः स्वः, तत्सवितुर्वरेण्यं, भर्गो देवस्य धीमहि, धियो यो नः प्रचोदयात्",
      deity: "गायत्री देवी",
    },
    bn: {
      name: "ওঁ ভূর্ভুবঃ স্বঃ, তৎসবিতুর্বরেণ্যং, ভর্গো দেবস্য ধীমহি, ধিয়ো যো নঃ প্রচোদয়াত্",
      deity: "গায়ত্রী দেবী",
    },
    ta: {
      name: "ஓம் பூர் புவஸ்ஸுவஹா, தத் ஸவிதுர் வரேண்யம், பர்கோ தேவஸ்ய தீமஹி, தியோ யோ நஹ் பிரசோதயாத்",
      deity: "காயத்ரி தேவி",
    },
    te: {
      name: "ఓం భూర్ భువః స్వః, తత్సవితుర్వరే్యం, భర్గో దేవస్య ధీమహి, ధియో యో నః ప్రచోదయాత్",
      deity: "గాయత్రీ దేవి",
    },
    mr: {
      name: "ॐ भूर्भुवः स्वः, तत्सवितुर्वरेण्यं, भर्गो देवस्य धीमहि, धियो यो नः प्रचोदयात्",
      deity: "गायत्री देवी",
    },
    gu: {
      name: "ૐ ભૂર્ભુવઃ સ્વઃ, તત્સવિતુર્વરેણ્યં, ભર્ગો દેવસ્ય ધીમહિ, ધિયો યો નઃ પ્રચોદયાત્",
      deity: "ગાયત્રી દેવી",
    },
    kn: {
      name: "ಓಂ ಭೂರ್ಭುವಃ ಸ್ವಃ, ತತ್ಸವಿತುರ್ವರೇಣ್ಯಂ, ಭರ್ಗೋ ದೇವಸ್ಯ ಧೀಮಹಿ, ಧಿಯೋ ಯೋ ನಃ ಪ್ರಚೋದಯಾತ್",
      deity: "ಗಾಯತ್ರಿ ದೇವಿ",
    },
    ml: {
      name: "ഓം ഭൂർഭുവഃ സ്വഃ, തത്സവിതുർവരേണ്യം, ഭർഗോ ദേവസ്യ ധീമഹി, ധിയോ യോ നഃ പ്രചോദയാത്",
      deity: "ഗായത്രി ദേവി",
    },
    pa: {
      name: "ਓਮ ਭੂਰ ਭੁਵਹ ਸਵਾਹ, ਤਤ ਸਵਿਤੁਰ ਵਰੇਣਯੰ, ਭਰਗੋ ਦੇਵਸਿਆ ਧੀਮਹਿ, ਧਿਯੋ ਯੋ ਨਹ ਪ੍ਰਚੋਦਯਾਤ",
      deity: "ਗਾਇਤ੍ਰੀ ਦੇਵੀ",
    },
    or: {
      name: "ଓଁ ଭୂର୍ଭୁବଃ ସ୍ୱଃ, ତତ୍ସବିତୁର୍ବରେଣ୍ୟଂ, ଭର୍ଗୋ ଦେବସ୍ୟ ଧୀମହି, ଧିୟୋ ଯୋ ନଃ ପ୍ରଚୋଦୟାତ୍",
      deity: "ଗାୟତ୍ରୀ ଦେବୀ",
    },
    ur: {
      name: "اوم بھور بھوہ سواہ، تت سویتور ورینیم، بھرگو دیواسیا دھیمہی، دھیو یو ناہ پرچودیات",
      deity: "گایاتری دیوی",
    },
  },
  ganesha: {
    en: { name: "Om Gam Ganapataye Namaha", deity: "Ganesha" },
    hi: { name: "ॐ गं गणपतये नमः", deity: "गणेश" },
    bn: { name: "ওঁ গং গণপতয়ে নমঃ", deity: "গণেশ" },
    ta: { name: "ஓம் கம் கணபதயே நமஹா", deity: "விநாயகர்" },
    te: { name: "ఓం గం గణపతయే నమః", deity: "గణేశుడు" },
    mr: { name: "ॐ गं गणपतये नमः", deity: "गणेश" },
    gu: { name: "ૐ ગં ગણપતયે નમઃ", deity: "ગણેશ" },
    kn: { name: "ಓಂ ಗಂ ಗಣಪತಯೇ ನಮಃ", deity: "ಗಣೇಶ" },
    ml: { name: "ഓം ഗം ഗണപതയേ നമഃ", deity: "ഗണപതി" },
    pa: { name: "ਓਮ ਗੰ ਗਣਪਤਏ ਨਮਹਾ", deity: "ਗਣੇਸ਼" },
    or: { name: "ଓଁ ଗଂ ଗଣପତୟେ ନମଃ", deity: "ଗଣେଶ" },
    ur: { name: "اوم گں گنپتئے نمہ", deity: "گنیش" },
  },
  vasudevaya: {
    en: { name: "Om Namo Bhagavate Vasudevaya", deity: "Vishnu / Guru" },
    hi: { name: "ॐ नमो भगवते वासुदेवाय", deity: "विष्णु / गुरु" },
    bn: { name: "ওঁ নমো ভগবতে বাসুদেবায়", deity: "বিষ্ণু / গুরু" },
    ta: { name: "ஓம் நமோ பகவதே வாசுதேவாய", deity: "விஷ்ணு / குரு" },
    te: { name: "ఓం నమో భగవతే వాసుదేవాయ", deity: "విష్ణు / గురు" },
    mr: { name: "ॐ नमो भगवते वासुदेवाय", deity: "विष्णु / गुरु" },
    gu: { name: "ૐ નમો ભગવતે વાસુદેવાય", deity: "વિષ્ણુ / ગુરુ" },
    kn: { name: "ಓಂ ನಮೋ ಭಗವತೇ ವಾಸುದೇವಾಯ", deity: "ವಿಷ್ಣು / ಗುರು" },
    ml: { name: "ഓം നമോ ഭഗവതേ വാസുദേവായ", deity: "വിഷ്ണു / ഗുരു" },
    pa: { name: "ਓਮ ਨਮੋ ਭਗਵਤੇ ਵਾਸੁਦੇਵਾਯ", deity: "ਵਿਸ਼ਨੂ / ਗੁਰੂ" },
    or: { name: "ଓଁ ନମୋ ଭଗବତେ ବାସୁଦେବାୟ", deity: "ବିଷ୍ଣୁ / ଗୁରୁ" },
    ur: { name: "اوم نامو بھگوتے واسودیوائے", deity: "وشنو / گورو" },
  },
  mahalakshmi: {
    en: { name: "Om Shreem Mahalakshmiyei Namaha", deity: "Devi (Lakshmi)" },
    hi: { name: "ॐ श्रीं महालक्ष्म्यै नमः", deity: "देवी (लक्ष्मी)" },
    bn: { name: "ওঁ শ্রীং মহালক্ষ্ম্যৈ নমঃ", deity: "দেবী (লক্ষ্মী)" },
    ta: { name: "ஓம் ஸ்ரீம் மகாலட்சுமியே நமஹா", deity: "தேவி (லட்சுமி)" },
    te: { name: "ఓం శ్రీం మహాలక్ష్మ్యై నమః", deity: "దేవి (లక్ష్మి)" },
    mr: { name: "ॐ श्रीं महालक्ष्म्यै नमः", deity: "देवी (लक्ष्मी)" },
    gu: { name: "ૐ શ્રીં મહાલક્ષ્મ્યૈ નમઃ", deity: "દેવી (લક્ષ્મી)" },
    kn: { name: "ಓಂ ಶ್ರೀಂ ಮಹಾಲಕ್ಷ್ಮ್ಯೈ ನಮಃ", deity: "ದೇವಿ (ಲಕ್ಷ್ಮಿ)" },
    ml: { name: "ഓം ശ്രീം മഹാലക്ഷ്മ്യൈ നമഃ", deity: "ദേവി (ലക്ഷ്മി)" },
    pa: { name: "ਓਮ ਸ਼੍ਰੀਂ ਮਹਾਲਕਸ਼ਮਯੈ ਨਮਹਾ", deity: "ਦੇਵੀ (ਲਕਸ਼ਮੀ)" },
    or: { name: "ଓଁ ଶ୍ରୀଂ ମହାଲକ୍ଷ୍ମ୍ଯୈ ନମଃ", deity: "ଦେବୀ (ଲକ୍ଷ୍ମୀ)" },
    ur: { name: "اوم شریم مہالکشمیئے نمہ", deity: "دیوی (لکشمی)" },
  },
  shani: {
    en: { name: "Om Sham Shanaischaraya Namaha", deity: "Shani / Hanuman" },
    hi: { name: "ॐ शं शनैश्चराय नमः", deity: "शनि / हनुमान" },
    bn: { name: "ওঁ শং শনৈশ্চরায় নমঃ", deity: "শনি / হনুমান" },
    ta: { name: "ஓம் ஷம் சனைச்சராய நமஹா", deity: "சனி / அனுமன்" },
    te: { name: "ఓం శం శనైశ్చరాయ నమః", deity: "శని / హనుమంతుడు" },
    mr: { name: "ॐ शं शनैश्चराय नमः", deity: "शनि / हनुमान" },
    gu: { name: "ૐ શં શનૈશ્ચરાય નમઃ", deity: "શનિ / હનુમાન" },
    kn: { name: "ಓಂ ಶಂ ಶನೈಶ್ಚರಾಯ ನಮಃ", deity: "ಶನಿ / ಹನುಮಂತ" },
    ml: { name: "ഓം ഷം ശനൈശ്ചരായ നമഃ", deity: "ശനി / ഹനുമാൻ" },
    pa: { name: "ਓਮ ਸ਼ੰ ਸ਼ਨੈਸ਼ਚਰਾਇ ਨਮਹਾ", deity: "ਸ਼ਨੀ / ਹਨੂਮਾਨ" },
    or: { name: "ଓଁ ଶଂ ଶନୈଶ୍ଚରାୟ ନମଃ", deity: "ଶନି / ହନୁମାନ" },
    ur: { name: "اوم شں شنیئشچرائے نمہ", deity: "شنی / ہنومان" },
  },
};

function pickMantraText(
  entry: Partial<Record<ContentLocale, MantraText>>,
  locale: ContentLocale,
): MantraText | undefined {
  return entry[locale] ?? entry.en ?? entry.hi;
}

export function getMantraDisplay(
  mantra: Mantra,
  lang: LangCode,
): { name: string; deity: string } {
  const locale = contentLocaleFor(lang);
  const entry = MANTRAS[mantra.id];
  if (entry) {
    const picked = pickMantraText(entry, locale);
    if (picked) return picked;
  }
  return { name: mantra.name, deity: mantra.deity };
}
