import type { LangCode } from "@/lib/i18n";
import { getLocalizedDevotionalLines } from "@/lib/devotional-locale";

export type DevotionalKind = "aarti" | "chalisa";

export interface DevotionalItem {
  id: string;
  kind: DevotionalKind;
  titleKey: string;
  subtitleKey: string;
  deity: string;
  defaultTarget: number;
  linesHi: string[];
  linesEn: string[];
}

export const AARTIS: DevotionalItem[] = [
  {
    id: "om-jai-jagdish",
    kind: "aarti",
    titleKey: "aarti_om_jai_jagdish_title",
    subtitleKey: "aarti_om_jai_jagdish_sub",
    deity: "Vishnu",
    defaultTarget: 1,
    linesHi: [
      "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे।",
      "भक्त जनों के संकट, दास जनों के संकट, क्षण में दूर करे॥",
      "जो ध्यावे फल पावे, दुःख बिनसे मन का।",
      "सुख सम्पत्ति घर आवे, कष्ट मिटे तन का॥",
      "मात-पिता तुम मेरे, शरण गहूं किसकी।",
      "तुम बिन और न दूजा, आश करूं जिसकी॥",
      "तुम पूरण परमात्मा, तुम अन्तर्यामी।",
      "पारब्रह्म परमेश्वर, तुम सबके स्वामी॥",
      "तुम करुणा के सागर, तुम पालनकर्ता।",
      "मैं मूढ़ कृपालु, तुम मेरे हितकार्ता॥",
      "तुम हो एक अगोचर, सबके प्राणपति।",
      "किस विधि मिलूं दयामय, तुमको मैं अरति॥",
      "दीनबन्धु दुःखहर्ता, ठाकुर तुम मेरे।",
      "स्वामी रक्षक तुम मेरे, भक्ति हो मोरे॥",
      "ॐ जय जगदीश हरे, स्वामी जय जगदीश हरे॥",
    ],
    linesEn: [
      "Om jaya jagadeesha hare, swami jaya jagadeesha hare.",
      "Bhakta janon ke sankata, daasa janon ke sankata, kshana mein door kare.",
      "Jo dhyaave phala paave, duhkha binase mana kaa.",
      "Sukha sampatti ghara aave, kashta mite tana kaa.",
      "Maata-pitaa tum mere, sharan gahoon kisaki.",
      "Tuma bina aura na dooja, aasha karoon jisaki.",
      "Tuma poorana paramaatmaa, tuma antaryaami.",
      "Paarabrahma parameshwara, tuma sabake svaami.",
      "Tuma karunaa ke saagara, tuma paalanakarta.",
      "Main moodha kripaalu, tuma mere hitakarta.",
      "Tuma ho eka agochara, sabake praanapati.",
      "Kisa vidhi miloon dayaamaya, tumako main arati.",
      "Deenabandhu duhkahartaa, thaakura tuma mere.",
      "Svaami rakshaka tuma mere, bhakti ho more.",
      "Om jaya jagadeesha hare, swami jaya jagadeesha hare.",
    ],
  },
  {
    id: "jai-ganesh-deva",
    kind: "aarti",
    titleKey: "aarti_jai_ganesh_title",
    subtitleKey: "aarti_jai_ganesh_sub",
    deity: "Ganesha",
    defaultTarget: 1,
    linesHi: [
      "जय गणेश, जय गणेश, जय गणेश देवा।",
      "माता जाकी पार्वती, पिता महादेवा॥",
      "एकदन्त दयावन्त, चार भुजा धारी।",
      "माथे पर सिंदूर सोहे, मूसे की सवारी॥",
      "पान चढ़े, फूल चढ़े, और चढ़े मेवा।",
      "लड्डुअन का भोग लगे, सन्त करें सेवा॥",
      "जय गणेश, जय गणेश, जय गणेश देवा॥",
    ],
    linesEn: [
      "Jaya Ganesh, jaya Ganesh, jaya Ganesh devaa.",
      "Maata jaaki Paarvati, pitaa Mahaadeva.",
      "Ekadanta dayaavanta, chaara bhujaa dhaari.",
      "Maathe par sindoor sohe, moose ki savaari.",
      "Paan chadhe, phool chadhe, aura chadhe mevaa.",
      "Ladduan kaa bhog lage, santa karen seva.",
      "Jaya Ganesh, jaya Ganesh, jaya Ganesh devaa.",
    ],
  },
  {
    id: "om-jai-shiv-omkara",
    kind: "aarti",
    titleKey: "aarti_shiv_omkara_title",
    subtitleKey: "aarti_shiv_omkara_sub",
    deity: "Shiva",
    defaultTarget: 1,
    linesHi: [
      "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।",
      "ब्रह्मा, विष्णु, सदाशिव, अर्धांगी धारा॥",
      "एकानन चतुरानन, पञ्चानन राजे।",
      "हंसासन गरुड़ासन, वृषवाहन साजे॥",
      "दो भुज चार चार दस, भुजा ते सोहे।",
      "त्रिगुण रूप निरखते, त्रिभुवन जन मोहे॥",
      "अक्षमाला वनमाला, रुण्डमाला धारी।",
      "चन्दन मृगमद सोहे, भाले शुभकारी॥",
      "श्वेताम्बर पीताम्बर, बाघम्बर साजे।",
      "शंकर सोहें नन्दी पर, भक्ति निधि आजे॥",
      "ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा॥",
    ],
    linesEn: [
      "Om jaya Shiva Omkara, swami jaya Shiva Omkara.",
      "Brahmaa, Vishnu, Sadaashiva, ardhangee dhaara.",
      "Ekaanana chaturaanana, panchaanana raaje.",
      "Hamsaasana garudaasana, vrishavaahana saaje.",
      "Do bhuja chaar chaar dasa, bhuja te sohe.",
      "Triguna roopa nirakhate, tribhuvana jana mohe.",
      "Akshamaalaa vanamaalaa, rundamaalaa dhaari.",
      "Chandana mrigamada sohe, bhaale shubhakaari.",
      "Shvetaambara peetaambara, baaghambara saaje.",
      "Shankara sohen Nandi para, bhakti nidhi aaje.",
      "Om jaya Shiva Omkara, swami jaya Shiva Omkara.",
    ],
  },
  {
    id: "om-jai-lakshmi-mata",
    kind: "aarti",
    titleKey: "aarti_lakshmi_title",
    subtitleKey: "aarti_lakshmi_sub",
    deity: "Lakshmi",
    defaultTarget: 1,
    linesHi: [
      "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता।",
      "तुमको निशदिन सेवत, हरि विष्णु विधाता॥",
      "उमा, रमा, ब्रह्माणी, तुम ही जगमाता।",
      "सूर्य-चन्द्रमा ध्यावत, नारद ऋषि गाता॥",
      "दुर्गा रूप निरंजनी, सुख सम्पत्ति दाता।",
      "जो कोई तुमको ध्यावत, ऋद्धि-सिद्धि धन पाता॥",
      "तुम पाताल निवासिनी, तुम ही शुभदाता।",
      "कर्म-प्रभाव प्रकाशक, जगनिधि के त्राता॥",
      "ॐ जय लक्ष्मी माता, मैया जय लक्ष्मी माता॥",
    ],
    linesEn: [
      "Om jaya Lakshmi maataa, maiyaa jaya Lakshmi maataa.",
      "Tumako nishadina sevata, Hari Vishnu vidhaataa.",
      "Umaa, Raamaa, Brahmaani, tum hee jagamaataa.",
      "Soorya-chandramaa dhyaavata, Naarada rishi gaataa.",
      "Durgaa roopa niranjani, sukha sampatti daataa.",
      "Jo koee tumako dhyaavata, riddhi-siddhi dhana paataa.",
      "Tuma paataala nivaasini, tum hee shubhadaataa.",
      "Karma-prabhaava prakaashaka, jaganidhi ke traataa.",
      "Om jaya Lakshmi maataa, maiyaa jaya Lakshmi maataa.",
    ],
  },
  {
    id: "hanuman-aarti",
    kind: "aarti",
    titleKey: "aarti_hanuman_title",
    subtitleKey: "aarti_hanuman_sub",
    deity: "Hanuman",
    defaultTarget: 1,
    linesHi: [
      "आरती कीजै हनुमान लला की।",
      "दुष्ट दलन रघुनाथ कला की॥",
      "जाके बल से गिरिवर काँपे।",
      "रोग-दोष जाके निकट न झाँके॥",
      "अंजनि पुत्र महा बलदाई।",
      "संतन के प्रभु सदा सहाई॥",
      "दे बीरा रघुनाथ पठाए।",
      "लंका जारि सिया सुधि लाए॥",
      "लंका सो कोट समुद्र-सी खाई।",
      "जात पवनसुत बार न लाई॥",
      "लंका जारि असुर संहारे।",
      "सीयारामजी के काज सवारे॥",
      "आरती कीजै हनुमान लला की॥",
    ],
    linesEn: [
      "Aarti keejai Hanuman lalaa kee.",
      "Dushta dalana Raghunaatha kalaa kee.",
      "Jaake bala se girivara kaanpe.",
      "Roga-dosha jaake nikata na jhaanke.",
      "Anjani putra mahaa baladaaee.",
      "Santana ke prabhu sadaa sahaaee.",
      "De beeraa Raghunaatha pathaae.",
      "Lankaa jaari Siyaa sudhi laae.",
      "Lankaa so kota samudra-see khaaee.",
      "Jaata pavanasuta baara na laaee.",
      "Lankaa jaari asura sanhaare.",
      "Seeyaaraamajee ke kaaja savaare.",
      "Aarti keejai Hanuman lalaa kee.",
    ],
  },
  {
    id: "jai-ambe-gauri",
    kind: "aarti",
    titleKey: "aarti_ambe_title",
    subtitleKey: "aarti_ambe_sub",
    deity: "Durga",
    defaultTarget: 1,
    linesHi: [
      "जय अम्बे गौरी, मैया जय श्यामा गौरी।",
      "तुमको निशदिन ध्यावत, हरि ब्रह्मा शिवरी॥",
      "माङ्गलकाली, भद्रकाली, अम्बे, जगदम्बे।",
      "काली, दुर्गा, क्षमा, शिवा, धात्री, स्वाहा, स्वधा॥",
      "जगत प्रसिद्ध जगदम्ब भवानी।",
      "शिव की अर्पति, भवानी॥",
      "चौंसठ योगिनी मंगल गावत।",
      "नृति करत भैरों बाजत॥",
      "जय अम्बे गौरी, मैया जय श्यामा गौरी॥",
    ],
    linesEn: [
      "Jaya Ambe Gauri, maiyaa jaya Shyaamaa Gauri.",
      "Tumako nishadina dhyaavata, Hari Brahmaa Shivaree.",
      "Maangalakaali, Bhadrakaali, Ambe, Jagadambe.",
      "Kaali, Durgaa, Kshamaa, Shivaa, Dhaatri, Svaahaa, Svadhaa.",
      "Jagata prasiddha Jagadamba Bhavaani.",
      "Shiva kee arapati, Bhavaani.",
      "Chaunsatha yoginee mangala gaavata.",
      "Nriti karata Bhairon baajata.",
      "Jaya Ambe Gauri, maiyaa jaya Shyaamaa Gauri.",
    ],
  },
  {
    id: "aarti-kunj-bihari",
    kind: "aarti",
    titleKey: "aarti_krishna_title",
    subtitleKey: "aarti_krishna_sub",
    deity: "Krishna",
    defaultTarget: 1,
    linesHi: [
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥",
      "गले में फूलमाला, सर पर मुकुट राजत।",
      "मोर मुकुट कर मुरली, सोहत नंदलाला॥",
      "गौर-श्याम मुख चंद्रमा, नयन-कमल अति सोहत।",
      "बंसी बजावत गोपाल, राधा रानी संग॥",
      "आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥",
    ],
    linesEn: [
      "Aarti Kunjabihari kee, Shri Giridhar Krishna Muraari kee.",
      "Gale mein phoolamaalaa, sara para mukuta raajata.",
      "Mora mukuta kara murali, sohata Nandalalaa.",
      "Gaura-shyaama mukha chandramaa, nayana-kamala ati sohata.",
      "Bansi bajavata Gopaala, Raadhaa raanee sang.",
      "Aarti Kunjabihari kee, Shri Giridhar Krishna Muraari kee.",
    ],
  },
];

