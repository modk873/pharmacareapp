// Run: node tests.js  (loads data files + script.js in a fake DOM)
const fs=require('fs'),vm=require('vm');
const els={};
const mk=id=>els[id]||(els[id]={value:'',innerHTML:'',textContent:'',classList:{toggle(){},add(){},remove(){},contains(){return false}},style:{},addEventListener(){}});
const doc={getElementById:mk,querySelector:()=>mk('q'),querySelectorAll:()=>[],addEventListener(){},body:mk('body'),documentElement:mk('html'),createElement:()=>mk('x')};
const ctx={document:doc,window:{addEventListener(){},localStorage:{getItem(){return null},setItem(){}}},localStorage:{getItem(){return null},setItem(){}},console,setTimeout(){},setInterval(){},alert(){},navigator:{},IntersectionObserver:class{observe(){}},requestAnimationFrame(){} };
ctx.window=ctx;ctx.document=doc;ctx.addEventListener=()=>{};vm.createContext(ctx);
for(const f of ['drug-data.js','drug-extended.js','drug-pronunciation-ar.js','script.js']){
  try{vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});}catch(e){console.log('load warn',f,e.message)}
}
let fail=0;const ok=(c,m)=>{if(!c){fail++;console.log('FAIL',m)}else console.log('ok  ',m)};
const run=(fn,vals,out)=>{for(const k in vals)mk(k).value=String(vals[k]);vm.runInContext(fn+'()',ctx);return mk(out).innerHTML};
let r=run('calculateParacetamolSafe',{paraWeight:20,paraGroup:'child'},'paraResult');ok(/300 mg/.test(r)&&/1000? mg\/day|1,?200/.test(r),'child 20kg para');
r=run('calculateParacetamolSafe',{paraWeight:40,paraGroup:'child'},'paraResult');ok(/600 mg/.test(r),'single dose 15mg/kg');
r=run('calculateParacetamolSafe',{paraWeight:45,paraGroup:'adult'},'paraResult');ok(/60 mg\/kg/.test(r),'light adult limit');
r=run('calculateCrCl',{crclAge:60,crclWeight:70,crclScr:1,crclSex:'male'},'crclResult');ok(/77\.8/.test(r),'CrCl male');
r=run('calculateCrCl',{crclAge:10,crclWeight:30,crclScr:1,crclSex:'male'},'crclResult');ok(/adults/.test(r),'CrCl rejects child');
r=run('calculateBSA',{bsaHeight:180,bsaWeight:80},'bsaResult');ok(/2\.00/.test(r),'BSA');
r=run('calculateIVDrip',{ivVolume:1000,ivTimeMin:480,ivDropFactor:20},'ivResult');ok(/42 gtt/.test(r)&&/125\.0 mL/.test(r),'IV drip');
r=run('calculateBMI',{height:170,bmiweight:70},'bmiResult');ok(/24\.2/.test(r),'BMI');
r=run('calculateBMI',{height:0,bmiweight:70},'bmiResult');ok(/valid/.test(r),'BMI invalid');
r=run('calculatePediatricDose',{pedWeight:10,pedMgKg:15,pedMaxDose:''},'pedResult');ok(/150 mg/.test(r),'pediatric dose');
r=run('calculateInfusionRate',{infDose:50,infConc:2},'infResult');ok(/25\.00/.test(r),'infusion');
const inter=(a,b)=>{mk('interactionDrug1').value=a;mk('interactionDrug2').value=b;vm.runInContext('checkInteraction()',ctx);return mk('interactionResult').innerHTML};
ok(/Moderate/.test(inter('ibuprofen','warfarin')),'ibuprofen+warfarin');
ok(/Moderate/.test(inter('ibuprofen','naproxen')),'NSAID duplication');
mk('cvType').value='weight';vm.runInContext('fillConvertUnits()',ctx);
r=run('convertUnits',{cvValue:1,cvType:'weight',cvFrom:'kg',cvTo:'g'},'cvResult');ok(/1000/.test(r),'unit kg->g');
r=run('convertUnits',{cvValue:100,cvType:'temp',cvFrom:'\u00b0C',cvTo:'\u00b0F'},'cvResult');ok(/212/.test(r),'unit C->F');
console.log(fail?fail+' FAILED':'ALL PASSED');process.exit(fail?1:0);
