function openPage(page){

let pages=document.querySelectorAll(".page");

pages.forEach(p=>p.classList.remove("active"));

document.getElementById(page).classList.add("active");

if(page==="pharmacyLocatorPage"){
initLocatorMap();
}

if(page==="libraryPage"){
renderLibraryPage();
}


}

const I18N={
en:{
dashboard:"Dashboard",
back:"← Back",
login:"Login",
createAccount:"Create Account",
continueGuest:"Continue as Guest",
email:"Email",
password:"Password",
drugLibrary:"Drug & Herbal Library",
camera:"Camera",
account:"Account",
drugs:"Drugs",
locator:"Locator",
news:"News",
nearbyPharmacies:"Nearby Pharmacies",
nearbyHospitals:"Nearby Hospitals",
drugNewsTitle:"Drug News",
refreshNews:"Refresh News"
},
ar:{
dashboard:"لوحة التحكم",
back:"← رجوع",
login:"تسجيل الدخول",
createAccount:"إنشاء حساب",
continueGuest:"الدخول كضيف",
email:"البريد الإلكتروني",
password:"كلمة المرور",
drugLibrary:"مكتبة الأدوية والأعشاب",
camera:"الكاميرا",
account:"الحساب",
drugs:"الأدوية",
locator:"الخريطة",
news:"الأخبار",
nearbyPharmacies:"صيدليات قريبة",
nearbyHospitals:"مستشفيات قريبة",
drugNewsTitle:"أخبار الأدوية",
refreshNews:"تحديث الأخبار"
},
ta:{
dashboard:"டாஷ்போர்டு",
back:"← பின் செல்",
login:"உள்நுழைவு",
createAccount:"கணக்கு உருவாக்கு",
continueGuest:"விருந்தினராக தொடரவும்",
email:"மின்னஞ்சல்",
password:"கடவுச்சொல்",
drugLibrary:"மருந்துகள் & மூலிகை நூலகம்",
camera:"கேமரா",
account:"கணக்கு",
drugs:"மருந்துகள்",
locator:"வரைபடம்",
news:"செய்திகள்",
nearbyPharmacies:"அருகிலுள்ள மருந்தகங்கள்",
nearbyHospitals:"அருகிலுள்ள மருத்துவமனைகள்",
drugNewsTitle:"மருந்து செய்திகள்",
refreshNews:"செய்திகளை புதுப்பி"
}
};

// Add full-page UI keys (all pages)
Object.assign(I18N.en,{
login_title:"Login",
login_subtitle:"Welcome back to PharmaCare",
login_email_ph:"Email",
login_password_ph:"Password",
login_btn:"Login",
login_or:"or",
login_create_btn:"Create Account",
login_guest_btn:"Continue as Guest",
signup_title:"Create Account",
signup_name_ph:"Name",
signup_email_ph:"Email",
signup_password_ph:"Password",
signup_create_btn:"Create Account",
dashboard_title:"Dashboard",
back_btn:"← Back",
card_medical_calculators:"Medical Calculators",
card_dose_calculator:"Dose Calculator",
card_bmi_calculator:"BMI Calculator",
card_drug_interaction:"Drug Interaction",
card_medicine_library:"Medicine Library (200+)",
card_medication_reminder:"Medication Reminder",
card_pill_identifier:"Pill Identifier",
card_first_aid:"First Aid",
card_disease_guide:"Disease Guide",
card_clinical_guidelines:"Clinical Guidelines",
card_availability:"Drug Availability Checker",
card_alternatives:"Alternative Drugs",
card_medical_notes:"Medical Notes",
medical_calc_title:"Medical Calculators",
calc_dose_by_weight:"Dose by Weight Calculator",
calc_pediatric_dose:"Pediatric Dose Calculator",
calc_iv_drip:"IV Drip Rate Calculator",
calc_crcl:"Creatinine Clearance (Cockcroft-Gault)",
calc_bsa:"Body Surface Area (BSA)",
calc_infusion_rate:"Infusion Rate Calculator",
calc_paracetamol_safe:"Paracetamol Safe Dose",
pediatric_title:"Pediatric Dose Calculator",
ivdrip_title:"IV Drip Rate Calculator",
crcl_title:"Creatinine Clearance (Cockcroft-Gault)",
bsa_title:"Body Surface Area (BSA)",
infusion_title:"Infusion Rate Calculator",
para_safe_title:"Paracetamol Safe Dose",
placeholder_soon:"This section will be added here.",
dose_title:"Dose Calculator",
dose_drug_ph:"Drug Name",
dose_weight_ph:"Weight (kg)",
dose_calc_btn:"Calculate",
side_effect_title:"Side Effect Checker",
side_effect_desc:"Type a symptom (e.g., cough, bleeding, nausea) and the app suggests possible drug-related causes (educational only).",
side_effect_ph:"Symptom (e.g., cough, bleeding)",
side_effect_btn:"Check Side Effect",
bmi_title:"BMI Calculator",
bmi_height_ph:"Height (cm)",
bmi_weight_ph:"Weight (kg)",
bmi_calc_btn:"Calculate BMI",
interaction_title:"Drug Interaction",
interaction_drug1_ph:"Drug 1",
interaction_drug2_ph:"Drug 2",
interaction_btn:"Check Interaction",
library_title:"Medicine Library",
library_desc:"Browse 200+ medicines by illness category, search any drug, or explore the herbal section.",
library_search_ph:"Search medicine name...",
library_search_btn:"Search",
library_stats:"{count} medicines in {categories} illness categories",
library_herbs_title:"🌿 Herbal & Natural Remedies",
library_browse_title:"Browse by Illness Category",
library_view_all:"All",
cat_pain_fever:"Pain, Fever & Inflammation",
cat_infection:"Infections & Antibiotics",
cat_cardiovascular:"Heart, BP & Cholesterol",
cat_diabetes:"Diabetes & Metabolic",
cat_respiratory:"Asthma, COPD & Cough",
cat_mental_health:"Depression, Anxiety & Sleep",
cat_gi:"Stomach & Digestion",
cat_allergy_skin:"Allergies, Skin & Eyes",
cat_hormones:"Thyroid, Hormones & Reproductive",
cat_neurology:"Migraine, Seizures & Nerve Pain",
cat_urology:"Kidney, Bladder & Prostate",
cat_blood:"Blood, Clotting & Anemia",
cat_immunology:"Autoimmune & Immunology",
cat_vitamins:"Vitamins & Supplements",
cat_herbal:"Herbal & Natural Remedies",
library_category_label:"Category",
library_pronunciation:"Arabic pronunciation",
library_what_treats:"What it treats",
library_typical_dose:"Typical dose",
library_side_effects:"Side effects",
library_herbal_tag:"Herbal / natural remedy",
library_full_details:"Full details",
pill_title:"Pill Identifier",
pill_desc:"Enter pill color, shape, and imprint to help identify the medication.",
pill_color_ph:"Color (e.g., White)",
pill_shape_ph:"Shape (e.g., Round)",
pill_imprint_ph:"Imprint letters/numbers",
pill_btn:"Identify Pill",
firstaid_title:"First Aid",
firstaid_desc:"Quick tips for common situations. This is not a substitute for a clinician or emergency services.",
disease_title:"Disease Guide",
disease_desc:"A brief guide to common diseases. Educational only and not a substitute for medical advice.",
guidelines_title:"Clinical Guidelines",
guidelines_desc:"Simplified summaries for education only. Always refer to up-to-date official guidelines.",
availability_title:"Drug Availability Checker",
availability_desc:"Type a drug name to check availability, brand names, and alternatives (simple demo).",
availability_ph:"Example: Paracetamol, Augmentin",
availability_btn:"Check Availability",
alternatives_title:"Alternative Drugs",
alternatives_desc:"Type a drug name (e.g., Augmentin) to see possible alternatives (educational only; prescriber decides).",
alternatives_ph:"Example: Augmentin",
alternatives_btn:"Find Alternatives",
notes_title:"Medical Notes",
notes_desc:"A place to save pharmacist notes or patient info (stored locally on this device only).",
notes_btn:"Save Notes",
reminder_title:"Medication Reminder",
reminder_drug_ph:"Drug Name",
reminder_time_ph:"Time",
reminder_btn:"Add Reminder",
profile_title:"Profile",
profile_desc:"Enter your basic information for the app to use.",
profile_name_ph:"Name",
profile_age_ph:"Age",
profile_blood_ph:"Blood Group (e.g., O+)",
profile_diseases_ph:"Chronic Diseases",
profile_meds_ph:"Current Medications",
profile_allergies_ph:"Allergies",
profile_btn:"Save Profile",
camera_title:"Camera Tools",
camera_prescription_title:"📷 Prescription Scanner",
camera_prescription_desc:"Open your camera or upload a photo of a prescription to review it.",
camera_open_btn:"Open Camera",
camera_upload_btn:"Upload Image",
barcode_title:"🏷️ Drug Barcode Scanner",
barcode_desc:"Type a barcode or tap a demo code below to look up a medicine.",
barcode_ph:"Example: 1234567890123",
barcode_btn:"Lookup Barcode",
locator_title:"Pharmacy Locator",
camera_stop_btn:"Stop Camera",
camera_hint:"Align prescription inside the frame",
locator_desc:"Your exact location is shown on the map. Tap below to find the nearest pharmacies or hospitals.",
locator_me_btn:"My Location",
locator_getting:"Getting your exact location...",
locator_found:"Showing your location on the map.",
locator_pharm_found:"Showing nearest pharmacies to you.",
locator_hosp_found:"Showing nearest hospitals to you.",
locator_error:"Unable to retrieve your location. Please enable GPS/location permissions.",
locator_unsupported:"Geolocation is not supported by your browser.",
locator_pharm_btn:"Nearby Pharmacies",
locator_hosp_btn:"Nearby Hospitals",
nav_dashboard:"Dashboard",
nav_camera:"Camera",
nav_drugs:"Drugs",
nav_account:"Account",
nav_locator:"Locator",
nav_faq:"FAQ",
loading_text:"Loading PharmaCare...",
hero_title:"Your Trusted Medical Assistant",
hero_subtitle:"Medicine information, practical tools, and safety-focused educational resources.",
feature_drug_analysis:"Drug Analysis",
feature_drug_analysis_desc:"Comprehensive drug information and dosage calculations",
feature_smart_search:"Smart Search",
feature_smart_search_desc:"Quick search across 200+ medicines and herbs",
feature_interactions:"Interaction Checker",
feature_interactions_desc:"Check for drug-drug interactions safely",
disclaimer_text:"This app provides educational information only and does not replace professional medical advice. Always consult a doctor or pharmacist.",
faq_title:"Frequently Asked Questions",
faq_q1:"Is this app a substitute for medical advice?",
faq_a1:"No. This app provides educational information only. Always consult a qualified healthcare professional for medical decisions.",
faq_q2:"How accurate is the drug information?",
faq_a2:"Our database includes common medications and their typical uses. However, medications change frequently, and individual responses vary. Verify with official sources.",
faq_q3:"Can I use this for emergency situations?",
faq_a3:"No. This app is not designed for emergencies. Call emergency services immediately for urgent medical situations.",
faq_q4:"Is my data stored securely?",
faq_a4:"Your notes and profile are stored locally on your device. We do not collect or transmit personal medical data to external servers.",
faq_q5:"How do I report an error in drug information?",
faq_a5:"Check current official prescribing information or ask a pharmacist to verify medicine details.",
about_title:"About PharmaCare",
about_welcome_title:"Welcome to PharmaCare",
about_welcome_desc:"PharmaCare is a modern healthcare companion designed to provide educational drug information, practical medical tools, and productivity features in a simple and accessible interface. The project aims to help students, healthcare professionals, and everyday users quickly access useful medical resources while maintaining an intuitive user experience.",
about_mission_title:"Our Mission",
about_mission_desc:"Our mission is to make medical information and essential healthcare utilities easier to access through technology while encouraging responsible use and consultation with qualified healthcare professionals.",
about_features_title:"Key Features",
about_feat_1:"Drug information library",
about_feat_2:"Medical calculators",
about_feat_3:"Medication notes and organization tools",
about_feat_4:"Dark mode support",
about_feat_5:"Multilingual interface",
about_feat_6:"Mobile-friendly responsive design",
about_feat_7:"Progressive Web App (PWA) support",
about_feat_8:"Camera and barcode-related utilities where available",
about_tech_title:"Technologies Used",
about_tech_desc:"PharmaCare is built using modern web technologies, including:",
about_tech_1:"HTML5",
about_tech_2:"CSS3",
about_tech_3:"Vanilla JavaScript",
about_tech_4:"Local Storage APIs",
about_tech_5:"Progressive Web App technologies",
about_tech_6:"Responsive design principles",
about_sources_title:"Information Sources and References",
about_sources_desc:"The information presented in PharmaCare is compiled from educational materials, standard medical references, publicly available healthcare resources, and established clinical formulas where applicable. The project encourages verification through trusted healthcare organizations and official pharmaceutical references.",
about_disclaimer_title:"Medical Disclaimer",
about_disclaimer_desc:"PharmaCare is intended for educational and informational purposes only. It does not provide medical diagnosis, treatment, or professional healthcare advice. Users should always consult licensed physicians, pharmacists, or other qualified healthcare professionals before making medical decisions or taking medications.",
about_privacy_title:"Privacy",
about_privacy_desc:"PharmaCare is designed to respect user privacy. Personal notes and preferences may be stored locally on the user's device. Users should avoid storing highly sensitive medical or personal information unless appropriate security measures are implemented.",
about_accuracy_title:"Accuracy and Limitations",
about_accuracy_desc:"Although every effort is made to improve the quality and reliability of the information provided, no guarantee is made regarding completeness or accuracy. Medical knowledge evolves continuously, and recommendations may change over time.",
about_opensource_title:"Open Source and Credits",
about_opensource_desc:"This project acknowledges the contributions of the open-source community and the educational resources that make modern web development possible. Any third-party libraries, icons, fonts, or external assets should be credited according to their respective licenses.",
about_vision_title:"Project Vision",
about_vision_desc:"The long-term vision of PharmaCare is to become a comprehensive healthcare assistant that combines reliable educational content, smart productivity tools, medication management, and modern technology to improve access to medical knowledge.",
about_contact_title:"Contact",
about_contact_desc:"For questions, feedback, bug reports, or collaboration opportunities, users are encouraged to contact the project maintainer through the project's official communication channels or repository.",
about_version:"Version",
about_last_updated:"Last Updated",
account_links_title:"Quick Links",
about_link:"About PharmaCare",
card_health_tracker:"Health Tracker",
card_vaccination:"Vaccination Records",
card_lab_results:"Lab Results",
card_allergies:"Allergy Checker",
card_symptom_checker:"Symptom Checker",
card_emergency_guide:"Emergency Guide",
card_drug_comparison:"Drug Comparison",
health_tracker_title:"Health Tracker",
health_tracker_desc:"Track your daily health metrics including blood pressure, heart rate, weight, and more.",
metric_bp:"Blood Pressure",
metric_heart_rate:"Heart Rate",
metric_weight:"Weight",
metric_glucose:"Blood Glucose",
metric_save:"Save",
vaccination_title:"Vaccination Records",
vaccination_desc:"Keep track of your vaccinations and upcoming booster doses.",
vaccine_name_ph:"Vaccine Name",
vaccine_date_ph:"Date",
vaccine_next_ph:"Next Dose Date",
vaccine_add:"Add Record",
lab_results_title:"Lab Results",
lab_results_desc:"Store and track your laboratory test results for easy reference.",
lab_test_ph:"Test Name",
lab_date_ph:"Test Date",
lab_value_ph:"Result Value",
lab_range_ph:"Normal Range",
lab_add:"Add Result",
allergy_title:"Allergy Checker",
allergy_desc:"Check for potential allergens in medications and foods.",
allergy_input_ph:"Enter medication or food",
allergy_check:"Check for Allergens",
my_allergies_title:"My Allergies",
my_allergy_ph:"Add your allergy",
allergy_add:"Add",
symptom_title:"Symptom Checker",
symptom_desc:"Describe your symptoms to get potential causes and recommendations.",
symptom_desc_ph:"Describe your symptoms...",
symptom_check:"Analyze Symptoms",
emergency_title:"Emergency Guide",
emergency_desc:"Quick reference for emergency situations and first aid procedures.",
emergency_heart:"🚨 Heart Attack",
emergency_heart_desc:"Chest pain, shortness of breath, nausea. Call emergency immediately.",
emergency_stroke:"🚨 Stroke",
emergency_stroke_desc:"Face drooping, arm weakness, speech difficulty. Act FAST.",
emergency_breathing:"⚠️ Breathing Difficulty",
emergency_breathing_desc:"Sit upright, use inhaler if available, call emergency if severe.",
emergency_bleeding:"⚠️ Severe Bleeding",
emergency_bleeding_desc:"Apply direct pressure, elevate if possible, call emergency.",
emergency_burns:"ℹ️ Burns",
emergency_burns_desc:"Cool with running water, cover with sterile dressing, seek medical help.",
emergency_poison:"ℹ️ Poisoning",
emergency_poison_desc:"Call poison control, do not induce vomiting unless instructed.",
drug_comparison_title:"Drug Comparison",
drug_comparison_desc:"Compare two drugs side by side to understand differences and similarities.",
compare_drug1_ph:"First Drug",
compare_drug2_ph:"Second Drug",
compare_btn:"Compare Drugs"
});

