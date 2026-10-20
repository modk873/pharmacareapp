/**
 * Arabic pronunciation for medicine names (Arabic-script transliteration).
 */
(function (global) {
  "use strict";

  var PRON_OVERRIDES = {
    paracetamol: "\u0628\u0627\u0631\u0627\u0633\u064A\u062A\u0627\u0645\u0648\u0644",
    ibuprofen: "\u0627\u064A\u0628\u0648\u0628\u0631\u0648\u0641\u064A\u0646",
    naproxen: "\u0646\u0627\u0628\u0631\u0648\u0643\u0633\u064A\u0646",
    diclofenac: "\u062F\u064A\u0643\u0644\u0648\u0641\u064A\u0646\u0627\u0643",
    aspirin: "\u0623\u0633\u0628\u0631\u064A\u0646",
    amoxicillin: "\u0623\u0645\u0648\u0643\u0633\u064A\u0633\u064A\u0644\u064A\u0646",
    amoxicillin_clavulanate: "\u0623\u0645\u0648\u0643\u0633\u064A\u0633\u064A\u0644\u064A\u0646 \u0643\u0644\u0627\u0641\u0648\u0644\u0627\u0646\u064A\u062A",
    azithromycin: "\u0623\u0632\u064A\u062B\u0631\u0648\u0645\u0627\u064A\u0633\u064A\u0646",
    ciprofloxacin: "\u0633\u064A\u0628\u0631\u0648\u0641\u0644\u0648\u0643\u0633\u0627\u0633\u064A\u0646",
    cefuroxime: "\u0633\u064A\u0641\u0648\u0631\u0648\u0643\u0633\u064A\u0645",
    doxycycline: "\u062F\u0648\u0643\u0633\u064A\u0643\u0644\u064A\u0646",
    metformin: "\u0645\u064A\u062A\u0641\u0648\u0631\u0645\u064A\u0646",
    sitagliptin: "\u0633\u064A\u062A\u0627\u063A\u0644\u064A\u0628\u062A\u064A\u0646",
    empagliflozin: "\u0625\u0645\u0628\u0627\u063A\u0644\u064A\u0641\u0644\u0648\u0632\u064A\u0646",
    insulin_glargine: "\u0623\u0646\u0633\u0648\u0644\u064A\u0646 \u063A\u0644\u0627\u0631\u062C\u064A\u0646",
    insulin_detemir: "\u0623\u0646\u0633\u0648\u0644\u064A\u0646 \u062F\u064A\u062A\u0645\u064A\u0631",
    insulin_degludec: "\u0623\u0646\u0633\u0648\u0644\u064A\u0646 \u062F\u064A\u063A\u0644\u0648\u062F\u064A\u0643",
    nph_insulin: "\u0623\u0646\u0633\u0648\u0644\u064A\u0646 NPH",
    warfarin: "\u0648\u0627\u0631\u0641\u0627\u0631\u064A\u0646",
    apixaban: "\u0623\u0628\u064A\u0643\u0633\u0627\u0628\u0627\u0646",
    rivaroxaban: "\u0631\u064A\u0641\u0627\u0631\u0648\u0643\u0633\u0627\u0628\u0627\u0646",
    dabigatran: "\u062F\u0627\u0628\u064A\u063A\u0627\u062A\u0631\u0627\u0646",
    clopidogrel: "\u0643\u0644\u0648\u0628\u064A\u062F\u0648\u062C\u0631\u064A\u0644",
    ticagrelor: "\u062A\u064A\u0643\u0627\u063A\u0631\u064A\u0644\u0648\u0631",
    amlodipine: "\u0623\u0645\u0644\u0648\u062F\u064A\u0628\u064A\u0646",
    losartan: "\u0644\u0648\u0633\u0627\u0631\u062A\u0627\u0646",
    ramipril: "\u0631\u0627\u0645\u064A\u0628\u0631\u064A\u0644",
    bisoprolol: "\u0628\u064A\u0633\u0648\u0628\u0631\u0648\u0644\u0648\u0644",
    atenolol: "\u0623\u062A\u064A\u0646\u0648\u0644\u0648\u0644",
    metoprolol: "\u0645\u064A\u062A\u0648\u0628\u0631\u0648\u0644\u0648\u0644",
    hydrochlorothiazide: "\u0647\u064A\u062F\u0631\u0648\u0643\u0644\u0648\u0631\u0648\u062B\u064A\u0627\u0632\u064A\u062F",
    furosemide: "\u0641\u064A\u0631\u0648\u0633\u064A\u0645\u064A\u062F",
    spironolactone: "\u0633\u0628\u064A\u0631\u0648\u0646\u0648\u0644\u0627\u0643\u062A\u0648\u0646",
    atorvastatin: "\u0623\u062A\u0648\u0631\u0641\u0627\u0633\u062A\u0627\u062A\u064A\u0646",
    rosuvastatin: "\u0631\u0648\u0633\u0648\u0641\u0627\u0633\u062A\u0627\u062A\u064A\u0646",
    omeprazole: "\u0623\u0648\u0645\u064A\u0628\u0631\u0627\u0632\u0648\u0644",
    pantoprazole: "\u0628\u0627\u0646\u062A\u0648\u0628\u0631\u0627\u0632\u0648\u0644",
    esomeprazole: "\u0625\u064A\u0633\u0648\u0645\u064A\u0628\u0631\u0627\u0632\u0648\u0644",
    famotidine: "\u0641\u0627\u0645\u0648\u062A\u064A\u062F\u064A\u0646",
    ranitidine_alternative: "\u0631\u0627\u0646\u064A\u062A\u064A\u062F\u064A\u0646",
    salbutamol: "\u0633\u0644\u0628\u0648\u062A\u0627\u0645\u0648\u0644",
    budesonide: "\u0628\u0648\u062F\u064A\u0633\u0648\u0646\u064A\u062F",
    montelukast: "\u0645\u0648\u0646\u062A\u064A\u0644\u0648\u0643\u0627\u0633\u062A",
    cetirizine: "\u0633\u064A\u062A\u064A\u0631\u064A\u0632\u064A\u0646",
    loratadine: "\u0644\u0648\u0631\u0627\u062A\u0627\u062F\u064A\u0646",
    sertraline: "\u0633\u064A\u0631\u062A\u0631\u0627\u0644\u064A\u0646",
    tramadol: "\u062A\u0631\u0627\u0645\u0627\u062F\u0648\u0644",
    morphine: "\u0645\u0648\u0631\u0641\u064A\u0646",
    levothyroxine: "\u0644\u064A\u0641\u0648\u062B\u064A\u0631\u0648\u0643\u0633\u064A\u0646",
    metoclopramide: "\u0645\u064A\u062A\u0648\u0643\u0644\u0648\u0628\u0631\u0627\u0645\u064A\u062F",
    ondansetron: "\u0623\u0648\u0646\u062F\u0627\u0646\u0633\u064A\u062A\u0631\u0648\u0646",
    sumatriptan: "\u0633\u0648\u0645\u0627\u062A\u0631\u064A\u0628\u062A\u0627\u0646",
    allopurinol: "\u0623\u0644\u0648\u0628\u064A\u0648\u0631\u064A\u0646\u0648\u0644",
    colchicine: "\u0643\u0648\u0644\u0634\u064A\u0633\u064A\u0646",
    tamsulosin: "\u062A\u0627\u0645\u0633\u0648\u0644\u0648\u0633\u064A\u0646",
    finasteride: "\u0641\u064A\u0646\u0627\u0633\u062A\u064A\u0631\u0627\u064A\u062F",
    phenazone_combo: "\u0641\u064A\u0646\u0627\u0632\u0648\u0646 \u0645\u0631\u0643\u0628",
    nitroglycerin: "\u0646\u062A\u0631\u0648\u063A\u0644\u064A\u0633\u064A\u0631\u064A\u0646",
    sildenafil: "\u0633\u064A\u0644\u062F\u0646\u0627\u0641\u064A\u0644",
    prednisolone: "\u0628\u0631\u064A\u062F\u0646\u064A\u0632\u0648\u0644\u0648\u0646",
    vitamin_d: "\u0641\u064A\u062A\u0627\u0645\u064A\u0646 \u062F",
    methotrexate: "\u0645\u064A\u062B\u0648\u062A\u0631\u064A\u0643\u0633\u064A\u062A",
    diazepam: "\u062F\u064A\u0627\u0632\u064A\u0628\u0627\u0645",
    fluconazole: "\u0641\u0644\u0648\u0643\u0648\u0646\u0627\u0632\u0648\u0644",
    linezolid: "\u0644\u064A\u0646\u064A\u0632\u0648\u0644\u064A\u062F",
    iodinated_contrast: "\u0635\u0628\u063A\u0629 \u0645\u062A\u0628\u0628\u0631\u0629 \u0628\u0627\u0644\u064A\u0648\u062F",
    chamomile: "\u0627\u0644\u0628\u0627\u0628\u0648\u0646\u062C",
    ginger: "\u0627\u0644\u0632\u0646\u062C\u0628\u064A\u0644",
    peppermint: "\u0627\u0644\u0646\u0639\u0646\u0627\u0639",
    turmeric: "\u0627\u0644\u0643\u0631\u0643\u0645",
    garlic: "\u0627\u0644\u062B\u0648\u0645",
    echinacea: "\u0627\u0644\u0625\u0643\u064A\u0646\u0627\u0634\u064A\u0627",
    elderberry: "\u0627\u0644\u0628\u064A\u0644\u0633\u0627\u0646",
    valerian: "\u0627\u0644\u0646\u0627\u0631\u062F\u064A\u0646",
    ashwagandha: "\u0623\u0634\u0648\u0627\u063A\u0646\u062F\u0627",
    ginkgo: "\u062C\u0646\u0643\u0648",
    milk_thistle: "\u0627\u0644\u0634\u0648\u0643 \u0627\u0644\u062D\u0644\u0628",
    st_johns_wort: "\u0639\u0634\u0628\u0629 \u0627\u0644\u0639\u0644\u0645 \u0627\u0644\u0645\u0642\u0637\u0631",
    lavender: "\u0627\u0644\u062E\u0632\u0627\u0645\u0649",
    fenugreek: "\u0627\u0644\u062D\u0644\u0628\u0629",
    aloe_vera: "\u0627\u0644\u0635\u0628\u0627\u0631",
    green_tea: "\u0627\u0644\u0634\u0627\u064A \u0627\u0644\u0623\u062E\u0636\u0631",
    hawthorn: "\u0627\u0644\u0632\u0639\u0631\u0648\u0631",
    licorice_root: "\u0639\u0631\u0642 \u0627\u0644\u0633\u0648\u0633",
    slippery_elm: "\u0627\u0644\u062F\u0648\u0644\u0627\u0628",
    triphala: "\u062A\u0631\u064A\u0641\u0644\u0627",
    boswellia: "\u0627\u0644\u0644\u0628\u0627\u0646",
    devils_claw: "\u0645\u062E\u0644\u0628 \u0627\u0644\u0634\u064A\u0637\u0627\u0646",
    rhodiola: "\u0631\u0648\u062F\u064A\u0648\u0644\u0627",
    saw_palmetto: "\u0633\u0627 \u0628\u0627\u0644\u0645\u064A\u062A\u0648",
    cranberry: "\u0627\u0644\u062A\u0648\u062A \u0627\u0644\u0628\u0631\u064A",
    thyme: "\u0627\u0644\u0632\u0639\u062A\u0631",
    honey: "\u0627\u0644\u0639\u0633\u0644",
    aloe_topical: "\u062C\u0644 \u0627\u0644\u0635\u0628\u0627\u0631",
    tea_tree: "\u0632\u064A\u062A \u0634\u062C\u0631 \u0627\u0644\u0634\u0627\u064A",
    black_cohosh: "\u0643\u0648\u0647\u0648\u0634 \u0627\u0644\u0623\u0633\u0648\u062F",
  };

  var WORD_OVERRIDES = {
    paracetamol: PRON_OVERRIDES.paracetamol,
    acetaminophen: "\u0623\u0633\u064A\u062A\u0627\u0645\u064A\u0646\u0648\u0641\u064A\u0646",
    amoxicillin: PRON_OVERRIDES.amoxicillin,
    ibuprofen: PRON_OVERRIDES.ibuprofen,
    insulin: "\u0623\u0646\u0633\u0648\u0644\u064A\u0646",
    metformin: PRON_OVERRIDES.metformin,
    penicillin: "\u0628\u0646\u0633\u064A\u0644\u064A\u0646",
    vitamin: "\u0641\u064A\u062A\u0627\u0645\u064A\u0646",
  };

  var SUFFIXES = [
    ["amoxicillin", "\u0623\u0645\u0648\u0643\u0633\u064A\u0633\u064A\u0644\u064A\u0646"],
    ["cillin", "\u0633\u064A\u0644\u064A\u0646"],
    ["mycin", "\u0645\u0627\u064A\u0633\u064A\u0646"],
    ["cycline", "\u0633\u064A\u0643\u0644\u064A\u0646"],
    ["floxacin", "\u0641\u0644\u0648\u0643\u0633\u0627\u0633\u064A\u0646"],
    ["oxacin", "\u0623\u0648\u0643\u0633\u0627\u0633\u064A\u0646"],
    ["prazole", "\u0628\u0631\u0627\u0632\u0648\u0644"],
    ["sartan", "\u0633\u0627\u0631\u062A\u0627\u0646"],
    ["statin", "\u0633\u062A\u0627\u062A\u064A\u0646"],
    ["gliflozin", "\u063A\u0644\u064A\u0641\u0644\u0648\u0632\u064A\u0646"],
    ["gliptin", "\u063A\u0644\u064A\u0628\u062A\u064A\u0646"],
    ["glutide", "\u063A\u0644\u0648\u062A\u0627\u064A\u062F"],
    ["metformin", "\u0645\u064A\u062A\u0641\u0648\u0631\u0645\u064A\u0646"],
    ["paracetamol", "\u0628\u0627\u0631\u0627\u0633\u064A\u062A\u0627\u0645\u0648\u0644"],
    ["ibuprofen", "\u0627\u064A\u0628\u0648\u0628\u0631\u0648\u0641\u064A\u0646"],
    ["insulin", "\u0623\u0646\u0633\u0648\u0644\u064A\u0646"],
    ["penicillin", "\u0628\u0646\u0633\u064A\u0644\u064A\u0646"],
    ["azole", "\u0623\u0632\u0648\u0644"],
    ["olone", "\u0648\u0644\u0648\u0646"],
    ["pine", "\u0628\u064A\u0646"],
    ["pril", "\u0628\u0631\u064A\u0644"],
    ["olol", "\u0648\u0644\u0648\u0644"],
    ["ide", "\u0627\u064A\u062F"],
    ["ate", "\u0627\u062A"],
    ["ium", "\u064A\u0648\u0645"],
    ["ine", "\u064A\u0646"],
    ["ol", "\u0648\u0644"],
  ];

  function transliterateStem(stem) {
    if (!stem) return "";
    if (WORD_OVERRIDES[stem]) return WORD_OVERRIDES[stem];
    stem = stem
      .replace(/ph/g, "\u0641")
      .replace(/sh/g, "\u0634")
      .replace(/ch/g, "\u062A\u0634")
      .replace(/th/g, "\u062B")
      .replace(/gh/g, "\u063A")
      .replace(/kh/g, "\u062E")
      .replace(/qu/g, "\u0643\u0648")
      .replace(/oo/g, "\u0648")
      .replace(/ou/g, "\u0648")
      .replace(/ee/g, "\u064A")
      .replace(/au/g, "\u0627\u0648")
      .replace(/ai/g, "\u0627\u064A")
      .replace(/ei/g, "\u064A")
      .replace(/oa/g, "\u0648\u0627");
    var out = "";
    for (var i = 0; i < stem.length; i++) {
      var c = stem.charAt(i);
      var n = stem.charAt(i + 1);
      var m = {
        a: "\u0627", b: "\u0628", c: n === "e" || n === "i" || n === "y" ? "\u0633" : "\u0643",
        d: "\u062F", e: "\u064A", f: "\u0641", g: "\u062C", h: "\u0647", i: "\u064A", j: "\u062C",
        k: "\u0643", l: "\u0644", m: "\u0645", n: "\u0646", o: "\u0648", p: "\u0628", q: "\u0643",
        r: "\u0631", s: "\u0633", t: "\u062A", u: "\u0648", v: "\u0641", w: "\u0648", x: "\u0643\u0633",
        y: "\u064A", z: "\u0632",
      };
      if (m[c]) out += m[c];
    }
    return out;
  }

  function transliterateWord(word) {
    word = (word || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!word) return "";
    if (WORD_OVERRIDES[word]) return WORD_OVERRIDES[word];
    for (var i = 0; i < SUFFIXES.length; i++) {
      var suf = SUFFIXES[i][0];
      if (word.length > suf.length && word.slice(-suf.length) === suf) {
        return transliterateStem(word.slice(0, -suf.length)) + SUFFIXES[i][1];
      }
      if (word === suf) return SUFFIXES[i][1];
    }
    return transliterateStem(word);
  }

  function transliterateDrugNameToArabic(name) {
    if (!name) return "";
    var cleaned = name
      .replace(/\([^)]*\)/g, " ")
      .replace(/\d+\.?\d*\s*(mg|mcg|g|ml|iu|%|units?|tabs?|puffs?|sprays?|patch|sl|sc|iv|im|bid|tid|qid|prn|daily|hourly)/gi, " ")
      .replace(/[+–—/\\,]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!cleaned) return "";
    return cleaned.split(" ").map(transliterateWord).filter(Boolean).join(" ");
  }

  function applyPronunciations() {
    var DB = global.PHARMACARE_DRUG_DB || {};
    Object.keys(DB).forEach(function (id) {
      if (PRON_OVERRIDES[id]) {
        DB[id].pronunciationAr = PRON_OVERRIDES[id];
      } else if (!DB[id].pronunciationAr) {
        DB[id].pronunciationAr = transliterateDrugNameToArabic(DB[id].displayName || id.replace(/_/g, " "));
      }
    });
    global.PHARMACARE_DRUG_DB = DB;
  }

  global.transliterateDrugNameToArabic = transliterateDrugNameToArabic;
  global.getDrugPronunciationAr = function (drug) {
    if (!drug) return "";
    return drug.pronunciationAr || transliterateDrugNameToArabic(drug.displayName || drug.id || "");
  };

  applyPronunciations();
})(typeof window !== "undefined" ? window : globalThis);
