(() => {
  'use strict';
  const previous=window.SWELL_SURF_YEAR;
  if(!previous||previous.plans.length!==12)throw new Error('SWELL: Surf Year v4 fehlt');
  const VERSION=5, PROGRAM=previous.id;
  const copy=value=>structuredClone(value);
  const localIso=date=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  const today=()=>localIso(new Date());
  const tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return localIso(d)};
  const oldGeneratedIds=new Set(previous.plans.flatMap(p=>p.days.flatMap(d=>d.ex.map(e=>e.id))));
  const byExerciseId=new Map();
  for(const plan of previous.plans)for(const d of plan.days)for(const e of d.ex){
    if(!byExerciseId.has(e.id))byExerciseId.set(e.id,copy(e));
  }
  const source=id=>{const e=byExerciseId.get(id);if(!e)throw new Error('SWELL: Übung fehlt: '+id);return copy(e)};
  const loadGuidance='Erst Wiederholungen steigern. Wenn alle Sätze zweimal sauber am oberen Ende mit 1–2 Wiederholungen Reserve gelingen, Gewicht um die kleinste Maschinenstufe erhöhen. Gewicht in SWELL dokumentieren.';
  const legPress={
    id:'surf-year-leg-press-machine',name:'Leg Press (Beinpresse)',cat:'Kraft',media:'legpress',kg:'',trackWeight:true,
    howTo:'Sitz und Rückenpolster einstellen. Füsse etwa schulterbreit auf die Plattform stellen; Fersen bleiben belastet. Knie kontrolliert bis zur schmerzfrei möglichen Tiefe beugen und wieder strecken, ohne die Knie durchzudrücken. Becken am Polster lassen. '+loadGuidance
  };
  const legExtension={
    id:'surf-year-leg-extension',name:'Leg Extension (Beinstrecker)',cat:'Kraft',media:'legpress',kg:'',trackWeight:true,
    howTo:'Maschinen-Drehachse mit Kniegelenk ausrichten, Polster knapp oberhalb des Fussrists. Unterschenkel kontrolliert anheben, oben kurz halten und langsam absenken, ohne mit Schwung zu arbeiten. '+loadGuidance
  };
  const hipThrust={
    id:'surf-year-hip-thrust-machine',name:'Hip Thrust Machine',cat:'Kraft',media:'hipthrust',kg:'',trackWeight:true,
    howTo:'Rücken, Hüftpolster und Fussposition passend einstellen. Mit den Fersen drücken, Hüfte bis zur geraden Linie von Schultern bis Knie strecken; Rippen unten halten und kein Hohlkreuz erzeugen. Oben kurz halten und kontrolliert senken. '+loadGuidance
  };
  const fixed={
    warm:{...source('surf-year-lowerwarm'),sets:1,reps:'6 Min.',timeMin:6,restSec:0,block:'Warm-up'},
    legCurl:{...source('surf-year-legcurl'),name:'Leg Curl (Beinbeuger)',cat:'Kraft',trackWeight:true},
    calf:{...source('surf-year-calf'),name:'Calf Raises (Wadenheben)',cat:'Kraft',trackWeight:true},
    pallof:{...source('surf-year-pallof'),name:'Pallof Press',cat:'Core',trackWeight:false,kg:''}
  };
  // Gleiche sechs Maschinen-/Core-Übungen in jedem Monat. Nur die Belastung
  // und in Monat 12 das Erholungsvolumen werden periodisiert.
  const prescriptions=[
    {press:[3,'10–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'10 / Seite']},
    {press:[3,'10–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'10 / Seite']},
    {press:[3,'10–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–10'],curl:[3,'10–12'],extension:[2,'10–12'],hip:[2,'8–10'],calf:[3,'12–15'],pallof:[2,'10 / Seite']},
    {press:[3,'8–10'],curl:[3,'10–12'],extension:[2,'10–12'],hip:[2,'8–10'],calf:[3,'12–15'],pallof:[2,'10 / Seite']},
    {press:[3,'8–10'],curl:[3,'8–12'],extension:[2,'10–12'],hip:[2,'8–10'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–12'],curl:[3,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–10'],curl:[3,'10–12'],extension:[2,'10–12'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[3,'8–10'],curl:[3,'10–12'],extension:[2,'10–12'],hip:[2,'10–12'],calf:[3,'12–15'],pallof:[2,'12 / Seite']},
    {press:[2,'10–12'],curl:[2,'10–12'],extension:[2,'12–15'],hip:[2,'10–12'],calf:[2,'12–15'],pallof:[2,'10 / Seite']}
  ];
  const idOrder=[
    'surf-year-lowerwarm','surf-year-leg-press-machine','surf-year-legcurl',
    'surf-year-leg-extension','surf-year-hip-thrust-machine','surf-year-calf','surf-year-pallof'
  ];
  function makeDay(index){
    const values=prescriptions[index],lift=(base,values,restSec,block)=>({
      ...copy(base),sets:values[0],reps:values[1],restSec,block,timeMin:null,
      howTo:(base.howTo||'')+(base.id==='surf-year-legcurl'||base.id==='surf-year-calf'?' '+loadGuidance:'')
    });
    const list=[
      copy(fixed.warm),
      lift(legPress,values.press,105,'A · Quadrizeps & Gesäss'),
      lift(fixed.legCurl,values.curl,60,'B · Beinrückseite'),
      lift(legExtension,values.extension,55,'C · Quadrizeps'),
      lift(hipThrust,values.hip,75,'D · Gesäss'),
      lift(fixed.calf,values.calf,45,'E · Waden'),
      lift(fixed.pallof,values.pallof,40,'F · Core')
    ];
    return {weekday:3,title:'Beine · Maschinen & Core',durationMin:50,ex:list};
  }
  const plans=previous.plans.map((plan,index)=>{
    const next=copy(plan);
    next.programVersion=VERSION;
    next.days[3]=makeDay(index);
    return next;
  });
  function ensureState(state){
    state=previous.ensureState(state);
    if(!state||!Array.isArray(state.plans))return state;
    const deleted=new Set(state.deletedPlanIds||[]);
    let activeChanged=false;
    for(const template of plans){
      if(deleted.has(template.id))continue;
      const ix=state.plans.findIndex(p=>p.id===template.id);
      if(ix<0){state.plans.push(copy(template));continue}
      const existing=state.plans[ix];
      if(Number(existing.programVersion||0)>=VERSION)continue;
      if(existing.id===state.activePlanId&&(!Array.isArray(state.planTimeline)||!state.planTimeline.length)){
        state.planTimeline=[{id:'baseline',effectiveFrom:'0001-01-01',planId:existing.id,planName:existing.name,
          snapshot:copy(existing),updatedAt:0}];
      }
      const oldDay=existing.days.find(d=>d.weekday===3);
      const nextDay=copy(template.days[3]);
      const oldExercises=oldDay?.ex||[];
      const restored=nextDay.ex.map(ex=>{
        const previousExercise=oldExercises.find(old=>old.id===ex.id);
        return previousExercise?{...ex,kg:previousExercise.kg??ex.kg}:ex;
      });
      // Nur eigens hinzugefügte Übungen behalten; die alten programmseitigen
      // Beinübungen dürfen den vereinfachten Tag nicht erneut verlängern.
      const custom=oldExercises.filter(ex=>!oldGeneratedIds.has(ex.id)
        &&!idOrder.includes(ex.id)&&!restored.some(next=>next.id===ex.id));
      existing.days=existing.days.map(day=>day.weekday===3?{...nextDay,
        title:oldDay?.title&&oldDay.title!=='Beine · Kraft & Core'?oldDay.title:nextDay.title,
        ex:[...restored,...custom]}:day);
      existing.programVersion=VERSION;
      if(existing.id===state.activePlanId)activeChanged=true;
    }
    if(state.annualProgram?.id===PROGRAM)state.annualProgram.revision=VERSION;
    if(activeChanged){
      state.planTimeline??=[];
      const effective=(state.history||[]).some(log=>log.date===today()&&log.kind!=='stretching')?tomorrow():today();
      const active=state.plans.find(p=>p.id===state.activePlanId);
      const snapshot={id:effective+'_'+active.id,effectiveFrom:effective,
        planId:active.id,planName:active.name,snapshot:copy(active),updatedAt:Date.now()};
      state.planTimeline=state.planTimeline.filter(entry=>entry.effectiveFrom!==effective);
      state.planTimeline.push(snapshot);
      state.planTimeline.sort((a,b)=>String(a.effectiveFrom).localeCompare(String(b.effectiveFrom)));
    }
    return state;
  }
  function stateFragment(startDate=today()){
    return {plans:copy(plans),annualProgram:{id:PROGRAM,revision:VERSION,startDate,currentMonth:1,installedAt:Date.now()}};
  }
  window.SWELL_SURF_YEAR={...previous,plans,ensureState,stateFragment};
})();