Object.assign(I18N.ar,{
login_title:"تسجيل الدخول",
login_subtitle:"مرحباً بعودتك إلى PharmaCare",
login_email_ph:"البريد الإلكتروني",
login_password_ph:"كلمة المرور",
login_btn:"دخول",
login_or:"أو",
login_create_btn:"إنشاء حساب",
login_guest_btn:"الدخول كضيف",
signup_title:"إنشاء حساب",
signup_name_ph:"الاسم",
signup_email_ph:"البريد الإلكتروني",
signup_password_ph:"كلمة المرور",
signup_create_btn:"إنشاء حساب",
dashboard_title:"لوحة التحكم",
back_btn:"← رجوع",
card_medical_calculators:"الحاسبات الطبية",
card_dose_calculator:"حاسبة الجرعات",
card_bmi_calculator:"حاسبة BMI",
card_drug_interaction:"تداخلات دوائية",
card_medication_reminder:"تذكير الدواء",
card_pill_identifier:"التعرف على الحبة",
card_first_aid:"إسعافات أولية",
card_disease_guide:"دليل الأمراض",
card_clinical_guidelines:"إرشادات سريرية",
card_availability:"التحقق من توفر الدواء",
card_alternatives:"بدائل الأدوية",
card_medical_notes:"ملاحظات طبية",
medical_calc_title:"الحاسبات الطبية",
calc_dose_by_weight:"جرعة حسب الوزن",
calc_pediatric_dose:"جرعة الأطفال",
calc_iv_drip:"معدل التنقيط الوريدي",
calc_crcl:"تصفية الكرياتينين (Cockcroft‑Gault)",
calc_bsa:"مساحة سطح الجسم (BSA)",
calc_infusion_rate:"معدل التسريب",
calc_paracetamol_safe:"جرعة باراسيتامول آمنة",
pediatric_title:"جرعة الأطفال",
ivdrip_title:"معدل التنقيط الوريدي",
crcl_title:"تصفية الكرياتينين (Cockcroft‑Gault)",
bsa_title:"مساحة سطح الجسم (BSA)",
infusion_title:"معدل التسريب",
para_safe_title:"جرعة باراسيتامول آمنة",
placeholder_soon:"سيتم إضافة هذا القسم قريبًا.",
dose_title:"حاسبة الجرعات",
dose_drug_ph:"اسم الدواء",
dose_weight_ph:"الوزن (كجم)",
dose_calc_btn:"احسب",
side_effect_title:"فحص الآثار الجانبية",
side_effect_desc:"اكتب عرضًا (مثل: سعال، نزيف، غثيان) وسيقترح التطبيق أدوية قد تكون سببًا (تعليمي فقط).",
side_effect_ph:"العرض (مثل: سعال، نزيف)",
side_effect_btn:"تحقق",
bmi_title:"حاسبة BMI",
bmi_height_ph:"الطول (سم)",
bmi_weight_ph:"الوزن (كجم)",
bmi_calc_btn:"احسب BMI",
interaction_title:"تداخلات دوائية",
interaction_drug1_ph:"الدواء 1",
interaction_drug2_ph:"الدواء 2",
interaction_btn:"تحقق",
library_title:"مكتبة الأدوية",
library_desc:"تصفّح أكثر من 200 دواء حسب فئة المرض، أو ابحث عن أي دواء، أو استكشف قسم الأعشاب.",
library_search_ph:"ابحث عن اسم الدواء...",
library_search_btn:"بحث",
library_stats:"{count} دواء في {categories} فئة مرض",
library_herbs_title:"🌿 الأعشاب والعلاجات الطبيعية",
library_browse_title:"تصفح حسب فئة المرض",
library_view_all:"الكل",
cat_pain_fever:"الألم والحمى والالتهاب",
cat_infection:"العدوى والمضادات الحيوية",
cat_cardiovascular:"القلب وضغط الدم والكوليسترول",
cat_diabetes:"السكري والأيض",
cat_respiratory:"الربو وانسداد الرئة والسعال",
cat_mental_health:"الاكتئاب والقلق والنوم",
cat_gi:"المعدة والهضم",
cat_allergy_skin:"الحساسية والجلد والعيون",
cat_hormones:"الغدد والهرمونات والتناسل",
cat_neurology:"الصداع النصفي والصرع وآلام الأعصاب",
cat_urology:"الكلى والمثانة والبروستات",
cat_blood:"الدم والتخثر وفقر الدم",
cat_immunology:"المناعة الذاتية والمناعة",
cat_vitamins:"الفيتامينات والمكملات",
cat_herbal:"الأعشاب والعلاجات الطبيعية",
library_category_label:"الفئة",
library_pronunciation:"النطق بالعربي",
library_what_treats:"ما يعالجه",
library_typical_dose:"الجرعة المعتادة",
library_side_effects:"الآثار الجانبية",
library_herbal_tag:"🌿 عشب / علاج طبيعي",
library_full_details:"التفاصيل الكاملة",
card_medicine_library:"مكتبة الأدوية (200+)",
pill_title:"التعرف على الحبة",
pill_desc:"أدخل اللون والشكل والحروف للمساعدة في تحديد الدواء.",
pill_color_ph:"اللون (مثال: أبيض)",
pill_shape_ph:"الشكل (مثال: دائري)",
pill_imprint_ph:"الحروف/الأرقام",
pill_btn:"تحديد",
firstaid_title:"إسعافات أولية",
firstaid_desc:"نصائح سريعة للحالات الشائعة. ليست بديلاً عن الطبيب أو الطوارئ.",
disease_title:"دليل الأمراض",
disease_desc:"دليل مختصر للأمراض الشائعة (تعليمي فقط).",
guidelines_title:"إرشادات سريرية",
guidelines_desc:"ملخصات مبسطة للتعليم فقط. ارجع دائمًا للمصادر الرسمية المحدثة.",
availability_title:"توفر الدواء",
availability_desc:"اكتب اسم الدواء لمعرفة التوفر والأسماء التجارية والبدائل (ديمو).",
availability_ph:"مثال: Paracetamol, Augmentin",
availability_btn:"تحقق",
alternatives_title:"بدائل الأدوية",
alternatives_desc:"اكتب اسم الدواء للحصول على بدائل محتملة (تعليمي فقط).",
alternatives_ph:"مثال: Augmentin",
alternatives_btn:"اعرض البدائل",
notes_title:"ملاحظات طبية",
notes_desc:"لحفظ ملاحظات الصيدلي أو معلومات المريض (محليًا على هذا الجهاز فقط).",
notes_btn:"حفظ",
reminder_title:"تذكير الدواء",
reminder_drug_ph:"اسم الدواء",
reminder_time_ph:"الوقت",
reminder_btn:"إضافة",
profile_title:"الملف الشخصي",
profile_desc:"أدخل بياناتك الأساسية لاستخدامها داخل التطبيق.",
profile_name_ph:"الاسم",
profile_age_ph:"العمر",
profile_blood_ph:"فصيلة الدم (مثال: O+)",
profile_diseases_ph:"أمراض مزمنة",
profile_meds_ph:"أدوية حالية",
profile_allergies_ph:"حساسية",
profile_btn:"حفظ الملف",
camera_title:"أدوات الكاميرا",
camera_prescription_title:"📷 ماسح الوصفات",
camera_prescription_desc:"اختر: فتح الكاميرا أو رفع صورة من الجهاز.",
camera_open_btn:"فتح الكاميرا",
camera_upload_btn:"رفع صورة",
barcode_title:"🏷️ ماسح باركود الأدوية",
barcode_desc:"وجّه الكاميرا للباركود (ديمو) أو اكتب الكود يدويًا.",
barcode_ph:"مثال: 1234567890123",
barcode_btn:"بحث",
locator_title:"محدد الصيدليات",
locator_desc:"اعثر على الصيدليات والمستشفيات القريبة باستخدام موقعك.",
locator_pharm_btn:"صيدليات قريبة",
locator_hosp_btn:"مستشفيات قريبة",
news_title:"أخبار الأدوية",
news_desc:"أخبار مباشرة (حسب توفر الشبكة) من واجهات OpenFDA العامة.",
news_refresh_btn:"تحديث",
nav_dashboard:"الرئيسية",
nav_camera:"كاميرا",
nav_drugs:"أدوية",
nav_account:"حساب",
nav_locator:"خريطة",
nav_news:"أخبار",
nav_faq:"الأسئلة الشائعة",
loading_text:"جاري تحميل PharmaCare...",
hero_title:"مساعدك الطبي الموثوق",
hero_subtitle:"تحليل الأدوية، البحث الذكي، التحقق من التداخلات، والمساعدة بالذكاء الاصطناعي - كل ذلك في مكان واحد",
feature_drug_analysis:"تحليل الأدوية",
feature_drug_analysis_desc:"معلومات شاملة عن الأدوية وحسابات الجرعات",
feature_smart_search:"البحث الذكي",
feature_smart_search_desc:"بحث سريع في أكثر من 200 دواء وعشب",
feature_interactions:"التحقق من التداخلات",
feature_interactions_desc:"تحقق من تداخلات الأدوية بأمان",
disclaimer_text:"هذا التطبيق يقدم معلومات تعليمية فقط ولا يستبدل المشورة الطبية المهنية. استشر دائماً طبيباً أو صيدلياً.",
faq_title:"الأسئلة الشائعة",
faq_q1:"هل هذا التطبيق بديل عن المشورة الطبية؟",
faq_a1:"لا. هذا التطبيق يقدم معلومات تعليمية فقط. استشر دائماً متخصصاً طبياً مؤهلاً للقرارات الطبية.",
faq_q2:"ما مدى دقة معلومات الأدوية؟",
faq_a2:"قاعدة بياناتنا تشمل الأدوية الشائعة واستخداماتها المعتادة. ومع ذلك، تتغير الأدوية بشكل متكرر، وتختلف الاستجابات الفردية. تحقق من المصادر الرسمية.",
faq_q3:"هل يمكنني استخدامه في حالات الطوارئ؟",
faq_a3:"لا. هذا التطبيق غير مصمم لحالات الطوارئ. اتصل بخدمات الطوارئ فوراً للحالات الطبية العاجلة.",
faq_q4:"هل بياناتي محفوظة بأمان؟",
faq_a4:"ملاحظاتك وملفك الشخصي محفوظة محلياً على جهازك. نحن لا نجمع ولا ننقل البيانات الطبية الشخصية إلى خوادم خارجية.",
faq_q5:"كيف أبلغ عن خطأ في معلومات الدواء؟",
faq_a5:"اتصل بنا عبر صفحة التواصل مع تفاصيل حول أي عدم دقة. نحن نحدث قاعدة بياناتنا باستمرار بناءً على الملاحظات.",
about_title:"عن PharmaCare",
about_welcome_title:"مرحباً بكم في PharmaCare",
about_welcome_desc:"إن PharmaCare هو رفيق رعاية صحية حديث مصمم لتقديم معلومات دوائية تعليمية، وأدوات طبية عملية، وميزات إنتاجية في واجهة بسيطة وسهلة الاستخدام. يهدف المشروع إلى مساعدة الطلاب، ومحترفي الرعاية الصحية، والمستخدمين العاديين في الوصول بسرعة إلى الموارد الطبية المفيدة مع الحفاظ على تجربة مستخدم بديهية.",
about_mission_title:"مهمتنا",
about_mission_desc:"تتمثل مهمتنا في تسهيل الوصول إلى المعلومات الطبية والمرافق الأساسية للرعاية الصحية من خلال التكنولوجيا، مع تشجيع الاستخدام المسؤول واستشارة محترفي الرعاية الصحية المؤهلين.",
about_features_title:"الميزات الرئيسية",
about_feat_1:"مكتبة معلومات الأدوية",
about_feat_2:"الحاسبات الطبية",
about_feat_3:"ملاحظات الأدوية وأدوات التنظيم",
about_feat_4:"دعم الوضع الداكن",
about_feat_5:"واجهة متعددة اللغات",
about_feat_6:"تصميم متجاوب متوافق مع الهواتف المحمولة",
about_feat_7:"دعم تطبيق الويب التقدمي (PWA)",
about_feat_8:"أدوات الكاميرا والباركود عند توفرها",
about_tech_title:"التقنيات المستخدمة",
about_tech_desc:"تم بناء PharmaCare باستخدام تقنيات الويب الحديثة، بما في ذلك:",
about_tech_1:"HTML5",
about_tech_2:"CSS3",
about_tech_3:"جافا سكريبت النقي (Vanilla JavaScript)",
about_tech_4:"واجهات برمجة تطبيقات التخزين المحلي (Local Storage APIs)",
about_tech_5:"تقنيات تطبيقات الويب التقدمية (PWA)",
about_tech_6:"مبادئ التصميم المتجاوب",
about_sources_title:"مصادر المعلومات والمراجع",
about_sources_desc:"تم تجميع المعلومات المقدمة في PharmaCare من المواد التعليمية، والمراجع الطبية القياسية، وموارد الرعاية الصحية المتاحة للجمهور، والمعادلات السريرية المعترف بها عند الاقتضاء. يشجع المشروع على التحقق من خلال منظمات الرعاية الصحية الموثوقة والمراجع الدوائية الرسمية.",
about_disclaimer_title:"إخلاء المسؤولية الطبي",
about_disclaimer_desc:"تم تصميم PharmaCare للأغراض التعليمية والمعلوماتية فقط. ولا يقدم تشخيصاً طبياً أو علاجاً أو مشورة رعاية صحية مهنية. يجب على المستخدمين دائماً استشارة الأطباء أو الصيادلة المرخصين أو غيرهم من محترفي الرعاية الصحية المؤهلين قبل اتخاذ القرارات الطبية أو تناول الأدوية.",
about_privacy_title:"الخصوصية",
about_privacy_desc:"تم تصميم PharmaCare لاحترام خصوصية المستخدمين. قد يتم تخزين الملاحظات والتفضيلات الشخصية محلياً على جهاز المستخدم. يجب على المستخدمين تجنب تخزين معلومات طبية أو شخصية حساسة للغاية ما لم يتم تطبيق تدابير أمنية مناسبة.",
about_accuracy_title:"الدقة والقيود",
about_accuracy_desc:"على الرغم من بذل كل جهد ممكن لتحسين جودة وموثوقية المعلومات المقدمة، لا يتم تقديم أي ضمان فيما يتعلق بالاكتمال أو الدقة. تتطور المعرفة الطبية باستمرار، وقد تتغير التوصيات بمرور الوقت.",
about_opensource_title:"المصدر المفتوح والائتمان",
about_opensource_desc:"يقر هذا المشروع بمساهمات مجتمع المصادر المفتوحة والموارد التعليمية التي تجعل تطوير الويب الحديث ممكناً. يجب الإشارة إلى أي مكتبات أو أيقونات أو خطوط أو أصول خارجية تابعة لجهات خارجية وفقاً لتراخيصها الخاصة.",
about_vision_title:"رؤية المشروع",
about_vision_desc:"الرؤية طويلة المدى لـ PharmaCare هي أن تصبح مساعداً شاملاً للرعاية الصحية يجمع بين المحتوى التعليمي الموثوق وأدوات الإنتاجية الذكية وإدارة الأدوية والتكنولوجيا الحديثة لتحسين الوصول إلى المعرفة الطبية.",
about_contact_title:"الاتصال",
about_contact_desc:"للأسئلة أو التعليقات أو تقارير الأخطاء أو فرص التعاون، يُشجع المستخدمون على الاتصال بمسؤول صيانة المشروع من خلال قنوات الاتصال الرسمية للمشروع أو المستودع.",
about_version:"الإصدار",
about_last_updated:"آخر تحديث",
account_links_title:"روابط سريعة",
about_link:"عن PharmaCare",
card_health_tracker:"تتبع الصحة",
card_vaccination:"سجلات التطعيم",
card_lab_results:"نتائج المختبر",
card_allergies:"فاحص الحساسية",
card_symptom_checker:"فاحص الأعراض",
card_emergency_guide:"دليل الطوارئ",
card_drug_comparison:"مقارنة الأدوية",
health_tracker_title:"تتبع الصحة",
health_tracker_desc:"تتبع المقاييس الصحية اليومية بما في ذلك ضغط الدم ومعدل ضربات القلب والوزن والمزيد.",
metric_bp:"ضغط الدم",
metric_heart_rate:"معدل ضربات القلب",
metric_weight:"الوزن",
metric_glucose:"سكر الدم",
metric_save:"حفظ",
vaccination_title:"سجلات التطعيم",
vaccination_desc:"تتبع التطعيمات وجرعات التعزيز القادمة.",
vaccine_name_ph:"اسم اللقاح",
vaccine_date_ph:"التاريخ",
vaccine_next_ph:"تاريخ الجرعة التالية",
vaccine_add:"إضافة سجل",
lab_results_title:"نتائج المختبر",
lab_results_desc:"تخزين وتتبع نتائج الاختبارات المعملية للمرجع السهل.",
lab_test_ph:"اسم الاختبار",
lab_date_ph:"تاريخ الاختبار",
lab_value_ph:"قيمة النتيجة",
lab_range_ph:"النطاق الطبيعي",
lab_add:"إضافة نتيجة",
allergy_title:"فاحص الحساسية",
allergy_desc:"تحقق من المواد المسببة للحساسية المحتملة في الأدوية والأطعمة.",
allergy_input_ph:"أدخل دواء أو طعام",
allergy_check:"التحقق من المواد المسببة للحساسية",
my_allergies_title:"حساسياتي",
my_allergy_ph:"أضف حساسيتك",
allergy_add:"إضافة",
symptom_title:"فاحص الأعراض",
symptom_desc:"صف أعراضك للحصول على الأسباب المحتملة والتوصيات.",
symptom_desc_ph:"صف أعراضك...",
symptom_check:"تحليل الأعراض",
emergency_title:"دليل الطوارئ",
emergency_desc:"مرجع سريع لحالات الطوارئ وإجراءات الإسعافات الأولية.",
emergency_heart:"🚨 نوبة قلبية",
emergency_heart_desc:"ألم في الصدر، ضيق في التنفس، غثيان. اتصل بالطوارئ فوراً.",
emergency_stroke:"🚨 سكتة دماغية",
emergency_stroke_desc:"تدلي الوجه، ضعف الذراع، صعوبة الكلام. تصرف بسرعة.",
emergency_breathing:"⚠️ صعوبة في التنفس",
emergency_breathing_desc:"اجلس بشكل مستقيم، استخدم البخاخ إذا كان متاحاً، اتصل بالطوارئ إذا كان شديداً.",
emergency_bleeding:"⚠️ نزيف شديد",
emergency_bleeding_desc:"طبق ضغطاً مباشراً، ارفع إذا أمكن، اتصل بالطوارئ.",
emergency_burns:"ℹ️ الحروق",
emergency_burns_desc:"برد بالماء الجاري، غط بضمادة معقمة، اطلب المساعدة الطبية.",
emergency_poison:"ℹ️ التسمم",
emergency_poison_desc:"اتصل بمركز مكافحة السموم، لا ت induce القيء إلا إذا تم توجيهك.",
drug_comparison_title:"مقارنة الأدوية",
drug_comparison_desc:"قارن بين دوائين جنباً إلى جنب لفهم الاختلافات والتشابهات.",
compare_drug1_ph:"الدواء الأول",
compare_drug2_ph:"الدواء الثاني",
compare_btn:"مقارنة الأدوية"
});