function chalisaPair(
  hi: string[],
  en: string[],
): { hi: string[]; en: string[] } {
  return { hi, en };
}

const HANUMAN_CHALISA_HI = [
  "श्रीगुरु चरन सरोज रज, निज मन मुकुर सुधारि।",
  "बरनउं रघुबर बिमल जसु, जो दायकु फल चारि॥",
  "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
  "बल बुद्धि विद्या देहु मोहिं, हरहु कलेश विकार॥",
  "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
  "रामदूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥",
  "महावीर विक्रम बजरंगी। कुमति निवार सुमति के संगी॥",
  "कंचन बरन बिराज सुबेसा। कानन कुण्डल कुञ्चित केसा॥",
  "हाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥",
  "शंकर सुवन केसरी नन्दन। तेज प्रताप महा जग वन्दन॥",
  "विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर॥",
  "प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥",
  "सूक्ष्म रूप धरि सियहिं दिखावा। विकट रूप धरि लंक जरावा॥",
  "भीम रूप धरि असुर संहारा। रामचन्द्र के काज सवारा॥",
  "लाय सजीवन लखन जियाए। श्रीरघुबीर हरषि उर लाए॥",
  "रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥",
  "सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कण्ठ लगावैं॥",
  "सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥",
  "जम कुबेर दिगपाल जहाँ ते। कवि कोविद कहि सके कहाँ ते॥",
  "तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राजपद दीन्हा॥",
  "तुम्हरो मन्त्र विभीषण माना। लंकेश्वर भए सब जग जाना॥",
  "जुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥",
  "प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥",
  "दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
  "राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥",
  "सब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डर ना॥",
  "आपन तेज सम्हारो आपै। तीनों लोक हाँक ते काँपै॥",
  "भूत पिशाच निकट नहिं आवै। महावीर जब नाम सुनावै॥",
  "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥",
  "संकट ते हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥",
  "सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥",
  "और मनोरथ जो कोई लावै। सोई अमित जीवन फल पावै॥",
  "चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥",
  "साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥",
  "अष्ट सिद्धि नौ निधि के दाता। अस बर दीन्ह जानकी माता॥",
  "राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥",
  "तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥",
  "अंत काल रघुबर पुर जाई। जहाँ जन्म हरि भक्त कहाई॥",
  "और देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥",
  "संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥",
  "जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥",
  "जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥",
  "जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥",
  "तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥",
  "पवनतनय संकट हरन, मंगल मूरति रूप।",
  "राम लखन सीता सहित, हृदय बसहु सुर भूप॥",
];

