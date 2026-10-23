(() => {
'use strict';
const previous=window.SWELL_SURF_YEAR;
if(!previous||previous.plans.length!==12||!previous.plans.every(p=>Number(p.programVersion)===5))throw Error('SWELL: Surf Year v5 fehlt');
const VERSION=6,PROGRAM=previous.id,copy=x=>structuredClone(x);
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const today=()=>iso(new Date()),tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return iso(d)};
const generated=new Set(previous.plans.flatMap(p=>p.days.flatMap(d=>d.ex.map(e=>e.id))));
const library=new Map();
for(const p of previous.plans)for(const d of p.days)for(const e of d.ex)if(!library.has(e.id))library.set(e.id,copy(e));
const additions={
 face:{id:'surf-year-facepull-v6',name:'Face Pulls',cat:'Prehab',media:'facepull',kg:'',trackWeight:true,howTo:'Seil auf Augenhöhe zu Stirn und Schläfen ziehen. Schulterblätter kontrollieren, Nacken entspannt, kein Schwung.'},
 knees:{id:'surf-year-kneeraise',name:'Hanging Knee Raises',cat:'Core',media:'custom',kg:'',trackWeight:false,howTo:'Im aktiven Hang Knie kontrolliert Richtung Bauch ziehen. Becken leicht einrollen, Beine ohne Schwung senken.'}
};
function src(key){const id='surf-year-'+key,e=library.get(id);if(!e)throw Error('SWELL: Übung fehlt: '+id);return copy(e)}
const phase=i=>i<3?0:i<6?1:i<9?2:i<11?3:4;
const load=(key,sets,reps,restSec,block,name)=>{
const e=typeof key==='string'?src(key):copy(key);
return {...e,name:name||e.name,sets,reps,restSec,block,timeMin:null}
};
const group=(key,options,i,restSec,block,name)=>{const [sets,reps]=options[phase(i)];return load(key,sets,reps,restSec,block,name)};
const rx={
pull:[[3,'3–5'],[3,'4–6'],[3,'5–7'],[3,'6–8'],[2,'4–6']],
hammer:[[2,'10–12'],[2,'8–12'],[2,'10–12'],[2,'8–12'],[2,'10']],
row:[[3,'10–12'],[3,'6–10'],[3,'8–12'],[3,'6–10'],[2,'10']],
straight:[[2,'12–15'],[2,'10–12'],[2,'10–15'],[2,'10–12'],[2,'12']],
bench:[[3,'8–12'],[3,'6–10'],[3,'6–8'],[3,'5–8'],[2,'8–10']],
raise:[[3,'12–15'],[3,'10–15'],[3,'12–15'],[3,'10–15'],[2,'12']],
incline:[[3,'8–12'],[3,'6–10'],[3,'6–8'],[3,'6–8'],[2,'8–10']],
tri:[[2,'10–15'],[2,'10–12'],[2,'10–12'],[2,'10–12'],[2,'12']],
fly:[[3,'12–15'],[2,'10–15'],[3,'10–15'],[2,'12–15'],[2,'12–15']],
popup:[[2,'4'],[3,'4'],[3,'3'],[3,'4'],[2,'3']],
paddle:[[3,'10–12 / Seite'],[3,'8–12 / Seite'],[3,'8–12 / Seite'],[3,'8–10 / Seite'],[2,'10 / Seite']],
rot:[[2,'5 / Seite'],[3,'4 / Seite'],[3,'5 / Seite'],[3,'4 / Seite'],[2,'4 / Seite']],
knees:[[2,'8–10'],[2,'10–12'],[2,'10–15'],[2,'12–15'],[2,'10']],
plank:[[2,'30 s / Seite'],[2,'40 s / Seite'],[2,'45 s / Seite'],[2,'50 s / Seite'],[2,'30 s / Seite']]
};
const plans=previous.plans.map((original,i)=>{
const p=phase(i),next=copy(original);
const run=wd=>{const r=original.days[wd].ex.find(e=>e.cat==='Ausdauer');if(!r)throw Error('Joggen fehlt in Monat '+(i+1));return copy(r)};
const tue=[
group('pullup',rx.pull,i,100,'A · Rücken','Klimmzüge (ggf. assistiert)'),
group('hammer',rx.hammer,i,55,'B · Bizeps'),
group('row',rx.row,i,95,'C · Rücken'),
load(additions.face,2,i===11?'12':'12–15',50,'D · Hintere Schulter'),
group('straightpull',rx.straight,i,55,'E · Paddelkraft'),
load('pushup',2,i===11?'10':'10–15',55,'F · Brust','Liegestütze'),run(2)];
const wed=[load('popup',2,i===11?'3':i<3?'3–4':'4',60,'A · Pop-up-Technik','Surf-Pop-ups (Regular)'),...original.days[3].ex.filter(e=>!/upperwarm|lowerwarm/.test(e.id)&&e.cat!=='Mobility').map(copy)];
const fly=p===1||p===3?'flylo':'flyhi';
const fri=[
group('bench',rx.bench,i,100,'A · Brust'),
group('cableraise',rx.raise,i,55,'B · Schulter','Kabel-Seitheben'),
group('incline',rx.incline,i,95,'C · Brust','Schrägbank-Kurzhanteldrücken (pro Hand)'),
group('ropepush',rx.tri,i,55,'D · Trizeps','Trizeps Pushdowns am Seil'),
group(fly,rx.fly,i,50,'E · Brust',fly==='flylo'?'Cable Flys Low-to-High':'Cable Flys High-to-Low'),
load('external',2,i===11?'12 / Seite':'12–15 / Seite',45,'F · Schulterstabilität','Schulter-Aussenrotation'),run(5)];
const reactive=p===2||p===3;
const sat=[
group(reactive?'popupreaction':'popup',rx.popup,i,80,'A · Pop-up-Power',reactive?'Reaktive Surf-Pop-ups':'Surf-Pop-ups (Regular)'),
group('paddlepull',rx.paddle,i,65,'B · Paddelkraft','Einarmiger Kabel-Paddelzug'),
group('medrot',rx.rot,i,80,'C · Explosive Rotation'),
group(additions.knees,rx.knees,i,50,'D · Bauch','Hanging Knee Raises'),
group('sideplank',rx.plank,i,45,'E · Core','Side Plank'),run(6)];
next.days[2]={weekday:2,title:'Rücken · Bizeps · hintere Schulter + Brust',durationMin:75,ex:tue};
next.days[3]={weekday:3,title:'Beine · Maschinen · Pop-ups & Core',durationMin:50,ex:wed};
next.days[5]={weekday:5,title:'Brust · Schultern · Trizeps',durationMin:75,ex:fri};
next.days[6]={weekday:6,title:'Surf-Performance · Paddelkraft & Core',durationMin:75,ex:sat};
next.programVersion=VERSION;return next;
});
function ensureState(state){
state=previous.ensureState(state);
if(!state||!Array.isArray(state.plans))return state;
const deleted=new Set(state.deletedPlanIds||[]);let changed=false;
for(const template of plans){
if(deleted.has(template.id))continue;
const at=state.plans.findIndex(p=>p.id===template.id);
if(at<0){state.plans.push(copy(template));continue}
const old=state.plans[at];
if(Number(old.programVersion||0)>=VERSION)continue;
if(old.id===state.activePlanId&&(!Array.isArray(state.planTimeline)||!state.planTimeline.length)){
state.planTimeline=[{id:'baseline',effectiveFrom:'0001-01-01',planId:old.id,planName:old.name,snapshot:copy(old),updatedAt:0}];
}
const byId=new Map(old.days.flatMap(d=>d.ex||[]).map(e=>[e.id,e]));
const updated=copy(old);updated.programVersion=VERSION;
updated.days=template.days.map(d=>{
const originalDay=old.days.find(x=>x.weekday===d.weekday);
const restored=d.ex.map(ex=>{const saved=byId.get(ex.id);return saved?{...saved,...copy(ex),kg:saved.kg??ex.kg}:copy(ex)});
const custom=(originalDay?.ex||[]).filter(ex=>!generated.has(ex.id)&&ex.id!==additions.face.id&&!restored.some(x=>x.id===ex.id));
const finish=restored.at(-1)?.cat==='Ausdauer'?restored.pop():null;
return {...copy(d),ex:[...restored,...custom.map(copy),...(finish?[finish]:[])]};
});
state.plans[at]=updated;
if(updated.id===state.activePlanId)changed=true;
}
if(state.annualProgram?.id===PROGRAM)state.annualProgram.revision=VERSION;
if(changed){
state.planTimeline??=[];
const effective=(state.history||[]).some(log=>log.date===today()&&log.kind!=='stretching')||!!state.session?tomorrow():today();
const active=state.plans.find(p=>p.id===state.activePlanId);
const entry={id:effective+'_'+active.id,effectiveFrom:effective,planId:active.id,planName:active.name,snapshot:copy(active),updatedAt:Date.now()};
state.planTimeline=state.planTimeline.filter(x=>x.effectiveFrom!==effective);
state.planTimeline.push(entry);
state.planTimeline.sort((a,b)=>String(a.effectiveFrom).localeCompare(String(b.effectiveFrom)));
}
return state;
}
function stateFragment(startDate=today()){return {plans:copy(plans),annualProgram:{id:PROGRAM,revision:VERSION,startDate,currentMonth:1,installedAt:Date.now()}}}
window.SWELL_SURF_YEAR={...previous,plans,ensureState,stateFragment};
})();