Object.assign(I18N.ta,{
login_title:"உள்நுழைவு",
login_subtitle:"PharmaCare-க்கு மீண்டும் வரவேற்கிறோம்",
login_email_ph:"மின்னஞ்சல்",
login_password_ph:"கடவுச்சொல்",
login_btn:"உள்நுழை",
login_or:"அல்லது",
login_create_btn:"கணக்கு உருவாக்கு",
login_guest_btn:"விருந்தினராக தொடரவும்",
signup_title:"கணக்கு உருவாக்கு",
signup_name_ph:"பெயர்",
signup_email_ph:"மின்னஞ்சல்",
signup_password_ph:"கடவுச்சொல்",
signup_create_btn:"கணக்கு உருவாக்கு",
dashboard_title:"டாஷ்போர்டு",
back_btn:"← பின் செல்",
card_medical_calculators:"மருத்துவ கணக்கீடுகள்",
card_dose_calculator:"மருந்தளவு கணக்கீடு",
card_bmi_calculator:"BMI கணக்கீடு",
card_drug_interaction:"மருந்து தொடர்புகள்",
card_medication_reminder:"மருந்து நினைவூட்டல்",
card_pill_identifier:"மாத்திரை அடையாளம்",
card_first_aid:"முதல் உதவி",
card_disease_guide:"நோய் வழிகாட்டி",
card_clinical_guidelines:"மருத்துவ வழிகாட்டுதல்கள்",
card_availability:"மருந்து கிடைப்புத் தகவல்",
card_alternatives:"மாற்று மருந்துகள்",
card_medical_notes:"மருத்துவ குறிப்புகள்",
medical_calc_title:"மருத்துவ கணக்கீடுகள்",
calc_dose_by_weight:"எடைக்கு ஏற்ப மருந்தளவு",
calc_pediatric_dose:"குழந்தைகளின் மருந்தளவு",
calc_iv_drip:"IV துளி விகிதம்",
calc_crcl:"கிரியாடினின் கிளியரன்ஸ் (Cockcroft‑Gault)",
calc_bsa:"உடல் மேற்பரப்பு (BSA)",
calc_infusion_rate:"இன்ஃப்யூஷன் விகிதம்",
calc_paracetamol_safe:"பாராசெட்டமால் பாதுகாப்பான அளவு",
pediatric_title:"குழந்தைகளின் மருந்தளவு",
ivdrip_title:"IV துளி விகிதம்",
crcl_title:"கிரியாடினின் கிளியரன்ஸ் (Cockcroft‑Gault)",
bsa_title:"உடல் மேற்பரப்பு (BSA)",
infusion_title:"இன்ஃப்யூஷன் விகிதம்",
para_safe_title:"பாராசெட்டமால் பாதுகாப்பான அளவு",
placeholder_soon:"இந்த பகுதி விரைவில் சேர்க்கப்படும்.",
dose_title:"மருந்தளவு கணக்கீடு",
dose_drug_ph:"மருந்தின் பெயர்",
dose_weight_ph:"எடை (கிலோ)",
dose_calc_btn:"கணக்கிடு",
side_effect_title:"பக்க விளைவு சரிபார்ப்பான்",
side_effect_desc:"ஒரு அறிகுறியை (உ.தா., cough, bleeding, nausea) உள்ளிடுங்கள்; தொடர்புடைய மருந்துகளை கல்வி நோக்கில் காட்டும்.",
side_effect_ph:"அறிகுறி (உ.தா., cough)",
side_effect_btn:"சரிபார்",
bmi_title:"BMI கணக்கீடு",
bmi_height_ph:"உயரம் (செ.மீ.)",
bmi_weight_ph:"எடை (கிலோ)",
bmi_calc_btn:"BMI கணக்கிடு",
interaction_title:"மருந்து தொடர்புகள்",
interaction_drug1_ph:"மருந்து 1",
interaction_drug2_ph:"மருந்து 2",
interaction_btn:"சரிபார்",
library_title:"மருந்துகள் & மூலிகை நூலகம்",
library_desc:"பொதுவான மருந்துகள் மற்றும் மூலிகைகள் — எளிய தேடலுடன்.",
library_search_title:"🔍 மருந்து தேடல்",
library_search_ph:"உதாரணம்: Paracetamol",
library_search_btn:"தேடு",
library_common_title:"💊 பொதுவான மருந்துகள்",
library_herbs_title:"🌿 மூலிகை பகுதி",
pill_title:"மாத்திரை அடையாளம்",
pill_desc:"நிறம், வடிவு, முத்திரை எழுத்துகளை உள்ளிடுங்கள்.",
pill_color_ph:"நிறம் (உ.தா., White)",
pill_shape_ph:"வடிவு (உ.தா., Round)",
pill_imprint_ph:"முத்திரை எழுத்து/எண்",
pill_btn:"அடையாளம் காட்டு",
firstaid_title:"முதல் உதவி",
firstaid_desc:"பொதுவான சூழல்களுக்கு விரைவான குறிப்புகள் (கல்வி நோக்கம்).",
disease_title:"நோய் வழிகாட்டி",
disease_desc:"பொதுவான நோய்களுக்கு சுருக்க வழிகாட்டி (கல்வி நோக்கம்).",
guidelines_title:"மருத்துவ வழிகாட்டுதல்கள்",
guidelines_desc:"கல்விக்கான எளிய சுருக்கம். எப்போதும் புதுப்பிக்கப்பட்ட அதிகாரப்பூர்வ வழிகாட்டுதல்களை பார்க்கவும்.",
availability_title:"மருந்து கிடைப்புத் தகவல்",
availability_desc:"மருந்துப் பெயரை உள்ளிட்டு கிடைப்பும் மாற்றுகளும் பார்க்க (டெமோ).",
availability_ph:"உதாரணம்: Paracetamol, Augmentin",
availability_btn:"சரிபார்",
alternatives_title:"மாற்று மருந்துகள்",
alternatives_desc:"மருந்துப் பெயரை உள்ளிட்டு மாற்றுகளை காண (கல்வி நோக்கம்).",
alternatives_ph:"உதாரணம்: Augmentin",
alternatives_btn:"மாற்றுகள்",
notes_title:"மருத்துவ குறிப்புகள்",
notes_desc:"மருந்தாளர் குறிப்புகள்/நோயாளி தகவல் (இந்த சாதனத்தில் மட்டும் சேமிப்பு).",
notes_btn:"சேமி",
reminder_title:"மருந்து நினைவூட்டல்",
reminder_drug_ph:"மருந்தின் பெயர்",
reminder_time_ph:"நேரம்",
reminder_btn:"சேர்",
profile_title:"சுயவிவரம்",
profile_desc:"அடிப்படை தகவலை உள்ளிடுங்கள்.",
profile_name_ph:"பெயர்",
profile_age_ph:"வயது",
profile_blood_ph:"இரத்த வகை (உ.தா., O+)",
profile_diseases_ph:"நீடித்த நோய்கள்",
profile_meds_ph:"தற்போதைய மருந்துகள்",
profile_allergies_ph:"ஒவ்வாமை",
profile_btn:"சேமி",
camera_title:"கேமரா கருவிகள்",
camera_prescription_title:"📷 சீட்டு ஸ்கேனர்",
camera_prescription_desc:"கேமராவை திறக்கவும் அல்லது படத்தை பதிவேற்றவும்.",
camera_open_btn:"கேமரா திற",
camera_upload_btn:"படம் பதிவேற்று",
barcode_title:"🏷️ மருந்து பார்கோடு ஸ்கேனர்",
barcode_desc:"பார்கோடு நோக்கி காட்டவும் (டெமோ) அல்லது கைமுறையாக உள்ளிடவும்.",
barcode_ph:"உதாரணம்: 1234567890123",
barcode_btn:"தேடு",
locator_title:"மருந்தகம் கண்டுபிடிப்பான்",
locator_desc:"உங்கள் இடத்தைப் பயன்படுத்தி அருகிலுள்ள மருந்தகங்கள்/மருத்துவமனைகள் காண்க.",
locator_pharm_btn:"அருகிலுள்ள மருந்தகங்கள்",
locator_hosp_btn:"அருகிலுள்ள மருத்துவமனைகள்",
news_title:"மருந்து செய்திகள்",
news_desc:"பொது OpenFDA API மூலம் கிடைக்கும் நேரடி தகவல்.",
news_refresh_btn:"புதுப்பி",
nav_dashboard:"டாஷ்போர்டு",
nav_camera:"கேமரா",
nav_drugs:"மருந்துகள்",
nav_account:"கணக்கு",
nav_locator:"வரைபடம்",
nav_news:"செய்திகள்",
nav_faq:"கேள்விகள்",
loading_text:"PharmaCare ஏற்றுகிறது...",
hero_title:"உங்கள் நம்பகமான மருத்துவ உதவியாளர்",
hero_subtitle:"மருந்துத் தகவல்கள், நடைமுறை கருவிகள் மற்றும் தெளிவான கல்வி உள்ளடக்கம் ஒரே இடத்தில்.",
feature_drug_analysis:"மருந்து பகுப்பாய்வு",
feature_drug_analysis_desc:"விரிவான மருந்து தகவல் மற்றும் மருந்தளவு கணக்கீடுகள்",
feature_smart_search:"ஸ்மார்ட் தேடல்",
feature_smart_search_desc:"200+ மருந்துகள் மற்றும் மூலிகைகளில் விரைவான தேடல்",
feature_interactions:"தொடர்பு சோதனை",
feature_interactions_desc:"மருந்து-மருந்து தொடர்புகளை பாதுகாப்பாக சரிபார்க்கவும்",
disclaimer_text:"இந்த பயன்பாடு கல்வி தகவலை மட்டுமே வழங்குகிறது, தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. எப்போதும் மருத்துவர் அல்லது மருந்தாளரை ஆலோசிக்கவும்.",
faq_title:"அடிக்கடி கேட்கப்படும் கேள்விகள்",
faq_q1:"இந்த பயன்பாடு மருத்துவ ஆலோசனைக்கு மாற்றா?",
faq_a1:"இல்லை. இந்த பயன்பாடு கல்வி தகவலை மட்டுமே வழங்குகிறது. மருத்துவ முடிவுகளுக்கு எப்போதும் தகுதியான சுகாதார நிபுணரை ஆலோசிக்கவும்.",
faq_q2:"மருந்து தகவல் எவ்வளவு துல்லியமானது?",
faq_a2:"எங்கள் தரவுத்தளம் பொதுவான மருந்துகள் மற்றும் அவற்றின் வழக்கமான பயன்பாடுகளை உள்ளடக்கியது. இருப்பினும், மருந்துகள் அடிக்கடி மாறுகின்றன, மற்றும் தனிப்பட்ட பதில்கள் வேறுபடுகின்றன. அதிகாரப்பூர்வ ஆதாரங்களை சரிபார்க்கவும்.",
faq_q3:"அவசரச் சூழ்நிலைகளில் இதைப் பயன்படுத்தலாம்?",
faq_a3:"இல்லை. இந்த பயன்பாடு அவசரச் சூழ்நிலைகளுக்கு வடிவமைக்கப்படவில்லை. அவசர மருத்துவ நிலைமைகளுக்கு உடனடி அவசர சேவைகளை அழைக்கவும்.",
faq_q4:"என் தரவு பாதுகாப்பாக சேமிக்கப்பட்டுள்ளதா?",
faq_a4:"உங்கள் குறிப்புகள் மற்றும் சுயவிவரம் உங்கள் சாதனத்தில் உள்ளூரில் சேமிக்கப்படுகின்றன. நாங்கள் தனிப்பட்ட மருத்துவ தரவை சேகரிக்கவோ அல்லது வெளிப்புற சர்வர்களுக்கு அனுப்பவோ இல்லை.",
faq_q5:"மருந்து தகவலில் பிழையை எப்படி புகாரளிக்கலாம்?",
faq_a5:"துல்லியமற்ற விவரங்களுடன் தொடர்பு பக்கத்தின் மூலம் எங்களைத் தொடர்பு கொள்ளவும். கருத்துக்களின் அடிப்படையில் எங்கள் தரவுத்தளத்தை தொடர்ந்து புதுப்பிக்கிறோம்.",
about_title:"PharmaCare பற்றி",
about_welcome_title:"PharmaCare-க்கு வரவேற்கிறோம்",
about_welcome_desc:"PharmaCare என்பது எளிய மற்றும் அணுகக்கூடிய இடைமுகத்தில் கல்வி சார்ந்த மருந்து தகவல்கள், நடைமுறை மருத்துவக் கருவிகள் மற்றும் உற்பத்தித்திறன் அம்சங்களை வழங்குவதற்காக வடிவமைக்கப்பட்ட ஒரு நவீன சுகாதாரத் துணையாகும். இத்திட்டம் மாணவர்கள், சுகாதாரப் பணியாளர்கள் மற்றும் அன்றாடப் பயனர்கள் எளிதான பயனர் அனுபவத்தைப் பராமரிக்கும் அதே வேளையில் பயनुள்ள மருத்துவ ஆதாரங்களை விரைவாக அணுக உதவுவதை நோக்கமாகக் கொண்டுள்ளது.",
about_mission_title:"எங்கள் நோக்கம்",
about_mission_desc:"தகுதி வாய்ந்த சுகாதார நிபுணர்களின் ஆலோசனை மற்றும் பொறுப்பான பயன்பாட்டை ஊக்குவிக்கும் அதே வேளையில், தொழில்நுட்பத்தின் மூலம் மருத்துவத் தகவல்கள் மற்றும் அத்தியாவசிய சுகாதாரப் பயன்பாடுகளை எளிதாக அணுகச் செய்வதே எங்கள் நோக்கம்.",
about_features_title:"முக்கிய அம்சங்கள்",
about_feat_1:"மருந்து தகவல் நூலகம்",
about_feat_2:"மருத்துவ கணக்கீடுகள்",
about_feat_3:"மருந்து குறிப்புகள் மற்றும் ஒழுங்கமைப்பு கருவிகள்",
about_feat_4:"டார்க் மோட் ஆதரவு",
about_feat_5:"பன்மொழி இடைமுகம்",
about_feat_6:"மொபைல் நட்பு பதிலளிக்கக்கூடிய வடிவமைப்பு",
about_feat_7:"முற்போக்கான வலை பயன்பாடு (PWA) ஆதரவு",
about_feat_8:"கேமரா மற்றும் பார்கோடு தொடர்பான பயன்பாடுகள் (கிடைக்கும் இடங்களில்)",
about_tech_title:"பயன்படுத்தப்பட்ட தொழில்நுட்பங்கள்",
about_tech_desc:"PharmaCare நவீன வலை தொழில்நுட்பங்களைப் பயன்படுத்தி கட்டமைக்கப்பட்டுள்ளது, இதில் பின்வருவன அடங்கும்:",
about_tech_1:"HTML5",
about_tech_2:"CSS3",
about_tech_3:"வெண்ணيلா ஜாவாஸ்கிரிப்ட்",
about_tech_4:"லோக்கல் ஸ்டோரேஜ் API-கள்",
about_tech_5:"முற்போக்கான வலை பயன்பாட்டு தொழில்நுட்பங்கள்",
about_tech_6:"பதிலளிக்கக்கூடிய வடிவமைப்பு கொள்கைகள்",
about_sources_title:"தகவல் ஆதாரங்கள் மற்றும் குறிப்புகள்",
about_sources_desc:"PharmaCare-ல் வழங்கப்பட்டுள்ள தகவல்கள் கல்விப் பொருட்கள், நிலையான மருத்துவக் குறிப்புகள், பொதுவில் கிடைக்கக்கூடிய சுகாதார ஆதாரங்கள் மற்றும் பொருந்தக்கூடிய இடங்களில் நிறுவப்பட்ட மருத்துவ சூத்திரங்களிலிருந்து தொகுக்கப்பட்டுள்ளன. நம்பகமான சுகாதார அமைப்புகள் மற்றும் அதிகாரப்பூர்வ மருந்து குறிப்புகள் மூலம் சரிபார்ப்பதை இத்திட்டம் ஊக்குவிக்கிறது.",
about_disclaimer_title:"மருத்துவ மறுப்பு",
about_disclaimer_desc:"PharmaCare கல்வி மற்றும் தகவல் நோக்கங்களுக்காக மட்டுமே வடிவமைக்கப்பட்டுள்ளது. இது மருத்துவக் கண்டறிதல், சிகிச்சை அல்லது தொழில்முறை சுகாதார ஆலோசனைகளை வழங்காது. மருத்துவ முடிவுகளை எடுப்பதற்கு அல்லது மருந்துகளை உட்கொள்வதற்கு முன்பு பயனர்கள் எப்போதும் உரிமம் பெற்ற மருத்துவர்கள், மருந்தக வல்லுநர்கள் அல்லது பிற தகுதி வாய்ந்த சுகாதார நிபுணர்களைக் கலந்தாலோசிக்க வேண்டும்.",
about_privacy_title:"தனியுரிமை",
about_privacy_desc:"PharmaCare பயனர்களின் தனியுரிமையை மதிக்கும் வகையில் வடிவமைக்கப்பட்டுள்ளது. தனிப்பட்ட குறிப்புகள் மற்றும் விருப்பத்தேர்வுகள் பயனரின் சாதனத்தில் உள்ளூரில் சேமிக்கப்படலாம். தகுந்த பாதுகாப்பு நடவடிக்கைகள் செயல்படுத்தப்படாவிட்டால், பயனர்கள் அதிக உணர்திறன் கொண்ட மருத்துவ அல்லது தனிப்பட்ட தகவல்களைச் சேமிப்பதைத் தவிர்க்க வேண்டும்.",
about_accuracy_title:"துல்லியம் மற்றும் வரம்புகள்",
about_accuracy_desc:"வழங்கப்பட்ட தகவலின் தரம் மற்றும் நம்பகத்தன்மையை மேம்படுத்த அனைத்து முயற்சிகளும் மேற்கொள்ளப்பட்டாலும், முழுமை அல்லது துல்லியம் குறித்து எந்த உத்தரவாதமும் அளிக்கப்படவில்லை. மருத்துவ அறிவு தொடர்ந்து உருவாகிறது, மேலும் பரிந்துரைகள் காலப்போக்கில் மாறக்கூடும்.",
about_opensource_title:"திறந்த மூலம் மற்றும் வரவு",
about_opensource_desc:"நவீன வலை மேம்பாட்டை சாத்தியமாக்கும் திறந்த மூல சமூகம் மற்றும் கல்வி ஆதாரங்களின் பங்களிப்புகளை இந்த திட்டம் அங்கீகரிக்கிறது. எந்தவொரு மூன்றாம் தரப்பு நூலகங்கள், சின்னங்கள், எழுத்துருக்கள் அல்லது வெளிப்புற சொத்துக்கள் அவற்றின் தகுந்த உரிமங்களின்படி வரவு வைக்கப்பட வேண்டும்.",
about_vision_title:"திட்ட பார்வை",
about_vision_desc:"PharmaCare-ன் நீண்டகால பார்வை என்னவென்றால், மருத்துவ அறிவிற்கான அணுகலை மேம்படுத்த நம்பகமான கல்வி உள்ளடக்கம், ஸ்மார்ட் உற்பத்தித்திறன் கருவிகள், மருந்து மேلاண்மை மற்றும் நவீன தொழில்நுட்பம் ஆகியவற்றை இணைக்கும் ஒரு விரிவான சுகாதார உதவியாளராக மாறுவதாகும்.",
about_contact_title:"தொடர்பு கொள்ள",
about_contact_desc:"கேள்விகள், கருத்துகள், பிழை அறிக்கைகள் அல்லது ஒத்துழைப்பு வாய்ப்புகளுக்கு, திட்டத்தின் அதிகாரப்பூர்வ தொடர்பு சேனல்கள் அல்லது களஞ்சியம் மூலம் திட்ட பராமரிப்பாளரைத் தொடர்பு கொள்ள பயனர்கள் ஊக்குவிக்கப்படுகிறார்கள்.",
about_version:"பதிப்பு",
about_last_updated:"கடைசியாக புதுப்பிக்கப்பட்டது",
account_links_title:"விரைவு இணைப்புகள்",
about_link:"PharmaCare பற்றி",
card_health_tracker:"சுகாதார கண்காணிப்பு",
card_vaccination:"தடுப்பூட்டி பதிவுகள்",
card_lab_results:"ஆய்வக முடிவுகள்",
card_allergies:"ஒவ்வாமை சோதனை",
card_symptom_checker:"அறிகுறி சோதனை",
card_emergency_guide:"அவசர வழிகாட்டி",
card_drug_comparison:"மருந்து ஒப்பீடு",
health_tracker_title:"சுகாதார கண்காணிப்பு",
health_tracker_desc:"இரத்த அழுத்தம், இதய துடிப்பு வீதம், எடை மற்றும் பிறவற்றை உள்ளடக்கிய தினசரி சுகாதார அளவீடுகளை கண்காணிக்கவும்.",
metric_bp:"இரத்த அழுத்தம்",
metric_heart_rate:"இதய துடிப்பு வீதம்",
metric_weight:"எடை",
metric_glucose:"இரத்த சர்க்கரை",
metric_save:"சேமி",
vaccination_title:"தடுப்பூட்டி பதிவுகள்",
vaccination_desc:"உங்கள் தடுப்பூட்டிகள் மற்றும் வரவிருக்கும் பூஸ்டர் டோஸ்களை கண்காணிக்கவும்.",
vaccine_name_ph:"தடுப்பூட்டி பெயர்",
vaccine_date_ph:"தேதி",
vaccine_next_ph:"அடுத்த டோஸ் தேதி",
vaccine_add:"பதிவு சேர்",
lab_results_title:"ஆய்வக முடிவுகள்",
lab_results_desc:"எளிதான குறிப்புக்காக உங்கள் ஆய்வக சோதனை முடிவுகளை சேமிக்கவும் மற்றும் கண்காணிக்கவும்.",
lab_test_ph:"சோதனை பெயர்",
lab_date_ph:"சோதனை தேதி",
lab_value_ph:"முடிவு மதிப்பு",
lab_range_ph:"இயல்பான வரம்பு",
lab_add:"முடிவு சேர்",
allergy_title:"ஒவ்வாமை சோதனை",
allergy_desc:"மருந்துகள் மற்றும் உணவுகளில் சாத்தியமான ஒவ்வாமை காரணிகளை சரிபார்க்கவும்.",
allergy_input_ph:"மருந்து அல்லது உணவை உள்ளிடவும்",
allergy_check:"ஒவ்வாமை காரணிகளை சரிபார்",
my_allergies_title:"எனது ஒவ்வாமைகள்",
my_allergy_ph:"உங்கள் ஒவ்வாமையை சேர்",
allergy_add:"சேர்",
symptom_title:"அறிகுறி சோதனை",
symptom_desc:"சாத்தியமான காரணங்கள் மற்றும் பரிந்துரைகளைப் பெற உங்கள் அறிகுறிகளை விவரிக்கவும்.",
symptom_desc_ph:"உங்கள் அறிகுறிகளை விவரிக்கவும்...",
symptom_check:"அறிகுறிகளை பகுப்பாய்வு",
emergency_title:"அவசர வழிகாட்டி",
emergency_desc:"அவசர சூழ்நிலைகள் மற்றும் முதலுதவி நடைமுறைகளுக்கான விரைவான குறிப்பு.",
emergency_heart:"🚨 இதய தாக்குதல்",
emergency_heart_desc:"மார்பு வலி, மூச்சு குறைப்பு, குமட்டல். உடனடி அவசர சேவையை அழைக்கவும்.",
emergency_stroke:"🚨 பக்கவாதம்",
emergency_stroke_desc:"முகம் சாய்வு, கை வலுக்குறைவு, பேச்சு சிரமம். விரைவாக செயல்படுங்கள்.",
emergency_breathing:"⚠️ மூச்சு சிரமம்",
emergency_breathing_desc:"நிமிர்ந்து அமரவும், இன்ஹேலர் இருந்தால் பயன்படுத்தவும், கடுமையாக இருந்தால் அவசர சேவையை அழைக்கவும்.",
emergency_bleeding:"⚠️ கடுமையான இரத்தப்போக்கு",
emergency_bleeding_desc:"நேரடி அழுத்தம் கொடுங்கள், சாத்தியமானால் உயர்த்தவும், அவசர சேவையை அழைக்கவும்.",
emergency_burns:"ℹ️ தீக்காயங்கள்",
emergency_burns_desc:"ஓடும் நீரில் குளிர்விக்கவும், சுத்திகரிக்கப்பட்ட கவசத்தால் மூடவும், மருத்துவ உதவியை நாடவும்.",
emergency_poison:"ℹ️ நச்சு",
emergency_poison_desc:"நச்சு கட்டுப்பாட்டை அழைக்கவும், அறிவுறுத்தப்படாவிட்டால் வாந்தியை தூண்ட வேண்டாம்.",
drug_comparison_title:"மருந்து ஒப்பீடு",
drug_comparison_desc:"இரண்டு மருந்துகளை ஒப்பிட்டு வேறுபாடுகள் மற்றும் ஒற்றுமைகளைப் புரிந்துகொள்ளவும்.",
compare_drug1_ph:"முதல் மருந்து",
compare_drug2_ph:"இரண்டாவது மருந்து",
compare_btn:"மருந்துகளை ஒப்பிடு"
});