const HANUMAN_CHALISA_EN = [
  "Shri Guru charana saroja raja, nija mana mukura sudhaari.",
  "Baranaun Raghubara bimala jasu, jo daayaku phala chaari.",
  "Buddhiheena tanu jaanike, sumiraun Pavana-kumaara.",
  "Bala buddhi vidya dehu mohin, harahu kalesha vikaara.",
  "Jaya Hanumaan jnaana guna saagara. Jaya kapeesa tihun loka ujaagara.",
  "Raamadoota atulita bala dhaamaa. Anjani-putra Pavanasuta naamaa.",
  "Mahaaveera vikrama Bajarangi. Kumati nivaara sumati ke sangi.",
  "Kanchana barana biraaja subeshaa. Kaanana kundala kunchita keshaa.",
  "Haatha vajra au dhvajaa biraajai. Kaandhe moonja janeoo saajai.",
  "Shankara suvana Kesari nandana. Teja prataapa mahaa jaga vandana.",
  "Vidyaavaana guni ati chaatura. Raama kaaja karibe ko aatura.",
  "Prabhu charitra sunibe ko rasiyaa. Raama Lakshmana Seetaa mana basiyaa.",
  "Sookshma roopa dhari Siyahi dikhaavaa. Vikata roopa dhari Lanka jaraavaa.",
  "Bheema roopa dhari asura sanhaaraa. Raamachandra ke kaaja savaaraa.",
  "Laaya sajeevana Lakshmana jiyaae. Shreeraghuveera harashi ura laae.",
  "Raghupati keenhi bahuta badaai. Tuma mama priya Bharatahi sama bhaai.",
  "Sahasa badana tumharo jasa gaavain. Asa kahi Shreepati kantha lagaavai.",
  "Sanakaadika Brahmaadi muneeshaa. Naarada Saarada sahita aheeshaa.",
  "Jama Kubera Digapaala jahaa te. Kavi kovida kahi sake kahaa te.",
  "Tuma upakaara Sugreevahi keenhaa. Raama milaaya raajapada deenhaa.",
  "Tumharo mantra Vibheeshana maanaa. Lankeshvara bhae saba jaga jaanaa.",
  "Juga sahasra yojana para bhaanoo. Leelyo taahi madhura phala jaanoo.",
  "Prabhu mudrikaa meli mukha maheen. Jaladhi laanghi gaye acharaja naheen.",
  "Durgama kaaja jagata ke jete. Sugama anugraha tumhare tete.",
  "Raama duaare tuma rakhavaare. Hota na aagyaa binu paisaare.",
  "Saba sukha lahai tumhaari sharanaa. Tuma rakshaka kaahoo ko dara naa.",
  "Aapana teja samhaaro aapai. Teeno loka haanka te kaampai.",
  "Bhoota pishaacha nikata nahin aavai. Mahaaveera jaba naama sunaavai.",
  "Naasai roga harai saba peeraa. Japata nirantara Hanumata beeraa.",
  "Sankata te Hanumaan chhudaavai. Mana krama vachana dhyaana jo laavai.",
  "Saba para Raama tapasvi raajaa. Tina ke kaaja sakala tuma saajaa.",
  "Aura manoratha jo koee laavai. Soee amita jeevana phala paavai.",
  "Chaaron juga parataapa tumhaaraa. Hai parasiddha jagata ujiyaaraa.",
  "Saadhu santa ke tuma rakhavaare. Asura nikandana Raama dulaare.",
  "Ashta siddhi nau nidhi ke daataa. Asa bara deenh Janaki maataa.",
  "Raama rasaayana tumhare paasaa. Sadaa raho Raghupati ke daasaa.",
  "Tumhare bhajana Raama ko paavai. Janama janama ke dukha bisaraavai.",
  "Anta kaala Raghubara pura jaai. Jahaa janma Hari bhakta kahaai.",
  "Aura devataa chitta na dharai. Hanumata sei sarba sukha karai.",
  "Sankata katai mitai saba peeraa. Jo sumirai Hanumata balabeeraa.",
  "Jaya jaya jaya Hanumaan gosaaee. Kripaa karahu Gurudeva ki naaee.",
  "Jo sata baara paatha kara koee. Chhootahi bandi mahaa sukha hoee.",
  "Jo yaha padhai Hanumaan chaaleesaa. Hoya siddhi saakhi Gaurisa.",
  "Tulasidaasa sadaa Hari cheraa. Keejai naatha hridaya maham deraa.",
  "Pavanatanaya sankata harana, mangala moorati roopa.",
  "Raama Lakshmana Seetaa sahita, hridaya basahu sura bhoopa.",
];

