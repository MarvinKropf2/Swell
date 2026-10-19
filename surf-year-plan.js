(() => {
  'use strict';

  const PROGRAM_ID='surf-world-trip-12m';
  const dayNames=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
  const localIso=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const slug=value=>String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const emptyDays=()=>Array.from({length:7},(_,weekday)=>({weekday,title:'',ex:[]}));
  const kgByExercise={bench:'32.5',incline:'10',row:'30',pulldown:'35',shoulder:'8',squat:'40',rdl:'40',split:'8',hip:'50',trap:'50',legpress:'70',oneRow:'15',landmine:'15',chop:'10',carry:'18'};

  const exerciseLibrary={
    upperWarm:{name:'Warm-up Oberkörper',cat:'Mobility',media:'mobility',trackWeight:false,howTo:'2 Min. lockeres Laufband oder Bike, dann je 8 Cat-Cow, Brustwirbelsäulen-Rotation und Band Pull-aparts. Zum Schluss 2 leichte Vorbereitungssätze der ersten Kraftübung.'},
    lowerWarm:{name:'Warm-up Unterkörper',cat:'Mobility',media:'mobility',trackWeight:false,howTo:'2 Min. lockeres Laufband, dann je 8 Sprunggelenk-Rocks, 90/90-Hüftwechsel, tiefe Squats mit Pause und Glute Bridges. Danach 2 leichte Vorbereitungssätze der ersten Kraftübung.'},
    popup:{name:'Explosive Pop-up Drills',cat:'Surf',media:'popup',trackWeight:false,howTo:'Auf einer Matte in Paddelposition starten. Hände neben die unteren Rippen, Brust explosiv anheben und beide Füsse ohne Zwischenstopp in Surfstance bringen. Regular: linker Fuss vorne. Jede Wiederholung einzeln, schnell und sauber; stoppen, sobald die Landung langsam oder unsauber wird.'},
    popupReaction:{name:'Pop-up Reaktion',cat:'Surf',media:'popup',trackWeight:false,howTo:'In Paddelposition auf ein zufälliges akustisches Signal explosiv aufstehen. Nach jeder Wiederholung vollständig neu ausrichten. Qualität vor Ermüdung.'},
    bench:{name:'Bankdrücken',cat:'Kraft',media:'benchpress',howTo:'Schulterblätter nach hinten-unten, Füsse fest, Stange kontrolliert zur unteren Brust. Mit 2 Wiederholungen im Tank beginnen; kein erzwungenes Muskelversagen.'},
    incline:{name:'Schrägbank-KH-Drücken (pro Hand)',cat:'Kraft',media:'incline',howTo:'Bank flach bis moderat schräg einstellen. Schulterblätter stabil, Hanteln kontrolliert senken und ohne Zusammenstossen hochdrücken.'},
    pullup:{name:'Klimmzüge / Assist',cat:'Kraft',media:'pullup',trackWeight:false,howTo:'Aus aktivem Hang starten, Brust Richtung Stange ziehen und kontrolliert absenken. Nutze ein Band oder die Assist-Maschine, damit jede Zielwiederholung mit 1–2 Wiederholungen Reserve gelingt. Unterstützung in den Notizen festhalten.'},
    pulldown:{name:'Latzug neutral',cat:'Kraft',media:'pullup',howTo:'Brustbein leicht anheben, Ellbogen Richtung Hüfte ziehen und Schulterblätter kontrollieren. Nicht ins Hohlkreuz schwingen.'},
    row:{name:'Brustgestütztes Rudern',cat:'Kraft',media:'row',howTo:'Brust auf der Bank lassen, Ellbogen nach hinten ziehen und oben kurz halten. Kein Schwung aus dem unteren Rücken.'},
    oneRow:{name:'Einarmiges Kabelrudern',cat:'Kraft',media:'row',howTo:'Halbkniend oder im versetzten Stand. Rumpf bleibt ruhig; Schulterblatt zuerst nach hinten-unten führen, dann den Ellbogen ziehen.'},
    shoulder:{name:'Kurzhantel-Schulterdrücken (pro Hand)',cat:'Kraft',media:'shoulder',howTo:'Rippen unten halten, Gesäss anspannen und Hanteln ohne Ausweichen über Kopf drücken. Bei Schulterbeschwerden auf Landmine Press wechseln.'},
    landmine:{name:'Halbkniender Landmine Press',cat:'Power',media:'shoulder',howTo:'Gegenüberliegendes Knie ist vorne. Stange zügig nach vorne-oben drücken, Rumpf und Becken bleiben stabil. Jede Wiederholung explosiv, aber kontrolliert.'},
    facepull:{name:'Face Pull + Aussenrotation',cat:'Kraft',media:'facepull',howTo:'Seil auf Augenhöhe ziehen, Ellbogen führen und am Ende leicht nach aussen rotieren. Langsam zurück; Nacken entspannt.'},
    external:{name:'Kabel-Aussenrotation',cat:'Kraft',media:'facepull',howTo:'Ellbogen am Körper oder leicht angehoben stabil halten. Nur aus der Schulter rotieren, sehr leichtes Gewicht wählen und Schulterblatt ruhig lassen.'},
    squat:{name:'Kniebeugen',cat:'Kraft',media:'squat',howTo:'Füsse stabil, Knie folgen den Zehen, Rumpf fest. So tief wie kontrolliert möglich; aus dem ganzen Fuss hochdrücken. 2 Wiederholungen Reserve.'},
    rdl:{name:'Romanian Deadlift',cat:'Kraft',media:'rdl',howTo:'Knie leicht gebeugt, Hüfte weit nach hinten, Rücken neutral. Gewicht körpernah bis zu deutlicher Spannung in der Beinrückseite senken.'},
    split:{name:'Bulgarian Split Squat (pro Hand)',cat:'Kraft',media:'split',howTo:'Vorderer Fuss vollständig belasten, Becken gerade. Kontrolliert absenken und kraftvoll über den Vorderfuss aufstehen. Schwächere Seite beginnt.'},
    hip:{name:'Hip Thrust',cat:'Kraft',media:'hipthrust',howTo:'Kinn leicht einziehen, Rippen unten. Hüfte vollständig strecken, ohne den unteren Rücken zu überstrecken; oben eine Sekunde halten.'},
    trap:{name:'Trap-Bar Deadlift',cat:'Kraft',media:'rdl',howTo:'Mittig in der Trap Bar stehen, Rumpf verspannen und den Boden wegdrücken. Sauber und zügig hoch, kontrolliert absetzen.'},
    legpress:{name:'Einbeinige Beinpresse',cat:'Kraft',media:'legpress',howTo:'Becken bleibt vollständig am Polster. Knie kontrolliert beugen und über den ganzen Fuss drücken; beide Seiten gleich trainieren.'},
    jump:{name:'Squat Jump',cat:'Power',media:'jump',trackWeight:false,howTo:'Aus einer kurzen, stabilen Gegenbewegung maximal hochspringen und leise landen. Zwischen Wiederholungen neu setzen; bei sinkender Sprunghöhe stoppen.'},
    broad:{name:'Broad Jump + Stick',cat:'Power',media:'jump',trackWeight:false,howTo:'Explosiv nach vorne springen und die Landung zwei Sekunden stabil halten. Wenige hochwertige Wiederholungen, viel Platz und rutschfester Boden.'},
    skater:{name:'Skater Bounds + Stick',cat:'Power',media:'jump',trackWeight:false,howTo:'Seitlich von Bein zu Bein springen, Hüfte und Knie stabil ausrichten. Landung kurz halten, dann erst die nächste Wiederholung.'},
    medrot:{name:'Medizinball-Rotationswurf',cat:'Power',media:'woodchop',trackWeight:false,howTo:'Seitlich zu einer stabilen Wand stehen. Kraft aus Fuss, Hüfte und Rumpf übertragen und den Ball explosiv werfen. 3–5 kg genügen; jede Seite gleich.'},
    chop:{name:'Kabel-Woodchop',cat:'Core',media:'woodchop',howTo:'Aus stabilem Stand diagonal rotieren. Hüfte und Brustkorb bewegen sich kontrolliert zusammen; langsam in die Ausgangsposition zurück.'},
    pallof:{name:'Pallof Press',cat:'Core',media:'pallof',trackWeight:false,howTo:'Seitlich zum Kabel stehen, Griff vor der Brust. Arme ausstrecken, ohne dass Rumpf oder Becken rotieren. Pro Seite arbeiten und die Spannung ruhig halten.'},
    deadbug:{name:'Dead Bug mit Bandzug',cat:'Core',media:'custom',trackWeight:false,howTo:'Unteren Rücken sanft am Boden halten. Gegen einen leichten Bandzug diagonal Arm und Bein strecken; ausatmen und ohne Hohlkreuz zurückkehren.'},
    carry:{name:'Farmer Carry (pro Hand)',cat:'Core',media:'custom',howTo:'Aufrecht gehen, Rippen über Becken, Schulterblätter stabil. Kurze kontrollierte Schritte; Gewicht absetzen, bevor die Haltung zerfällt.'},
    runEasy:{name:'Laufband Zone 2',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'RPE 3–4 von 10: ruhiges Tempo, bei dem ganze Sätze möglich bleiben. 1 % Steigung. Falls nötig 3 Min. laufen / 1 Min. zügig gehen. Zeit oder Distanz in den Notizen speichern.'},
    intervals:{name:'Laufband Intervalle',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'Nach 2–3 Min. lockerem Einlaufen die angegebenen Belastungs- und Erholungszeiten absolvieren. Schnell bedeutet RPE 8 von 10, nicht Vollsprint. Tempo nur erhöhen, wenn alle Wiederholungen technisch sauber bleiben.'},
    bike:{name:'Bike Recovery',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'Sehr locker bei RPE 2–3 treten. Nur zur aktiven Erholung; keine zusätzliche harte Einheit daraus machen.'},
    thoracic:{name:'Surf-Mobility Flow',cat:'Mobility',media:'mobility',trackWeight:false,howTo:'Je 45 Sek.: Sprunggelenk-Rocks, 90/90-Hüftwechsel, tiefer Squat Hold, Open Book, Lat-Stretch und Schulter-Aussenrotation mit Band. Ruhig und schmerzfrei.'}
  };

  const configs=[
    {month:1,phase:'Basis I',focus:'Technik, Trainingsrhythmus und aerobe Basis',main:[3,'8–10',90],assist:[2,'10–12',60],pull:'4–6',easy:'15 Min.',interval:'6 × 30 s schnell / 60 s gehen',power:[3,'3'],test:'Startwerte: 5-km-Zeit, saubere Klimmzüge und 10 Pop-ups filmen.'},
    {month:2,phase:'Basis II',focus:'Mehr Kraftvolumen und längere ruhige Läufe',main:[3,'8–12',90],assist:[3,'10–12',60],pull:'4–7',easy:'18 Min.',interval:'8 × 30 s schnell / 60 s gehen',power:[3,'3'],test:'Bei allen Hauptübungen das obere Wiederholungsende mit 2 RIR anstreben.'},
    {month:3,phase:'Kapazität',focus:'Muskelaufbau und Grundlagenausdauer festigen',main:[4,'6–10',105],assist:[3,'8–12',60],pull:'5–7',easy:'22 Min.',interval:'6 × 60 s schnell / 90 s locker',power:[4,'3'],test:'Klimmzüge und kontrollierte Pop-up-Zeit erneut prüfen.'},
    {month:4,phase:'Kraft I',focus:'Hohe Zug- und Beinkraft für Paddeln und Turns',main:[4,'5–6',150],assist:[3,'8–10',75],pull:'4–6',easy:'22 Min.',interval:'8 × 45 s schnell / 75 s locker',power:[4,'3'],test:'Lasten nur steigern, wenn jede Wiederholung schnell und sauber bleibt.'},
    {month:5,phase:'Kraft II',focus:'Kraft aufbauen, Ausdauer erhalten',main:[4,'4–6',165],assist:[3,'6–10',90],pull:'4–6',easy:'25 Min.',interval:'6 × 75 s schnell / 75 s locker',power:[4,'3'],test:'Ziel: 8 saubere Klimmzüge oder weniger Assistenz als in Monat 1.'},
    {month:6,phase:'Paddelkraft',focus:'Maximalkraft und wiederholte Zugleistung',main:[5,'4',180],assist:[3,'6–8',90],pull:'4–6',easy:'25 Min.',interval:'10 × 30 s schnell / 60 s locker',power:[4,'3'],test:'5-km-Kontrolllauf bei gleichmässigem Tempo; kein All-out-Test in Deload-Woche.'},
    {month:7,phase:'Power I',focus:'Kraft schneller produzieren und sauber landen',main:[3,'4–6',150],assist:[3,'6–10',75],pull:'5–7',easy:'25 Min.',interval:'2 Serien: 5 × 20 s schnell / 40 s locker; 3 Min. Serienpause',power:[4,'3'],test:'Sprunghöhe oder Broad-Jump-Weite und 5 perfekte Pop-ups dokumentieren.'},
    {month:8,phase:'Power II',focus:'Rotation, einbeinige Stabilität und Explosivität',main:[4,'3–5',165],assist:[3,'6–8',75],pull:'4–6',easy:'28 Min.',interval:'8 × 30 s Steigung / 60 s locker',power:[4,'3'],test:'Power-Sätze beenden, sobald Geschwindigkeit sichtbar abfällt.'},
    {month:9,phase:'Repeated Power',focus:'Explosive Aktionen trotz wiederholter Belastung',main:[3,'5',135],assist:[3,'8–10',60],pull:'5–8',easy:'30 Min.',interval:'3 Serien: 4 × 20 s schnell / 40 s locker; 3 Min. Serienpause',power:[5,'2–3'],test:'Intervalle sollen in der letzten Wiederholung fast gleich schnell sein wie in der ersten.'},
    {month:10,phase:'Surf-Kondition',focus:'Kraft, Pop-ups und Cardio eng verbinden',main:[3,'5–8',120],assist:[3,'8–12',60],pull:'5–8',easy:'30 Min.',interval:'6 × 60 s schnell / 60 s locker',power:[4,'3'],test:'Bei gleicher Laufgeschwindigkeit niedrigere RPE oder Herzfrequenz anstreben.'},
    {month:11,phase:'Peak',focus:'Hohe Qualität, Surf-typische Spitzen, wenig Ermüdung',main:[3,'3–5',165],assist:[2,'6–8',75],pull:'4–6',easy:'25 Min.',interval:'2 Serien: 5 × 20 s schnell / 40 s locker; 3 Min. Serienpause',power:[4,'2–3'],test:'Keine Grind-Reps. Schnell, frisch und technisch präzise trainieren.'},
    {month:12,phase:'Taper & Test',focus:'Ermüdung abbauen und Reise-Readiness prüfen',main:[2,'4–6',135],assist:[2,'8',60],pull:'4–6',easy:'20 Min.',interval:'4 × 30 s schnell / 90 s locker',power:[3,'2–3'],test:'Woche 3: 5-km-Zeit, Klimmzüge und 10 Pop-ups testen. Woche 4 sehr leicht.'}
  ];

  function makeExercise(key,sets,reps,options={}){
    const base=exerciseLibrary[key];
    return {
      id:`surf-year-${slug(key)}`,name:base.name,sets,reps,media:base.media||'custom',cat:base.cat||'Kraft',
      kg:options.kg??kgByExercise[options.weightKey||key]??'',trackWeight:options.trackWeight??base.trackWeight??true,
      restSec:options.restSec??60,timeMin:options.timeMin??null,block:options.block||'',howTo:options.howTo||base.howTo||''
    };
  }

  function buildPlan(cfg){
    const days=emptyDays(),[mainSets,mainReps,mainRest]=cfg.main,[assistSets,assistReps,assistRest]=cfg.assist,[powerSets,powerReps]=cfg.power;
    const late=cfg.month>=7,peak=cfg.month>=10;
    const fill=(weekday,title,duration,ex)=>{days[weekday]={weekday,title,durationMin:duration,ex}};
    fill(2,'Upper · Paddelkraft',75,[
      makeExercise('upperWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'popupReaction':'popup',powerSets,powerReps,{restSec:45,block:'A · Power'}),
      makeExercise('bench',mainSets,mainReps,{restSec:mainRest,block:'B1 · Hauptsatz'}),
      makeExercise('pullup',mainSets,cfg.pull,{restSec:mainRest,block:'B2 · Hauptsatz'}),
      makeExercise('row',assistSets,assistReps,{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise(late?'landmine':'incline',assistSets,assistReps,{restSec:assistRest,block:'C2 · Supersatz'}),
      makeExercise('runEasy',1,cfg.month<4?'10 Min.':peak?'8 Min.':'12 Min.',{restSec:0,timeMin:cfg.month<4?10:peak?8:12,block:'Finish'})
    ]);
    fill(3,'Lower · Pop-up & Turns',72,[
      makeExercise('lowerWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'broad':'jump',powerSets,powerReps,{restSec:60,block:'A · Power'}),
      makeExercise(cfg.month>=7?'trap':'squat',mainSets,mainReps,{restSec:mainRest,block:'B · Hauptsatz'}),
      makeExercise('rdl',mainSets,mainReps,{restSec:mainRest,block:'C · Hauptsatz'}),
      makeExercise('split',assistSets,assistReps,{restSec:assistRest,block:'D1 · Supersatz'}),
      makeExercise('pallof',3,'8–10 / Seite',{restSec:45,block:'D2 · Supersatz'}),
      makeExercise('popup',late?3:2,late?'3 schnell':'5 sauber',{restSec:45,block:'Skill'})
    ]);
    fill(5,'Upper · Paddle-Endurance',75,[
      makeExercise('upperWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise('pulldown',mainSets,mainReps,{restSec:mainRest,block:'B1 · Hauptsatz'}),
      makeExercise(late?'landmine':'shoulder',assistSets,assistReps,{restSec:assistRest,block:'B2 · Hauptsatz'}),
      makeExercise('oneRow',assistSets,assistReps+' / Seite',{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise('facepull',3,'12–15',{restSec:45,block:'C2 · Supersatz'}),
      makeExercise('external',2,'12–15 / Seite',{restSec:45,block:'Prehab'}),
      makeExercise('intervals',1,cfg.interval,{restSec:0,timeMin:peak?14:18,block:'Finish'})
    ]);
    fill(6,'Full Body · Surf-Stabilität',75,[
      makeExercise('lowerWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'medrot':'skater',powerSets,powerReps+(late?' / Seite':''),{restSec:60,block:'A · Power'}),
      makeExercise(cfg.month>=7?'legpress':'trap',mainSets,mainReps,{restSec:mainRest,block:'B · Hauptsatz'}),
      makeExercise('hip',assistSets,assistReps,{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise(late?'chop':'deadbug',3,late?'8–10 / Seite':'8 / Seite',{restSec:45,block:'C2 · Supersatz'}),
      makeExercise('carry',3,'30–40 m',{restSec:60,block:'D · Carry'}),
      makeExercise('runEasy',1,cfg.easy,{restSec:0,timeMin:Number.parseInt(cfg.easy,10),block:'Finish'})
    ]);
    return {id:`surf-year-month-${cfg.month}`,name:`Surf Year · Monat ${cfg.month}`,days,draft:false,programId:PROGRAM_ID,programMonth:cfg.month,phase:cfg.phase,focus:cfg.focus,test:cfg.test};
  }

  const plans=configs.map(buildPlan);
  const monthWeeks=[4,4,5,4,4,5,4,4,5,4,4,5];
  const months=configs.map(cfg=>({
    month:cfg.month,planId:`surf-year-month-${cfg.month}`,phase:cfg.phase,focus:cfg.focus,
    weeks:monthWeeks[cfg.month-1],cardio:`Zone 2: ${cfg.easy} · Intervalle: ${cfg.interval}`,test:cfg.test,deload:'Woche 4: ca. 40 % weniger Kraftsätze, kein Muskelversagen, Cardio ca. 30 % kürzer. In den Monaten 3, 6, 9 und 12 folgt eine leichte Benchmark-/Pufferwoche.'
  }));

  function ensureState(state){
    if(!state||!Array.isArray(state.plans))return state;
    const deleted=new Set(state.deletedPlanIds||[]),ids=new Set(state.plans.map(plan=>plan.id));
    for(const plan of plans)if(!ids.has(plan.id)&&!deleted.has(plan.id))state.plans.push(structuredClone(plan));
    if(!state.annualProgram||state.annualProgram.id!==PROGRAM_ID)state.annualProgram={id:PROGRAM_ID,startDate:localIso(new Date()),currentMonth:1,installedAt:Date.now()};
    state.annualProgram.startDate=/^\d{4}-\d{2}-\d{2}$/.test(String(state.annualProgram.startDate||''))?state.annualProgram.startDate:localIso(new Date());
    state.annualProgram.currentMonth=Math.min(12,Math.max(1,Number(state.annualProgram.currentMonth)||1));
    return state;
  }

  function stateFragment(startDate=localIso(new Date())){
    return {plans:structuredClone(plans),annualProgram:{id:PROGRAM_ID,startDate,currentMonth:1,installedAt:Date.now()}};
  }

  function context(state,date,plan){
    if(plan?.programId!==PROGRAM_ID||!state?.annualProgram?.startDate)return null;
    const start=new Date(`${state.annualProgram.startDate}T12:00:00`),target=new Date(`${date}T12:00:00`);
    const startMonday=new Date(start);startMonday.setDate(start.getDate()-(start.getDay()+6)%7);
    const targetMonday=new Date(target);targetMonday.setDate(target.getDate()-(target.getDay()+6)%7);
    const programWeek=Math.max(1,Math.round((targetMonday-startMonday)/604800000)+1),cappedWeek=Math.min(52,programWeek);
    let scheduledMonth=1,weekInMonth=cappedWeek;
    for(let index=0;index<monthWeeks.length;index++){if(weekInMonth<=monthWeeks[index]){scheduledMonth=index+1;break}weekInMonth-=monthWeeks[index]}
    const deload=weekInMonth===4,bridge=weekInMonth===5;
    return {programWeek,weekInMonth,deload,bridge,recovery:deload||bridge,scheduledMonth};
  }

  window.SWELL_SURF_YEAR={id:PROGRAM_ID,plans,months,dayNames,ensureState,stateFragment,context};
})();
