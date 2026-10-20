/* UI and safety improvements for the PharmaCare university demonstration. */
(function () {
  "use strict";

  var DB = window.PHARMACARE_DRUG_DB || {};
  var barcodeCatalog = window.PHARMACARE_VERIFIED_BARCODE_CATALOG || {};
  var pillCatalog = window.PHARMACARE_VERIFIED_PILL_CATALOG || [];
  var stream = null;
  var scanTimer = null;
  var originalResolveDrugMatches = window.resolveDrugMatches;
  var originalSetLanguage = window.setLanguage;

  var labels = {
    en: {
      identify: "Identify a Medicine", dashboard: "← Dashboard", scanIntro: "Scan a medicine pack barcode, or enter it manually. A scan reads the code; a trusted catalogue match is needed to identify the product.",
      scanPack: "Scan a pack", camera: "Open camera and scan", stop: "Stop camera", barcodeLabel: "Or enter barcode / QR contents", lookup: "Look up code", tablet: "Identify a tablet", imprint: "Imprint on the tablet", exact: "Exact letters or numbers", pillSearch: "Search exact imprint", price: "Not available", source: "Medicine information is an educational summary. Verify with a pharmacist and official references.",
      noMatch: "No exact match in the verified local catalogue. The medicine identity is not confirmed.", decoded: "Code read: ", decodedNoMatch: "Code read, but no verified product match was found: ", secure: "Camera scanning needs HTTPS, a compatible browser, and camera permission. You can enter the code manually.",
      cameraUnsupported: "This browser does not support built-in barcode scanning. You can enter the code manually.", cameraError: "Could not start the camera. Allow camera access and open this app over HTTPS.", cameraStopped: "Camera stopped.",
      symptomSaved: "Entry saved on this device.", symptomEmpty: "Enter a symptom note first.", diaryEmpty: "No diary entries yet.", symptomRed: "This tool cannot assess an emergency. Call 112 now or seek urgent medical care.", symptomGeneral: "This experimental keyword tool cannot diagnose symptoms. Contact a qualified clinician for an assessment, especially if symptoms worsen.",
      priceLabel: "Price in India:", priceUnknown: "Not available", officialPrice: "Check official NPPA prices", active: "Active ingredient (generic):", brands: "Brand / trade names:", use: "Common use:", dose: "Dosage information:", side: "Possible side effects:", interactions: "Interactions:", precautions: "Precautions / contraindications:", pregnancy: "Pregnancy / breastfeeding:", storage: "Storage:", overdose: "Overdose:", similar: "Similar medicines in this library:", noData: "Not available in this project record", sourceStatus: "Record source status: educational project data; individual entries have not been independently verified here. Consult CDSCO prescribing information or a pharmacist.",
      nameRequired: "Enter a medicine name to search.", searchPlaceholder: "Search medicine, brand, ingredient or strength...", alternativesWarning: "Similar use does not mean the medicines are interchangeable. Ask a clinician or pharmacist before changing treatment.", searchMap: "Search on map", mapDefault: "Hospitals and pharmacies in Coimbatore, Tamil Nadu", locationNeeded: "Tap My Location if you want to share your device location with Google Maps.",
      language: "EN", notAvailable: "Not available"
    },
    ar: {
      identify: "التعرّف على الدواء", dashboard: "← الرئيسية", scanIntro: "امسح باركود عبوة الدواء أو أدخله يدويًا. المسح يقرأ الرمز، أما تحديد المنتج فيتطلب تطابقًا مع سجل موثوق.",
      scanPack: "مسح العبوة", camera: "فتح الكاميرا والمسح", stop: "إيقاف الكاميرا", barcodeLabel: "أدخل الباركود أو محتوى QR", lookup: "البحث بالرمز", tablet: "التعرّف على قرص", imprint: "النقش على القرص", exact: "الحروف أو الأرقام كما هي", pillSearch: "بحث عن تطابق دقيق", price: "غير متوفر", source: "المعلومات ملخص تعليمي. تحقّق منها مع الصيدلي ومن المصادر الرسمية.",
      noMatch: "لا يوجد تطابق دقيق في السجل المحلي الموثق. لم يتم تأكيد هوية الدواء.", decoded: "تمت قراءة الرمز: ", decodedNoMatch: "تمت قراءة الرمز، لكن لم يُعثر على منتج موثوق مطابق: ", secure: "يتطلب المسح الآمن HTTPS ومتصفحًا متوافقًا وإذن الكاميرا. يمكنك إدخال الرمز يدويًا.",
      cameraUnsupported: "هذا المتصفح لا يدعم مسح الباركود المدمج. يمكنك إدخال الرمز يدويًا.", cameraError: "تعذر تشغيل الكاميرا. اسمح بالوصول إليها وافتح التطبيق عبر HTTPS.", cameraStopped: "تم إيقاف الكاميرا.",
      symptomSaved: "تم حفظ الإدخال على هذا الجهاز.", symptomEmpty: "أدخل ملاحظة عن العرض أولًا.", diaryEmpty: "لا توجد إدخالات بعد.", symptomRed: "لا يستطيع هذا الفاحص تقييم الطوارئ. اتصل بالرقم 112 أو اطلب رعاية عاجلة.", symptomGeneral: "هذه الأداة التجريبية لا تشخّص الأعراض. تواصل مع مختص صحي، خاصة إذا ازدادت الأعراض.",
      priceLabel: "السعر في الهند:", priceUnknown: "غير معلوم", officialPrice: "تحقق من أسعار NPPA الرسمية", active: "المادة الفعالة (الاسم العلمي):", brands: "الأسماء التجارية:", use: "الاستخدام الشائع:", dose: "معلومات الجرعة:", side: "الآثار الجانبية المحتملة:", interactions: "التداخلات:", precautions: "الاحتياطات وموانع الاستعمال:", pregnancy: "الحمل والرضاعة:", storage: "التخزين:", overdose: "الجرعة الزائدة:", similar: "أدوية مشابهة في المكتبة:", noData: "غير متوفر في سجل المشروع", sourceStatus: "حالة المصدر: بيانات تعليمية للمشروع ولم يتم التحقق المستقل من كل سجل. راجع معلومات CDSCO أو اسأل الصيدلي.",
      nameRequired: "أدخل اسم الدواء للبحث.", searchPlaceholder: "ابحث بالدواء أو الاسم التجاري أو المادة الفعالة...", alternativesWarning: "تشابه الاستخدام لا يعني إمكانية استبدال الأدوية. استشر الطبيب أو الصيدلي قبل تغيير العلاج.", searchMap: "البحث على الخريطة", mapDefault: "مستشفيات وصيدليات في كويمباتور، تاميل نادو", locationNeeded: "اضغط «موقعي» فقط إذا أردت مشاركة موقع جهازك مع خرائط Google.", language: "AR", notAvailable: "غير متوفر"
    },
    ta: {
      identify: "மருந்தை அடையாளம் காண்க", dashboard: "← முகப்பு", scanIntro: "மருந்துப் பொதியின் பார்கோடை ஸ்கேன் செய்யவும் அல்லது கைமுறையாக உள்ளிடவும். ஸ்கேன் குறியீட்டை வாசிக்கும்; மருந்தை உறுதிப்படுத்த நம்பகமான பட்டியலுடன் பொருத்தம் தேவை.",
      scanPack: "பொதியை ஸ்கேன் செய்", camera: "கேமராவைத் திறந்து ஸ்கேன் செய்", stop: "கேமராவை நிறுத்து", barcodeLabel: "அல்லது பார்கோடு / QR உள்ளடக்கத்தை உள்ளிடவும்", lookup: "குறியீட்டைத் தேடு", tablet: "மாத்திரையை அடையாளம் காண்க", imprint: "மாத்திரையில் உள்ள குறியீடு", exact: "எழுத்துகள் அல்லது எண்களை அப்படியே உள்ளிடவும்", pillSearch: "சரியான குறியீட்டைத் தேடு", price: "கிடைக்கவில்லை", source: "மருந்துத் தகவல் கல்வி நோக்கத்திற்கான சுருக்கம். மருந்தாளர் மற்றும் அதிகாரப்பூர்வ ஆதாரங்களுடன் சரிபார்க்கவும்.",
      noMatch: "சரிபார்க்கப்பட்ட உள்ளூர் பட்டியலில் சரியான பொருத்தம் இல்லை. மருந்தின் அடையாளம் உறுதிப்படுத்தப்படவில்லை.", decoded: "குறியீடு வாசிக்கப்பட்டது: ", decodedNoMatch: "குறியீடு வாசிக்கப்பட்டது; சரிபார்க்கப்பட்ட பொருத்தம் இல்லை: ", secure: "ஸ்கேனிங்கிற்கு HTTPS, இணக்கமான உலாவி மற்றும் கேமரா அனுமதி தேவை. குறியீட்டை கைமுறையாக உள்ளிடலாம்.",
      cameraUnsupported: "இந்த உலாவியில் உள்ளமைக்கப்பட்ட பார்கோடு ஸ்கேனர் இல்லை. குறியீட்டை கைமுறையாக உள்ளிடவும்.", cameraError: "கேமராவைத் தொடங்க முடியவில்லை. கேமரா அனுமதி அளித்து HTTPS மூலம் திறக்கவும்.", cameraStopped: "கேமரா நிறுத்தப்பட்டது.",
      symptomSaved: "இந்தச் சாதனத்தில் பதிவு சேமிக்கப்பட்டது.", symptomEmpty: "முதலில் அறிகுறிக் குறிப்பை உள்ளிடவும்.", diaryEmpty: "இன்னும் பதிவுகள் இல்லை.", symptomRed: "இந்தக் கருவி அவசரநிலையை மதிப்பிடாது. 112-ஐ அழைக்கவும் அல்லது உடனடி மருத்துவ உதவியை நாடவும்.", symptomGeneral: "இந்தச் சோதனை அறிகுறிகளை கண்டறியாது. குறிப்பாக அறிகுறிகள் மோசமடைந்தால் தகுதியான மருத்துவரை அணுகவும்.",
      priceLabel: "இந்திய விலை:", priceUnknown: "தெரியவில்லை", officialPrice: "அதிகாரப்பூர்வ NPPA விலைகளைப் பார்க்கவும்", active: "செயற்பொருள் (பொதுப்பெயர்):", brands: "வணிகப் பெயர்கள்:", use: "பொதுவான பயன்பாடு:", dose: "மருந்தளவு தகவல்:", side: "சாத்தியமான பக்கவிளைவுகள்:", interactions: "மருந்து இடையீடுகள்:", precautions: "முன்னெச்சரிக்கைகள் / முரண்பாடுகள்:", pregnancy: "கர்ப்பம் / பாலூட்டல்:", storage: "சேமிப்பு:", overdose: "அளவுக்கு அதிகமான மருந்து:", similar: "இந்த நூலகத்தில் உள்ள ஒத்த மருந்துகள்:", noData: "இந்தத் திட்டப் பதிவில் கிடைக்கவில்லை", sourceStatus: "ஆதார நிலை: திட்டத்தின் கல்வித் தரவு; ஒவ்வொரு பதிவும் தனித்தனியாக உறுதிப்படுத்தப்படவில்லை. CDSCO தகவல் அல்லது மருந்தாளரிடம் சரிபார்க்கவும்.",
      nameRequired: "தேட மருந்தின் பெயரை உள்ளிடவும்.", searchPlaceholder: "மருந்து, வணிகப் பெயர் அல்லது செயற்பொருளைத் தேடவும்...", alternativesWarning: "ஒரே பயன்பாடு இருப்பதால் மருந்துகளை மாற்றிப் பயன்படுத்தலாம் என்று அர்த்தமில்லை. மாற்றுவதற்கு முன் மருத்துவர் அல்லது மருந்தாளரிடம் கேளுங்கள்.", searchMap: "வரைபடத்தில் தேடு", mapDefault: "கோயம்புத்தூரில் உள்ள மருத்துவமனைகள் மற்றும் மருந்தகங்கள்", locationNeeded: "Google Maps-க்கு உங்கள் இருப்பிடத்தைப் பகிர விரும்பினால் மட்டும் My Location அழுத்தவும்.", language: "TA", notAvailable: "கிடைக்கவில்லை"
    }
  };

  Object.assign(labels.en, { cameraNote:"The camera opens only after you tap Scan. Scanning requires a secure HTTPS site and permission. Reading a code does not verify authenticity.", catalogueNote:"A verified India-wide barcode catalogue is not bundled with this demo. The scanner reads codes, but product identification requires authorized product data.", pillNote:"The verified tablet-imprint catalogue is not populated yet. No match means the identity is unknown; ask a pharmacist. Never rely on colour or shape alone.", pillDescription:"Search using the letters or numbers printed on the tablet. Colour or shape alone cannot identify medicine safely.", emergencyIntro:"If someone may be in immediate danger, call the pan-India emergency number.", stockNote:"Searches and selected places are sent to Google Maps. Precise location is shared only if you tap My Location. Pharmacy stock and opening hours are not confirmed.", firstAidBasics:"<h4>First aid basics</h4><article><strong>Severe bleeding</strong><p>Call 112. If it is safe, press firmly on the wound with clean material while waiting for help.</p></article><article><strong>Burns</strong><p>Cool the burn with cool running water. Do not use ice, oils, or pastes. Get urgent help for severe or extensive burns.</p></article><article><strong>Possible poisoning</strong><p>Call 112 or seek urgent medical advice. Do not make the person vomit or give food or drink. Keep the package for clinicians.</p></article><article><strong>Chest pain, stroke signs, or severe breathing difficulty</strong><p>Call 112 immediately. Stay with the person and follow the emergency operator’s instructions.</p></article><p class='source-note'>Sources: <a href='https://www.who.int/news-room/fact-sheets/detail/burns' target='_blank' rel='noopener'>WHO burns first aid</a> · <a href='https://www.nhs.uk/conditions/poisoning/' target='_blank' rel='noopener'>NHS poisoning guidance</a> · <a href='https://112.gov.in/' target='_blank' rel='noopener'>India ERSS 112</a>. Reviewed 20 Oct 2026.</p>" });
  Object.assign(labels.ar, { cameraNote:"لا تُفتح الكاميرا إلا بعد الضغط على زر المسح. يتطلب المسح موقع HTTPS وإذنًا. قراءة الرمز لا تؤكد أصالة المنتج.", catalogueNote:"لا تتضمن هذه النسخة سجلًا هنديًا شاملًا وموثقًا للباركود. يقرأ الماسح الرمز، لكن تحديد المنتج يتطلب بيانات مصرحًا بها.", pillNote:"سجل نقوش الأقراص الموثق غير متوفر في هذه النسخة. عدم العثور على تطابق يعني أن الهوية غير معروفة؛ اسأل الصيدلي. لا تعتمد على اللون أو الشكل وحدهما.", pillDescription:"ابحث باستخدام الحروف أو الأرقام المنقوشة على القرص. اللون أو الشكل وحدهما لا يكفيان لتحديد الدواء.", emergencyIntro:"إذا كان شخص ما في خطر فوري، فاتصل برقم الطوارئ الموحد في الهند.", stockNote:"تُرسل عمليات البحث والأماكن المختارة إلى خرائط Google. لا تتم مشاركة الموقع الدقيق إلا عند الضغط على «موقعي». لا يؤكد التطبيق توفر الدواء أو ساعات العمل.", firstAidBasics:"<h4>إرشادات أولية للإسعاف</h4><article><strong>النزيف الشديد</strong><p>اتصل بالرقم 112. إذا كان ذلك آمنًا، اضغط بقوة على الجرح بقطعة نظيفة حتى وصول المساعدة.</p></article><article><strong>الحروق</strong><p>برّد الحرق بماء جارٍ بارد. لا تستخدم الثلج أو الزيوت أو المعاجين. اطلب المساعدة العاجلة للحروق الشديدة أو الواسعة.</p></article><article><strong>اشتباه التسمم</strong><p>اتصل بالرقم 112 أو اطلب مشورة طبية عاجلة. لا تحاول إحداث القيء ولا تعطِ طعامًا أو شرابًا. احتفظ بالعبوة لعرضها على المختصين.</p></article><article><strong>ألم الصدر أو علامات السكتة أو صعوبة التنفس الشديدة</strong><p>اتصل بالرقم 112 فورًا، وابقَ مع الشخص واتبع تعليمات موظف الطوارئ.</p></article><p class='source-note'>المصادر: <a href='https://www.who.int/news-room/fact-sheets/detail/burns' target='_blank' rel='noopener'>إسعاف الحروق من WHO</a> · <a href='https://www.nhs.uk/conditions/poisoning/' target='_blank' rel='noopener'>إرشادات التسمم من NHS</a> · <a href='https://112.gov.in/' target='_blank' rel='noopener'>خدمة الطوارئ الهندية 112</a>. تمت المراجعة 20 أكتوبر 2026.</p>" });
  Object.assign(labels.ta, { cameraNote:"ஸ்கேன் பொத்தானை அழுத்திய பிறகே கேமரா திறக்கும். HTTPS மற்றும் அனுமதி தேவை. குறியீட்டை வாசிப்பது நம்பகத்தன்மையை உறுதி செய்யாது.", catalogueNote:"இந்த டெமோவில் இந்தியா முழுவதற்குமான சரிபார்க்கப்பட்ட பார்கோடு பட்டியல் இல்லை. ஸ்கேனர் குறியீட்டை வாசிக்கும்; மருந்தை உறுதிப்படுத்த அங்கீகரிக்கப்பட்ட தயாரிப்புத் தரவு தேவை.", pillNote:"சரிபார்க்கப்பட்ட மாத்திரைக் குறியீட்டுப் பட்டியல் இன்னும் சேர்க்கப்படவில்லை. பொருத்தம் இல்லையெனில் அடையாளம் தெரியவில்லை; மருந்தாளரிடம் கேளுங்கள். நிறம் அல்லது வடிவத்தை மட்டும் நம்ப வேண்டாம்.", pillDescription:"மாத்திரையில் அச்சிடப்பட்ட எழுத்துகள் அல்லது எண்களைப் பயன்படுத்தித் தேடவும். நிறம் அல்லது வடிவம் மட்டும் போதாது.", emergencyIntro:"யாருக்காவது உடனடி ஆபத்து இருந்தால் இந்தியாவின் ஒருங்கிணைந்த அவசர எண்ணை அழைக்கவும்.", stockNote:"தேடல்களும் தேர்ந்தெடுக்கப்பட்ட இடங்களும் Google Maps-க்கு அனுப்பப்படும். My Location அழுத்தினால் மட்டுமே துல்லியமான இருப்பிடம் பகிரப்படும். மருந்து இருப்பும் நேரமும் உறுதி செய்யப்படவில்லை.", firstAidBasics:"<h4>முதலுதவி அடிப்படைகள்</h4><article><strong>கடுமையான இரத்தப்போக்கு</strong><p>112-ஐ அழைக்கவும். பாதுகாப்பாக இருந்தால், உதவி வரும் வரை சுத்தமான துணியால் காயத்தின் மீது உறுதியாக அழுத்தவும்.</p></article><article><strong>தீக்காயம்</strong><p>குளிர்ந்த ஓடும் நீரால் குளிர்விக்கவும். பனி, எண்ணெய் அல்லது பேஸ்ட் பயன்படுத்த வேண்டாம். கடுமையான அல்லது பெரிய தீக்காயத்திற்கு உடனடி உதவி பெறவும்.</p></article><article><strong>விஷம் உட்கொண்டிருக்கலாம்</strong><p>112-ஐ அழைக்கவும் அல்லது உடனடி மருத்துவ ஆலோசனை பெறவும். வாந்தி எடுக்கச் செய்யாதீர்கள்; உணவு அல்லது பானம் கொடுக்காதீர்கள். மருந்துப் பொட்டலத்தை மருத்துவரிடம் காட்ட வைத்திருக்கவும்.</p></article><article><strong>மார்பு வலி, பக்கவாத அறிகுறிகள் அல்லது கடுமையான மூச்சுத்திணறல்</strong><p>உடனே 112-ஐ அழைக்கவும். அந்த நபருடன் இருந்து அவசர சேவை வழங்குநரின் வழிமுறைகளைப் பின்பற்றவும்.</p></article><p class='source-note'>ஆதாரங்கள்: <a href='https://www.who.int/news-room/fact-sheets/detail/burns' target='_blank' rel='noopener'>WHO தீக்காய முதலுதவி</a> · <a href='https://www.nhs.uk/conditions/poisoning/' target='_blank' rel='noopener'>NHS விஷ வழிகாட்டல்</a> · <a href='https://112.gov.in/' target='_blank' rel='noopener'>இந்திய ERSS 112</a>. 20 அக்டோபர் 2026 அன்று மதிப்பாய்வு செய்யப்பட்டது.</p>" });

  function lang() { return localStorage.getItem("pharmaLang") || "en"; }
  function L(key) { return (labels[lang()] && labels[lang()][key]) || labels.en[key] || key; }
  function esc(value) { return typeof window.escapeHtml === "function" ? window.escapeHtml(value || "") : String(value || "").replace(/[&<>"']/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]; }); }
  function searchUrl(query) { return "https://www.google.com/maps/search/" + encodeURIComponent(query); }
  function setStatus(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; }
  function safeField(value) { return value && String(value).trim() ? esc(value) : esc(L("noData")); }

  function translateEnhancements() {
    var map = {
      identify: ["#medicineToolsPage h3"], dashboard: ["#medicineToolsPage .back-btn"], scanIntro: ["#medicineToolsPage > p"],
      scanPack: ["#medicineToolsPage .identifier-card:first-child h4"], camera: ["#medicineToolsPage .identifier-card:first-child .identifier-actions button:first-child"], stop: ["#medicineToolsPage .identifier-card:first-child .identifier-actions button:last-child"],
      barcodeLabel: ["label[for='barcodeInput']"], lookup: ["#medicineToolsPage .identifier-card:first-child > button:last-of-type"], tablet: ["#medicineToolsPage .identifier-card:last-child h4"], imprint: ["label[for='pillImprintInput']"], exact: ["#pillImprintInput"], pillSearch: ["#medicineToolsPage .identifier-card:last-child > button"],
      source: ["#libraryPage .source-note"]
    };
    Object.keys(map).forEach(function (key) { map[key].forEach(function (selector) { var el = document.querySelector(selector); if (!el) return; if (el.tagName === "INPUT") el.placeholder = L(key); else el.textContent = L(key); }); });
    var current = document.getElementById("languageCurrent"); if (current) current.textContent = L("language");
    var search = document.getElementById("drugSearchInput"); if (search) search.placeholder = L("searchPlaceholder");
    var place = document.querySelector(".place-search label"); if (place) place.textContent = lang() === "ar" ? "ابحث عن مستشفيات وصيدليات كويمباتور" : lang() === "ta" ? "கோயம்புத்தூர் மருத்துவமனைகள் மற்றும் மருந்தகங்களைத் தேடு" : "Search Coimbatore hospitals and pharmacies";
    var mapButton = document.querySelector(".place-search button"); if (mapButton) mapButton.textContent = L("searchMap");
    var mapNote = document.querySelector(".place-search small"); if (mapNote) mapNote.textContent = L("stockNote");
    var emergency = document.querySelector(".emergency-call"); if (emergency) { emergency.querySelector("strong").textContent = lang() === "ar" ? "المساعدة الطارئة في الهند" : lang() === "ta" ? "இந்தியாவில் அவசர உதவி" : "Emergency help in India"; var emergencyP = emergency.querySelector("p"); if (emergencyP) emergencyP.textContent = L("emergencyIntro"); }
    var firstAid = document.getElementById("firstAidBasics"); if (firstAid) firstAid.innerHTML = L("firstAidBasics");
    var toolCards = document.querySelectorAll("#medicineToolsPage .identifier-card");
    if (toolCards[0]) { var firstNotes = toolCards[0].querySelectorAll(".source-note"); if (firstNotes[0]) firstNotes[0].textContent = L("cameraNote"); if (firstNotes[1]) firstNotes[1].innerHTML = esc(L("catalogueNote")) + " <a href='https://drugregistry.abdm.gov.in/' target='_blank' rel='noopener'>" + (lang() === "ar" ? "افتح سجل الأدوية الحكومي" : lang() === "ta" ? "அரசு மருந்துப் பதிவேட்டைத் திறக்கவும்" : "Open the Government of India Drug Registry") + "</a>."; }
    if (toolCards[1]) { var pillP = toolCards[1].querySelector("p"); if (pillP) pillP.textContent = L("pillDescription"); var pillNote = toolCards[1].querySelector(".source-note"); if (pillNote) pillNote.textContent = L("pillNote"); }
  }

  if (typeof I18N !== "undefined") {
    Object.assign(I18N.en, { identify:"Identify a Medicine", welcome_title:"Care tools, clearly organised", welcome_desc:"Browse medicine information and practical health tools for education.", demo_title:"University demonstration", demo_note:"Use sample data only. This app does not diagnose or replace a healthcare professional.", card_first_aid:"Emergency & First Aid", emergency_title:"Emergency & First Aid", locator_title:"Pharmacies & Hospitals", symptom_tab_guide:"Guide", symptom_tab_check:"Questionnaire", symptom_tab_diary:"Symptom diary", symptom_urgent_title:"When to seek urgent help", symptom_urgent:"Call 112 for severe breathing difficulty, chest pain, signs of stroke, fainting, severe bleeding, or a rapidly worsening condition. Contact a clinician for other concerns.", symptom_limit:"This guide offers general education only and cannot assess an individual.", symptom_severe:"Are symptoms severe or rapidly worsening?", symptom_duration:"How long have they lasted?", symptom_review:"Review educational guidance", symptom_diary_title:"Demo symptom diary", symptom_save:"Save entry on this device", symptom_clear:"Clear diary", symptom_privacy:"Do not enter identifying or sensitive health information. Entries stay in this browser." });
    Object.assign(I18N.ar, { identify:"التعرّف على الدواء", welcome_title:"أدوات رعاية واضحة ومنظمة", welcome_desc:"تصفح معلومات الأدوية والأدوات الصحية العملية لأغراض تعليمية.", demo_title:"عرض جامعي تجريبي", demo_note:"استخدم بيانات تجريبية فقط. التطبيق لا يشخّص ولا يحل محل المختص الصحي.", card_first_aid:"الطوارئ والإسعافات الأولية", emergency_title:"الطوارئ والإسعافات الأولية", locator_title:"الصيدليات والمستشفيات", symptom_tab_guide:"الدليل", symptom_tab_check:"الاستبيان", symptom_tab_diary:"مفكرة الأعراض", symptom_urgent_title:"متى تطلب مساعدة عاجلة؟", symptom_urgent:"اتصل بالرقم 112 عند صعوبة التنفس الشديدة أو ألم الصدر أو علامات السكتة أو الإغماء أو النزيف الغزير أو التدهور السريع. ولغير ذلك تواصل مع مختص صحي.", symptom_limit:"هذا الدليل للتثقيف العام ولا يقيّم الحالة الفردية.", symptom_severe:"هل الأعراض شديدة أو تتفاقم بسرعة؟", symptom_duration:"منذ متى بدأت؟", symptom_review:"عرض إرشادات تثقيفية", symptom_diary_title:"مفكرة أعراض تجريبية", symptom_save:"حفظ الإدخال على هذا الجهاز", symptom_clear:"مسح المفكرة", symptom_privacy:"لا تدخل معلومات تعريفية أو صحية حساسة. تبقى الإدخالات في هذا المتصفح." });
    Object.assign(I18N.ta, { identify:"மருந்தை அடையாளம் காண்க", welcome_title:"தெளிவாக ஒழுங்குபடுத்தப்பட்ட பராமரிப்பு கருவிகள்", welcome_desc:"கல்வி நோக்கத்திற்கான மருந்துத் தகவல்களையும் சுகாதாரக் கருவிகளையும் பாருங்கள்.", demo_title:"பல்கலைக்கழகக் காட்சி", demo_note:"மாதிரி தரவை மட்டும் பயன்படுத்தவும். இது நோயறிதல் கருவியல்ல.", card_first_aid:"அவசர உதவி மற்றும் முதலுதவி", emergency_title:"அவசர உதவி மற்றும் முதலுதவி", locator_title:"மருந்தகங்கள் மற்றும் மருத்துவமனைகள்", symptom_tab_guide:"வழிகாட்டி", symptom_tab_check:"கேள்வித்தாள்", symptom_tab_diary:"அறிகுறி பதிவு", symptom_urgent_title:"எப்போது உடனடி உதவி தேவை?", symptom_urgent:"கடுமையான மூச்சுத்திணறல், மார்பு வலி, பக்கவாத அறிகுறிகள், மயக்கம், அதிக இரத்தப்போக்கு அல்லது விரைவில் மோசமடையும் நிலை இருந்தால் 112-ஐ அழைக்கவும். மற்ற கவலைகளுக்கு மருத்துவரை அணுகவும்.", symptom_limit:"இது பொதுக் கல்விக்கான வழிகாட்டி மட்டுமே; தனிநபர் நிலையை மதிப்பிடாது.", symptom_severe:"அறிகுறிகள் கடுமையாக உள்ளனவா அல்லது வேகமாக மோசமடைகிறதா?", symptom_duration:"எவ்வளவு காலமாக உள்ளது?", symptom_review:"கல்வி வழிகாட்டலைப் பார்க்கவும்", symptom_diary_title:"சோதனை அறிகுறிப் பதிவு", symptom_save:"இந்தச் சாதனத்தில் சேமி", symptom_clear:"பதிவை அழி", symptom_privacy:"அடையாளம் காணும் அல்லது உணர்வுப்பூர்வமான சுகாதாரத் தகவலை உள்ளிட வேண்டாம். பதிவுகள் இந்த உலாவியிலேயே இருக்கும்." });
    Object.assign(I18N.en, {account_personal:"Personal details",account_photo:"Add photo",account_privacy:"Demo only. Data stays in this browser and is not encrypted. Do not enter real personal or health information. Account linking is a visual demo and does not connect to external services.",account_emergency:"Emergency contacts",account_emergency_hint:"Demo contact details only. This does not call emergency services.",account_contact1_name:"Contact 1 name",account_contact1_phone:"Contact 1 phone",account_contact2_name:"Contact 2 name",account_contact2_phone:"Contact 2 phone",account_emergency_number:"Local emergency number (India: 112)",account_preferences:"Preferences",account_language:"Language",account_theme:"Appearance",account_units:"Units",account_reminders:"Show reminder notifications (demo)",account_health_demo:"Demo health notes",account_notes:"Notes & extra fields",account_notes_ph:"Notes for this demo profile",account_extra_name:"Extra field name",account_extra_value:"Extra field value",account_connections:"Connected accounts",account_connections_hint:"Display-only demo. No Google, Apple or other account is actually linked.",account_linked:"Demo linked",account_not_linked:"Not linked",account_saved:"Profile and preferences saved on this device.",account_photo_large:"Choose a photo smaller than 5 MB.",account_photo_error:"Could not read this photo.",account_connection_note:"Demo status only; no account service was contacted.",profile_title:"Profile & settings",profile_desc:"Manage your demonstration profile, preferences and saved details."});
    Object.assign(I18N.ar, {account_personal:"البيانات الشخصية",account_photo:"إضافة صورة",account_privacy:"للعرض التجريبي فقط. تبقى البيانات في هذا المتصفح دون تشفير. لا تدخل بيانات شخصية أو صحية حقيقية. ربط الحسابات شكلي ولا يتصل بخدمات خارجية.",account_emergency:"جهات اتصال الطوارئ",account_emergency_hint:"بيانات تجريبية فقط؛ لا يتصل التطبيق بخدمات الطوارئ.",account_contact1_name:"اسم جهة الاتصال الأولى",account_contact1_phone:"هاتف جهة الاتصال الأولى",account_contact2_name:"اسم جهة الاتصال الثانية",account_contact2_phone:"هاتف جهة الاتصال الثانية",account_emergency_number:"رقم الطوارئ المحلي (الهند: 112)",account_preferences:"التفضيلات",account_language:"اللغة",account_theme:"المظهر",account_units:"الوحدات",account_reminders:"إظهار تذكيرات (تجريبي)",account_health_demo:"ملاحظات صحية تجريبية",account_notes:"ملاحظات وحقول إضافية",account_notes_ph:"ملاحظات لهذا الملف التجريبي",account_extra_name:"اسم الحقل الإضافي",account_extra_value:"قيمة الحقل الإضافي",account_connections:"الحسابات المرتبطة",account_connections_hint:"عرض تجريبي فقط. لا يرتبط التطبيق فعليًا بحساب Google أو Apple أو غيرهما.",account_linked:"مرتبط تجريبيًا",account_not_linked:"غير مرتبط",account_saved:"تم حفظ الملف والتفضيلات على هذا الجهاز.",account_photo_large:"اختر صورة حجمها أقل من 5 ميغابايت.",account_photo_error:"تعذرت قراءة الصورة.",account_connection_note:"حالة تجريبية فقط؛ لم يتم الاتصال بأي خدمة حسابات.",profile_title:"الملف الشخصي والإعدادات",profile_desc:"إدارة ملف العرض التجريبي والتفضيلات والبيانات المحفوظة."});
    Object.assign(I18N.ta, {account_personal:"தனிப்பட்ட விவரங்கள்",account_photo:"புகைப்படத்தைச் சேர்",account_privacy:"சோதனைக்காக மட்டும். தரவு இந்த உலாவியில் குறியாக்கமின்றி சேமிக்கப்படும். உண்மையான தனிப்பட்ட அல்லது சுகாதாரத் தகவலை உள்ளிட வேண்டாம். கணக்கு இணைப்பு காட்சிக்கான மாதிரி மட்டுமே.",account_emergency:"அவசரத் தொடர்புகள்",account_emergency_hint:"சோதனை விவரங்கள் மட்டும்; அவசர சேவையை அழைக்காது.",account_contact1_name:"தொடர்பு 1 பெயர்",account_contact1_phone:"தொடர்பு 1 தொலைபேசி",account_contact2_name:"தொடர்பு 2 பெயர்",account_contact2_phone:"தொடர்பு 2 தொலைபேசி",account_emergency_number:"உள்ளூர் அவசர எண் (இந்தியா: 112)",account_preferences:"விருப்பங்கள்",account_language:"மொழி",account_theme:"தோற்றம்",account_units:"அலகுகள்",account_reminders:"நினைவூட்டல்களைக் காட்டு (சோதனை)",account_health_demo:"சோதனை சுகாதாரக் குறிப்புகள்",account_notes:"குறிப்புகள் மற்றும் கூடுதல் புலங்கள்",account_notes_ph:"இந்தச் சோதனை சுயவிவரத்திற்கான குறிப்புகள்",account_extra_name:"கூடுதல் புலத்தின் பெயர்",account_extra_value:"கூடுதல் புலத்தின் மதிப்பு",account_connections:"இணைக்கப்பட்ட கணக்குகள்",account_connections_hint:"காட்சிக்கான மாதிரி மட்டும். Google, Apple அல்லது வேறு கணக்கு உண்மையில் இணைக்கப்படவில்லை.",account_linked:"சோதனையில் இணைக்கப்பட்டது",account_not_linked:"இணைக்கப்படவில்லை",account_saved:"சுயவிவரமும் விருப்பங்களும் இந்தச் சாதனத்தில் சேமிக்கப்பட்டன.",account_photo_large:"5 MB-க்கு குறைவான புகைப்படத்தைத் தேர்ந்தெடுக்கவும்.",account_photo_error:"புகைப்படத்தைப் படிக்க முடியவில்லை.",account_connection_note:"சோதனை நிலை மட்டும்; கணக்கு சேவையை அணுகவில்லை.",profile_title:"சுயவிவரம் மற்றும் அமைப்புகள்",profile_desc:"சோதனை சுயவிவரம், விருப்பங்கள் மற்றும் சேமித்த விவரங்களை நிர்வகிக்கவும்."});
    I18N.en.card_alternatives = "Similar Medicines"; I18N.ar.card_alternatives = "أدوية مشابهة"; I18N.ta.card_alternatives = "ஒத்த மருந்துகள்";
    I18N.en.alternatives_title = "Similar Medicines"; I18N.ar.alternatives_title = "أدوية مشابهة"; I18N.ta.alternatives_title = "ஒத்த மருந்துகள்";
    I18N.en.alternatives_desc = "Browse medicines with related uses. Similar use does not mean interchangeable."; I18N.ar.alternatives_desc = "تصفح أدوية ذات استخدامات متقاربة. تشابه الاستخدام لا يعني إمكانية الاستبدال."; I18N.ta.alternatives_desc = "தொடர்புடைய பயன்பாடுள்ள மருந்துகளைப் பாருங்கள். ஒத்த பயன்பாடு மாற்றிப் பயன்படுத்தலாம் என்பதல்ல.";
    I18N.en.locator_desc = "Map searches use Google Maps results. Pharmacy stock and opening hours are not confirmed by this demo."; I18N.ar.locator_desc = "تستخدم عمليات البحث نتائج خرائط Google. لا يؤكد التطبيق توفر الدواء أو ساعات العمل."; I18N.ta.locator_desc = "வரைபடத் தேடல் Google Maps முடிவுகளைப் பயன்படுத்துகிறது. மருந்து இருப்பும் நேரமும் உறுதி செய்யப்படவில்லை.";
    I18N.en.symptom_desc = "Experimental education tool. It does not diagnose conditions or recommend medicines."; I18N.ar.symptom_desc = "أداة تعليمية تجريبية، لا تشخّص الحالات ولا توصي بالأدوية."; I18N.ta.symptom_desc = "கல்விக்கான சோதனை கருவி; இது நோயறிதலோ மருந்துப் பரிந்துரையோ வழங்காது.";
  }

  window.setLanguage = function (language) {
    if (originalSetLanguage) originalSetLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    var accountLanguage = document.getElementById("accountLanguage"); if (accountLanguage) accountLanguage.value = language;
    translateEnhancements();
  };

  var accountFields = ["emergencyName1","emergencyPhone1","emergencyName2","emergencyPhone2","emergencyNumber","accountNotes","accountExtraLabel","accountExtraValue"];
  function loadAccountExtras() {
    try {
      var saved = JSON.parse(localStorage.getItem("pharmaAccountExtras") || "{}");
      accountFields.forEach(function (id) { var el=document.getElementById(id); if(el && saved[id] != null) el.value=saved[id]; });
      var photo=localStorage.getItem("pharmaProfilePhoto"), img=document.getElementById("profileAvatarPreview"), placeholder=document.getElementById("profileAvatarPlaceholder");
      if(photo && img){img.src=photo;img.hidden=false;if(placeholder)placeholder.hidden=true;}
      ["Google","Apple","Email"].forEach(function(name){var state=document.getElementById("connection"+name);if(state)state.textContent=(saved.connections||{})[name]?((I18N[lang()]||I18N.en).account_linked):((I18N[lang()]||I18N.en).account_not_linked);});
      var language=document.getElementById("accountLanguage");if(language)language.value=localStorage.getItem("pharmaLang")||"en";
      var theme=document.getElementById("accountTheme");if(theme)theme.value=localStorage.getItem("pharmaTheme")||"light";
      if(saved.accountUnits)document.getElementById("accountUnits").value=saved.accountUnits;
      document.getElementById("accountReminders").checked=!!saved.accountReminders;
    } catch (_) {}
  }
  var originalSaveProfile=window.saveProfile;
  window.saveProfile=function(){
    if(originalSaveProfile)originalSaveProfile();
    try { var saved={}; accountFields.forEach(function(id){var el=document.getElementById(id);if(el)saved[id]=el.value;});
      var prior=JSON.parse(localStorage.getItem("pharmaAccountExtras")||"{}");saved.connections=prior.connections||{};saved.accountUnits=document.getElementById("accountUnits").value;saved.accountReminders=document.getElementById("accountReminders").checked;
      localStorage.setItem("pharmaAccountExtras",JSON.stringify(saved));var status=document.getElementById("profileStatus");if(status)status.textContent=(I18N[lang()]||I18N.en).account_saved;
    } catch (_) { var status=document.getElementById("profileStatus");if(status)status.textContent="Storage is full. Remove the profile photo or export your data before saving."; }
  };
  window.previewProfilePhoto=function(input){var file=input.files&&input.files[0];if(!file)return;var t=(I18N[lang()]||I18N.en);if(file.size>5*1024*1024){alert(t.account_photo_large);input.value="";return;}var reader=new FileReader();reader.onload=function(){var im=new Image();im.onload=function(){var c=document.createElement("canvas"),scale=Math.min(1,640/Math.max(im.width,im.height));c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext("2d").drawImage(im,0,0,c.width,c.height);var data=c.toDataURL("image/jpeg",.78);try{localStorage.setItem("pharmaProfilePhoto",data);var preview=document.getElementById("profileAvatarPreview");preview.src=data;preview.hidden=false;document.getElementById("profileAvatarPlaceholder").hidden=true;}catch(e){alert("Could not save this photo. Try a smaller image.");}};im.onerror=function(){alert(t.account_photo_error);};im.src=reader.result;};reader.onerror=function(){alert(t.account_photo_error);};reader.readAsDataURL(file);};
  window.toggleDemoConnection=function(provider){var data=JSON.parse(localStorage.getItem("pharmaAccountExtras")||"{}");data.connections=data.connections||{};data.connections[provider]=!data.connections[provider];localStorage.setItem("pharmaAccountExtras",JSON.stringify(data));var el=document.getElementById("connection"+provider);el.textContent=data.connections[provider]?(I18N[lang()]||I18N.en).account_linked:(I18N[lang()]||I18N.en).account_not_linked;var status=document.getElementById("profileStatus");if(status)status.textContent=(I18N[lang()]||I18N.en).account_connection_note;};
  window.setAccountTheme=function(value){if(value==="dark"){document.body.classList.add("dark");localStorage.setItem("pharmaTheme","dark");}else{document.body.classList.remove("dark");localStorage.setItem("pharmaTheme","light");}};
  loadAccountExtras();

  var deferredPwaPrompt=null;
  if(typeof I18N!=="undefined"){
    Object.assign(I18N.en,{pwa_install:"Install PharmaCare",pwa_help:"To install PharmaCare, open this page from its secure HTTPS website. On Android, use your browser menu and choose Install app or Add to Home screen. On iPhone/iPad, open in Safari, tap Share, then Add to Home Screen. On a computer, use the install icon in Chrome/Edge or the browser menu.",pwa_offline:"The install option needs the app to be published on a secure HTTPS website first."});
    Object.assign(I18N.ar,{pwa_install:"تثبيت PharmaCare",pwa_help:"لتثبيت PharmaCare افتح رابط الموقع الآمن HTTPS. على Android افتح قائمة المتصفح واختر تثبيت التطبيق أو الإضافة إلى الشاشة الرئيسية. على iPhone أو iPad افتح الصفحة في Safari، واضغط مشاركة ثم إضافة إلى الشاشة الرئيسية. على الكمبيوتر استخدم رمز التثبيت في Chrome أو Edge أو قائمة المتصفح.",pwa_offline:"يتطلب التثبيت أولًا نشر التطبيق على موقع آمن HTTPS."});
    Object.assign(I18N.ta,{pwa_install:"PharmaCare-ஐ நிறுவு",pwa_help:"PharmaCare-ஐ நிறுவ பாதுகாப்பான HTTPS இணையதளத்தில் இருந்து திறக்கவும். Android-இல் உலாவி மெனுவில் Install app அல்லது Add to Home screen என்பதைத் தேர்ந்தெடுக்கவும். iPhone/iPad-இல் Safari-யில் திறந்து Share, பின்னர் Add to Home Screen என்பதைத் தேர்ந்தெடுக்கவும். கணினியில் Chrome/Edge நிறுவல் குறியீடு அல்லது உலாவி மெனுவைப் பயன்படுத்தவும்.",pwa_offline:"நிறுவுவதற்கு முன் செயலியை பாதுகாப்பான HTTPS இணையதளத்தில் வெளியிட வேண்டும்."});
  }
  window.addEventListener("beforeinstallprompt",function(event){event.preventDefault();deferredPwaPrompt=event;});
  window.addEventListener("appinstalled",function(){var b=document.getElementById("installAppButton");if(b)b.hidden=true;deferredPwaPrompt=null;});
  window.installPharmaCare=async function(){
    var current=(I18N&&I18N[lang()]&&I18N[lang()].pwa_help)||"Install this app from your browser menu.";
    if(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches){var button=document.getElementById("installAppButton");if(button)button.hidden=true;return;}
    if(deferredPwaPrompt){deferredPwaPrompt.prompt();var choice=await deferredPwaPrompt.userChoice;if(choice&&choice.outcome==="accepted"){var b=document.getElementById("installAppButton");if(b)b.hidden=true;}deferredPwaPrompt=null;return;}
    var secure=window.isSecureContext||location.hostname==="localhost"||location.hostname==="127.0.0.1";
    if(!secure)current=(I18N&&I18N[lang()]&&I18N[lang()].pwa_offline)||current;
    window.alert(current);
  };
  if(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches){var installButton=document.getElementById("installAppButton");if(installButton)installButton.hidden=true;}

  window.openPage = function (page) {
    if (page === "firstAidPage") page = "emergencyGuidePage";
    if (page === "contactPage" || page === "loginPage" || page === "signupPage") page = "dashboardPage";
    var target = document.getElementById(page);
    if (!target) return;
    document.querySelectorAll(".page").forEach(function (el) { el.classList.remove("active"); });
    target.classList.add("active");
    document.querySelectorAll(".bottom-nav-item").forEach(function (el) { el.classList.toggle("active", (el.getAttribute("onclick") || "").indexOf("'" + page + "'") !== -1); });
    if (page === "libraryPage" && window.renderLibraryPage) window.renderLibraryPage();
    if (page === "pharmacyLocatorPage") window.initLocatorMap();
    if (page === "symptomCheckerPage") { window.showSymptomTab("guide"); window.renderSymptomDiary(); }
    if (page === "medicineToolsPage") stopBarcodeScanner(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.formatDrugCardHtml = function (drug) {
    if (!drug) return "";
    var ingredientNames = { amoxicillin_clavulanate: "Amoxicillin + clavulanic acid", trimethoprim_sulfamethoxazole: "Trimethoprim + sulfamethoxazole", nirmatrelvir_ritonavir: "Nirmatrelvir + ritonavir", phenazone_combo: drug.displayName || "Combination medicine" };
    var ingredient = drug.ingredient || drug.genericName || ingredientNames[drug.id] || (drug.id || drug.displayName || "").replace(/_/g, " ");
    var query = encodeURIComponent(drug.displayName || ingredient);
    var brands = Array.isArray(drug.brands) && drug.brands.length ? drug.brands.join(", ") : "";
    var sections = [
      "<h4>" + esc(drug.displayName || ingredient) + "</h4>",
      "<p><strong>" + esc(L("active")) + "</strong> " + safeField(ingredient) + "</p>",
      "<p><strong>" + esc(L("brands")) + "</strong> " + safeField(brands) + "</p>",
      "<p><strong>" + esc(L("use")) + "</strong> " + safeField(drug.use) + "</p>",
      "<p><strong>" + esc(L("dose")) + "</strong> " + safeField(drug.dose) + "</p>",
      "<p><strong>" + esc(L("side")) + "</strong> " + safeField(drug.side) + "</p>",
      "<p><strong>" + esc(L("interactions")) + "</strong> " + safeField(drug.interactions) + "</p>",
      "<p><strong>" + esc(L("precautions")) + "</strong> " + safeField(drug.contra) + "</p>",
      "<p><strong>" + esc(L("pregnancy")) + "</strong> " + safeField(drug.preg) + "</p>",
      "<p><strong>" + esc(L("storage")) + "</strong> " + esc(L("noData")) + "</p>",
      "<p><strong>" + esc(L("overdose")) + "</strong> " + esc(L("noData")) + "</p>",
      "<p><strong>" + esc(L("priceLabel")) + "</strong> " + esc(L("priceUnknown")) + "</p>",
      "<p><a href='https://nppaipdms.gov.in/NPPA/PharmaSahiDaam/searchMedicine' target='_blank' rel='noopener'>" + esc(L("officialPrice")) + "</a></p>",
      "<p><a href='https://cdsco.gov.in/opencms/opencms/en/Notifications/Prescribing-Information/' target='_blank' rel='noopener'>CDSCO prescribing information</a> · <a href='https://drugregistry.abdm.gov.in/' target='_blank' rel='noopener'>Government of India Drug Registry</a></p>",
      "<p class='source-note'>" + esc(L("sourceStatus")) + "</p>"
    ];
    var related = Array.isArray(drug.alts) ? drug.alts.map(function (id) { return DB[id]; }).filter(Boolean) : [];
    if (drug.category) Object.keys(DB).some(function (id) { var other = DB[id]; if (other && id !== drug.id && other.category === drug.category && related.indexOf(other) === -1 && related.length < 6) related.push(other); return related.length >= 6; });
    if (related.length) sections.push("<p><strong>" + esc(L("similar")) + "</strong> " + related.map(function (d) { return esc(d.displayName || d.id); }).join(" · ") + "</p><p class='source-note'>" + esc(L("alternativesWarning")) + "</p>");
    return "<article class='medicine-detail-card' data-query='" + query + "'>" + sections.join("") + "</article>";
  };

  function levenshtein(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    var prev = [], curr = [];
    for (var j = 0; j <= b.length; j++) prev[j] = j;
    for (var i = 1; i <= a.length; i++) {
      curr[0] = i;
      for (j = 1; j <= b.length; j++) curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = curr.slice();
    }
    return prev[b.length];
  }
  function norm(value) { return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim(); }

  window.resolveDrugMatches = function (query, limit) {
    var basic = originalResolveDrugMatches ? originalResolveDrugMatches(query, limit || 10) : [];
    if (basic.length && basic[0].score >= 58) return basic;
    var q = norm(query);
    if (q.length < 4) return basic;
    var candidates = [];
    Object.keys(DB).forEach(function (id) {
      var d = DB[id] || {};
      var names = [id.replace(/_/g, " "), d.displayName || ""].concat(d.brands || [], d.aliases || []);
      if (d.name) names.push(d.name);
      if (window.getDrugArabicPronunciation) names.push(window.getDrugArabicPronunciation(d));
      var distance = Math.min.apply(null, names.map(function (n) { var nn = norm(n); return nn === q ? 0 : levenshtein(q, nn); }));
      if (distance <= Math.max(1, Math.floor(q.length / 5))) candidates.push({ id: id, d: d, score: Math.max(20, 55 - distance * 10) });
    });
    candidates.sort(function (a, b) { return b.score - a.score; });
    return basic.concat(candidates).filter(function (item, index, all) { return all.findIndex(function (x) { return x.id === item.id; }) === index; }).slice(0, limit || 10);
  };

  function setupSearchSuggestions() {
    var input = document.getElementById("drugSearchInput"); var list = document.getElementById("drugSearchSuggestions");
    if (!input || !list || input.dataset.suggestionsReady) return;
    input.dataset.suggestionsReady = "1";
    input.addEventListener("input", function () {
      var q = norm(input.value); list.replaceChildren(); if (q.length < 2) return;
      var opts = [];
      Object.keys(DB).some(function (id) {
        var d = DB[id] || {}; var names = [d.displayName || id].concat(d.brands || [], d.aliases || []);
        names.forEach(function (name) { if (norm(name).includes(q) && opts.indexOf(name) === -1 && opts.length < 12) opts.push(name); });
        return opts.length >= 12;
      });
      opts.forEach(function (name) { var option = document.createElement("option"); option.value = name; list.appendChild(option); });
    });
  }

  window.searchDrug = function () {
    var input = document.getElementById("drugSearchInput"); var result = document.getElementById("drugInfoResult");
    if (!input || !result) return;
    var q = input.value.trim(); if (!q) { result.textContent = L("nameRequired"); return; }
    var matches = window.resolveDrugMatches(q, 6);
    if (!matches.length) { result.textContent = lang() === "ar" ? "لم نعثر على هذا الدواء في المكتبة المحلية." : "No match in the local medicine library."; return; }
    if (matches[0].score < 58) {
      result.innerHTML = "<strong>" + (lang() === "ar" ? "هل تقصد؟" : "Did you mean?") + "</strong><ul>" + matches.slice(0, 5).map(function (m) { return "<li><button type='button' class='search-suggestion' data-id='" + esc(m.id) + "'>" + esc(m.d.displayName || m.id) + "</button></li>"; }).join("") + "</ul>";
      result.querySelectorAll(".search-suggestion").forEach(function (button) { button.addEventListener("click", function () { var d = DB[button.dataset.id]; result.innerHTML = window.formatDrugCardHtml(d); input.value = d.displayName || d.id; }); });
      return;
    }
    result.innerHTML = window.formatDrugCardHtml(matches[0].d);
  };

  window.showDrugDetail = function (id) {
    var el = document.getElementById("drugInfoResult"); var d = DB[id];
    if (el && d) { el.innerHTML = window.formatDrugCardHtml(d); el.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  };

  window.findAlternatives = function () {
    var input = document.getElementById("alternativeInput"); var result = document.getElementById("alternativeResult"); if (!input || !result) return;
    var matches = window.resolveDrugMatches(input.value, 1); if (!matches.length) { result.textContent = L("nameRequired"); return; }
    var d = matches[0].d; var related = (d.alts || []).map(function (id) { return DB[id]; }).filter(Boolean);
    if (d.category) Object.keys(DB).some(function (id) { var other = DB[id]; if (other && id !== d.id && other.category === d.category && related.indexOf(other) === -1 && related.length < 6) related.push(other); return related.length >= 6; });
    result.innerHTML = "<strong>" + esc(L("similar")) + "</strong><div class='similar-medicine-grid'>" + (related.length ? related.map(function (item) { return "<article class='similar-medicine-card'><h4>" + esc(item.displayName || item.id) + "</h4><p>" + esc(item.use || L("noData")) + "</p><button type='button' data-id='" + esc(item.id) + "'>" + (lang() === "ar" ? "التفاصيل" : "Details") + "</button></article>"; }).join("") : "<p>" + esc(L("noData")) + "</p>") + "</div><p class='source-note'>" + esc(L("alternativesWarning")) + "</p>";
    result.querySelectorAll("button[data-id]").forEach(function (button) { button.addEventListener("click", function () { window.openPage("libraryPage"); var search = document.getElementById("drugSearchInput"); if (search) search.value = DB[button.dataset.id].displayName || button.dataset.id; window.showDrugDetail(button.dataset.id); }); });
  };

  window.compareDrugs = function () {
    var first = (document.getElementById("compareDrug1") || {}).value || "";
    var second = (document.getElementById("compareDrug2") || {}).value || "";
    var result = document.getElementById("comparisonResult"); if (!result) return;
    var a = window.resolveDrugMatches(first, 1)[0]; var b = window.resolveDrugMatches(second, 1)[0];
    if (!a || !b) { result.textContent = lang() === "ar" ? "أدخل اسمي دواء موجودين في المكتبة." : "Enter two medicines found in the library."; return; }
    var rows = [["Medicine", a.d.displayName || a.id, b.d.displayName || b.id], ["Active ingredient", a.d.ingredient || a.id.replace(/_/g," "), b.d.ingredient || b.id.replace(/_/g," ")], ["Category", getCategoryDisplay(a.d.category) || L("noData"), getCategoryDisplay(b.d.category) || L("noData")], ["Common use", a.d.use || L("noData"), b.d.use || L("noData")], ["Side effects", a.d.side || L("noData"), b.d.side || L("noData")], ["Interactions", a.d.interactions || L("noData"), b.d.interactions || L("noData")]];
    result.innerHTML = "<div class='comparison-scroll'><table><thead><tr><th>Detail</th><th>" + esc(a.d.displayName || a.id) + "</th><th>" + esc(b.d.displayName || b.id) + "</th></tr></thead><tbody>" + rows.slice(1).map(function (row) { return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div><p class='source-note'>" + esc(L("alternativesWarning")) + "</p>";
  };

  window.initLocatorMap = function () {
    var frame = document.getElementById("mapFrame"); if (frame) frame.src = "https://www.google.com/maps?q=" + encodeURIComponent(L("mapDefault")) + "&z=13&output=embed";
    setStatus("locatorStatus", L("locationNeeded"));
  };
  window.openPlaceSearch = function (place) { var frame = document.getElementById("mapFrame"); if (frame) frame.src = "https://www.google.com/maps?q=" + encodeURIComponent(place) + "&z=14&output=embed"; setStatus("locatorStatus", "Google Maps: " + place); };
  window.searchCoimbatorePlaces = function () {
    var value = (document.getElementById("placeSearch") || {}).value || "";
    var query = value.trim() ? value.trim() + ", Coimbatore, Tamil Nadu" : L("mapDefault");
    var frame = document.getElementById("mapFrame"); if (frame) frame.src = "https://www.google.com/maps?q=" + encodeURIComponent(query) + "&z=13&output=embed";
    setStatus("locatorStatus", (lang() === "ar" ? "يُجرى البحث في خرائط Google عن: " : "Searching Google Maps for: ") + query);
  };
  window.showNearby = function (type) { window.openPlaceSearch((type === "hospital" ? "hospitals" : "pharmacies") + " in Coimbatore Tamil Nadu"); };

  window.showSymptomTab = function (name) {
    ["guide", "check", "diary"].forEach(function (tab) { var el = document.getElementById("symptom" + (tab === "guide" ? "Guide" : tab === "check" ? "Check" : "Diary") + "Tab"); if (el) el.hidden = tab !== name; });
  };
  window.checkSymptoms = function () {
    var field = document.getElementById("symptomDescription"); var result = document.getElementById("symptomResult"); if (!field || !result) return;
    var text = field.value.trim().toLowerCase(); if (!text) { result.textContent = L("symptomEmpty"); return; }
    var emergency = document.getElementById("symptomEmergencyFlag");
    var red = emergency && emergency.checked || /chest pain|difficulty breathing|shortness of breath|unconscious|faint|stroke|face droop|severe bleeding|seizure|severe allergic|ألم صدر|ضيق تنفس|فقدان الوعي|نزيف شديد|سكتة|மார்பு வலி|மூச்சுத் திணறல்|மயக்கம்|அதிக இரத்தப்போக்கு/i.test(text);
    result.classList.toggle("emergency-result", !!red);
    result.textContent = red ? L("symptomRed") : L("symptomGeneral");
  };
  window.renderSymptomDiary = function () {
    var el = document.getElementById("symptomDiaryList"); if (!el) return;
    var items = []; try { items = JSON.parse(localStorage.getItem("pharmaDemoSymptomDiary") || "[]"); } catch (e) { items = []; }
    el.innerHTML = items.length ? items.map(function (item) { return "<p><strong>" + esc(new Date(item.date).toLocaleString()) + "</strong><br>" + esc(item.text) + "</p>"; }).join("") : esc(L("diaryEmpty"));
  };
  window.saveSymptomDiary = function () {
    var field = document.getElementById("symptomDiaryInput"); if (!field || !field.value.trim()) { setStatus("symptomDiaryList", L("symptomEmpty")); return; }
    var items = []; try { items = JSON.parse(localStorage.getItem("pharmaDemoSymptomDiary") || "[]"); } catch (e) { items = []; }
    items.unshift({ text: field.value.trim(), date: new Date().toISOString() }); localStorage.setItem("pharmaDemoSymptomDiary", JSON.stringify(items.slice(0, 50))); field.value = ""; window.renderSymptomDiary();
  };
  window.clearSymptomDiary = function () { localStorage.removeItem("pharmaDemoSymptomDiary"); window.renderSymptomDiary(); };

  function matchBarcode(code) {
    var normalized = String(code || "").replace(/\s/g, "");
    if (normalized.startsWith("]d2")) normalized = normalized.slice(3);
    if (/^\(01\)\d{14}/.test(normalized)) normalized = normalized.slice(4, 18);
    var productId = barcodeCatalog[normalized];
    return productId && DB[productId] ? { id: productId, drug: DB[productId] } : null;
  }
  window.lookupMedicineBarcode = function (value) {
    var input = document.getElementById("barcodeInput"); var code = String(value || (input && input.value) || "").trim();
    if (!code) { setStatus("barcodeStatus", L("nameRequired")); return; }
    var match = matchBarcode(code);
    var status = document.getElementById("barcodeStatus"); if (!status) return;
    if (match) { status.innerHTML = "<p>" + esc(L("decoded") + code) + "</p>" + window.formatDrugCardHtml(match.drug); }
    else status.innerHTML = esc(L("decodedNoMatch") + code + ". " + L("noMatch")) + " <a href='https://www.gs1india.org/services/gtin-validation' target='_blank' rel='noopener'>GS1 India GTIN Validation</a> · <a href='https://drugregistry.abdm.gov.in/' target='_blank' rel='noopener'>ABDM Drug Registry</a>";
  };
  window.startBarcodeScanner = async function () {
    var video = document.getElementById("barcodeVideo");
    if (!video) return;
    if (!window.isSecureContext) { setStatus("barcodeStatus", L("secure")); return; }
    if (!("BarcodeDetector" in window)) { setStatus("barcodeStatus", L("cameraUnsupported")); return; }
    try {
      var preferred = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "qr_code", "data_matrix"];
      var supported = await BarcodeDetector.getSupportedFormats();
      var formats = preferred.filter(function (format) { return supported.indexOf(format) !== -1; });
      if (!formats.length) { setStatus("barcodeStatus", L("cameraUnsupported")); return; }
      var detector = new BarcodeDetector({ formats: formats });
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      video.srcObject = stream; video.classList.add("scanning"); await video.play(); setStatus("barcodeStatus", L("secure"));
      var detecting = false;
      scanTimer = window.setInterval(async function () {
        if (detecting || !video.videoWidth || video.readyState < 2) return;
        detecting = true;
        try {
          var codes = await detector.detect(video);
          if (codes.length) { window.lookupMedicineBarcode(codes[0].rawValue); stopBarcodeScanner(false); }
        } catch (e) { setStatus("barcodeStatus", L("cameraError")); stopBarcodeScanner(false); }
        finally { detecting = false; }
      }, 450);
    } catch (error) { setStatus("barcodeStatus", L("cameraError")); stopBarcodeScanner(false); }
  };
  function stopBarcodeScanner(showMessage) {
    if (scanTimer) { clearInterval(scanTimer); scanTimer = null; }
    if (stream) { stream.getTracks().forEach(function (track) { track.stop(); }); stream = null; }
    var video = document.getElementById("barcodeVideo"); if (video) { video.pause(); video.srcObject = null; video.classList.remove("scanning"); }
    if (showMessage) setStatus("barcodeStatus", L("cameraStopped"));
  }
  window.stopBarcodeScanner = stopBarcodeScanner;
  window.identifyPillByImprint = function () {
    var imprint = ((document.getElementById("pillImprintInput") || {}).value || "").trim().toLowerCase();
    var shape = ((document.getElementById("pillShapeInput") || {}).value || "").toLowerCase();
    var color = ((document.getElementById("pillColorInput") || {}).value || "").toLowerCase();
    var out = document.getElementById("pillIdentifyResult"); if (!out) return;
    if (!imprint) { out.textContent = L("symptomEmpty"); return; }
    var matches = pillCatalog.filter(function (entry) { return String(entry.imprint || "").trim().toLowerCase() === imprint && (!shape || entry.shape === shape) && (!color || entry.color === color) && entry.verified === true && DB[entry.drugId]; });
    out.innerHTML = matches.length ? matches.map(function (entry) { return window.formatDrugCardHtml(DB[entry.drugId]); }).join("") : esc(L("noMatch"));
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupSearchSuggestions();
    translateEnhancements();
    window.showSymptomTab("guide");
    document.querySelectorAll("#dashboardPage .grid .card").forEach(function (card, index) { card.dataset.icon = ["🧮","⚖️","💊","⏰","🚑","📘","📋","🩺","💉","🧪","⚠️","🧭","🧑‍⚕️","🔎","📊"][index] || "✚"; card.style.setProperty("--card-icon", "'" + card.dataset.icon + "'"); });
  });
  window.addEventListener("load", function () { translateEnhancements(); setupSearchSuggestions(); window.openPage("dashboardPage"); });
})();