const SHIV_PAIR = chalisaPair(
  [
    "जय गणेश गिरिजा सुवन, मंगल मूल सुजान।",
    "कहत अयोध्यादास तुम, देहु अभय वरदान॥",
    "जय गिरिजा पति दीन दयाला। सदा करत सन्तन प्रतिपाला॥",
    "भाल चन्द्रमा सोहत नीके। कानन कुण्डल नागफणि पीके॥",
    "अष्ट सिद्धि नव निधि के दाता। सब विधि करत सन्तन हितकारी॥",
    "त्रिभुवन भरत करत नित सेवा। जय शिव ओंकारा, स्वामी जय शिव ओंकारा॥",
  ],
  [
    "Jaya Ganesh Girija suvan, mangala moola sujaana.",
    "Kahata Ayodhyaadaasa tum, dehu abhaya varadaana.",
    "Jaya Girija pati deena dayaalaa. Sadaa karata santana pratipaalaa.",
    "Bhaala chandramaa sohata neeke. Kaanana kundala naagaphani peeke.",
    "Ashta siddhi nava nidhi ke daataa. Saba vidhi karata santana hitakaari.",
    "Tribhuvana Bharata karata nita seva. Jaya Shiva Omkara, swami jaya Shiva Omkara.",
  ],
);
const SHIV_CHALISA_HI = SHIV_PAIR.hi;
const SHIV_CHALISA_EN = SHIV_PAIR.en;