// Calculator & page extra keys
Object.assign(I18N.en,{
pediatric_desc:"Calculate a pediatric dose using weight and mg/kg.",
ped_weight_ph:"Weight (kg)",
ped_mgkg_ph:"Dose (mg/kg per dose)",
ped_max_ph:"Optional max single dose (mg)",
ped_calc_btn:"Calculate",
iv_desc:"Calculate drip rate (gtt/min) and pump rate (mL/hr).",
iv_volume_ph:"Total volume (mL)",
iv_time_ph:"Time (minutes)",
iv_drop_ph:"Drop factor (gtt/mL)",
iv_calc_btn:"Calculate",
crcl_desc:"Estimate creatinine clearance (mL/min) using Cockcroft–Gault.",
crcl_age_ph:"Age (years)",
crcl_weight_ph:"Weight (kg)",
crcl_scr_ph:"Serum creatinine (mg/dL)",
sex_male:"Male",
sex_female:"Female",
crcl_calc_btn:"Calculate",
bsa_desc:"Calculate BSA using the Mosteller formula.",
bsa_height_ph:"Height (cm)",
bsa_weight_ph:"Weight (kg)",
bsa_calc_btn:"Calculate",
inf_desc:"Calculate infusion pump rate (mL/hr) from dose and concentration.",
inf_dose_ph:"Dose rate (mg/hr)",
inf_conc_ph:"Concentration (mg/mL)",
inf_calc_btn:"Calculate",
para_desc:"Estimate maximum safe dosing guidance (educational only).",
para_weight_ph:"Weight (kg)",
para_child:"Child",
para_adult:"Adult",
para_calc_btn:"Calculate"
});

Object.assign(I18N.ar,{
pediatric_desc:"حساب جرعة الأطفال باستخدام الوزن و mg/kg.",
ped_weight_ph:"الوزن (كجم)",
ped_mgkg_ph:"الجرعة (mg/kg لكل جرعة)",
ped_max_ph:"الحد الأقصى لجرعة واحدة (اختياري)",
ped_calc_btn:"احسب",
iv_desc:"حساب معدل التنقيط (gtt/min) ومعدل المضخة (mL/hr).",
iv_volume_ph:"الحجم الكلي (mL)",
iv_time_ph:"الوقت (دقائق)",
iv_drop_ph:"عامل التقطير (gtt/mL)",
iv_calc_btn:"احسب",
crcl_desc:"تقدير تصفية الكرياتينين (mL/min) بطريقة Cockcroft–Gault.",
crcl_age_ph:"العمر (سنة)",
crcl_weight_ph:"الوزن (كجم)",
crcl_scr_ph:"كرياتينين الدم (mg/dL)",
sex_male:"ذكر",
sex_female:"أنثى",
crcl_calc_btn:"احسب",
bsa_desc:"حساب مساحة سطح الجسم بمعادلة Mosteller.",
bsa_height_ph:"الطول (سم)",
bsa_weight_ph:"الوزن (كجم)",
bsa_calc_btn:"احسب",
inf_desc:"حساب معدل التسريب (mL/hr) من الجرعة والتركيز.",
inf_dose_ph:"معدل الجرعة (mg/hr)",
inf_conc_ph:"التركيز (mg/mL)",
inf_calc_btn:"احسب",
para_desc:"تقدير الجرعات الآمنة (تعليمي فقط).",
para_weight_ph:"الوزن (كجم)",
para_child:"طفل",
para_adult:"بالغ",
para_calc_btn:"احسب"
});

Object.assign(I18N.ta,{
pediatric_desc:"எடை மற்றும் mg/kg அடிப்படையில் குழந்தை மருந்தளவு கணக்கிடு.",
ped_weight_ph:"எடை (கிலோ)",
ped_mgkg_ph:"அளவு (mg/kg ஒரு தடவை)",
ped_max_ph:"விருப்பமான அதிகபட்ச ஒற்றை அளவு (mg)",
ped_calc_btn:"கணக்கிடு",
iv_desc:"துளி விகிதம் (gtt/min) மற்றும் (mL/hr) கணக்கிடு.",
iv_volume_ph:"மொத்த அளவு (mL)",
iv_time_ph:"நேரம் (நிமிடங்கள்)",
iv_drop_ph:"டிரிப் ஃபாக்டர் (gtt/mL)",
iv_calc_btn:"கணக்கிடு",
crcl_desc:"Cockcroft–Gault மூலம் கிரியாடினின் கிளியரன்ஸ் மதிப்பீடு.",
crcl_age_ph:"வயது (ஆண்டுகள்)",
crcl_weight_ph:"எடை (கிலோ)",
crcl_scr_ph:"சீரம் கிரியாடினின் (mg/dL)",
sex_male:"ஆண்",
sex_female:"பெண்",
crcl_calc_btn:"கணக்கிடு",
bsa_desc:"Mosteller சூத்திரத்தால் BSA கணக்கிடு.",
bsa_height_ph:"உயரம் (செ.மீ.)",
bsa_weight_ph:"எடை (கிலோ)",
bsa_calc_btn:"கணக்கிடு",
inf_desc:"டோஸ் மற்றும் கன்சன்ட்ரேஷன் மூலம் mL/hr கணக்கிடு.",
inf_dose_ph:"டோஸ் விகிதம் (mg/hr)",
inf_conc_ph:"கன்சன்ட்ரேஷன் (mg/mL)",
inf_calc_btn:"கணக்கிடு",
para_desc:"பாதுகாப்பான அதிகபட்ச மருந்தளவு வழிகாட்டி (கல்வி).",
para_weight_ph:"எடை (கிலோ)",
para_child:"குழந்தை",
para_adult:"பெரியவர்",
para_calc_btn:"கணக்கிடு"
});

function t(key){
let lang=(window.localStorage && localStorage.getItem("pharmaLang")) || "en";
return (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : (I18N.en[key] || key);
}

function setLanguage(lang){

if(!I18N[lang])lang="en";
if(window.localStorage)localStorage.setItem("pharmaLang",lang);

document.body.classList.toggle("rtl",lang==="ar");
applyTranslations();

}

function applyTranslations(){

document.querySelectorAll("[data-i18n]").forEach(el=>{
let key=el.getAttribute("data-i18n");
el.textContent=t(key);
});

document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
let key=el.getAttribute("data-i18n-placeholder");
el.setAttribute("placeholder",t(key));
});

// Long HTML content blocks
let firstAid=document.getElementById("firstAidContent");
if(firstAid)firstAid.innerHTML=getContentHtml("firstaid");

let disease=document.getElementById("diseaseContent");
if(disease)disease.innerHTML=getContentHtml("disease");

