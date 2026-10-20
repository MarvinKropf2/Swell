(() => {
'use strict';
const original=window.SWELL_SURF_YEAR;
if(!original)throw Error('Surf Year base file missing');
const VERSION=4, PROGRAM=original.id;
const copy=x=>structuredClone(x), dayIso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>dayIso(new Date()), tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return dayIso(d)};
const slug=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const existing=new Map();
for(const plan of original.plans)for(const day of plan.days)for(const ex of day.ex)if(!existing.has(ex.id))existing.set(ex.id,copy(ex));
const legacyIDs=new Set(existing.keys());
const e=(name,cat,howTo,trackWeight=true)=>({name,cat,howTo,trackWeight,kg:'',media:'custom'});
const add={
  flatDb:e('Flachbank-Kurzhanteldrücken (pro Hand)','Kraft','Schulterblätter stabil, Hanteln kontrolliert senken und kraftvoll hochdrücken. 1–2 Wiederholungen Reserve.'),
  smithIncline:e('Schrägbankdrücken Multipresse','Kraft','Bank auf 20–30 Grad stellen, Stange kontrolliert zur oberen Brust senken und ohne Ausweichen hochdrücken.'),
  flyHi:e('Cable Flys High-to-Low','Kraft','Kabel oben einstellen. Arme leicht beugen und vor dem unteren Brustkorb zusammenführen, dann langsam öffnen.'),
  flyLo:e('Cable Flys Low-to-High','Kraft','Kabel unten einstellen. Arme mit leicht gebeugten Ellbogen vor der oberen Brust zusammenführen, langsam öffnen.'),
  sideRaise:e('Kurzhantel-Seitheben','Kraft','Hanteln ohne Schwung seitlich bis auf Schulterhöhe heben, langsam senken.'),
  cableRaise:e('Kabel-Seitheben','Kraft','Kabelzug unten einstellen, Arm seitlich bis Schulterhöhe anheben, langsam senken.'),
  triPush:e('Trizeps-Pushdowns','Kraft','Oberarme nahe am Körper halten, Ellbogen vollständig kontrolliert strecken.'),
  ropePush:e('Rope Triceps Pushdowns','Kraft','Seil nach unten drücken, Enden unten leicht auseinanderführen. Oberarme stabil.'),
  overheadTri:e('Überkopf-Trizepsstrecken','Kraft','Ellbogen neben dem Kopf halten und Seil über Kopf strecken, langsam beugen.'),
  hammer:e('Hammer Curls (pro Hand)','Kraft','Mit neutralem Griff ohne Schwung curlen, Ellbogen neben dem Körper halten.'),
  inclineCurl:e('Incline Dumbbell Curls (pro Hand)','Kraft','An leicht geneigter Bank zurücklehnen. Arme hängen nach unten, dann mit ruhigen Ellbogen curlen.'),
  cableCurl:e('Kabel-Bizeps-Curls','Kraft','Oberarme ruhig am Rumpf halten, Griff kontrolliert zur Brust ziehen.'),
  ezCurl:e('SZ-Bizeps-Curls','Kraft','Mit SZ-Stange und ruhigen Oberarmen curlen, Handgelenke neutral halten.'),
  frontSquat:e('Front Squats','Kraft','Stange vor den Schultern, Ellbogen hoch, Rumpf fest. Über den ganzen Fuss hochdrücken.'),
  legCurl:e('Leg Curls','Kraft','Beinbeuger-Maschine korrekt einstellen, Knie kontrolliert beugen und langsam strecken.'),
  lyingCurl:e('Liegende Leg Curls','Kraft','In Bauchlage Knie beugen, Becken ruhig halten, kontrolliert strecken.'),
  calf:e('Wadenheben','Kraft','Über die Fussballen hochdrücken, oben kurz halten und Fersen langsam tief senken.'),
  kneeRaise:e('Hanging Knee Raises','Core','Im aktiven Hang Knie zum Bauch ziehen, Becken leicht einrollen und ohne Schwung senken.',false),
  rearFly:e('Reverse Flys','Prehab','Mit leicht gebeugten Armen kontrolliert nach hinten öffnen, hintere Schulter anspannen.'),
  rearMachine:e('Rear Delt Machine','Kraft','Arme auf Schulterhöhe nach hinten öffnen, nicht ins Hohlkreuz ausweichen.'),
  straightPull:e('Straight-Arm Pulldown','Kraft','Kabelzug mit fast gestreckten Armen aus Schulterhöhe bis zur Hüfte ziehen, Rumpf bleibt ruhig.'),
  paddlePull:e('Einarmiger Kabel-Paddelzug','Kraft','Arm aus der vorgestreckten Position zur Hüfte ziehen. Rumpf stabil, Seiten abwechseln.'),
  pushup:e('Liegestütze','Kraft','Körper als gerade Linie halten, Brust kontrolliert senken und kraftvoll hochdrücken.',false),
  closePush:e('Enge Liegestütze','Kraft','Hände enger als schulterbreit, Ellbogen körpernah, Rumpf stabil halten.',false),
  powerPush:e('Explosive Liegestütze','Power','Explosiv hochdrücken, weich landen. Stoppen sobald Tempo oder Technik nachlässt.',false),
  sidePlank:e('Side Plank','Core','Seitstütz: Ellbogen unter Schulter, Becken hoch und Rumpf gestreckt halten.',false)
};
const bothSides=new Set(['split','legpress','oneRow','external','landmine','medrot','chop','pallof','deadbug','sidePlank','paddlePull']);
const heavy=new Set(['bench','flatDb','smithIncline','incline','pullup','pulldown','row','squat','frontSquat','trap','rdl']);
const explosive=new Set(['popup','popupReaction','jump','broad','medrot','powerPush']);
function exercise(key,n,reps,block=''){
  const o=add[key]||existing.get('surf-year-'+slug(key));
  if(!o)throw Error('Unknown Surf Year v4 exercise: '+key);
  return {...copy(o),id:'surf-year-'+slug(key),sets:Number(n),reps:String(reps).replace(/^(\d+)s$/,'$1 s')+(bothSides.has(key)?' / Seite':''),
   restSec:key==='upperWarm'||key==='lowerWarm'?0:heavy.has(key)?120:explosive.has(key)?75:50,timeMin:key==='upperWarm'||key==='lowerWarm'?6:null,block,
   trackWeight:o.trackWeight!==false,kg:o.kg??'',
   howTo:(o.howTo||'')+(o.cat==='Kraft'?' Steigere zunächst Wiederholungen; erst bei sauberer Technik zweimal am oberen Ende das Gewicht leicht erhöhen. 1–2 Wiederholungen Reserve.':'')};
}
function parse(spec,blocks){
 return spec.split('|').map((token,i)=>{const [key,n,reps]=token.trim().split(/\s+/);return exercise(key,n,reps,blocks[i]||'')});
}
const blocks={
 tu:['A · Pop-up','B1 · Zug','B2 · Druck','C1 · Zug','C2 · Brust','D1 · Schultern','D2 · Trizeps'],
 we:['A · Power','B · Hauptsatz','C1 · Core','D · Kraft','E1 · Waden','E2 · Kraft','F1 · Bauch','F2 · Beinbeuger'],
 fr:['A1 · Druck','A2 · Zug','B1 · Brust','B2 · Rücken','C1 · Trizeps','C2 · Hintere Schulter','D1 · Bizeps','D2 · Prehab'],
 sa:['A · Rotation','B · Power','C1 · Paddelzug','C2 · Core','D1 · Druck','D2 · Bizeps','E · Core']
};
const rx=[
{tu:'popup 2 3|pullup 3 3–5|bench 3 8–10|row 2 10–12|flyHi 2 12–15|sideRaise 2 12–15|triPush 2 10–12',
we:'jump 2 3|squat 3 8–10|pallof 2 10|rdl 3 8–10|calf 2 15|split 2 8|kneeRaise 2 8|legCurl 2 12',
fr:'incline 3 8–10|pulldown 3 10|flyLo 2 12|oneRow 2 10|overheadTri 2 12|rearFly 2 15|hammer 2 10–12|external 2 12',
sa:'medrot 3 5|landmine 3 8|straightPull 3 10|deadbug 2 10|pushup 2 12–15|cableCurl 2 12|sidePlank 2 30s'},
{tu:'popup 2 4|pullup 3 4–5|bench 3 8–12|row 3 10|flyHi 2 12–15|sideRaise 2 15|triPush 2 12',
we:'jump 2 4|squat 3 8–12|pallof 2 12|rdl 3 10|calf 3 12|split 2 10|kneeRaise 2 10|legCurl 2 12',
fr:'incline 3 10|pulldown 3 10–12|flyLo 2 12–15|oneRow 2 12|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 3 5|landmine 3 8|straightPull 3 12|deadbug 2 12|pushup 2 15|cableCurl 2 12|sidePlank 2 35s'},
{tu:'popup 3 4|pullup 3 4–6|bench 3 8–12|row 3 10|flyHi 2 12|cableRaise 2 12–15|triPush 2 12',
we:'jump 3 3|squat 3 10|pallof 2 12|rdl 3 10|calf 3 15|split 2 10|kneeRaise 2 12|legCurl 2 12',
fr:'incline 3 8–12|pulldown 3 10|flyLo 2 15|oneRow 3 10|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 3 5|landmine 3 8|straightPull 3 12|chop 2 10|pushup 2 15|cableCurl 2 12|sidePlank 2 40s'},
{tu:'popup 3 4|pullup 3 4–6|flatDb 3 6–8|row 3 8–10|flyHi 2 12|cableRaise 2 12|ropePush 2 10',
we:'jump 3 3|frontSquat 3 6–8|pallof 2 10|rdl 3 6–8|calf 2 12|split 2 8|kneeRaise 2 10|lyingCurl 2 10',
fr:'smithIncline 3 6–8|pulldown 3 8–10|flyLo 2 12|oneRow 2 10|overheadTri 2 10|rearMachine 2 15|inclineCurl 2 10|external 2 12',
sa:'medrot 3 5|landmine 3 6|straightPull 3 10|chop 2 10|closePush 2 10|ezCurl 2 10|sidePlank 2 40s'},
{tu:'popup 3 4|pullup 3 4–6|flatDb 3 5–8|row 3 8|flyHi 2 10–12|cableRaise 2 12|ropePush 2 10–12',
we:'jump 3 3|frontSquat 3 5–8|pallof 2 12|rdl 3 6–8|calf 3 12|split 2 8|kneeRaise 2 12|lyingCurl 2 10',
fr:'smithIncline 3 6–8|pulldown 3 8|flyLo 2 12|oneRow 3 8–10|overheadTri 2 10–12|rearMachine 2 15|inclineCurl 2 10|external 2 12',
sa:'medrot 3 5|landmine 3 6|straightPull 3 10|chop 2 12|closePush 2 12|ezCurl 2 10|sidePlank 2 45s'},
{tu:'popup 3 4|pullup 4 4–6|flatDb 3 5–8|row 3 8–10|flyHi 2 12|cableRaise 2 12|ropePush 2 12',
we:'jump 3 3|frontSquat 3 6|pallof 2 12|rdl 3 6–8|calf 3 12|split 2 8|kneeRaise 2 12|legCurl 2 10',
fr:'smithIncline 3 6–8|pulldown 3 8–10|flyLo 2 12|oneRow 3 10|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 3 5|landmine 3 6|paddlePull 3 12|chop 2 12|pushup 2 12|ezCurl 2 10|sidePlank 2 45s'},
{tu:'popupReaction 3 3|pullup 3 4–6|bench 3 5–8|row 3 8|flyHi 2 12|cableRaise 2 12|triPush 2 12',
we:'broad 3 3|trap 3 5–8|pallof 2 10|split 3 8|calf 2 12|legpress 2 10|kneeRaise 2 10|legCurl 2 10',
fr:'incline 3 5–8|pulldown 3 8–10|flyLo 2 12|oneRow 2 10|overheadTri 2 10|rearFly 2 15|hammer 2 10|external 2 15',
sa:'medrot 3 4|landmine 3 5|paddlePull 3 10|chop 2 10|powerPush 2 5|cableCurl 2 12|sidePlank 2 45s'},
{tu:'popupReaction 3 3|pullup 3 5–6|bench 3 5–8|row 3 8–10|flyHi 2 12|cableRaise 2 15|triPush 2 12',
we:'broad 3 3|trap 3 5–8|pallof 2 12|split 3 8|calf 3 12|legpress 2 10|kneeRaise 2 12|legCurl 2 12',
fr:'incline 3 6–8|pulldown 3 8–10|flyLo 2 12|oneRow 3 10|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 3 5|landmine 3 5|paddlePull 3 10|chop 3 10|powerPush 2 6|cableCurl 2 12|sidePlank 2 50s'},
{tu:'popupReaction 3 4|pullup 3 5–6|bench 3 6–8|row 3 8|flyHi 2 12|cableRaise 2 12|triPush 2 12',
we:'broad 4 3|trap 3 6–8|pallof 2 12|split 3 8|calf 2 15|legpress 2 10|kneeRaise 2 12|legCurl 2 12',
fr:'incline 3 6–8|pulldown 3 8–10|flyLo 2 12|oneRow 3 10|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 4 4|landmine 3 5|paddlePull 3 12|chop 2 12|powerPush 2 6|cableCurl 2 12|sidePlank 2 50s'},
{tu:'popupReaction 3 4|pullup 3 4–6|bench 3 6–8|row 3 8|flyHi 2 12|cableRaise 2 12|triPush 2 10',
we:'broad 3 3|frontSquat 3 6–8|pallof 2 12|rdl 3 8|calf 2 15|split 2 10|kneeRaise 2 12|legCurl 2 12',
fr:'incline 3 6–8|pulldown 3 8–10|flyLo 2 12|oneRow 2 10|overheadTri 2 12|rearFly 2 15|hammer 2 12|external 2 15',
sa:'medrot 3 4|landmine 3 6|paddlePull 3 10|chop 2 10|pushup 2 12|cableCurl 2 10|sidePlank 2 45s'},
{tu:'popupReaction 3 3|pullup 3 4–6|bench 3 5–8|row 2 8|flyHi 2 10|cableRaise 2 12|triPush 2 10',
we:'broad 3 3|frontSquat 3 5–8|pallof 2 10|rdl 3 6–8|calf 2 12|split 2 8|kneeRaise 2 10|legCurl 2 10',
fr:'incline 3 5–8|pulldown 3 8|flyLo 2 10|oneRow 2 8|overheadTri 2 10|rearFly 2 12|hammer 2 10|external 2 12',
sa:'medrot 3 4|landmine 3 5|paddlePull 3 8|chop 2 10|powerPush 2 5|cableCurl 2 10|sidePlank 2 40s'},
{tu:'popup 2 3|pullup 2 4–6|bench 2 6–8|row 2 8|flyHi 2 10|sideRaise 2 12|triPush 2 10',
we:'jump 2 3|squat 2 6–8|pallof 2 10|rdl 2 8|calf 2 12|split 2 8|kneeRaise 2 10|legCurl 2 10',
fr:'incline 2 8|pulldown 2 10|flyLo 2 12|oneRow 2 10|overheadTri 2 10|rearFly 2 12|hammer 2 10|external 2 12',
sa:'medrot 2 4|landmine 2 6|paddlePull 2 10|deadbug 2 10|pushup 2 10|cableCurl 2 10|sidePlank 2 30s'}
];
const shortRuns=[[1,10,1],[1.2,10,1],[1.4,10.1,1],[1.6,10.1,1],[1.8,10.2,1],[2,10.3,1],[2.2,10.4,1.5],[2.4,10.5,1.5],[2.7,10.6,1.5],[3,10.7,1.5],[3.3,10.8,1.5],[2,10.3,1]];
const longRuns=[[1.1,10,1],[1.4,10,1],[1.7,10.1,1],[2,10.1,1],[2.3,10.2,1],[2.7,10.3,1],[3,10.4,1.5],[3.4,10.5,1.5],[3.8,10.6,1.5],[4.3,10.8,1.5],[5,11,1.5],[3,10.5,1]];
const intervalRuns=[[4,30,11.5,1],[5,30,11.6,1],[5,45,11.8,1],[5,45,12,1],[5,60,12.1,1],[6,60,12.3,1.5],[6,60,12.5,1.5],[6,75,12.7,1.5],[6,75,12.9,2],[6,90,13.1,2],[6,90,13.3,2],[4,45,12,1]];
const n=v=>Number(v).toFixed(1),slope=v=>Number(v)%1===0?String(v):n(v);
function run(type,month){
  const ix=month-1,id='surf-year-run-'+type+'-m'+month;
  if(type!=='intervals'){
    const [d,v,p]=(type==='short'?shortRuns:longRuns)[ix];
    return {id,name:'Joggen '+(type==='short'?'Kurz':'Lang')+' · Monat '+month,cat:'Ausdauer',media:'custom',sets:1,
      reps:n(d)+' km · '+n(v)+' km/h · '+slope(p)+' % Steigung',kg:'',trackWeight:false,restSec:0,
      block:'Finish · Ausdauer',timeMin:Math.ceil(d*60/v),
      howTo:'Laufe '+n(d)+' km bei '+n(v)+' km/h und '+slope(p)+' % Steigung. Vorher 1–2 Minuten locker gehen. Ziel bei kontrollierter Anstrengung; Geschwindigkeit senken, falls Sprechen in ganzen Sätzen nicht mehr möglich ist. Monatsziel erst nach zwei gelungenen Einheiten erhöhen. Tatsächliche Strecke und Tempo notieren.'};
  }
  const [c,sec,v,p]=intervalRuns[ix],rest=month<=5?75:90;
  return {id,name:'Joggen Intervalle · Monat '+month,cat:'Ausdauer',media:'custom',sets:1,
    reps:c+' × '+sec+' s · '+n(v)+' km/h · '+slope(p)+' % · '+rest+' s Pause',kg:'',trackWeight:false,
    restSec:0,block:'Finish · Intervalle',timeMin:Math.ceil(10+(c*sec+(c-1)*rest)/60),
    howTo:'5 Minuten locker einlaufen. Danach '+c+' × '+sec+' Sekunden bei '+n(v)+' km/h und '+slope(p)+' % Steigung. Dazwischen '+rest+' Sekunden bei ungefähr 4.5 km/h und 1 % gehen. 5 Minuten auslaufen. Kein Sprint (RPE 6–7/10). Tempo um 0.3–0.5 km/h reduzieren, wenn notwendig, und erst nach zwei gelungenen Einheiten steigern.'};
}
const plans=rx.map((r,i)=>{
  const month=i+1,base=original.plans[i],days=Array.from({length:7},(_,weekday)=>({weekday,title:'',ex:[]}));
  days[2]={weekday:2,title:'Oberkörper A · Brust, Rücken & Arme',durationMin:75,ex:[exercise('upperWarm',1,'6 Min.','Warm-up'),...parse(r.tu,blocks.tu),run('short',month)]};
  days[3]={weekday:3,title:'Beine · Kraft & Core',durationMin:75,ex:[exercise('lowerWarm',1,'6 Min.','Warm-up'),...parse(r.we,blocks.we)]};
  days[5]={weekday:5,title:'Oberkörper B · Brust, Schulter & Arme',durationMin:75,ex:[exercise('upperWarm',1,'6 Min.','Warm-up'),...parse(r.fr,blocks.fr),run('intervals',month)]};
  days[6]={weekday:6,title:'Surf-Performance · Oberkörper & Core',durationMin:75,ex:[exercise('upperWarm',1,'6 Min.','Warm-up'),...parse(r.sa,blocks.sa),run('long',month)]};
  return {...base,days,programVersion:VERSION};
});
const months=original.months.map((m,i)=>{
 const [sd,sv,sp]=shortRuns[i],[ld,lv,lp]=longRuns[i],[c,sec,iv,ip]=intervalRuns[i];
 return {...m,cardio:'Kurz: '+n(sd)+' km · '+n(sv)+' km/h · '+slope(sp)+' %; Lang: '+n(ld)+' km · '+n(lv)+' km/h · '+slope(lp)+' %; Intervalle: '+c+' × '+sec+' s · '+n(iv)+' km/h · '+slope(ip)+' %'};
});
function ensureState(state){
  state=original.ensureState(state);
  if(!state?.plans)return state;
  const deleted=new Set(state.deletedPlanIds||[]);
  let activeChanged=false;
  for(const template of plans){
    if(deleted.has(template.id))continue;
    const at=state.plans.findIndex(p=>p.id===template.id);
    if(at<0){state.plans.push(copy(template));continue}
    const prev=state.plans[at];
    if(Number(prev.programVersion||0)>=VERSION)continue;
    if(prev.id===state.activePlanId&&(!state.planTimeline?.length)){
      state.planTimeline=[{id:'baseline',effectiveFrom:'0001-01-01',planId:prev.id,planName:prev.name,snapshot:copy(prev),updatedAt:0}];
    }
    const updated=copy(template);updated.name=prev.name||template.name;updated.draft=!!prev.draft;
    updated.days=template.days.map(d=>{
      const oldDay=prev.days?.find(x=>x.weekday===d.weekday);if(!oldDay)return d;
      const oldEx=oldDay.ex||[];
      const nextEx=d.ex.map(x=>{const prior=oldEx.find(e=>e.id===x.id);return prior?{...x,kg:prior.kg??x.kg}:x});
      const custom=oldEx.filter(x=>!legacyIDs.has(x.id)&&!String(x.id||'').startsWith('surf-year-run-')&&!nextEx.some(e=>e.id===x.id));
      const finish=nextEx.at(-1)?.cat==='Ausdauer'?nextEx.pop():null;
      return {...d,ex:[...nextEx,...custom,...(finish?[finish]:[])]};
    });
    state.plans[at]=updated;
    if(updated.id===state.activePlanId)activeChanged=true;
  }
  if(state.annualProgram?.id===PROGRAM)state.annualProgram.revision=VERSION;
  if(activeChanged){
    state.planTimeline??=[];
    const effective=(state.history||[]).some(h=>h.date===today()&&h.kind!=='stretching')?tomorrow():today();
    const active=state.plans.find(p=>p.id===state.activePlanId);
    const entry={id:effective+'_'+active.id,effectiveFrom:effective,planId:active.id,planName:active.name,snapshot:copy(active),updatedAt:Date.now()};
    state.planTimeline=state.planTimeline.filter(x=>x.effectiveFrom!==effective);
    state.planTimeline.push(entry);
    state.planTimeline.sort((a,b)=>String(a.effectiveFrom).localeCompare(String(b.effectiveFrom)));
  }
  return state;
}
function stateFragment(startDate=today()){return {plans:copy(plans),annualProgram:{id:PROGRAM,revision:VERSION,startDate,currentMonth:1,installedAt:Date.now()}}}
window.SWELL_SURF_YEAR={...original,plans,months,ensureState,stateFragment};
})();