const DURGA_PAIR = chalisaPair(
  [
    "नमो नमो दुर्गे सुख करनी। नमो नमो अम्बे दुःख हरनी॥",
    "निरंकार है ज्योति तुम्हारी। तिहूँ लोक फैली उजियारी॥",
    "शशि ललाट मुख महा विशाला। नेत्र लाल कृपा करताला॥",
    "दुर्गा चालीसा पढ़ै जो कोई। सब विधि सुख सम्पत्ति मन मोही॥",
  ],
  [
    "Namo namo Durge sukha karani. Namo namo Ambe duhkha harani.",
    "Nirankara hai jyoti tumhaari. Tihun loka phaili ujiyaari.",
    "Shashi lalaata mukha mahaa vishaalaa. Netra laala kripaa karataalaa.",
    "Durgaa chaaleesaa padhai jo koee. Saba vidhi sukha sampatti mana mohi.",
  ],
);
const DURGA_CHALISA_HI = DURGA_PAIR.hi;
const DURGA_CHALISA_EN = DURGA_PAIR.en;

const GANESH_PAIR = chalisaPair(
  [
    "जय गणपति जय गणपति जय गणपति देवा।",
    "माता जाकी पार्वती पिता महादेवा॥",
    "एकदन्त दयावन्त चार भुजा धारी। माथे सिंदूर सोहे मूसे की सवारी॥",
    "गणेश चालीसा जो नित गावै। सब सुख भोग परम पद पावै॥",
  ],
  [
    "Jaya Ganapati jaya Ganapati jaya Ganapati devaa.",
    "Maata jaaki Paarvati pitaa Mahaadeva.",
    "Ekadanta dayaavanta chaara bhujaa dhaari. Maathe sindoor sohe moose ki savaari.",
    "Ganesh chaaleesaa jo nita gaavai. Saba sukha bhoga parama pada paavai.",
  ],
);
const GANESH_CHALISA_HI = GANESH_PAIR.hi;
const GANESH_CHALISA_EN = GANESH_PAIR.en;