let guidelines=document.getElementById("guidelinesContent");
if(guidelines)guidelines.innerHTML=getContentHtml("guidelines");

if(typeof renderLibraryPage==="function")renderLibraryPage();

}

function n(v){
let x=parseFloat(v);
return Number.isFinite(x)?x:null;
}

function formatNum(x,dec=2){
if(!Number.isFinite(x))return "";
return x.toFixed(dec);
}

function escapeHtml(str){
return (str||"").toString()
.replaceAll("&","&amp;")
.replaceAll("<","&lt;")
.replaceAll(">","&gt;")
.replaceAll('"',"&quot;")
.replaceAll("'","&#39;");
}

function normalizeDrugQuery(s){
return (s||"").toLowerCase().trim().replace(/\s+/g," ").replace(/[.,']/g,"");
}

function resolveDrugMatches(query,limit){
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:null;
if(!DB)return [];
let q=normalizeDrugQuery(query);
if(!q)return [];
let scored=[];
for(let id of Object.keys(DB)){
let d=DB[id];
let score=0;
if(id===q)score=100;
else if(id.replace(/_/g," ")===q)score=98;
else if((d.aliases||[]).some(function(a){return normalizeDrugQuery(a)===q;}))score=95;
else if((d.brands||[]).some(function(b){return normalizeDrugQuery(b)===q;}))score=92;
else if((d.displayName||"").toLowerCase().indexOf(q)!==-1)score=72;
else if(q.length>=4&&id.replace(/_/g," ").indexOf(q)!==-1)score=68;
else if((d.aliases||[]).some(function(a){return q.length>=4&&a.indexOf(q)!==-1;}))score=62;
else if((d.brands||[]).some(function(b){return q.length>=4&&normalizeDrugQuery(b).indexOf(q)!==-1;}))score=58;
if(score>0)scored.push({id:id,score:score,d:d});
}
scored.sort(function(a,b){return b.score-a.score;});
return scored.slice(0,limit||10);
}

function getDrugClassesForId(id){
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:null;
let P=typeof PHARMACARE_PSEUDO_DRUGS!=="undefined"?PHARMACARE_PSEUDO_DRUGS:null;
if(!id)return[];
if(DB&&DB[id]&&DB[id].iClass)return DB[id].iClass.slice();
if(P&&P[id]&&P[id].iClass)return P[id].iClass.slice();
return[];
}

function interactionKeySorted(a,b){
return [a,b].sort().join("+");
}

function findClassInteraction(c1,c2){
let rules=typeof PHARMACARE_CLASS_RULES!=="undefined"?PHARMACARE_CLASS_RULES:null;
if(!rules)return null;
let key=interactionKeySorted(c1,c2);
for(let i=0;i<rules.length;i++){
let r=rules[i];
let rk=interactionKeySorted(r.a,r.b);
if(rk===key)return r;
}
return null;
}

function findDrugInteractions(idA,idB){
let explicit=typeof PHARMACARE_EXPLICIT_PAIRS!=="undefined"?PHARMACARE_EXPLICIT_PAIRS:null;
if(explicit){
let k=interactionKeySorted(idA,idB);
if(explicit[k])return {type:"pair",hit:explicit[k],label:k};
}
let classesA=getDrugClassesForId(idA);
let classesB=getDrugClassesForId(idB);
let hits=[];
for(let i=0;i<classesA.length;i++){
for(let j=0;j<classesB.length;j++){

let r=findClassInteraction(classesA[i],classesB[j]);
if(r)hits.push({type:"class",hit:r,classes:[classesA[i],classesB[j]]});
}
}
if(hits.length===0)return null;
hits.sort(function(x,y){
let order={Major:0,"High (context)":1,Moderate:2,"Moderate (context)":2,"Low–Moderate":3,Low:4,"Low (monitor)":4};
let ox=order[x.hit.level]!==undefined?order[x.hit.level]:9;
let oy=order[y.hit.level]!==undefined?order[y.hit.level]:9;
return ox-oy;
});
return hits[0];
}

function getCurrentLang(){
return (window.localStorage && localStorage.getItem("pharmaLang")) || "en";
}

function getDrugArabicPronunciation(d){
if(!d)return "";
if(typeof getDrugPronunciationAr==="function")return getDrugPronunciationAr(d);
if(d.pronunciationAr)return d.pronunciationAr;
if(typeof transliterateDrugNameToArabic==="function"){
return transliterateDrugNameToArabic(d.displayName||d.id||"");
}
return "";
}

function formatPronunciationLine(d){
let pron=getDrugArabicPronunciation(d);
if(!pron)return "";
return "<strong>"+escapeHtml(t("library_pronunciation"))+":</strong> <span class=\"drug-pronunciation-ar\" dir=\"rtl\" lang=\"ar\">"+escapeHtml(pron)+"</span><br>";
}

function formatDrugCardHtml(d){
if(!d)return "";
let html="";
html+="<strong>Name:</strong> "+escapeHtml(d.displayName||d.name||"")+"<br>";
html+=formatPronunciationLine(d);
html+="<strong>"+escapeHtml(t("library_category_label")||"Category")+":</strong> "+escapeHtml(getCategoryDisplay(d.category)||"General")+"<br>";
html+="<strong>Use:</strong> "+escapeHtml(d.use||"")+"<br>";
html+="<strong>Dose:</strong> "+escapeHtml(d.dose||"")+"<br>";
html+="<strong>Limits / max:</strong> "+escapeHtml(d.max||"")+"<br>";
html+="<strong>Side effects:</strong> "+escapeHtml(d.side||"")+"<br>";
html+="<strong>Interactions:</strong> "+escapeHtml(d.interactions||"")+"<br>";
html+="<strong>Contraindications:</strong> "+escapeHtml(d.contra||"")+"<br>";
html+="<strong>Pregnancy / lactation:</strong> "+escapeHtml(d.preg||"")+"<br>";
html+="<span style='opacity:.75'>Educational summary only — verify with official references.</span>";
return html;
}

function getCategoryLabel(catId){
if(!catId)return "";
let fallbackName=catId;
let cats=typeof PHARMACARE_CATEGORIES!=="undefined"?PHARMACARE_CATEGORIES:[];
for(let i=0;i<cats.length;i++){
if(cats[i].id===catId){
fallbackName=cats[i].name;
break;
}
}
let key="cat_"+catId;
let label=t(key);
if(!label||label===key)label=fallbackName;
return label;
}

function getCategoryIcon(catId){
let cats=typeof PHARMACARE_CATEGORIES!=="undefined"?PHARMACARE_CATEGORIES:[];
for(let i=0;i<cats.length;i++){
if(cats[i].id===catId)return cats[i].icon||"";
}
return "";
}

function getCategoryDisplay(catId){
let icon=getCategoryIcon(catId);
let label=getCategoryLabel(catId);
return icon?icon+" "+label:label;
}

var libraryActiveCategory="all";

function getDrugsByCategory(catId){
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:{};
let list=[];
for(let id of Object.keys(DB)){
let d=DB[id];
if(!d)continue;
if(catId==="all"){
if(d.category!=="herbal")list.push(d);
}else if(d.category===catId){
list.push(d);
}
}
list.sort(function(a,b){
return (a.displayName||"").localeCompare(b.displayName||"");
});
return list;
}

function renderLibraryCategoryContent(catId){
let el=document.getElementById("libraryCategoryContent");
if(!el)return;
let drugs=getDrugsByCategory(catId);
if(!drugs.length){
el.innerHTML="<div class='result'>No medicines in this category.</div>";
return;
}
let html="";
drugs.forEach(function(d){
let pron=getDrugArabicPronunciation(d);
html+="<details class='library-drug-item'>";
html+="<summary><span class='library-drug-name'>"+escapeHtml(d.displayName||d.id)+"</span>";
if(pron){
html+="<span class='library-drug-pronunciation' dir='rtl' lang='ar'>"+escapeHtml(pron)+"</span>";
}
html+="<span class='library-drug-use'>"+escapeHtml(d.use||"")+"</span></summary>";
html+="<div class='library-drug-body'>";
if(pron){
html+="<p class='library-pronunciation-row'><strong>"+escapeHtml(t("library_pronunciation"))+":</strong> <span class='drug-pronunciation-ar' dir='rtl' lang='ar'>"+escapeHtml(pron)+"</span></p>";
}
html+="<p><strong>"+escapeHtml(t("library_what_treats"))+":</strong> "+escapeHtml(d.use||"")+"</p>";
html+="<p><strong>"+escapeHtml(t("library_typical_dose"))+":</strong> "+escapeHtml(d.dose||"")+"</p>";
html+="<p><strong>"+escapeHtml(t("library_side_effects"))+":</strong> "+escapeHtml(d.side||"")+"</p>";
if(d.isHerbal){
html+="<p class='library-herbal-tag'>"+escapeHtml(t("library_herbal_tag"))+"</p>";
}else{
html+="<button type='button' class='library-detail-btn' onclick=\"showDrugDetail('"+String(d.id).replace(/\\/g,"").replace(/'/g,"\\'")+"')\">"+escapeHtml(t("library_full_details"))+"</button>";
}
html+="</div></details>";
});
el.innerHTML=html;
}

function showDrugDetail(id){
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:null;
let el=document.getElementById("drugInfoResult");
if(!DB||!DB[id]||!el)return;
el.innerHTML=formatDrugCardHtml(DB[id]);
el.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function renderLibraryPage(){
let statsEl=document.getElementById("libraryStats");
let navEl=document.getElementById("libraryCategoryNav");
let herbsEl=document.getElementById("libraryHerbsContent");
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:{};
let cats=typeof PHARMACARE_CATEGORIES!=="undefined"?PHARMACARE_CATEGORIES:[];
let herbs=typeof PHARMACARE_HERBAL_DB!=="undefined"?PHARMACARE_HERBAL_DB:[];
let total=Object.keys(DB).length;

if(statsEl){
let statsText=t("library_stats")||"{count} medicines in {categories} categories";
statsEl.textContent=statsText.replace("{count}",total).replace("{categories}",cats.length);
}

if(navEl){
let html="<button type='button' class='library-cat-btn"+(libraryActiveCategory==="all"?" active":"")+"' onclick=\"setLibraryCategory('all')\">"+escapeHtml(t("library_view_all")||"All")+"</button>";
cats.forEach(function(c){
html+="<button type='button' class='library-cat-btn"+(libraryActiveCategory===c.id?" active":"")+"' onclick=\"setLibraryCategory('"+c.id+"')\">"+escapeHtml(getCategoryDisplay(c.id))+"</button>";
});
navEl.innerHTML=html;
}

renderLibraryCategoryContent(libraryActiveCategory);

if(herbsEl&&herbs.length){
let hhtml="";
herbs.forEach(function(h){
let herbDrug=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB[h.id]:null;
let pron=herbDrug?getDrugArabicPronunciation(herbDrug):h.name;
hhtml+="<article class='herb-card'>";
hhtml+="<h5>"+escapeHtml(h.name)+"</h5>";
hhtml+="<p class='herb-pronunciation'><strong>"+escapeHtml(t("library_pronunciation"))+":</strong> <span dir='rtl' lang='ar'>"+escapeHtml(pron)+"</span></p>";
hhtml+="<p><strong>"+escapeHtml(t("library_what_treats"))+":</strong> "+escapeHtml(h.use)+"</p>";
hhtml+="<p><strong>"+escapeHtml(t("library_typical_dose"))+":</strong> "+escapeHtml(h.dose)+"</p>";
hhtml+="<p class='herb-caution'><strong>Caution:</strong> "+escapeHtml(h.caution)+"</p>";
hhtml+="</article>";
});
herbsEl.innerHTML=hhtml;
}
}

function setLibraryCategory(catId){
libraryActiveCategory=catId;
renderLibraryPage();
let content=document.getElementById("libraryCategoryContent");
if(content)content.scrollIntoView({behavior:"smooth",block:"nearest"});
}

function calculatePediatricDose(){

let wt=n(document.getElementById("pedWeight").value);
let mgkg=n(document.getElementById("pedMgKg").value);
let max=n(document.getElementById("pedMaxDose").value);
let el=document.getElementById("pedResult");

if(!el)return;
if(!wt || !mgkg || wt<=0 || mgkg<=0){
el.innerHTML="Please enter weight and mg/kg.";
return;
}

if(wt>150||mgkg>100){el.innerHTML="Please check the values: weight (kg) must be ≤150 and dose ≤100 mg/kg.";return;}
let dose=wt*mgkg;
let capped=false;
if(max && max>0 && dose>max){
dose=max;
capped=true;
}

el.innerHTML="<strong>Estimated dose per dose:</strong> "+formatNum(dose,0)+" mg"
+(capped?"<br><span style='opacity:.85'>(Capped to max single dose)</span>":"<br><span style='opacity:.85'>No max single dose entered: do not exceed the adult maximum.</span>")+"<br><span style='color:#c0392b'>⚠ Educational estimate only. Verify with a clinical reference or pharmacist before use.</span>";

}

function calculateIVDrip(){

let vol=n(document.getElementById("ivVolume").value);
let time=n(document.getElementById("ivTimeMin").value);
let drop=n(document.getElementById("ivDropFactor").value);
let el=document.getElementById("ivResult");

if(!el)return;
if(!vol || !time || !drop || vol<=0 || time<=0 || drop<=0){
el.innerHTML="Please enter volume, time, and drop factor.";
return;
}

if(time>1440||vol>10000||drop>60){el.innerHTML="Please check the values (volume mL, time in minutes, drop factor gtt/mL).";return;}
let gttMin=(vol*drop)/time;
let mlHr=(vol/(time/60));

el.innerHTML="<strong>Drip rate:</strong> "+formatNum(gttMin,0)+" gtt/min<br>"
+"<strong>Pump rate:</strong> "+formatNum(mlHr,1)+" mL/hr"+"<br><span style='color:#c0392b'>⚠ Educational estimate only. Verify with a clinical reference or pharmacist before use.</span>";

}

function calculateCrCl(){

let age=n(document.getElementById("crclAge").value);
let wt=n(document.getElementById("crclWeight").value);
let scr=n(document.getElementById("crclScr").value);
let sex=document.getElementById("crclSex").value;
let el=document.getElementById("crclResult");

if(!el)return;
if(!age || !wt || !scr || age<=0 || wt<=0 || scr<=0){
el.innerHTML="Please enter age, weight, and serum creatinine.";
return;
}

if(age<18||age>120||wt>300||scr>30){el.innerHTML="Cockcroft–Gault is for adults (18–120 y). Check weight (kg) and creatinine (mg/dL).";return;}
let crcl=((140-age)*wt)/(72*scr);
if(sex==="female")crcl=crcl*0.85;

el.innerHTML="<strong>Estimated CrCl:</strong> "+formatNum(crcl,1)+" mL/min<br>"
+"<span style='opacity:.75'>Cockcroft–Gault (mg/dL, kg). Uses actual body weight; obese or underweight patients need adjusted weight. Educational estimate only.</span>";

}

function calculateBSA(){

let ht=n(document.getElementById("bsaHeight").value);
let wt=n(document.getElementById("bsaWeight").value);
let el=document.getElementById("bsaResult");

if(!el)return;
if(!ht || !wt || ht<=0 || wt<=0){
el.innerHTML="Please enter height and weight.";
return;
}

let bsa=Math.sqrt((ht*wt)/3600);
el.innerHTML="<strong>BSA (Mosteller):</strong> "+formatNum(bsa,2)+" m²";

}

function calculateInfusionRate(){

let dose=n(document.getElementById("infDose").value);
let conc=n(document.getElementById("infConc").value);
let el=document.getElementById("infResult");

if(!el)return;
if(!dose || !conc || dose<=0 || conc<=0){
el.innerHTML="Please enter dose rate and concentration.";
return;
}

let mlHr=dose/conc;
if(mlHr>1000){el.innerHTML="Rate is unrealistically high. Check units: dose in mg/hr, concentration in mg/mL.";return;}
el.innerHTML="<strong>Infusion rate:</strong> "+formatNum(mlHr,2)+" mL/hr";

}

function calculateParacetamolSafe(){
let wt=n(document.getElementById("paraWeight").value);
let grp=document.getElementById("paraGroup").value;
let el=document.getElementById("paraResult");
if(!el)return;
if(!wt || wt<=0){el.innerHTML="Please enter weight.";return;}
if(wt>300){el.innerHTML="Please enter a realistic weight (kg).";return;}
let warn="<br><span style='color:#c0392b'>⚠ Count ALL paracetamol sources (cold/flu and combination products). Do not exceed the daily max. Seek medical care for liver disease, chronic alcohol use, malnutrition, or overdose.</span>";
if(grp==="child"){
if(wt>=50){el.innerHTML="Weight ≥ 50 kg: use adult guidance."+warn;return;}
let single=Math.min(15*wt,1000);
let daily=Math.min(60*wt,4000);
el.innerHTML="<strong>Typical single dose:</strong> "+formatNum(single,0)+" mg (≈15 mg/kg, max 1000 mg)<br>"
+"<strong>Interval:</strong> at least 4–6 hours, max 4 doses/24 h<br>"
+"<strong>Typical max daily:</strong> "+formatNum(daily,0)+" mg/day (≈60 mg/kg/day, max 4000 mg)<br>"
+"<span style='opacity:.75'>Under 3 months of age: do not use without a doctor. Educational only; follow the product label and local pediatric references.</span>"+warn;
}else{
let low=wt<50;
el.innerHTML="<strong>Adult guidance:</strong><br>"
+"- 500–1000 mg every 4–6 hours as needed (max 4 doses/24 h)<br>"
+"- Max "+(low?"60 mg/kg/day (weight under 50 kg)":"4000 mg/day")+"; use a lower limit (≈2000–3000 mg/day) in liver disease, chronic alcohol use, or malnutrition<br>"
+"<span style='opacity:.75'>Educational only.</span>"+warn;
}
}

function checkInteraction(){

let qa=(document.getElementById("interactionDrug1").value||"").trim();
let qb=(document.getElementById("interactionDrug2").value||"").trim();
let el=document.getElementById("interactionResult");

if(!el)return;
if(!qa || !qb){
el.innerHTML="Please enter two drugs.";
return;
}

let ma=resolveDrugMatches(qa,1);
let mb=resolveDrugMatches(qb,1);
if(!ma.length||!mb.length){
el.innerHTML="Could not match one or both names to the local database. Try generic names (e.g., ibuprofen, warfarin) or check spelling.<br>"
+"<span style='opacity:.8'>Always verify with a clinical interaction checker.</span>";
return;
}

let idA=ma[0].id;
let idB=mb[0].id;
let dA=ma[0].d;
let dB=mb[0].d;
let labelA=escapeHtml((dA&&dA.displayName)||idA);
let labelB=escapeHtml((dB&&dB.displayName)||idB);

if(idA===idB){
el.innerHTML="<strong>"+labelA+"</strong> entered twice — choose two different agents.";
return;
}

let hit=findDrugInteractions(idA,idB);
if(!hit){
el.innerHTML="<strong>"+labelA+" + "+labelB+"</strong><br>"
+"No major rule hit in this educational database for this pair (classes: "
+escapeHtml(getDrugClassesForId(idA).join(", ")||"—")+" vs "
+escapeHtml(getDrugClassesForId(idB).join(", ")||"—")+").<br>"
+"<span style='opacity:.85'>Still check renal/hepatic dosing, duplicates, and a professional interaction tool.</span>";
return;
}

let level="";
let effect="";
let rec="";
if(hit.type==="pair"){
level=hit.hit.level;
effect=hit.hit.effect;
rec=hit.hit.rec;
}else{
level=hit.hit.level;
effect=hit.hit.effect;
rec=hit.hit.rec;
}

el.innerHTML="<strong>"+labelA+" + "+labelB+"</strong><br>"
+"⚠ <strong>Interaction level:</strong> "+escapeHtml(level)+"<br>"
+"<strong>Effect:</strong> "+escapeHtml(effect)+"<br>"
+"<strong>Recommendation:</strong> "+escapeHtml(rec);

}

function getReminders(){
if(!window.localStorage)return [];
try{
let raw=localStorage.getItem("pharmaReminders");
if(!raw)return [];
let arr=JSON.parse(raw);
return Array.isArray(arr)?arr:[];
}catch(e){
return [];
}
}

function saveReminders(list){
if(!window.localStorage)return;
localStorage.setItem("pharmaReminders",JSON.stringify(list));
}

function renderReminders(){

let el=document.getElementById("reminderList");
if(!el)return;

let list=getReminders();
if(list.length===0){
el.innerHTML="No reminders yet.";
return;
}

let html="<strong>Saved reminders:</strong><br>";
list.forEach((r,idx)=>{
html += "- "+escapeHtml(r.drug)+" @ "+escapeHtml(r.time)
+" <button style='width:auto;padding:4px 8px;margin-left:8px;background:#ef4444' onclick='deleteReminder("+idx+")'>Delete</button><br>";
});

el.innerHTML=html;

}

function addReminder(){

let drug=(document.getElementById("remDrug").value||"").trim();
let time=(document.getElementById("remTime").value||"").trim();

if(!drug || !time){
let el=document.getElementById("reminderList");
if(el)el.innerHTML="Please enter drug name and time.";
return;
}

let list=getReminders();
list.push({drug,time,createdAt:Date.now()});
saveReminders(list);

document.getElementById("remDrug").value="";
document.getElementById("remTime").value="";

renderReminders();

}

function deleteReminder(idx){
let list=getReminders();
list.splice(idx,1);
saveReminders(list);
renderReminders();
}

function getContentHtml(section){

let lang=(window.localStorage && localStorage.getItem("pharmaLang")) || "en";

const CONTENT={
en:{
firstaid:
"<strong>1) Minor cuts</strong><br>- Wash hands thoroughly.<br>- Rinse the wound with running water and mild soap.<br>- Apply a simple antiseptic if appropriate.<br>- Cover with a sterile dressing if it may get dirty.<br><br>"
+"<strong>2) Bleeding</strong><br>- Apply direct pressure with clean gauze/cloth.<br>- Elevate the injured limb if possible.<br>- If bleeding is heavy or won’t stop, call emergency services.<br><br>"
+"<strong>3) Minor burns</strong><br>- Cool under lukewarm running water for 10–20 minutes.<br>- Do not apply ice directly.<br>- Do not pop blisters.<br>- Use a non-adherent sterile dressing.<br><br>"
+"<strong>4) Fainting</strong><br>- Lay the person flat and raise legs slightly.<br>- Ensure ventilation and loosen tight clothing.<br>- If not recovering quickly or head injury: call emergency services.<br><br>"
+"<strong>5) Mild drug allergy</strong><br>- Stop the suspected medication if known.<br>- Consider an oral antihistamine if appropriate.<br>- Watch for danger signs (breathing difficulty, facial swelling).<br><br>"
+"<strong>6) Choking (adult)</strong><br>- Ask: “Are you choking?” If unable to speak/cough, call emergency services.<br>- Perform back blows and abdominal thrusts until object is expelled.<br>- If unconscious: start CPR and check mouth between cycles.<br><br>"
+"<strong>7) Suspected fracture/sprain</strong><br>- Immobilize the limb in the position found.<br>- Apply a cold pack wrapped in cloth for 10–15 minutes.<br>- Seek medical care for deformity, severe pain, or inability to bear weight.<br><br>"
+"<strong>8) Heat exhaustion/heat stroke</strong><br>- Move to a cool place; loosen clothing.<br>- Cool with wet cloths/fan; give oral fluids if fully awake.<br>- If confusion, very high temperature, or fainting: emergency care.<br><br>"
+"<strong>Important:</strong> For chest pain, breathing difficulty, loss of consciousness, severe burns, seizures, or heavy bleeding: call emergency services immediately.",
disease:
"<strong>Diabetes Mellitus</strong><br><br>"
+"<strong>Symptoms:</strong><br>- Frequent urination (polyuria)<br>- Excessive thirst (polydipsia)<br>- Increased hunger, unexplained weight loss, fatigue<br><br>"
+"<strong>Treatment:</strong><br>- Lifestyle changes (diet, exercise).<br>- Oral agents (e.g., metformin) depending on patient factors.<br>- Insulin for type 1 and some type 2 cases.<br><br>"
+"<strong>Complications:</strong><br>- Acute: hypoglycemia, DKA, hyperosmolar state.<br>- Chronic: neuropathy, retinopathy, nephropathy, CVD.<br><br>"
+"<strong>Red flags:</strong> confusion, vomiting, severe dehydration, very high/low glucose → urgent care.<br><br>"
+"<strong>Note:</strong> Pharmacists support adherence, interaction checks, and patient education.<br><hr style='border:none;border-top:1px solid rgba(0,0,0,0.08);margin:12px 0;'>"
+"<strong>Hypertension</strong><br><br>"
+"<strong>Symptoms:</strong> Often none (“silent”). May cause headache/dizziness when very high.<br>"
+"<strong>Basics:</strong> Home BP monitoring, lifestyle changes, and medications as needed.<br>"
+"<strong>Complications:</strong> stroke, MI, heart failure, kidney disease.<br><hr style='border:none;border-top:1px solid rgba(0,0,0,0.08);margin:12px 0;'>"
+"<strong>Asthma</strong><br><br>"
+"<strong>Symptoms:</strong> wheeze, cough, chest tightness, shortness of breath.<br>"
+"<strong>Basics:</strong> inhaler technique, controller vs reliever, trigger avoidance, action plan.",
guidelines:
"<strong>Hypertension</strong><br>- Diagnosis: repeated elevated BP with proper technique.<br>- Lifestyle: reduce salt, exercise, weight management, stop smoking.<br>- Meds: ACEi/ARB/CCB/thiazides depending on patient factors.<br><br>"
+"<strong>Type 2 diabetes</strong><br>- Metformin often first-line; add agents (SGLT2i/GLP-1 RA) based on CV/renal risk and goals.<br><br>"
+"<strong>Asthma</strong><br>- Stepwise therapy: inhaled corticosteroids ± LABA; correct inhaler technique; written action plan.<br><br>"
+"<strong>Simple clinical pearls:</strong><br>- Avoid duplicate therapies (e.g., two NSAIDs).<br>- Check renal/hepatic function for dosing when needed.<br>- Confirm allergies and pregnancy/lactation when relevant.<br><br>"
+"<strong>Note:</strong> Always refer to up-to-date sources (e.g., GINA, ADA, ESC/ESH).",
library_common:
"<strong>Paracetamol</strong><br>Use: Pain, Fever<br>Dose: 500–1000 mg every 4–6 h (max 4 g/day)<br>Side effects: Liver toxicity (overdose, liver disease)<br><br>"
+"<strong>Ibuprofen</strong><br>Use: Pain, Inflammation, Fever<br>Dose: 200–400 mg every 4–6 h (max 2400 mg/day adults)<br>Side effects: GI upset, ulcer, kidney effects<br><br>"
+"<strong>Amoxicillin</strong><br>Use: Bacterial infections (ENT, respiratory, UTI, etc.)<br>Dose: 500 mg every 8 h (depends on infection and patient factors)<br>Side effects: Allergy, rash, GI upset<br><br>"
+"<strong>Metformin</strong><br>Use: Type 2 diabetes<br>Dose: Start low; common 500 mg once/twice daily with food (titrate)<br>Side effects: GI upset; B12 deficiency (long-term). Avoid in severe renal impairment<br><br>"
+"<strong>Amlodipine</strong><br>Use: Hypertension/angina<br>Dose: 5–10 mg daily<br>Side effects: ankle edema, flushing<br><br>"
+"<strong>Omeprazole</strong><br>Use: GERD/ulcer<br>Dose: 20 mg daily (varies)<br>Side effects: headache, GI upset; long-term risks (B12/Mg)<br><br>"
+"<strong>Cetirizine</strong><br>Use: Allergy<br>Dose: 10 mg daily<br>Side effects: drowsiness (some patients)<br><br>"
+"<strong>Salbutamol (Albuterol)</strong><br>Use: Asthma relief<br>Dose: inhaler as prescribed<br>Side effects: tremor, palpitations",
library_herbs:
"<strong>Chamomile</strong><br>Use: Mild anxiety, insomnia, GI spasm<br>Notes: Avoid if allergic to ragweed/daisy family.<br><br>"
+"<strong>Ginger</strong><br>Use: Nausea, motion sickness, digestion<br>Notes: Use caution with anticoagulants (may increase bleeding risk).<br><br>"
+"<strong>Peppermint</strong><br>Use: IBS symptoms, GI spasm, dyspepsia<br>Notes: Avoid concentrated oils in infants (laryngospasm risk).<br><br>"
+"<strong>Turmeric (Curcumin)</strong><br>Use: Traditional anti-inflammatory (evidence varies)<br>Notes: Caution with anticoagulants; GI upset in some people.<br><br>"
+"<strong>Garlic</strong><br>Use: Traditional cardiovascular support (limited evidence)<br>Notes: May increase bleeding risk with anticoagulants/antiplatelets."
},
ar:{
firstaid:
"<strong>1) الجروح البسيطة</strong><br>- اغسل اليدين جيدًا.<br>- اشطف الجرح بماء جارٍ وصابون لطيف.<br>- استخدم مطهرًا بسيطًا عند الحاجة.<br>- غطِّه بضماد معقم إذا كان معرضًا للاتساخ.<br><br>"
+"<strong>2) النزيف</strong><br>- اضغط مباشرة بقطعة شاش/قماش نظيف.<br>- ارفع الطرف إن أمكن.<br>- إذا كان النزيف غزيرًا أو لا يتوقف: اتصل بالطوارئ.<br><br>"
+"<strong>3) الحروق البسيطة</strong><br>- برّد بماء فاتر جارٍ 10–20 دقيقة.<br>- لا تضع الثلج مباشرة.<br>- لا تفقأ الفقاعات.<br>- استخدم ضمادًا معقمًا غير لاصق.<br><br>"
+"<strong>4) الإغماء</strong><br>- اجعل الشخص مستلقيًا وارفع الساقين قليلًا.<br>- وفّر تهوية وفك الملابس الضيقة.<br>- إن لم يتحسن سريعًا أو توجد إصابة: اتصل بالطوارئ.<br><br>"
+"<strong>5) حساسية دوائية خفيفة</strong><br>- أوقف الدواء المشتبه به إن أمكن.<br>- قد يفيد مضاد هيستامين فموي إن كان مناسبًا.<br>- راقب علامات الخطر (ضيق تنفس/تورم الوجه).<br><br>"
+"<strong>6) الاختناق (للبالغ)</strong><br>- إذا لم يستطع الكلام/السعال: اتصل بالطوارئ.<br>- ضربات على الظهر ثم ضغطات البطن حتى خروج الجسم.<br>- إذا فقد الوعي: ابدأ إنعاشًا قلبيًا رئويًا.<br><br>"
+"<strong>7) كسر/التواء</strong><br>- ثبّت الطرف كما هو.<br>- كمادات باردة 10–15 دقيقة.<br>- راجع الطوارئ عند تشوه/ألم شديد/عدم القدرة على الحركة.<br><br>"
+"<strong>8) إجهاد حراري/ضربة شمس</strong><br>- انقل المصاب لمكان بارد وفك الملابس.<br>- تبريد بكمادات ومروحة وإعطاء سوائل إذا كان واعيًا.<br>- عند ارتباك/حرارة شديدة/إغماء: طوارئ فورًا.<br><br>"
+"<strong>مهم:</strong> ألم الصدر، ضيق التنفس، فقدان الوعي، التشنجات، الحروق الشديدة أو النزيف الغزير: اتصل بالطوارئ فورًا.",
disease:
"<strong>داء السكري</strong><br><br>"
+"<strong>الأعراض:</strong><br>- كثرة التبول<br>- العطش الزائد<br>- جوع زائد/نقص وزن/إرهاق<br><br>"
+"<strong>العلاج:</strong><br>- نمط حياة (غذاء/رياضة).<br>- أدوية فموية مثل Metformin حسب الحالة.<br>- إنسولين في النوع 1 وبعض حالات النوع 2.<br><br>"
+"<strong>المضاعفات:</strong><br>- حادة: هبوط السكر، DKA.<br>- مزمنة: أعصاب/شبكية/كلى/قلب.<br><br>"
+"<strong>علامات خطر:</strong> ارتباك، قيء، جفاف شديد، ارتفاع/انخفاض شديد في السكر → طوارئ.<br><br>"
+"<strong>ملاحظة:</strong> الصيدلي يساعد في الالتزام، التداخلات، وتثقيف المريض.<br><hr style='border:none;border-top:1px solid rgba(0,0,0,0.08);margin:12px 0;'>"
+"<strong>ارتفاع ضغط الدم</strong><br><br>"
+"<strong>الأعراض:</strong> غالبًا بدون أعراض.<br>"
+"<strong>الأساسيات:</strong> قياس منزلي + نمط حياة + علاج دوائي عند الحاجة.<br>"
+"<strong>المضاعفات:</strong> جلطة، احتشاء، فشل قلبي، كلى.<br><hr style='border:none;border-top:1px solid rgba(0,0,0,0.08);margin:12px 0;'>"
+"<strong>الربو</strong><br><br>"
+"<strong>الأعراض:</strong> صفير، سعال، ضيق نفس.<br>"
+"<strong>الأساسيات:</strong> تقنية البخاخ، علاج وقائي/مسكن، تجنب المحفزات.",
guidelines:
"<strong>ارتفاع ضغط الدم</strong><br>- التشخيص: قراءات مرتفعة متكررة بقياس صحيح.<br>- نمط الحياة: تقليل الملح، رياضة، وزن، إيقاف التدخين.<br>- الأدوية: ACEi/ARB/CCB/Thiazide حسب الحالة.<br><br>"
+"<strong>السكري النوع 2</strong><br>- Metformin غالبًا خط أول؛ ثم إضافة أدوية حسب عوامل الخطر والأهداف.<br><br>"
+"<strong>الربو</strong><br>- علاج تدريجي: ICS ± LABA، تقنية بخاخ صحيحة، وخطة مكتوبة.<br><br>"
+"<strong>نقاط عملية للصيدلي:</strong><br>- تجنب التكرار العلاجي (مثل NSAIDs متعددة).<br>- راجع وظائف الكلى/الكبد عند ضبط الجرعات.<br>- تحقق من الحساسية والحمل/الرضاعة عند الحاجة.<br><br>"
+"<strong>ملاحظة:</strong> ارجع دائمًا لمصادر محدثة (GINA/ADA/ESC/ESH).",
library_common:
"<strong>Paracetamol</strong><br>الاستعمال: ألم/حمى<br>الجرعة: 500–1000 mg كل 4–6 ساعات (حد أقصى 4 g/يوم)<br>آثار جانبية: سمية كبدية عند الجرعات الزائدة<br><br>"
+"<strong>Ibuprofen</strong><br>الاستعمال: ألم/التهاب/حمى<br>الجرعة: 200–400 mg كل 4–6 ساعات (حد أقصى 2400 mg/يوم للبالغين)<br>آثار: اضطراب معدة/قرحة/تأثير كلوي<br><br>"
+"<strong>Amoxicillin</strong><br>الاستعمال: عدوى بكتيرية<br>الجرعة: 500 mg كل 8 ساعات (حسب العدوى والحالة)<br>آثار: حساسية/طفح/اضطراب معدة<br><br>"
+"<strong>Metformin</strong><br>الاستعمال: سكري نوع 2<br>الجرعة: يبدأ بجرعة منخفضة مع الطعام ثم تدرج<br>آثار: اضطراب معدة؛ نقص B12 على المدى الطويل<br><br>"
+"<strong>Amlodipine</strong><br>الاستعمال: ضغط/ذبحة<br>الجرعة: 5–10 mg يوميًا<br>آثار: تورم الكاحل/احمرار<br><br>"
+"<strong>Omeprazole</strong><br>الاستعمال: ارتجاع/قرحة<br>الجرعة: 20 mg يوميًا (تختلف)<br>آثار: صداع/اضطراب هضمي؛ مخاطر طويلة المدى<br><br>"
+"<strong>Cetirizine</strong><br>الاستعمال: حساسية<br>الجرعة: 10 mg يوميًا<br>آثار: نعاس لدى بعض المرضى<br><br>"
+"<strong>Salbutamol</strong><br>الاستعمال: نوبات ربو<br>الجرعة: حسب وصفة الطبيب (بخاخ)<br>آثار: رجفة/خفقان",
library_herbs:
"<strong>Chamomile</strong><br>استعمال: قلق بسيط/أرق/تشنجات هضمية<br>ملاحظة: تجنب عند حساسية من الأقحوان.<br><br>"
+"<strong>Ginger</strong><br>استعمال: غثيان/دوار/هضم<br>ملاحظة: الحذر مع مميعات الدم.<br><br>"
+"<strong>Peppermint</strong><br>استعمال: أعراض القولون العصبي/تشنجات<br>ملاحظة: تجنب الزيوت المركزة للرضع.<br><br>"
+"<strong>Turmeric</strong><br>استعمال: مضاد التهاب تقليدي (الدليل متباين)<br>ملاحظة: الحذر مع مميعات الدم وقد يسبب اضطرابًا هضميًا.<br><br>"
+"<strong>Garlic</strong><br>استعمال: دعم قلبي تقليدي (دليل محدود)<br>ملاحظة: قد يزيد النزيف مع مميعات/مضادات صفائح."
},
ta:{
firstaid:
"<strong>1) சிறு வெட்டுகள்</strong><br>- கைகளை நன்றாக கழுவவும்.<br>- நீர் மற்றும் மென்மையான சோப்பால் சுத்தம் செய்யவும்.<br>- தேவையெனில் எளிய கிருமிநாசினி பயன்படுத்தவும்.<br>- சுத்தமான கட்டுப்பட்டு மூடவும்.<br><br>"
+"<strong>2) இரத்தப்போக்கு</strong><br>- சுத்தமான துணியால் நேரடி அழுத்தம் கொடுக்கவும்.<br>- முடிந்தால் கை/காலை உயர்த்தவும்.<br>- அதிகமாக அல்லது நிற்காவிட்டால் அவசர உதவி அழைக்கவும்.<br><br>"
+"<strong>3) சிறு எரிப்புகள்</strong><br>- 10–20 நிமிடம் தண்மையான நீரில் குளிர்த்தவும்.<br>- நேரடியாக பனிக்கட்டி வைக்க வேண்டாம்.<br>- புண்ணை திறக்க வேண்டாம்.<br>- ஒட்டாத ஸ்டெரைல் டிரெசிங் போடவும்.<br><br>"
+"<strong>4) மயக்கம்</strong><br>- தட்டையாக படுக்க வைத்து கால்களை சிறிது உயர்த்தவும்.<br>- காற்றோட்டம் உறுதி செய்து இறுக்கமான உடை தளர்த்தவும்.<br>- விரைவில் சரியாவில்லை என்றால் அவசர உதவி அழைக்கவும்.<br><br>"
+"<strong>5) லேசான மருந்து ஒவ்வாமை</strong><br>- சந்தேகமான மருந்தை நிறுத்தவும் (முடிந்தால்).<br>- பொருத்தமானால் ஆன்டிஹிஸ்டமின் எடுத்துக் கொள்ளலாம்.<br>- சுவாச சிரமம்/முக வீக்கம் இருந்தால் அவசர உதவி தேடவும்.<br><br>"
+"<strong>முக்கியம்:</strong> மார்வலி, சுவாச சிரமம், மயக்கம், கடுமையான எரிப்பு, அதிக இரத்தப்போக்கு: உடனடி அவசர உதவி.",
disease:
"<strong>நீரிழிவு (Diabetes)</strong><br><br>"
+"<strong>அறிகுறிகள்:</strong><br>- அதிக மூத்திரம்<br>- அதிக தாகம்<br>- பசி/எடை குறைவு/சோர்வு<br><br>"
+"<strong>சிகிச்சை:</strong><br>- உணவு மற்றும் உடற்பயிற்சி.<br>- மெட்ஃபார்மின் போன்ற மருந்துகள் (நோயாளி நிலையில் சார்ந்து).<br>- வகை 1 மற்றும் சில வகை 2 வழக்குகளில் இன்சுலின்.<br><br>"
+"<strong>சிக்கல்கள்:</strong><br>- உடனடி: குறைந்த சர்க்கரை, DKA.<br>- நீண்டகாலம்: நரம்பு/கண்/சிறுநீரகம்/இதயம்.<br><br>"
+"<strong>குறிப்பு:</strong> மருந்தாளர் ஆலோசனை, தொடர்புகள், கல்வி உதவியாகும்.",
guidelines:
"<strong>உயர் இரத்த அழுத்தம்</strong><br>- சரியான முறையில் மீண்டும் மீண்டும் அளவீடு.<br>- வாழ்க்கை முறை: உப்பு குறை, உடற்பயிற்சி, எடை கட்டுப்பாடு, புகை நிறுத்தம்.<br>- மருந்துகள்: ACEi/ARB/CCB/Thiazide (நிலை சார்ந்து).<br><br>"
+"<strong>வகை 2 நீரிழிவு</strong><br>- மெட்ஃபார்மின் பொதுவாக முதற்கட்டம்; பின்னர் இலக்குகள்/அபாயம் அடிப்படையில் சேர்க்கப்படும்.<br><br>"
+"<strong>ஆஸ்துமா</strong><br>- படிப்படி சிகிச்சை: ICS ± LABA; இன்ஹேலர் முறை சரி; செயல் திட்டம்.<br><br>"
+"<strong>குறிப்பு:</strong> GINA/ADA போன்ற புதுப்பிக்கப்பட்ட வழிகாட்டுதல்களை பின்பற்றவும்.",
library_common:
"<strong>Paracetamol</strong><br>பயன்பாடு: வலி, காய்ச்சல்<br>அளவு: 500–1000 mg ஒவ்வொரு 4–6 மணி (அதிகபட்சம் 4 g/நாள்)<br>பக்க விளைவு: அதிக அளவில் கல்லீரல் பாதிப்பு<br><br>"
+"<strong>Ibuprofen</strong><br>பயன்பாடு: வலி, அழற்சி, காய்ச்சல்<br>அளவு: 200–400 mg ஒவ்வொரு 4–6 மணி (அதிகபட்சம் 2400 mg/நாள் பெரியவர்கள்)<br>பக்க விளைவு: வயிற்று பாதிப்பு, சிறுநீரகம்<br><br>"
+"<strong>Amoxicillin</strong><br>பயன்பாடு: பாக்டீரியா தொற்று<br>அளவு: 500 mg ஒவ்வொரு 8 மணி (நிலை சார்ந்து)<br>பக்க விளைவு: ஒவ்வாமை, வாந்தி/வயிற்று பாதிப்பு",
library_herbs:
"<strong>Chamomile</strong><br>பயன்பாடு: லேசான கவலை/தூக்கமின்மை/வயிற்று பிடிப்பு<br>குறிப்பு: ragweed/daisy ஒவ்வாமை இருந்தால் தவிர்க்கவும்.<br><br>"
+"<strong>Ginger</strong><br>பயன்பாடு: வாந்தி, பயண மயக்கம், ஜீரணம்<br>குறிப்பு: இரத்தம் உறையாமை மருந்துகளுடன் கவனம்.<br><br>"
+"<strong>Peppermint</strong><br>பயன்பாடு: IBS அறிகுறிகள், வயிற்று பிடிப்பு<br>குறிப்பு: குழந்தைகளில்浓 எண்ணெய்கள் தவிர்க்கவும்."
}
};

let pack=CONTENT[lang] || CONTENT.en;
return pack[section] || "";
}

function calculateDose(){

let drugName=(document.getElementById("drug").value||"").trim();
let weight=n(document.getElementById("weight").value);
let el=document.getElementById("doseResult");
if(!el)return;

if(!drugName){
el.innerHTML="Please enter a drug name.";
return;
}
if(!weight||weight<=0){
el.innerHTML="Please enter a valid weight in kg.";
return;
}

let m=resolveDrugMatches(drugName,1);
if(!m.length){
el.innerHTML="Drug not recognized. Try a generic name (e.g., paracetamol, amoxicillin).";
return;
}

let d=m[0].d;
let id=m[0].id;
let label=escapeHtml(d.displayName||id);
let mgKg=d.mgPerKg;
let note=d.mgPerKgNote||"";

if(mgKg&&typeof mgKg==="number"){
let est=weight*mgKg;
if(d.maxSingleMg&&est>d.maxSingleMg)est=d.maxSingleMg;
el.innerHTML="<strong>"+label+"</strong><br>"
+"<strong>Illustrative mg/kg estimate:</strong> "+formatNum(est,0)+" mg per dose (using ~"+mgKg+" mg/kg)<br>"
+(note?("<span style='opacity:.85'>"+escapeHtml(note)+"</span><br>"):"")
+"<span style='opacity:.75'>Educational only — infection type, indication, and renal function change real dosing.</span>";
}else{
el.innerHTML="<strong>"+label+"</strong><br>"
+"This entry does not have a simple fixed mg/kg shortcut in the database (many drugs need indication-specific dosing).<br>"
+"<strong>Typical adult guidance from library:</strong> "+escapeHtml(d.dose||"")+"<br>"
+"<span style='opacity:.75'>Use pediatric references or clinical software for weight-based dosing.</span>";
}

}

function calculateBMI(){
let h=n(document.getElementById("height").value)/100;
let w=n(document.getElementById("bmiweight").value);
let el=document.getElementById("bmiResult");
if(!el)return;
if(!h||!w||h<=0||w<=0||h>2.8||w>500){el.innerHTML="Please enter valid height (cm) and weight (kg).";return;}
let bmi=w/(h*h);
let cat=bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese";
el.innerHTML="BMI = "+bmi.toFixed(1)+" ("+cat+", adult ranges)";
}

function checkSideEffect(){

let symptom=document.getElementById("symptomInput").value.trim().toLowerCase();
let res="";

if(!symptom){
res="Please enter a symptom first.";
}else if(symptom.includes("cough")){

res="<strong>Possible related drugs / classes:</strong> ACE inhibitors (e.g., ramipril), sometimes ARBs less so.<br>Dry cough is a classic ACE-inhibitor effect — review antihypertensives.";

}else if(symptom.includes("bleeding") || symptom.includes("bruise") || symptom.includes("hemorrhage")){

res="<strong>Possible related drugs:</strong> Anticoagulants (warfarin, apixaban), antiplatelets (aspirin, clopidogrel), NSAIDs (ibuprofen, naproxen), SSRIs with NSAIDs (GI bleed).<br>Review combinations and bleeding risk factors.";

}else if(symptom.includes("nausea") || symptom.includes("vomit")){

res="<strong>Possible related drugs:</strong> Antibiotics, opioids, metformin (initiation), NSAIDs, digoxin toxicity, chemotherapy antiemetics context.<br>Check timing with new drugs and doses.";

}else if(symptom.includes("rash") || symptom.includes("urticaria") || symptom.includes("itch") || symptom.includes("hives")){

res="<strong>Possible related drugs:</strong> Penicillins/cephalosporins, allopurinol, NSAIDs, anticonvulsants (SJS risk — urgent if systemic symptoms).<br>Obtain allergy history and review recent starters.";

}else if(symptom.includes("diarrhea") || symptom.includes("diarrhoea")){

res="<strong>Possible related drugs:</strong> Antibiotics (C. difficile risk), metformin, colchicine, magnesium supplements, PPIs (uncommon).<br>Consider infectious causes and recent antibiotics.";

}else if(symptom.includes("dry mouth") || symptom.includes("thirst")){

res="<strong>Possible related drugs:</strong> Anticholinergics, some antidepressants, diuretics (thirst/polyuria).<br>Review anticholinergic burden and diabetes status.";

}else if(symptom.includes("confusion") || symptom.includes("drowsy") || symptom.includes("sedation")){

res="<strong>Possible related drugs:</strong> Benzodiazepines, opioids, antihistamines, some antidepressants/antipsychotics, alcohol interactions.<br>Check for CNS depressant stacking.";

}else if(symptom.includes("tremor") || symptom.includes("shake")){

res="<strong>Possible related drugs:</strong> Salbutamol (beta-agonists), SSRIs, lithium, valproate, thyroxine excess.<br>Correlate with doses and indication.";

}else if(symptom.includes("swelling") || symptom.includes("edema") || symptom.includes("oedema")){

res="<strong>Possible related drugs:</strong> Calcium channel blockers (e.g., amlodipine), NSAIDs, pioglitazone, gabapentinoids.<br>Also consider heart/renal failure — not only drug-related.";

}else if(symptom.includes("photosensitivity") || symptom.includes("sunburn")){

res="<strong>Possible related drugs:</strong> Thiazides, tetracyclines (doxycycline), some fluoroquinolones, amiodarone, NSAIDs.<br>Counsel sun protection; review phototoxic meds.";

}else{

res="No keyword match in this educational helper. Review the full medication list, timing of onset, and use professional references.";

}

document.getElementById("sideEffectResult").innerHTML=res;

}

function searchDrug(){

let raw=document.getElementById("drugSearchInput").value.trim();
let info="";

if(!raw){
info="Please enter a drug name.";
document.getElementById("drugInfoResult").innerHTML=info;
return;
}

let matches=resolveDrugMatches(raw,6);
if(!matches.length){
info="No close match in the local database. Try a generic name (e.g., metformin, omeprazole, azithromycin) or fewer typos.";
document.getElementById("drugInfoResult").innerHTML=info;
return;
}

let top=matches[0];
if(matches.length>1&&top.score<92){
info="<strong>Closest matches — tap search again with the exact name:</strong><br>";
matches.forEach(function(m){
info+="- "+escapeHtml(m.d.displayName||m.id)+" <span style='opacity:.75'>("+m.score+")</span><br>";
});
info+="<hr style='border:none;border-top:1px solid rgba(0,0,0,0.08);margin:10px 0'>";
info+=formatDrugCardHtml(top.d);
}else{
info=formatDrugCardHtml(top.d);
}

document.getElementById("drugInfoResult").innerHTML=info;

}

function saveProfile(){

let profile={
name:document.getElementById("profileName").value,
age:document.getElementById("profileAge").value,
blood:document.getElementById("profileBlood").value,
diseases:document.getElementById("profileDiseases").value,
meds:document.getElementById("profileMedications").value,
allergies:document.getElementById("profileAllergies").value
};

if(window.localStorage){
localStorage.setItem("pharmaProfile",JSON.stringify(profile));
}

let status="Profile saved locally on this device.";

document.getElementById("profileStatus").innerHTML=status;

}

function loadProfile(){

if(!window.localStorage)return;

let data=localStorage.getItem("pharmaProfile");

if(!data)return;

try{

let profile=JSON.parse(data);

if(profile.name!==undefined)document.getElementById("profileName").value=profile.name;
if(profile.age!==undefined)document.getElementById("profileAge").value=profile.age;
if(profile.blood!==undefined)document.getElementById("profileBlood").value=profile.blood;
if(profile.diseases!==undefined)document.getElementById("profileDiseases").value=profile.diseases;
if(profile.meds!==undefined)document.getElementById("profileMedications").value=profile.meds;
if(profile.allergies!==undefined)document.getElementById("profileAllergies").value=profile.allergies;

}catch(e){
// ignore parse errors
}

}

function applyThemeFromStorage(){

if(!window.localStorage)return;
let theme=localStorage.getItem("pharmaTheme");
if(theme==="dark"){
document.body.classList.add("dark");
let btn=document.getElementById("themeToggle");
if(btn)btn.textContent="🌞";
}

}

function toggleTheme(){

let body=document.body;
let btn=document.getElementById("themeToggle");
body.classList.toggle("dark");

if(body.classList.contains("dark")){
if(window.localStorage)localStorage.setItem("pharmaTheme","dark");
if(btn)btn.textContent="🌞";
}else{
if(window.localStorage)localStorage.setItem("pharmaTheme","light");
if(btn)btn.textContent="🌓";
}

}

function initApp(){
loadProfile();
loadNotes();
applyThemeFromStorage();
applyLanguageFromStorage();
renderReminders();
}

if(typeof window!=="undefined"){
window.addEventListener("load",initApp);
}

function applyLanguageFromStorage(){
let lang=(window.localStorage && localStorage.getItem("pharmaLang")) || "en";
setLanguage(lang);
}

var locatorPosition=null;
var locatorWatchId=null;

function setLocatorMapSrc(url){
let frame=document.getElementById("mapFrame");
if(frame)frame.src=url;
}

function updateLocatorCoords(lat,lng){
let el=document.getElementById("locatorCoords");
if(!el)return;
el.textContent="📍 "+lat.toFixed(5)+", "+lng.toFixed(5);
}

function applyLocatorPosition(pos,mode){
let lat=pos.coords.latitude;
let lng=pos.coords.longitude;
locatorPosition={lat:lat,lng:lng};
updateLocatorCoords(lat,lng);

let frameUrl;
if(mode==="pharmacy"){
frameUrl="https://www.google.com/maps?q=pharmacy&near="+lat+","+lng+"&z=15&output=embed";
}else if(mode==="hospital"){
frameUrl="https://www.google.com/maps?q=hospital&near="+lat+","+lng+"&z=15&output=embed";
}else{
frameUrl="https://www.google.com/maps?q="+lat+","+lng+"&z=17&output=embed";
}
setLocatorMapSrc(frameUrl);

let pharmBtn=document.getElementById("locatorPharmBtn");
let hospBtn=document.getElementById("locatorHospBtn");
if(pharmBtn)pharmBtn.classList.toggle("active",mode==="pharmacy");
if(hospBtn)hospBtn.classList.toggle("active",mode==="hospital");
}

function initLocatorMap(){
let status=document.getElementById("locatorStatus");
if(!navigator.geolocation){
if(status)status.textContent=t("locator_unsupported")||"Geolocation not supported.";
return;
}
if(status)status.textContent=t("locator_getting")||"Getting your location...";

if(locatorWatchId!==null){
navigator.geolocation.clearWatch(locatorWatchId);
locatorWatchId=null;
}

locatorWatchId=navigator.geolocation.watchPosition(
function(pos){
applyLocatorPosition(pos,"location");
if(status)status.textContent=t("locator_found")||"Showing your location.";
},
function(){
if(status)status.textContent=t("locator_error")||"Unable to get location.";
},
{enableHighAccuracy:true,maximumAge:10000,timeout:15000}
);
}

function showMyLocation(){
if(!navigator.geolocation){
document.getElementById("locatorStatus").textContent=t("locator_unsupported");
return;
}
document.getElementById("locatorStatus").textContent=t("locator_getting");
navigator.geolocation.getCurrentPosition(
function(pos){
applyLocatorPosition(pos,"location");
document.getElementById("locatorStatus").textContent=t("locator_found");
},
function(){
document.getElementById("locatorStatus").textContent=t("locator_error");
},
{enableHighAccuracy:true,timeout:15000}
);
}

function showNearby(type){
let status=document.getElementById("locatorStatus");
if(!navigator.geolocation){
if(status)status.textContent=t("locator_unsupported");
return;
}
if(status)status.textContent=t("locator_getting");

function go(pos){
applyLocatorPosition(pos,type);
if(status){
status.textContent=type==="pharmacy"
?(t("locator_pharm_found")||"Showing nearest pharmacies.")
:(t("locator_hosp_found")||"Showing nearest hospitals.");
}
}

if(locatorPosition){
go({coords:{latitude:locatorPosition.lat,longitude:locatorPosition.lng}});
return;
}

navigator.geolocation.getCurrentPosition(go,function(){
if(status)status.textContent=t("locator_error");
},{enableHighAccuracy:true,timeout:15000});
}

var cameraStream=null;

function goBack(target){

if(!target){
target="dashboardPage";
}

openPage(target);

}

function findAlternatives(){

let name=(document.getElementById("alternativeInput").value||"").trim();
let res="";

if(!name){
res="Please enter a drug name.";
document.getElementById("alternativeResult").innerHTML=res;
return;
}

let m=resolveDrugMatches(name,1);
if(!m.length){
res="Drug not found — try generic names (e.g., amoxicillin–clavulanate, atorvastatin).";
document.getElementById("alternativeResult").innerHTML=res;
return;
}

let d=m[0].d;
let DB=typeof PHARMACARE_DRUG_DB!=="undefined"?PHARMACARE_DRUG_DB:null;
let alts=d.alts||[];
res+="<strong>Requested:</strong> "+escapeHtml(d.displayName||m[0].id)+"<br>";
res+="<strong>Educational alternatives (same database):</strong><br>";
if(alts.length&&DB){
alts.forEach(function(aid){
let x=DB[aid];
if(x)res+="- "+escapeHtml(x.displayName||aid)+" — <span style='opacity:.85'>"+escapeHtml(x.use||"")+"</span><br>";
else res+="- "+escapeHtml(aid)+"<br>";
});
}else{
res+="- No linked alternatives in the database for this entry.<br>";
}
res+="<br><span style='opacity:.8'>Therapeutic substitution depends on indication, allergy, renal/hepatic function, and local guidelines — prescriber decision.</span>";

document.getElementById("alternativeResult").innerHTML=res;

}

function saveNotes(){

let text=document.getElementById("notesArea").value;

if(window.localStorage){
localStorage.setItem("pharmaNotes",text);
}

document.getElementById("notesStatus").innerHTML="Notes saved locally on this device.";

}

function loadNotes(){

if(!window.localStorage)return;
let text=localStorage.getItem("pharmaNotes");
if(text!==null){
document.getElementById("notesArea").value=text;
}

}

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }
});

// Dark/Light Mode Persistence
function loadTheme() {
  if (window.localStorage) {
    const savedTheme = localStorage.getItem('pharmaTheme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      const tb=document.getElementById('themeToggle'); if(tb)tb.textContent='🌞';
    }
  }
}

// Initialize theme on page load
loadTheme();

// Contact Form
// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements with fade-in-up class
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// Health Tracker
function saveHealthMetric(type) {
  let value = '';
  let display = '';
  
  if (type === 'bp') {
    const systolic = document.getElementById('bpSystolic').value;
    const diastolic = document.getElementById('bpDiastolic').value;
    if (systolic && diastolic) {
      value = `${systolic}/${diastolic}`;
      display = `Blood Pressure: ${systolic}/${diastolic} mmHg`;
    }
  } else if (type === 'heart') {
    const hr = document.getElementById('heartRate').value;
    if (hr) {
      value = hr;
      display = `Heart Rate: ${hr} BPM`;
    }
  } else if (type === 'weight') {
    const w = document.getElementById('healthWeight').value;
    if (w) {
      value = w;
      display = `Weight: ${w} kg`;
    }
  } else if (type === 'glucose') {
    const g = document.getElementById('glucose').value;
    if (g) {
      value = g;
      display = `Blood Glucose: ${g} mg/dL`;
    }
  }

  if (!value) return;

  const history = JSON.parse(localStorage.getItem('healthMetrics') || '[]');
  history.push({ type, value, date: new Date().toISOString() });
  localStorage.setItem('healthMetrics', JSON.stringify(history));

  document.getElementById('healthHistory').innerHTML = `<strong>Saved:</strong> ${display}<br><small>Recorded at ${new Date().toLocaleTimeString()}</small>`;
}

// Vaccination Records
function addVaccination() {
  const name = document.getElementById('vaccineName').value;
  const date = document.getElementById('vaccineDate').value;
  const next = document.getElementById('vaccineNext').value;

  if (!name || !date) {
    document.getElementById('vaccinationList').innerHTML = 'Please enter vaccine name and date.';
    return;
  }

  const records = JSON.parse(localStorage.getItem('vaccinations') || '[]');
  records.push({ name, date, next });
  localStorage.setItem('vaccinations', JSON.stringify(records));

  document.getElementById('vaccinationList').innerHTML = `<strong>Added:</strong> ${name} on ${date}${next ? '<br>Next dose: ' + next : ''}`;
  document.getElementById('vaccineName').value = '';
  document.getElementById('vaccineDate').value = '';
  document.getElementById('vaccineNext').value = '';
}

// Lab Results
function addLabResult() {
  const name = document.getElementById('labTestName').value;
  const date = document.getElementById('labTestDate').value;
  const value = document.getElementById('labTestValue').value;
  const range = document.getElementById('labTestRange').value;

  if (!name || !value) {
    document.getElementById('labResultsList').innerHTML = 'Please enter test name and result value.';
    return;
  }

  const results = JSON.parse(localStorage.getItem('labResults') || '[]');
  results.push({ name, date, value, range });
  localStorage.setItem('labResults', JSON.stringify(results));

  document.getElementById('labResultsList').innerHTML = `<strong>Added:</strong> ${name}: ${value}${range ? ' (Normal: ' + range + ')' : ''}`;
  document.getElementById('labTestName').value = '';
  document.getElementById('labTestDate').value = '';
  document.getElementById('labTestValue').value = '';
  document.getElementById('labTestRange').value = '';
}

// Allergy Checker
function checkAllergy() {
  const input = document.getElementById('allergyInput').value;
  if (!input) {
    document.getElementById('allergyResult').innerHTML = 'Please enter a medication or food.';
    return;
  }

  const commonAllergens = ['penicillin', 'sulfa', 'aspirin', 'ibuprofen', 'latex', 'peanuts', 'shellfish', 'dairy', 'gluten', 'eggs'];
  const lowerInput = input.toLowerCase();
  
  const found = commonAllergens.filter(a => lowerInput.includes(a));
  
  if (found.length > 0) {
    document.getElementById('allergyResult').innerHTML = `<strong>⚠️ Potential allergens found:</strong> ${found.join(', ')}<br><small>This is a basic check. Consult a healthcare professional for accurate allergy testing.</small>`;
  } else {
    document.getElementById('allergyResult').innerHTML = `<strong>No common allergens detected in our database.</strong><br><small>This is not a comprehensive check. Always verify with a healthcare provider.</small>`;
  }
}

function addMyAllergy() {
  const allergy = document.getElementById('myAllergy').value;
  if (!allergy) return;

  const allergies = JSON.parse(localStorage.getItem('myAllergies') || '[]');
  allergies.push(allergy);
  localStorage.setItem('myAllergies', JSON.stringify(allergies));

  document.getElementById('myAllergiesList').innerHTML = `<strong>Added:</strong> ${allergy}<br><small>Total allergies: ${allergies.length}</small>`;
  document.getElementById('myAllergy').value = '';
}

// Symptom Checker
function checkSymptoms() {
  const description = document.getElementById('symptomDescription').value;
  if (!description) {
    document.getElementById('symptomResult').innerHTML = 'Please describe your symptoms.';
    return;
  }

  const lowerDesc = description.toLowerCase();
  let possibleCauses = [];

  if (lowerDesc.includes('headache')) {
    possibleCauses.push('Tension headache', 'Migraine', 'Dehydration');
  }
  if (lowerDesc.includes('fever')) {
    possibleCauses.push('Viral infection', 'Bacterial infection', 'Inflammation');
  }
  if (lowerDesc.includes('cough')) {
    possibleCauses.push('Common cold', 'Flu', 'Bronchitis', 'Allergies');
  }
  if (lowerDesc.includes('stomach') || lowerDesc.includes('nausea')) {
    possibleCauses.push('Gastritis', 'Food poisoning', 'Viral gastroenteritis');
  }
  if (lowerDesc.includes('chest') || lowerDesc.includes('heart')) {
    possibleCauses.push('⚠️ Heart condition - Seek immediate medical attention', 'Acid reflux', 'Anxiety');
  }
  if (lowerDesc.includes('breath') || lowerDesc.includes('shortness')) {
    possibleCauses.push('⚠️ Respiratory issue - Seek immediate medical attention', 'Asthma', 'Anxiety');
  }

  if (possibleCauses.length === 0) {
    possibleCauses.push('Various conditions - Please consult a healthcare provider');
  }

  document.getElementById('symptomResult').innerHTML = `<strong>Possible causes:</strong><ul>${possibleCauses.map(c => `<li>${c}</li>`).join('')}</ul><p style="color: #dc2626; font-size: 0.875rem;">⚠️ This is for educational purposes only. For accurate diagnosis, please consult a healthcare professional.</p>`;
}

// Drug Comparison
function compareDrugs() {
  const drug1 = document.getElementById('compareDrug1').value;
  const drug2 = document.getElementById('compareDrug2').value;

  if (!drug1 || !drug2) {
    document.getElementById('comparisonResult').innerHTML = 'Please enter both drug names.';
    return;
  }

  document.getElementById('comparisonResult').innerHTML = `
    <strong>Comparison: ${escapeHtml(drug1)} vs ${escapeHtml(drug2)}</strong><br><br>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid var(--color-border);">
        <th style="padding: 8px; text-align: left;">Aspect</th>
        <th style="padding: 8px; text-align: left;">${escapeHtml(drug1)}</th>
        <th style="padding: 8px; text-align: left;">${escapeHtml(drug2)}</th>
      </tr>
      <tr style="border-bottom: 1px solid var(--color-border);">
        <td style="padding: 8px;">Class</td>
        <td style="padding: 8px;">Check drug database</td>
        <td style="padding: 8px;">Check drug database</td>
      </tr>
      <tr style="border-bottom: 1px solid var(--color-border);">
        <td style="padding: 8px;">Common Uses</td>
        <td style="padding: 8px;">Varies by indication</td>
        <td style="padding: 8px;">Varies by indication</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Side Effects</td>
        <td style="padding: 8px;">Consult healthcare provider</td>
        <td style="padding: 8px;">Consult healthcare provider</td>
      </tr>
    </table>
    <p style="margin-top: 12px; font-size: 0.875rem; color: var(--color-text-muted);">This is a template comparison. For detailed information, search each drug in the Drug Library.</p>
  `;
}

// ---- Unit converter ----
var CV_UNITS={
weight:{mg:0.001,mcg:0.000001,g:1,kg:1000,oz:28.3495,lb:453.592},
volume:{mL:1,L:1000,tsp:4.92892,tbsp:14.7868,"fl oz":29.5735,cup:236.588},
temp:{"°C":1,"°F":1}
};
function fillConvertUnits(){
var t=document.getElementById("cvType");if(!t)return;
var units=Object.keys(CV_UNITS[t.value]);
["cvFrom","cvTo"].forEach(function(id,i){
var el=document.getElementById(id);
el.innerHTML=units.map(function(u){return "<option>"+u+"</option>";}).join("");
el.selectedIndex=Math.min(i,units.length-1);
});
}
function convertUnits(){
var v=parseFloat(document.getElementById("cvValue").value);
var type=document.getElementById("cvType").value;
var f=document.getElementById("cvFrom").value,to=document.getElementById("cvTo").value;
var el=document.getElementById("cvResult");
if(isNaN(v)){el.innerHTML="Please enter a number.";return;}
var r;
if(type==="temp"){
var c=f==="°C"?v:(v-32)*5/9;
r=to==="°C"?c:c*9/5+32;
}else{
r=v*CV_UNITS[type][f]/CV_UNITS[type][to];
}
el.innerHTML="<strong>"+formatNum(v,4)+" "+escapeHtml(f)+" = "+formatNum(r,4)+" "+escapeHtml(to)+"</strong>";
}

// ---- Data backup / privacy tools ----
function exportMyData(){
var out={};
for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);out[k]=localStorage.getItem(k);}
var a=document.createElement("a");
a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:"application/json"}));
a.download="pharmacare-backup.json";a.click();
}
function importMyData(inp){
var f=inp.files&&inp.files[0],st=document.getElementById("dataStatus");
if(!f)return;
var rd=new FileReader();
rd.onload=function(){
try{
var o=JSON.parse(rd.result);
if(!o||typeof o!=="object"||Array.isArray(o))throw 0;
Object.keys(o).forEach(function(k){if(typeof o[k]==="string")localStorage.setItem(k,o[k]);});
st.textContent="Backup imported. Reloading…";setTimeout(function(){location.reload();},600);
}catch(e){st.textContent="Invalid backup file.";}
};
rd.readAsText(f);
}
function clearMyData(){
if(!confirm("Delete ALL saved data (profile, notes, reminders, records) from this browser?"))return;
localStorage.clear();
document.getElementById("dataStatus").textContent="All data deleted. Reloading…";
setTimeout(function(){location.reload();},600);
}
