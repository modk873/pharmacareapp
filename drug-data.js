/**
 * PharmaCare offline drug knowledge base (educational demo — not medical advice).
 * Used for educational search, interaction summaries, and calculator hints.
 */
(function (global) {
  "use strict";

  var DB = {};

  function add(id, entry) {
    entry.id = id;
    DB[id] = entry;
  }

  add("paracetamol", {
    displayName: "Paracetamol (Acetaminophen)",
    aliases: ["acetaminophen", "tylenol", "panadol", "fevadol", "doliprane"],
    brands: ["Panadol", "Tylenol", "Calpol", "Fevadol"],
    iClass: ["analgesic"],
    use: "Pain, fever",
    dose: "Adults: 500–1000 mg every 4–6 h PRN",
    max: "Max daily: 4 g (lower in liver disease / chronic alcohol use)",
    side: "Liver toxicity with overdose; rash (rare)",
    interactions: "Alcohol; other hepatotoxic drugs; warfarin (INR may rise with regular high-dose use)",
    contra: "Severe hepatic impairment",
    preg: "Generally considered safe at therapeutic doses",
    mgPerKg: 15,
    maxSingleMg: 1000,
    mgPerKgNote: "Common pediatric single dose ~15 mg/kg (max daily ~60 mg/kg — follow local guidance).",
    alts: ["ibuprofen", "naproxen"],
    availability: "Commonly OTC/Rx depending on region. Many brands and strengths (325/500/650 mg tablets; syrups).",
  });

  add("ibuprofen", {
    displayName: "Ibuprofen",
    aliases: ["advil", "motrin", "nurofen", "brufen"],
    brands: ["Advil", "Motrin", "Nurofen"],
    iClass: ["nsaid"],
    use: "Pain, inflammation, fever",
    dose: "Adults: 200–400 mg every 4–6 h PRN",
    max: "OTC often up to 1200 mg/day; higher only under supervision",
    side: "GI upset, ulcer, bleeding; kidney effects; fluid retention",
    interactions: "Anticoagulants/antiplatelets; ACEi/ARBs + diuretics (kidney risk); other NSAIDs",
    contra: "Active GI bleed, severe renal impairment (consult)",
    preg: "Avoid especially in 3rd trimester",
    mgPerKg: 10,
    maxSingleMg: 400,
    mgPerKgNote: "Pediatric dosing is weight-based — use pediatric references.",
    alts: ["paracetamol", "naproxen", "diclofenac"],
    availability: "Widely available OTC/Rx. Check film-coated vs chewable vs suspension.",
  });

  add("naproxen", {
    displayName: "Naproxen",
    aliases: ["aleve", "naprosyn"],
    brands: ["Aleve", "Naprosyn"],
    iClass: ["nsaid"],
    use: "Pain, inflammation, dysmenorrhea",
    dose: "OTC: 220 mg every 8–12 h (varies); Rx strengths differ",
    max: "Do not combine with other NSAIDs",
    side: "GI bleeding risk; renal effects; hypertension",
    interactions: "Anticoagulants; SSRIs (GI bleed); lithium levels",
    contra: "Active ulcer; significant renal disease (context-dependent)",
    preg: "Avoid in late pregnancy",
    alts: ["ibuprofen", "diclofenac"],
    availability: "Common OTC (220 mg) and prescription strengths.",
  });

  add("diclofenac", {
    displayName: "Diclofenac",
    aliases: ["voltaren", "cataflam"],
    brands: ["Voltaren", "Cataflam"],
    iClass: ["nsaid"],
    use: "Pain, inflammation (topical or oral)",
    dose: "Follow formulation (gel vs tablet vs SR)",
    max: "Lowest effective dose; monitor GI/renal",
    side: "GI, renal, cardiovascular risk with systemic use",
    interactions: "Other NSAIDs; anticoagulants; methotrexate (toxicity risk)",
    contra: "Active GI bleeding; severe heart failure (context)",
    preg: "Avoid unless specialist-directed",
    alts: ["ibuprofen", "naproxen"],
    availability: "Gel and tablets widely used where approved.",
  });

  add("aspirin", {
    displayName: "Aspirin (Acetylsalicylic acid)",
    aliases: ["asa", "ecotrin", "bufferin"],
    brands: ["Bayer Aspirin", "Ecotrin"],
    iClass: ["nsaid", "antiplatelet"],
    use: "Pain/fever (higher doses); antiplatelet (low dose)",
    dose: "Antiplatelet: often 75–100 mg daily (region-specific)",
    max: "Higher doses increase bleeding and GI risk",
    side: "Bleeding, GI ulcer, Reye syndrome risk in viral illness (children)",
    interactions: "Warfarin/DOACs; ibuprofen may interfere with antiplatelet effect timing",
    contra: "Bleeding disorders; children with viral illness (Reye risk)",
    preg: "Avoid in pregnancy unless specifically indicated — clinician guided",
    alts: ["clopidogrel"],
    availability: "Very common; many strengths — verify chewable vs enteric-coated.",
  });

  add("amoxicillin", {
    displayName: "Amoxicillin",
    aliases: ["amoxil", "trimox"],
    brands: ["Amoxil", "Trimox"],
    iClass: ["penicillin"],
    use: "Susceptible bacterial infections (respiratory, UTI, etc.)",
    dose: "Common adult: 500 mg every 8 h (infection-dependent)",
    max: "Adjust in renal impairment for some regimens",
    side: "Diarrhea, rash; allergy (anaphylaxis possible)",
    interactions: "Warfarin (INR); methotrexate; oral contraceptive efficacy if vomiting",
    contra: "Immediate-type penicillin allergy",
    preg: "Generally considered compatible when indicated",
    alts: ["azithromycin", "cefuroxime", "doxycycline"],
    availability: "Very common generic; suspension for children.",
  });

  add("amoxicillin_clavulanate", {
    displayName: "Amoxicillin–clavulanate (Augmentin)",
    aliases: ["augmentin", "co-amoxiclav", "clavulin"],
    brands: ["Augmentin", "Clavulin"],
    iClass: ["penicillin"],
    use: "Respiratory, skin, some dental/UTI infections (local guidelines)",
    dose: "Follow strength ratio (e.g., 875/125 mg) and frequency",
    max: "Hepatic monitoring rarely needed; GI side effects common",
    side: "Diarrhea, nausea, hepatic injury (rare)",
    interactions: "Same as amoxicillin; probenecid",
    contra: "Penicillin allergy; history of Augmentin-associated jaundice",
    preg: "Generally acceptable when indicated",
    alts: ["amoxicillin", "azithromycin", "cefuroxime"],
    availability: "Often stocked; occasional shortages — alternatives depend on indication.",
  });

  add("azithromycin", {
    displayName: "Azithromycin",
    aliases: ["zithromax", "z-pack", "zpack"],
    brands: ["Zithromax", "Z-Pack"],
    iClass: ["macrolide"],
    use: "Respiratory, skin, some STI regimens",
    dose: "3–5 day packs common; some indications differ",
    max: "QT prolongation risk; drug interactions via CYP/P-gp",
    side: "GI upset; QT prolongation",
    interactions: "Antiarrhythmics; other QT drugs; warfarin (INR)",
    contra: "History of cholestatic jaundice with prior azithromycin",
    preg: "Use when benefit outweighs risk — clinician guided",
    alts: ["doxycycline", "amoxicillin"],
    availability: "Widely available as tablets and suspension.",
  });

  add("ciprofloxacin", {
    displayName: "Ciprofloxacin",
    aliases: ["cipro", "ciproxin"],
    brands: ["Cipro", "Ciproxin"],
    iClass: ["quinolone"],
    use: "UTI, some GI/GU infections (guideline-dependent)",
    dose: "250–750 mg BID depending on indication",
    max: "Avoid unnecessary systemic use (tendon/CNS risks)",
    side: "Tendon rupture risk; QT; glucose disturbances",
    interactions: "Theophylline; warfarin; multivalent cations reduce absorption",
    contra: "Generally avoid in pregnancy/lactation for systemic use",
    preg: "Usually avoided systemically",
    alts: ["doxycycline", "amoxicillin"],
    availability: "Common where approved for indication.",
  });

  add("cefuroxime", {
    displayName: "Cefuroxime",
    aliases: ["ceftin", "zinacef"],
    brands: ["Ceftin", "Zinacef"],
    iClass: ["cephalosporin"],
    use: "Respiratory, skin, some UTIs",
    dose: "Oral/IV per indication",
    max: "Adjust renal dosing for IV formulations",
    side: "GI upset; allergy cross-reactivity (variable with penicillin allergy)",
    interactions: "Probenecid; oral contraceptives if vomiting",
    contra: "Severe cephalosporin allergy",
    preg: "Generally compatible when indicated",
    alts: ["amoxicillin", "azithromycin"],
    availability: "Often available as generic.",
  });

  add("doxycycline", {
    displayName: "Doxycycline",
    aliases: ["vibramycin", "doryx"],
    brands: ["Vibramycin", "Doryx"],
    iClass: ["tetracycline"],
    use: "Acne, some respiratory/atypical infections, malaria prophylaxis",
    dose: "100 mg once or twice daily (indication-dependent)",
    max: "Photosensitivity; esophageal irritation — take with water, upright",
    side: "GI upset; photosensitivity; teeth discoloration in young children",
    interactions: "Antacids/iron reduce absorption; warfarin",
    contra: "Pregnancy (generally avoid)",
    preg: "Contraindicated for most uses in pregnancy",
    alts: ["azithromycin", "amoxicillin"],
    availability: "Common capsule/tablet forms.",
  });

  add("metformin", {
    displayName: "Metformin",
    aliases: ["glucophage", "diaformin", "metf"],
    brands: ["Glucophage", "Glumetza"],
    iClass: ["metformin"],
    use: "Type 2 diabetes; PCOS (off-label in some regions)",
    dose: "Start low with meals; titrate to effect/tolerance",
    max: "Often 2000–2550 mg/day in divided doses (formulation-dependent)",
    side: "GI upset; B12 deficiency long-term; rare lactic acidosis in contraindicated states",
    interactions: "Iodinated contrast protocols; alcohol excess",
    contra: "eGFR thresholds and acute illness states per local guidance",
    preg: "Often continued in pregnancy in some protocols — specialist-led",
    alts: ["sitagliptin", "empagliflozin", "insulin_glargine"],
    availability: "Among the most widely stocked antidiabetics.",
  });

  add("sitagliptin", {
    displayName: "Sitagliptin",
    aliases: ["januvia"],
    brands: ["Januvia"],
    iClass: ["dpp4_inhibitor"],
    use: "Type 2 diabetes",
    dose: "100 mg daily (reduce in renal impairment)",
    max: "Renal dose adjustment required",
    side: "URI symptoms; rare pancreatitis",
    interactions: "Few major CYP interactions",
    contra: "Hypersensitivity",
    preg: "Limited data — clinician guided",
    alts: ["metformin", "empagliflozin"],
    availability: "Usually available where DPP-4 inhibitors are marketed.",
  });

  add("empagliflozin", {
    displayName: "Empagliflozin",
    aliases: ["jardiance"],
    brands: ["Jardiance"],
    iClass: ["sglt2_inhibitor"],
    use: "Type 2 diabetes; HF/CKD benefits in selected patients",
    dose: "10–25 mg daily (region/indication-specific)",
    max: "Volume depletion; euglycemic DKA risk",
    side: "Genital mycotic infections; UTI; volume depletion",
    interactions: "Diuretics (additive dehydration); insulin (hypoglycemia risk if combined)",
    contra: "Dialysis in some labels; type 1 diabetes (generally not indicated)",
    preg: "Not recommended 2nd/3rd trimester in many labels",
    alts: ["metformin", "sitagliptin"],
    availability: "Growing availability; prior authorization in some systems.",
  });

  add("insulin_glargine", {
    displayName: "Insulin glargine",
    aliases: ["lantus", "toujeo", "abasaglar", "basaglar"],
    brands: ["Lantus", "Basaglar", "Toujeo"],
    iClass: ["insulin"],
    use: "Basal insulin for diabetes",
    dose: "Units individualized — titrate to fasting glucose",
    max: "Hypoglycemia is main acute risk",
    side: "Hypoglycemia; lipodystrophy at injection sites",
    interactions: "Beta-blockers may mask hypoglycemia symptoms; alcohol",
    contra: "Hypoglycemia",
    preg: "Insulin often required in pregnancy — specialist dosing",
    alts: ["insulin_detemir", "insulin_degludec", "nph_insulin"],
    availability: "Cold chain — verify storage; often in stock.",
  });

  add("insulin_detemir", {
    displayName: "Insulin detemir",
    aliases: ["levemir"],
    brands: ["Levemir"],
    iClass: ["insulin"],
    use: "Basal insulin",
    dose: "Twice daily or sometimes once daily — individualized",
    max: "Monitor hypoglycemia",
    side: "Hypoglycemia, injection site reactions",
    interactions: "Same as other insulins",
    contra: "Hypoglycemia",
    preg: "Specialist-guided",
    alts: ["insulin_glargine", "insulin_degludec"],
    availability: "Region-dependent; verify formulary.",
  });

  add("insulin_degludec", {
    displayName: "Insulin degludec",
    aliases: ["tresiba"],
    brands: ["Tresiba"],
    iClass: ["insulin"],
    use: "Ultra-long basal insulin",
    dose: "Individualized units",
    max: "Long duration — delayed hypoglycemia possible",
    side: "Hypoglycemia",
    interactions: "Other glucose-lowering drugs",
    contra: "Hypoglycemia",
    preg: "Specialist-guided",
    alts: ["insulin_glargine"],
    availability: "Often hospital/retail stock where approved.",
  });

  add("nph_insulin", {
    displayName: "NPH insulin (isophane)",
    aliases: ["humulin n", "novolin n"],
    brands: ["Humulin N", "Novolin N"],
    iClass: ["insulin"],
    use: "Intermediate-acting basal insulin",
    dose: "Twice daily common; individualized",
    max: "Peak-related hypoglycemia risk vs newer basals",
    side: "Hypoglycemia",
    interactions: "Other antidiabetics",
    contra: "Hypoglycemia",
    preg: "Used when indicated — close monitoring",
    alts: ["insulin_glargine"],
    availability: "Common and lower-cost option in many markets.",
  });

  add("warfarin", {
    displayName: "Warfarin",
    aliases: ["coumadin", "jantoven"],
    brands: ["Coumadin", "Marevan"],
    iClass: ["vitamin_k_antagonist"],
    use: "Anticoagulation (AF, VTE, mechanical valves — indication-specific)",
    dose: "INR-guided — highly individualized",
    max: "Bleeding risk increases with supratherapeutic INR",
    side: "Bleeding; skin necrosis (rare, protein C deficiency context)",
    interactions: "Many — NSAIDs, antibiotics, amiodarone, azoles, supplements",
    contra: "Major bleeding; pregnancy (teratogenic — context-specific)",
    preg: "Contraindicated in pregnancy for most cases",
    alts: ["apixaban", "rivaroxaban", "dabigatran"],
    availability: "Widely available; requires INR monitoring.",
  });

  add("apixaban", {
    displayName: "Apixaban",
    aliases: ["eliquis"],
    brands: ["Eliquis"],
    iClass: ["doac"],
    use: "AF stroke prevention, VTE treatment/prevention (label-dependent)",
    dose: "2.5 or 5 mg BID (renal/weight/age adjustments)",
    max: "Bleeding risk; avoid duplicate anticoagulation",
    side: "Bleeding",
    interactions: "Strong dual P-gp/CYP3A4 inhibitors/inducers; other anticoagulants",
    contra: "Active pathological bleeding",
    preg: "Generally avoided",
    alts: ["rivaroxaban", "warfarin", "dabigatran"],
    availability: "Common where DOACs are reimbursed.",
  });

  add("rivaroxaban", {
    displayName: "Rivaroxaban",
    aliases: ["xarelto"],
    brands: ["Xarelto"],
    iClass: ["doac"],
    use: "AF, VTE (dosing differs by indication)",
    dose: "Once daily for some indications — follow label",
    max: "Renal adjustments; bleeding risk",
    side: "Bleeding",
    interactions: "Strong CYP3A4/P-gp interactions",
    contra: "Active major bleeding",
    preg: "Generally avoided",
    alts: ["apixaban", "warfarin"],
    availability: "Common in many regions.",
  });

  add("dabigatran", {
    displayName: "Dabigatran",
    aliases: ["pradaxa"],
    brands: ["Pradaxa"],
    iClass: ["doac"],
    use: "AF, VTE (label-dependent)",
    dose: "Capsules — renal adjustments important",
    max: "Bleeding; dyspepsia common",
    side: "Bleeding; GI upset",
    interactions: "P-gp inhibitors/inducers (e.g., dronedarone, rifampin)",
    contra: "Mechanical heart valves (contraindicated historically)",
    preg: "Generally avoided",
    alts: ["apixaban", "warfarin"],
    availability: "Check renal dosing formulations.",
  });

  add("clopidogrel", {
    displayName: "Clopidogrel",
    aliases: ["plavix"],
    brands: ["Plavix"],
    iClass: ["antiplatelet"],
    use: "ACS, post-stent, secondary stroke prevention (indication-specific)",
    dose: "Often 75 mg daily (loading doses in ACS — hospital)",
    max: "Bleeding risk with NSAIDs/anticoagulants",
    side: "Bleeding; bruising",
    interactions: "PPI omeprazole/esomeprazole may reduce activation (debated — check regimen)",
    contra: "Active bleeding",
    preg: "Use only if clearly indicated",
    alts: ["ticagrelor", "aspirin"],
    availability: "Very common generic.",
  });

  add("ticagrelor", {
    displayName: "Ticagrelor",
    aliases: ["brilinta"],
    brands: ["Brilinta"],
    iClass: ["antiplatelet"],
    use: "ACS (with aspirin in many protocols)",
    dose: "Maintenance 60 mg BID (ACS) — label-specific",
    max: "Bleeding; dyspnea",
    side: "Bleeding; dyspnea; bradyarrhythmias with some drugs",
    interactions: "Strong CYP3A4 inhibitors; high-dose aspirin caution per label",
    contra: "Active bleeding; prior ICH",
    preg: "Risk/benefit discussion",
    alts: ["clopidogrel"],
    availability: "Hospital/retail where indicated.",
  });

  add("amlodipine", {
    displayName: "Amlodipine",
    aliases: ["norvasc", "istin"],
    brands: ["Norvasc", "Istin"],
    iClass: ["ccb"],
    use: "Hypertension, angina",
    dose: "5–10 mg once daily",
    max: "Peripheral edema common at higher doses",
    side: "Ankle edema, flushing, gingival hyperplasia (less common)",
    interactions: "Additive BP lowering with other agents",
    contra: "Severe hypotension/shock (relative)",
    preg: "Used when needed — clinician guided",
    alts: ["losartan", "bisoprolol", "hydrochlorothiazide"],
    availability: "Very common.",
  });

  add("losartan", {
    displayName: "Losartan",
    aliases: ["cozaar"],
    brands: ["Cozaar"],
    iClass: ["arb"],
    use: "Hypertension, diabetic nephropathy (label-dependent)",
    dose: "50–100 mg daily (divided in some cases)",
    max: "Hyperkalemia; AKI with dual RAAS blockade",
    side: "Hyperkalemia, dizziness",
    interactions: "K+ supplements; NSAIDs reduce efficacy and worsen renal risk",
    contra: "Pregnancy (fetal toxicity)",
    preg: "Contraindicated in pregnancy",
    alts: ["ramipril", "amlodipine", "hydrochlorothiazide"],
    availability: "Common generic ARB.",
  });

  add("ramipril", {
    displayName: "Ramipril",
    aliases: ["altace"],
    brands: ["Altace", "Tritace"],
    iClass: ["acei"],
    use: "Hypertension, HF, post-MI (indication-dependent)",
    dose: "Start low; titrate",
    max: "Hyperkalemia; cough; angioedema (rare)",
    side: "Dry cough; elevated creatinine in renal artery stenosis",
    interactions: "K+ sparing diuretics; NSAIDs",
    contra: "Pregnancy; history of ACEi angioedema",
    preg: "Contraindicated in pregnancy",
    alts: ["losartan", "amlodipine"],
    availability: "Common.",
  });

  add("bisoprolol", {
    displayName: "Bisoprolol",
    aliases: ["zebeta", "concor"],
    brands: ["Zebeta", "Concor"],
    iClass: ["beta_blocker"],
    use: "Hypertension, HF, angina",
    dose: "Low start; titrate to HR/BP",
    max: "Bradycardia; bronchospasm in reactive airways",
    side: "Fatigue, bradycardia, cold extremities",
    interactions: "Other AV node depressants; may mask hypoglycemia",
    contra: "Severe asthma/bradycardia (context)",
    preg: "Used when benefit outweighs risk — specialist",
    alts: ["atenolol", "metoprolol"],
    availability: "Common in many formularies.",
  });

  add("atenolol", {
    displayName: "Atenolol",
    aliases: ["tenormin"],
    brands: ["Tenormin"],
    iClass: ["beta_blocker"],
    use: "Hypertension, angina",
    dose: "25–100 mg daily (renal adjustments)",
    max: "Less preferred in some HF guidelines vs carvedilol/bisoprolol",
    side: "Bradycardia, fatigue",
    interactions: "Verapamil/diltiazem (heart block risk)",
    contra: "Severe bradycardia",
    preg: "Used when indicated",
    alts: ["bisoprolol", "metoprolol"],
    availability: "Inexpensive generic.",
  });

  add("metoprolol", {
    displayName: "Metoprolol",
    aliases: ["lopressor", "toprol", "seloken"],
    brands: ["Lopressor", "Toprol-XL"],
    iClass: ["beta_blocker"],
    use: "Hypertension, angina, HF (succinate in HF)",
    dose: "Tartrate vs succinate are not interchangeable",
    max: "Bradycardia; masking hypoglycemia",
    side: "Fatigue, bradycardia",
    interactions: "Other negative inotropes/chronotropes",
    contra: "Acute decompensated HF without careful titration (context)",
    preg: "Clinician guided",
    alts: ["bisoprolol", "atenolol"],
    availability: "Very common.",
  });

  add("hydrochlorothiazide", {
    displayName: "Hydrochlorothiazide (HCTZ)",
    aliases: ["hctz", "microzide"],
    brands: ["Microzide"],
    iClass: ["thiazide"],
    use: "Hypertension, edema",
    dose: "12.5–50 mg daily (often combination products)",
    max: "Electrolyte disturbances; gout risk",
    side: "Hypokalemia, hyponatremia, photosensitivity",
    interactions: "NSAIDs reduce efficacy; lithium toxicity risk",
    contra: "Anuria",
    preg: "Generally avoided if alternatives exist",
    alts: ["furosemide", "amlodipine", "spironolactone"],
    availability: "Extremely common (often in combos).",
  });

  add("furosemide", {
    displayName: "Furosemide",
    aliases: ["lasix"],
    brands: ["Lasix"],
    iClass: ["loop_diuretic"],
    use: "Edema, HF, some hypertension",
    dose: "Highly variable — oral/IV",
    max: "Hypokalemia, dehydration, renal dysfunction if over-diuresed",
    side: "Hypotension, electrolyte loss, ototoxicity with rapid high IV",
    interactions: "Aminoglycosides (ototoxicity); NSAIDs reduce diuretic/natriuretic effect",
    contra: "Anuria (some cases)",
    preg: "Use if maternal benefit — monitor",
    alts: ["spironolactone", "hydrochlorothiazide", "amlodipine"],
    availability: "Hospital and community common.",
  });

  add("spironolactone", {
    displayName: "Spironolactone",
    aliases: ["aldactone"],
    brands: ["Aldactone"],
    iClass: ["potassium_sparing"],
    use: "HF, ascites, PCOS hirsutism (off-label), resistant HTN",
    dose: "25–100 mg daily depending on indication",
    max: "Hyperkalemia — avoid with ACEi/ARB/K+ supplements without monitoring",
    side: "Hyperkalemia, gynecomastia",
    interactions: "ACEi/ARB + K+ supplements; trimethoprim",
    contra: "Addison disease; hyperkalemia",
    preg: "Antiandrogenic effects — specialist",
    alts: ["furosemide", "hydrochlorothiazide"],
    availability: "Common generic.",
  });

  add("atorvastatin", {
    displayName: "Atorvastatin",
    aliases: ["lipitor"],
    brands: ["Lipitor"],
    iClass: ["statin"],
    use: "Hyperlipidemia, ASCVD risk reduction",
    dose: "10–80 mg once daily",
    max: "Muscle symptoms; rare rhabdomyolysis",
    side: "Myalgia, transaminitis",
    interactions: "Strong CYP3A4 inhibitors (azole antifungals, macrolides, grapefruit excess)",
    contra: "Active liver disease; pregnancy",
    preg: "Contraindicated in pregnancy",
    alts: ["rosuvastatin", "atorvastatin"],
    availability: "Very common.",
  });

  add("rosuvastatin", {
    displayName: "Rosuvastatin",
    aliases: ["crestor"],
    brands: ["Crestor"],
    iClass: ["statin"],
    use: "Hyperlipidemia",
    dose: "5–40 mg daily (Asian ancestry lower starting doses in some labels)",
    max: "Renal adjustments in some cases",
    side: "Myalgia; proteinuria/hematuria at high doses (historical concern)",
    interactions: "Gemfibrozil (myopathy risk); cyclosporine",
    contra: "Pregnancy",
    preg: "Contraindicated in pregnancy",
    alts: ["atorvastatin", "rosuvastatin"],
    availability: "Common.",
  });

  add("omeprazole", {
    displayName: "Omeprazole",
    aliases: ["prilosec", "losec"],
    brands: ["Prilosec", "Losec"],
    iClass: ["ppi"],
    use: "GERD, ulcer prophylaxis, H. pylori regimens",
    dose: "20–40 mg daily (indication-dependent)",
    max: "Long-term: B12, Mg, fracture risk discussions",
    side: "Headache, diarrhea; drug interactions via CYP",
    interactions: "Clopidogrel activation debate; some antiretrovirals",
    contra: "Hypersensitivity",
    preg: "Generally low risk when needed",
    alts: ["pantoprazole", "esomeprazole", "famotidine"],
    availability: "OTC and Rx widely.",
  });

  add("pantoprazole", {
    displayName: "Pantoprazole",
    aliases: ["protonix", "pantoloc"],
    brands: ["Protonix", "Pantoloc"],
    iClass: ["ppi"],
    use: "GERD, ulcer, Zollinger–Ellison (high doses)",
    dose: "20–40 mg daily",
    max: "Similar class effects to other PPIs",
    side: "Headache, GI upset",
    interactions: "Warfarin (monitor INR); methotrexate clearance",
    contra: "Hypersensitivity",
    preg: "Use lowest effective dose",
    alts: ["omeprazole", "esomeprazole", "famotidine"],
    availability: "Common.",
  });

  add("esomeprazole", {
    displayName: "Esomeprazole",
    aliases: ["nexium"],
    brands: ["Nexium"],
    iClass: ["ppi"],
    use: "GERD, erosive esophagitis",
    dose: "20–40 mg daily",
    max: "Long-term nutrient issues as with PPI class",
    side: "Headache, diarrhea",
    interactions: "Clopidogrel interaction concerns similar to omeprazole class",
    contra: "Hypersensitivity",
    preg: "When clearly needed",
    alts: ["pantoprazole", "famotidine"],
    availability: "OTC and Rx.",
  });

  add("famotidine", {
    displayName: "Famotidine",
    aliases: ["pepcid"],
    brands: ["Pepcid"],
    iClass: ["h2_blocker"],
    use: "GERD, dyspepsia, urticaria adjunct",
    dose: "10–20 mg BID or daily (OTC vs Rx)",
    max: "Less potent acid suppression than PPI for severe esophagitis",
    side: "Headache, constipation",
    interactions: "Fewer CYP issues than cimetidine",
    contra: "Hypersensitivity",
    preg: "Generally acceptable OTC use short-term",
    alts: ["omeprazole", "ranitidine_alternative"],
    availability: "Very common OTC.",
  });

  add("ranitidine_alternative", {
    displayName: "H2 blockers / alternatives (ranitidine recall note)",
    aliases: ["ranitidine", "zantac"],
    brands: ["Zantac (historical)"],
    iClass: ["h2_blocker"],
    use: "Many patients switched to famotidine or PPIs after market withdrawals/recalls in regions",
    dose: "N/A — prefer famotidine/PPI per indication",
    max: "Educational entry for search",
    side: "N/A",
    interactions: "N/A",
    contra: "See local regulatory status",
    preg: "Discuss alternatives",
    alts: ["famotidine", "omeprazole"],
    availability: "Varies by country; famotidine widely substituted.",
  });

  add("salbutamol", {
    displayName: "Salbutamol (Albuterol)",
    aliases: ["albuterol", "ventolin", "proair"],
    brands: ["Ventolin", "ProAir"],
    iClass: ["beta_agonist_short"],
    use: "Bronchospasm relief",
    dose: "Inhaler puffs per action plan",
    max: "Excessive use signals poor control — seek review",
    side: "Tremor, tachycardia, hypokalemia at high doses",
    interactions: "Non-selective beta-blockers antagonize effect",
    contra: "Hypersensitivity to formulation",
    preg: "Commonly used — clinician guided",
    alts: ["budesonide", "montelukast"],
    availability: "Rescue inhalers commonly stocked.",
  });

  add("budesonide", {
    displayName: "Budesonide (inhaled)",
    aliases: ["pulmicort", "rhinocort"],
    brands: ["Pulmicort", "Rhinocort"],
    iClass: ["ics"],
    use: "Asthma/COPD controller (formulation-dependent)",
    dose: "Titrate per guidelines",
    max: "Rinse mouth after ICS to reduce thrush",
    side: "Oral candidiasis, hoarseness",
    interactions: "Strong CYP3A4 inhibitors may increase systemic steroid exposure",
    contra: "Active untreated infection (context)",
    preg: "Often preferred inhaled options — specialist",
    alts: ["salbutamol", "montelukast"],
    availability: "Common in inhaler forms.",
  });

  add("montelukast", {
    displayName: "Montelukast",
    aliases: ["singulair"],
    brands: ["Singulair"],
    iClass: ["leukotriene"],
    use: "Asthma; allergic rhinitis",
    dose: "10 mg adults daily (chewables for peds)",
    max: "Neuropsychiatric warnings in some labels — counsel patients",
    side: "Headache; rare mood/sleep changes",
    interactions: "Few",
    contra: "Hypersensitivity",
    preg: "Use if benefit outweighs risk",
    alts: ["cetirizine", "budesonide"],
    availability: "Common.",
  });

  add("cetirizine", {
    displayName: "Cetirizine",
    aliases: ["zyrtec", "reactine"],
    brands: ["Zyrtec", "Reactine"],
    iClass: ["antihistamine_2nd"],
    use: "Allergic rhinitis, urticaria",
    dose: "10 mg daily (reduce in renal impairment per label)",
    max: "Sedation less than 1st-gen but possible",
    side: "Somnolence, dry mouth",
    interactions: "Additive sedation with alcohol/CNS depressants",
    contra: "End-stage renal failure without adjustment (per label)",
    preg: "Often considered compatible",
    alts: ["loratadine", "cetirizine"],
    availability: "OTC common.",
  });

  add("loratadine", {
    displayName: "Loratadine",
    aliases: ["claritin", "alavert"],
    brands: ["Claritin"],
    iClass: ["antihistamine_2nd"],
    use: "Allergic rhinitis, urticaria",
    dose: "10 mg daily",
    max: "Hepatic/renal adjustments in some labels",
    side: "Headache, somnolence (less common)",
    interactions: "CYP interactions fewer than older antihistamines",
    contra: "Hypersensitivity",
    preg: "Generally considered low risk",
    alts: ["cetirizine", "loratadine"],
    availability: "OTC common.",
  });

  add("sertraline", {
    displayName: "Sertraline",
    aliases: ["zoloft", "lustral"],
    brands: ["Zoloft"],
    iClass: ["ssri"],
    use: "Depression, anxiety, OCD (label-dependent)",
    dose: "Titrate; max varies by indication",
    max: "Serotonin syndrome with MAOIs/serotonergic combos",
    side: "GI upset, sexual dysfunction, hyponatremia (elderly)",
    interactions: "MAOIs contraindicated; tramadol/triptans/linezolid caution",
    contra: "MAOI washout periods required",
    preg: "Risk/benefit — neonatal adaptation if late pregnancy",
    alts: [],
    availability: "Very common.",
  });

  add("tramadol", {
    displayName: "Tramadol",
    aliases: ["ultram", "zydol"],
    brands: ["Ultram", "Zydol"],
    iClass: ["opioid", "snri_weak"],
    use: "Moderate pain (regulation varies)",
    dose: "Titrate; reduce in renal impairment/ elderly",
    max: "Seizure risk; serotonin syndrome with serotonergic drugs",
    side: "Nausea, dizziness, sedation, seizures",
    interactions: "SSRIs/SNRIs, MAOIs, TCAs, linezolid — serotonin syndrome",
    contra: "Acute intoxication with alcohol/CNS depressants",
    preg: "Generally avoided near delivery",
    alts: ["paracetamol", "codeine"],
    availability: "Controlled in many countries.",
  });

  add("morphine", {
    displayName: "Morphine",
    aliases: ["ms contin", "oramorph", "kadian"],
    brands: ["MS Contin", "Oramorph"],
    iClass: ["opioid"],
    use: "Moderate–severe pain (acute/chronic — specialized)",
    dose: "Individual titration — start low in opioid-naïve",
    max: "Respiratory depression; accumulation in renal impairment (M6G)",
    side: "Constipation, sedation, nausea",
    interactions: "Benzodiazepines/alcohol (respiratory depression); MAOIs",
    contra: "Acute severe asthma without monitoring; paralytic ileus",
    preg: "Use only when clearly indicated — neonatal withdrawal risk",
    alts: ["oxycodone", "fentanyl", "buprenorphine"],
    availability: "Hospital-focused; strict controls in community.",
  });

  add("levothyroxine", {
    displayName: "Levothyroxine",
    aliases: ["synthroid", "eltroxin", "euthyrox"],
    brands: ["Synthroid", "Euthyrox"],
    iClass: ["thyroid_hormone"],
    use: "Hypothyroidism",
    dose: "1.6 mcg/kg/day typical starting estimate — titrate TSH",
    max: "Osteoporosis/AF if overtreatment",
    side: "Palpitations, tremor if excessive",
    interactions: "Calcium/iron/soy reduce absorption — separate by hours",
    contra: "Uncorrected adrenal insufficiency (relative)",
    preg: "Dose often increases — close TSH monitoring",
    alts: ["liothyronine"],
    availability: "Very common; many brands — consistency matters.",
  });

  add("metoclopramide", {
    displayName: "Metoclopramide",
    aliases: ["reglan", "maxolon"],
    brands: ["Reglan", "Maxolon"],
    iClass: ["prokinetic"],
    use: "Nausea, gastroparesis (label-dependent)",
    dose: "Short courses often recommended due to TD risk",
    max: "Tardive dyskinesia risk — avoid long-term unless specialist",
    side: "EPS, sedation, QT",
    interactions: "Other QT drugs; antipsychotics (additive EPS)",
    contra: "Phaeochromocytoma; GI obstruction/perforation",
    preg: "Short-term use when needed",
    alts: ["ondansetron", "domperidone"],
    availability: "Varies; regulatory restrictions in some regions.",
  });

  add("ondansetron", {
    displayName: "Ondansetron",
    aliases: ["zofran"],
    brands: ["Zofran"],
    iClass: ["antiemetic_5ht3"],
    use: "Nausea/vomiting (chemo, post-op, pregnancy — context-specific)",
    dose: "4–8 mg (frequency depends on indication)",
    max: "QT prolongation; constipation",
    side: "Headache, constipation",
    interactions: "Other QT-prolonging agents",
    contra: "Congenital long QT (relative)",
    preg: "Used when benefit outweighs risk — local protocols",
    alts: ["metoclopramide", "granisetron"],
    availability: "Common in hospitals and retail.",
  });

  add("sumatriptan", {
    displayName: "Sumatriptan",
    aliases: ["imitrex", "imigran"],
    brands: ["Imitrex", "Imigran"],
    iClass: ["triptan"],
    use: "Acute migraine (and cluster in some forms)",
    dose: "Oral/SC/nasal per label — watch max daily dose",
    max: "Vasospasm/coronary disease cautions",
    side: "Chest pressure, tingling",
    interactions: "Ergot derivatives (avoid 24h overlap); MAOIs",
    contra: "Ischemic heart disease / uncontrolled HTN (context)",
    preg: "Discuss risk/benefit",
    alts: ["rizatriptan", "naproxen"],
    availability: "Common migraine abortive.",
  });

  add("allopurinol", {
    displayName: "Allopurinol",
    aliases: ["zyloprim"],
    brands: ["Zyloprim"],
    iClass: ["xanthine_oxidase"],
    use: "Gout prophylaxis, tumor lysis prophylaxis",
    dose: "Start low; titrate to uric acid",
    max: "SJS/TEN risk — HLA-B*5801 screening in some populations",
    side: "Rash (stop and evaluate if systemic)",
    interactions: "Azathioprine/mercaptopurine toxicity (dose reduction needed)",
    contra: "Prior hypersensitivity to allopurinol",
    preg: "Use when indicated with monitoring",
    alts: ["febuxostat", "probenecid"],
    availability: "Common generic.",
  });

  add("colchicine", {
    displayName: "Colchicine",
    aliases: ["colcrys", "lodoco"],
    brands: ["Colcrys"],
    iClass: ["colchicine"],
    use: "Acute gout flares; some pericarditis regimens",
    dose: "Low-dose regimens common — follow local guidance",
    max: "GI toxicity; myelosuppression in overdose/renal impairment",
    side: "Diarrhea, nausea",
    interactions: "Strong CYP3A4/P-gp inhibitors (macrolides, azoles) — toxicity risk",
    contra: "Severe renal/hepatic impairment without adjustment",
    preg: "Contraindicated in some labels",
    alts: ["ibuprofen", "prednisolone"],
    availability: "May be tightly regulated/expensive in some markets.",
  });

  add("tamsulosin", {
    displayName: "Tamsulosin",
    aliases: ["flomax"],
    brands: ["Flomax"],
    iClass: ["alpha_blocker_urologic"],
    use: "BPH symptoms",
    dose: "0.4 mg daily (some 0.8 mg)",
    max: "Orthostatic hypotension (especially first dose)",
    side: "Dizziness, retrograde ejaculation",
    interactions: "Other alpha-1 blockers; PDE5 inhibitors (hypotension)",
    contra: "History of orthostatic hypotension (context)",
    preg: "Not indicated (male use)",
    alts: ["finasteride"],
    availability: "Common.",
  });

  add("finasteride", {
    displayName: "Finasteride",
    aliases: ["proscar", "propecia"],
    brands: ["Proscar", "Propecia"],
    iClass: ["5ari"],
    use: "BPH; male pattern hair loss (lower dose)",
    dose: "1 mg vs 5 mg — different indications",
    max: "PSA decreases — inform clinicians interpreting PSA",
    side: "Sexual dysfunction; depression reports (counsel)",
    interactions: "Few major metabolic interactions",
    contra: "Pregnancy — teratogenic to male fetus (handling precautions)",
    preg: "Women should not handle crushed tablets if pregnant",
    alts: ["dutasteride", "tamsulosin"],
    availability: "Common.",
  });

  add("phenazone_combo", {
    displayName: "OTC cold/flu combination products",
    aliases: ["cold and flu", "dayquil", "nyquil", "multi symptom"],
    brands: ["Many regional brands"],
    iClass: ["combo_otc"],
    use: "Symptom relief — check duplicate ingredients",
    dose: "Avoid duplicate paracetamol/acetaminophen across products",
    max: "Liver injury from hidden paracetamol in combos",
    side: "Anticholinergic effects from antihistamine components",
    interactions: "Sedation with alcohol; MAOIs with some decongestants (rare products)",
    contra: "Uncontrolled hypertension with oral decongestants (phenylephrine/pseudoephedrine)",
    preg: "Read labels — many decongestants limited in pregnancy",
    alts: ["paracetamol", "saline", "cetirizine"],
    availability: "Ubiquitous — pharmacist review recommended.",
  });

  add("nitroglycerin", {
    displayName: "Nitroglycerin (GTN)",
    aliases: ["nitrostat", "glytrin"],
    brands: ["Nitrostat", "Glytrin"],
    iClass: ["nitrate"],
    use: "Angina relief (acute)",
    dose: "SL spray/tablet per protocol",
    max: "Hypotension; tolerance with continuous use",
    side: "Headache, hypotension",
    interactions: "PDE5 inhibitors (sildenafil/tadalafil) — life-threatening hypotension",
    contra: "Use with PDE5 inhibitors within guideline windows",
    preg: "Use in pregnancy only if clearly indicated",
    alts: ["isosorbide"],
    availability: "Common acute angina supply.",
  });

  add("sildenafil", {
    displayName: "Sildenafil",
    aliases: ["viagra", "revatio"],
    brands: ["Viagra", "Revatio"],
    iClass: ["pde5_inhibitor"],
    use: "Erectile dysfunction; pulmonary hypertension (different strength/brand)",
    dose: "ED: per label; avoid with nitrates",
    max: "Hypotension with nitrates — contraindicated combination",
    side: "Headache, flushing, dyspepsia; vision changes (rare)",
    interactions: "Nitrates (contraindicated); alpha-blockers (caution)",
    contra: "Concurrent nitrate therapy",
    preg: "Not indicated for ED in pregnancy",
    alts: ["tadalafil", "vardenafil"],
    availability: "Rx; some regions OTC for certain doses.",
  });

  add("prednisolone", {
    displayName: "Prednisolone",
    aliases: ["prednisone", "deltacortril"],
    brands: ["Prelone", "Orapred"],
    iClass: ["corticosteroid_systemic"],
    use: "Inflammation/immune suppression (many indications)",
    dose: "Highly variable — taper schedules matter",
    max: "Infection risk; hyperglycemia; osteoporosis long-term",
    side: "Insomnia, mood changes, weight gain",
    interactions: "NSAIDs (GI bleed); warfarin (INR); vaccines (live vaccines caution)",
    contra: "Systemic fungal infections (relative); live vaccines during high doses",
    preg: "Short bursts often compatible — specialist for long-term",
    alts: ["dexamethasone", "hydrocortisone"],
    availability: "Very common.",
  });

  add("vitamin_d", {
    displayName: "Cholecalciferol / Vitamin D3",
    aliases: ["vitamin d3", "colecalciferol", "deca-d"],
    brands: ["Many OTC brands"],
    iClass: ["vitamin"],
    use: "Deficiency replacement, osteoporosis adjunct",
    dose: "Depends on level and region (1000–4000 IU common OTC)",
    max: "Hypercalcemia if excessive",
    side: "Hypercalcemia/hypercalciuria if overdose",
    interactions: "Thiazides (hypercalcemia risk); digoxin toxicity if hypercalcemia",
    contra: "Hypercalcemia disorders",
    preg: "Often supplemented — obstetric guidance",
    alts: ["calcium", "ergocalciferol"],
    availability: "Widely OTC.",
  });

  add("methotrexate", {
    displayName: "Methotrexate",
    aliases: ["mtx", "trexall", "rheumatrex"],
    brands: ["Trexall", "Rheumatrex"],
    iClass: ["methotrexate", "antimetabolite"],
    use: "Rheumatoid arthritis, psoriasis, some malignancies (high dose)",
    dose: "Weekly low-dose vs oncology protocols differ greatly",
    max: "Hepatotoxicity; myelosuppression; pulmonary fibrosis",
    side: "Nausea, mouth ulcers; infection risk",
    interactions: "NSAIDs/penicillins may increase MTX levels; trimethoprim (additive bone marrow risk)",
    contra: "Pregnancy; significant immunosuppression (context)",
    preg: "Teratogenic — contraception essential",
    alts: ["prednisolone"],
    availability: "Usually stocked; strict monitoring programs in many regions.",
  });

  add("diazepam", {
    displayName: "Diazepam",
    aliases: ["valium"],
    brands: ["Valium"],
    iClass: ["benzodiazepine", "cns_depressant"],
    use: "Anxiety, muscle spasm, seizures (acute), alcohol withdrawal (protocols)",
    dose: "Highly variable — avoid long-term dependence",
    max: "Respiratory depression with opioids/alcohol",
    side: "Sedation, dependence, falls in elderly",
    interactions: "Opioids (respiratory depression); other CNS depressants",
    contra: "Respiratory failure; myasthenia gravis (relative)",
    preg: "Avoid if possible especially 1st trimester",
    alts: ["lorazepam", "oxazepam"],
    availability: "Controlled; availability varies.",
  });

  add("iodinated_contrast", {
    displayName: "Iodinated contrast media (CT/angio)",
    aliases: ["contrast", "iv contrast", "ct contrast", "angiography contrast"],
    brands: ["Various manufacturers"],
    iClass: ["iodinated_contrast"],
    use: "Imaging enhancement",
    dose: "Per radiology protocol",
    max: "Allergic reactions; contrast-induced nephropathy risk",
    side: "Anaphylactoid reaction; nephropathy in CKD/dehydration",
    interactions: "Metformin holding protocols around procedures in selected patients",
    contra: "Prior severe contrast reaction management per protocol",
    preg: "Use lowest dose; obstetric/radiology guidance",
    alts: ["gadolinium", "ultrasound"],
    availability: "Hospital/imaging centers — not a pharmacy dispensed product.",
  });

  add("fluconazole", {
    displayName: "Fluconazole",
    aliases: ["diflucan"],
    brands: ["Diflucan"],
    iClass: ["azole", "cyp3a4_inhibitor_strong", "cyp2c9_inhibitor"],
    use: "Candidiasis; some prophylaxis regimens",
    dose: "150 mg single dose (vulvovaginal) to higher for systemic (label-specific)",
    max: "Hepatotoxicity; QT prolongation",
    side: "GI upset; rash; drug interactions",
    interactions: "Warfarin (INR); statins (myopathy); tacrolimus/cyclosporine levels",
    contra: "QT risk with other QT drugs (careful review)",
    preg: "High-dose chronic risk discussions — single low dose often used in candidiasis",
    alts: ["itraconazole", "voriconazole"],
    availability: "Common oral and IV.",
  });

  add("linezolid", {
    displayName: "Linezolid",
    aliases: ["zyvox"],
    brands: ["Zyvox"],
    iClass: ["maoi_weak", "oxazolidinone"],
    use: "Resistant Gram-positive infections (MRSA, VRE — context-specific)",
    dose: "600 mg BID typically (renal adjustments uncommon)",
    max: "Serotonin syndrome with serotonergic drugs; thrombocytopenia with prolonged use",
    side: "GI upset; myelosuppression with long courses",
    interactions: "SSRIs/SNRIs/triptans/tramadol — serotonin syndrome risk",
    contra: "Uncontrolled hypertension with tyramine-rich diet (theoretical); MAOI interactions",
    preg: "Use only if benefit outweighs risk",
    alts: ["vancomycin", "daptomycin"],
    availability: "Hospital-heavy; expensive.",
  });

  /** Stable display order for library snippets */
  var ORDER = [
    "paracetamol",
    "ibuprofen",
    "amoxicillin",
    "amoxicillin_clavulanate",
    "azithromycin",
    "metformin",
    "insulin_glargine",
    "amlodipine",
    "losartan",
    "atorvastatin",
    "omeprazole",
    "salbutamol",
    "budesonide",
    "cetirizine",
    "warfarin",
    "apixaban",
    "clopidogrel",
    "levothyroxine",
    "metoclopramide",
    "tramadol",
    "naproxen",
    "diclofenac",
    "doxycycline",
    "ciprofloxacin",
    "cefuroxime",
    "empagliflozin",
    "sitagliptin",
    "furosemide",
    "spironolactone",
    "hydrochlorothiazide",
    "bisoprolol",
    "montelukast",
    "sertraline",
    "sumatriptan",
    "allopurinol",
    "tamsulosin",
    "prednisolone",
    "vitamin_d",
    "phenazone_combo",
  ];

  /** Class–class interaction rules (sorted key a+b, a<b alphabetically) */
  var CLASS_RULES = [
    { a: "acei", b: "nsaid", level: "Moderate", effect: "Reduced antihypertensive effect; increased AKI risk especially with diuretics/dehydration.", rec: "Monitor BP and renal function; avoid NSAID overlap when possible." },
    { a: "antiplatelet", b: "nsaid", level: "Moderate", effect: "Increased GI bleeding risk.", rec: "Prefer non-NSAID analgesia when possible; add gastroprotection if high risk." },
    { a: "arb", b: "nsaid", level: "Moderate", effect: "AKI and hyperkalemia risk, especially with diuretics or CKD.", rec: "Shortest NSAID duration; monitor creatinine and K+." },
    { a: "beta_blocker", b: "nsaid", level: "Low–Moderate", effect: "NSAIDs may blunt antihypertensive effect of some agents.", rec: "Monitor BP; choose alternative analgesia if poorly controlled." },
    { a: "doac", b: "nsaid", level: "Moderate", effect: "Increased bleeding risk.", rec: "Avoid routine NSAID use; if unavoidable, shortest duration + bleeding precautions." },
    { a: "nsaid", b: "ssri", level: "Moderate", effect: "Increased upper GI bleeding risk.", rec: "Consider PPI/gastroprotection; avoid multi-risk combinations." },
    { a: "nsaid", b: "vitamin_k_antagonist", level: "Moderate", effect: "Increased bleeding risk; may affect INR unpredictably.", rec: "Prefer paracetamol for analgesia when appropriate; monitor INR if NSAID needed." },
    { a: "macrolide", b: "statin", level: "Moderate", effect: "Some macrolides inhibit CYP3A4 → higher statin levels → myopathy.", rec: "Hold high-intensity statin temporarily or switch antibiotic class if clinically appropriate." },
    { a: "ppi", b: "ssri", level: "Low", effect: "Minor absorption/pH effects possible; clinically usually minor.", rec: "Monitor clinical response if concerns." },
    { a: "metformin", b: "iodinated_contrast", level: "High (context)", effect: "Rare lactic acidosis risk around contrast in unstable/AKI settings.", rec: "Follow local contrast protocols (often hold metformin around procedure if eGFR low or AKI)." },
    { a: "methotrexate", b: "nsaid", level: "Moderate", effect: "Reduced renal clearance of MTX → toxicity risk.", rec: "Avoid combination when possible; monitor CBC/LFTs/MTX levels." },
    { a: "methotrexate", b: "penicillin", level: "Low–Moderate", effect: "Some reports of MTX toxicity with penicillins.", rec: "Monitor MTX toxicity signals if co-prescribed." },
    { a: "nitrate", b: "pde5_inhibitor", level: "Major", effect: "Profound hypotension.", rec: "Do not combine; observe nitrate/PDE5 washout intervals per guidelines." },
    { a: "opioid", b: "benzodiazepine", level: "Major", effect: "Respiratory depression and overdose risk.", rec: "Avoid concurrent use when possible; lowest doses and monitoring if unavoidable." },
    { a: "maoi_weak", b: "ssri", level: "Major", effect: "Serotonin syndrome risk (e.g., linezolid + SSRI/SNRI/triptans/tramadol).", rec: "Avoid combinations; hold serotonergic drugs during linezolid when possible per protocol." },
    { a: "opioid", b: "ssri", level: "Moderate", effect: "Serotonin syndrome risk (esp. tramadol + serotonergic agents).", rec: "Avoid serotonergic combos; counsel on warning signs." },
    { a: "potassium_sparing", b: "thiazide", level: "Low (monitor)", effect: "May help balance K+ depending on setting; risk if also on ACEi/ARB/K+ supplements.", rec: "Monitor electrolytes when combining RAAS-modifying drugs." },
    { a: "ssri", b: "triptan", level: "Moderate", effect: "Serotonin syndrome (rare but serious).", rec: "Use lowest effective doses; avoid multiple serotonergic agents." },
    { a: "doac", b: "antiplatelet", level: "Moderate", effect: "Increased bleeding risk.", rec: "Use only when indicated; review need and gastroprotection." },
    { a: "nsaid", b: "nsaid", level: "Moderate", effect: "Duplicate NSAIDs raise GI, bleeding and renal risk without extra benefit.", rec: "Avoid combining NSAIDs." },
    { a: "quinolone", b: "statin", level: "Low–Moderate", effect: "Additive QT/myopathy risk in susceptible patients.", rec: "Monitor symptoms; consider temporary statin hold if severe infection." },
  ];

  var EXPLICIT_PAIRS = {
    "clopidogrel+ibuprofen": { level: "Moderate", effect: "Increased bleeding risk.", rec: "Avoid NSAIDs; use alternative analgesia and consider gastroprotection." },
    "ibuprofen+warfarin": { level: "Moderate", effect: "Increased bleeding and GI risk.", rec: "Prefer paracetamol; if NSAID unavoidable, monitor INR and bleeding." },
    "metformin+omeprazole": { level: "Low", effect: "Usually minor; some B12 considerations long-term.", rec: "Routine monitoring per diabetes care." },
    "paracetamol+warfarin": { level: "Moderate", effect: "May increase INR with frequent/high-dose regular use.", rec: "Use lowest effective dose; monitor INR if regular daily use." },
    "amoxicillin+methotrexate": { level: "Moderate", effect: "Possible MTX toxicity via renal interaction.", rec: "Monitor MTX levels/CBC if coprescribed." },
  };

  /** Names that are not full monographs but can be used in interaction checks */
  var PSEUDO = {
    alcohol: { iClass: ["cns_depressant"] },
  };

  global.PHARMACARE_DRUG_DB = DB;
  global.PHARMACARE_DRUG_ORDER = ORDER;
  global.PHARMACARE_CLASS_RULES = CLASS_RULES;
  global.PHARMACARE_EXPLICIT_PAIRS = EXPLICIT_PAIRS;
  global.PHARMACARE_PSEUDO_DRUGS = PSEUDO;
})(typeof window !== "undefined" ? window : globalThis);