const LAKSHMI_PAIR = chalisaPair(
  [
    "मातु लक्ष्मी करो कृपा, करो कृपा मातु।",
    "जो कोई तुमको ध्यावे, ऋद्धि सिद्धि साथ॥",
    "महालक्ष्मी नमो नमः, सर्व सिद्धि प्रदायिनी।",
    "लक्ष्मी चालीसा पाठ करे, धन धान्य सुख पावे॥",
  ],
  [
    "Maatu Lakshmi karo kripaa, karo kripaa maatu.",
    "Jo koee tumako dhyaave, riddhi siddhi saatha.",
    "Mahaalakshmi namo namah, sarva siddhi pradaayini.",
    "Lakshmi chaaleesaa paatha kare, dhana dhaanya sukha paave.",
  ],
);
const LAKSHMI_CHALISA_HI = LAKSHMI_PAIR.hi;
const LAKSHMI_CHALISA_EN = LAKSHMI_PAIR.en;

const SAI_PAIR = chalisaPair(
  [
    "शirdi के साई बाबा, जय जगत के पालनहार।",
    "सबका मालिक एक तू, करता सबका उद्धार॥",
    "साई चालीसा जो पढ़े, निश्चय फल पावे।",
    "मन वांछित फल मिले, सुख सम्पत्ति पावे॥",
  ],
  [
    "Shirdi ke Sai Baaba, jaya jagata ke paalanahaar.",
    "Sabaka maalik eka tu, kartaa sabaka uddhaar.",
    "Sai chaaleesaa jo padhe, nishchaya phala paave.",
    "Mana vaanchhita phala mile, sukha sampatti paave.",
  ],
);
const SAI_CHALISA_HI = SAI_PAIR.hi;
const SAI_CHALISA_EN = SAI_PAIR.en;

const RAM_PAIR = chalisaPair(
  [
    "श्री रघुबीर भक्त हितकारी। प्रभु प्रताप तुम्हारा अपारी॥",
    "राम चालीसा जो गावै, सब सुख भोग सुखदायी।",
    "अयोध्या के नाथ तुम, सीताराम सहित॥",
  ],
  [
    "Shri Raghuveera bhakta hitakaari. Prabhu prataapa tumhaaraa apaari.",
    "Raama chaaleesaa jo gaavai, saba sukha bhoga sukhadaayee.",
    "Ayodhyaa ke naatha tum, Seetaaraama sahita.",
  ],
);
const RAM_CHALISA_HI = RAM_PAIR.hi;
const RAM_CHALISA_EN = RAM_PAIR.en;

const KRISHNA_PAIR = chalisaPair(
  [
    "श्री कृष्ण गोविन्द हरे मुरारी। हे नाथ नारायण वासुदेवा॥",
    "कृष्ण चालीसा जो पढ़ै, प्रेम सहित ध्यान।",
    "भक्ति मुक्ति फल दे, श्री हरि के चरण॥",
  ],
  [
    "Shri Krishna Govinda hare Muraari. He naatha Naaraayana Vaasudeva.",
    "Krishna chaaleesaa jo padhai, prema sahita dhyaana.",
    "Bhakti mukti phala de, Shri Hari ke charana.",
  ],
);
const KRISHNA_CHALISA_HI = KRISHNA_PAIR.hi;
const KRISHNA_CHALISA_EN = KRISHNA_PAIR.en;

const SHANI_PAIR = chalisaPair(
  [
    "जय शनि देव महाराज, कृपा करो भक्तन पर।",
    "नीलांजन समाभासं रविपुत्रं यमाग्रजम्॥",
    "शनि चालीसा जो पढ़े, शनि दोष निवारण।",
    "कष्ट मिटे सुख मिले, होय कल्याण॥",
  ],
  [
    "Jaya Shani deva mahaaraaja, kripaa karo bhaktana para.",
    "Neelaanjana samaabhaasam Raviputram Yamaagrajam.",
    "Shani chaaleesaa jo padhe, Shani dosha nivaarana.",
    "Kashta mite sukha mile, hoya kalyaana.",
  ],
);
const SHANI_CHALISA_HI = SHANI_PAIR.hi;
const SHANI_CHALISA_EN = SHANI_PAIR.en;

const SARASWATI_PAIR = chalisaPair(
  [
    "जय सरस्वती माता, जय जय हे सरस्वती माता।",
    "सदगुण वैभव शालिनी, त्रिभुवन विख्याता॥",
    "वीणा पाणि विद्या दायिनी, ज्ञान प्रकाश करो।",
    "सरस्वती चालीसा पढ़ै, बुद्धि बल वर दो॥",
  ],
  [
    "Jaya Saraswati maataa, jaya jaya he Saraswati maataa.",
    "Sadaguna vaibhava shaalini, tribhuvana vikhyaataa.",
    "Veena paani vidya daayini, jnaana prakaasha karo.",
    "Saraswati chaaleesaa padhai, buddhi bala vara do.",
  ],
);
const SARASWATI_CHALISA_HI = SARASWATI_PAIR.hi;
const SARASWATI_CHALISA_EN = SARASWATI_PAIR.en;

export const CHALISAS: DevotionalItem[] = [
  {
    id: "hanuman-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_hanuman_title",
    subtitleKey: "chalisa_hanuman_sub",
    deity: "Hanuman",
    defaultTarget: 40,
    linesHi: HANUMAN_CHALISA_HI,
    linesEn: HANUMAN_CHALISA_EN,
  },
  {
    id: "shiv-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_shiv_title",
    subtitleKey: "chalisa_shiv_sub",
    deity: "Shiva",
    defaultTarget: 40,
    linesHi: SHIV_CHALISA_HI,
    linesEn: SHIV_CHALISA_EN,
  },
  {
    id: "durga-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_durga_title",
    subtitleKey: "chalisa_durga_sub",
    deity: "Durga",
    defaultTarget: 40,
    linesHi: DURGA_CHALISA_HI,
    linesEn: DURGA_CHALISA_EN,
  },
  {
    id: "ganesh-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_ganesh_title",
    subtitleKey: "chalisa_ganesh_sub",
    deity: "Ganesha",
    defaultTarget: 40,
    linesHi: GANESH_CHALISA_HI,
    linesEn: GANESH_CHALISA_EN,
  },
  {
    id: "lakshmi-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_lakshmi_title",
    subtitleKey: "chalisa_lakshmi_sub",
    deity: "Lakshmi",
    defaultTarget: 40,
    linesHi: LAKSHMI_CHALISA_HI,
    linesEn: LAKSHMI_CHALISA_EN,
  },
  {
    id: "sai-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_sai_title",
    subtitleKey: "chalisa_sai_sub",
    deity: "Sai Baba",
    defaultTarget: 40,
    linesHi: SAI_CHALISA_HI,
    linesEn: SAI_CHALISA_EN,
  },
  {
    id: "ram-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_ram_title",
    subtitleKey: "chalisa_ram_sub",
    deity: "Rama",
    defaultTarget: 40,
    linesHi: RAM_CHALISA_HI,
    linesEn: RAM_CHALISA_EN,
  },
  {
    id: "krishna-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_krishna_title",
    subtitleKey: "chalisa_krishna_sub",
    deity: "Krishna",
    defaultTarget: 40,
    linesHi: KRISHNA_CHALISA_HI,
    linesEn: KRISHNA_CHALISA_EN,
  },
  {
    id: "shani-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_shani_title",
    subtitleKey: "chalisa_shani_sub",
    deity: "Shani",
    defaultTarget: 40,
    linesHi: SHANI_CHALISA_HI,
    linesEn: SHANI_CHALISA_EN,
  },
  {
    id: "saraswati-chalisa",
    kind: "chalisa",
    titleKey: "chalisa_saraswati_title",
    subtitleKey: "chalisa_saraswati_sub",
    deity: "Saraswati",
    defaultTarget: 40,
    linesHi: SARASWATI_CHALISA_HI,
    linesEn: SARASWATI_CHALISA_EN,
  },
];

const ALL_DEVOTIONALS = [...AARTIS, ...CHALISAS];

export function getDevotionalById(id: string): DevotionalItem | undefined {
  return ALL_DEVOTIONALS.find((d) => d.id === id);
}

/** Devotional lines in the script matching the selected language. */
export function getDevotionalLines(item: DevotionalItem, lang: LangCode): string[] {
  return getLocalizedDevotionalLines(item, lang);
}
