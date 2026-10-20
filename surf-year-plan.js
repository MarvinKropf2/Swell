(() => {
  'use strict';

  const PROGRAM_ID='surf-world-trip-12m';
  const PROGRAM_REVISION=2;
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
    facepull:{name:'Face Pull + Aussenrotation',cat:'Prehab',media:'facepull',howTo:'Seil auf Augenhöhe ziehen, Ellbogen führen und am Ende leicht nach aussen rotieren. Langsam zurück; Nacken entspannt.'},
    external:{name:'Kabel-Aussenrotation',cat:'Prehab',media:'facepull',howTo:'Ellbogen am Körper oder leicht angehoben stabil halten. Nur aus der Schulter rotieren, sehr leichtes Gewicht wählen und Schulterblatt ruhig lassen.'},
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
    carry:{name:'Farmer Carry (pro Hand)',cat:'Core',media:'custom',howTo:'Aufrecht gehen, Rippen über Becken, Schulterblätter stabil. Kurze kontrollierte Schritte; Gewicht absetzen, bevor die Haltung zerfällt. Zuerst 3 × 30 m sauber gehen, dann schrittweise bis 40 m verlängern. Gewicht erst danach im kleinsten Schritt erhöhen.'},
    runEasy:{name:'Laufband Zone 2',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'Laufband mit 1 % Steigung. Startbereich etwa 5.0–6.0 km/h; passe in 0.2–0.5-km/h-Schritten so an, dass RPE 3–4/10 und ganze Sätze beim Sprechen möglich sind. Bei Bedarf 3 Min. laufen / 1 Min. zügig gehen. Die angezeigte km-Spanne ist eine Orientierung bei 5.0–6.5 km/h. Nach jedem Lauf tatsächliche Geschwindigkeit (km/h) und Distanz (km) notieren. Erst die Dauer steigern; Tempo nur um 0.2–0.3 km/h erhöhen, wenn der letzte Lauf locker bei höchstens RPE 3 war.'},
    intervals:{name:'Laufband Intervalle',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'Mit 5 Min. lockerem Gehen/Laufen beginnen und am Schluss 5 Min. auslaufen. Im ersten schnellen Abschnitt als Startwert etwa 0.5 km/h über dem lockeren Lauftempo wählen; bei Bedarf pro Wiederholung in 0.2-km/h-Schritten anpassen. Ziel: RPE 6–7/10, gleichmässige Abschnitte, kein Sprint. Erholung zügig gehen (etwa 4–5 km/h oder langsamer, falls nötig). Schnelle Geschwindigkeit (km/h) und Gesamtdistanz (km) nach dem Training notieren; wenn die letzte Wiederholung deutlich langsamer wird, Tempo senken.'},
    bike:{name:'Bike Recovery',cat:'Ausdauer',media:'custom',trackWeight:false,howTo:'Sehr locker bei RPE 2–3 treten. Nur zur aktiven Erholung; keine zusätzliche harte Einheit daraus machen.'},
    thoracic:{name:'Surf-Mobility Flow',cat:'Mobility',media:'mobility',trackWeight:false,howTo:'Je 45 Sek.: Sprunggelenk-Rocks, 90/90-Hüftwechsel, tiefer Squat Hold, Open Book, Lat-Stretch und Schulter-Aussenrotation mit Band. Ruhig und schmerzfrei.'}
  };

  const configs=[
    {month:1,phase:'Basis I',focus:'Technik, Trainingsrhythmus und aerobe Basis',main:[3,'8–10',120],assist:[2,'10–12',60],pull:'3–4',easy:15,shortEasy:8,interval:'6 × 30 s zügig / 60 s gehen',intervalMin:19,power:[3,'3'],popup:[2,'3 sauber'],skillPopup:[2,'4 sauber'],test:'Startwerte: 5-km-Zeit, saubere Klimmzüge und 10 einzelne Pop-ups dokumentieren.'},
    {month:2,phase:'Basis II',focus:'Mehr saubere Wiederholungen und längere ruhige Läufe',main:[3,'8–12',120],assist:[2,'10–12',60],pull:'3–5',easy:18,shortEasy:10,interval:'8 × 30 s zügig / 60 s gehen',intervalMin:22,power:[3,'3'],popup:[2,'4 sauber'],skillPopup:[2,'5 sauber'],test:'Bei Kraftübungen Wiederholungen steigern; Last noch nicht erzwingen.'},
    {month:3,phase:'Kapazität',focus:'Muskelaufbau und Grundlagenausdauer festigen',main:[3,'8–12',120],assist:[2,'10–12',60],pull:'4–5',easy:20,shortEasy:12,interval:'6 × 60 s zügig / 90 s locker',intervalMin:25,power:[3,'3'],popup:[3,'4 sauber'],skillPopup:[3,'4 sauber'],test:'Klimmzüge und kontrollierte Pop-up-Zeit erneut prüfen.'},
    {month:4,phase:'Kraft I',focus:'Kraft aufbauen, Ausdauer weiterentwickeln',main:[3,'6–8',150],assist:[2,'8–12',75],pull:'3–5',easy:22,shortEasy:12,interval:'8 × 45 s zügig / 75 s locker',intervalMin:26,power:[3,'3'],popup:[3,'4 sauber'],skillPopup:[3,'4 sauber'],test:'Lasten nur nach zwei sauberen Einheiten am oberen Wiederholungsende erhöhen.'},
    {month:5,phase:'Kraft II',focus:'Kraft festigen und Ausdauer erhalten',main:[3,'5–8',150],assist:[2,'8–12',75],pull:'3–5',easy:24,shortEasy:14,interval:'6 × 75 s zügig / 75 s locker',intervalMin:25,power:[3,'3'],popup:[3,'4 sauber'],skillPopup:[3,'5 sauber'],test:'Ziel: mehr saubere Klimmzüge oder weniger Assistenz als in Monat 1.'},
    {month:6,phase:'Paddelkraft',focus:'Kraft halten und wiederholte Zugleistung verbessern',main:[3,'4–6',180],assist:[2,'8–12',75],pull:'3–5',easy:25,shortEasy:14,interval:'10 × 30 s zügig / 60 s locker',intervalMin:25,power:[3,'3'],popup:[3,'4 sauber'],skillPopup:[3,'5 sauber'],test:'5-km-Kontrolllauf gleichmässig; kein All-out-Test in der Deload-Woche.'},
    {month:7,phase:'Power I',focus:'Kraft schnell einsetzen und stabil landen',main:[3,'5–8',150],assist:[2,'8–12',75],pull:'4–6',easy:26,shortEasy:15,interval:'2 Serien: 5 × 20 s zügig / 40 s locker; 3 Min. Serienpause',intervalMin:23,power:[3,'3'],popup:[3,'3 reaktiv'],skillPopup:[3,'3 schnell'],test:'Sprungweite und fünf perfekte Pop-ups dokumentieren.'},
    {month:8,phase:'Power II',focus:'Rotation, einbeinige Stabilität und Explosivität',main:[3,'5–8',150],assist:[2,'8–12',75],pull:'4–6',easy:28,shortEasy:15,interval:'8 × 30 s bei 3 % Steigung / 60 s locker',intervalMin:22,power:[3,'3'],popup:[3,'3 reaktiv'],skillPopup:[3,'3 schnell'],test:'Power-Sätze beenden, sobald Geschwindigkeit oder Landung sichtbar nachlässt.'},
    {month:9,phase:'Repeated Power',focus:'Explosive Aktionen trotz wiederholter Belastung',main:[3,'6–8',135],assist:[2,'8–12',75],pull:'4–6',easy:30,shortEasy:16,interval:'3 Serien: 4 × 20 s zügig / 40 s locker; 3 Min. Serienpause',intervalMin:28,power:[4,'2–3'],popup:[3,'3 reaktiv'],skillPopup:[3,'3 schnell'],test:'Intervalltempo gleichmässig halten; kein schneller Abschluss auf Kosten der Form.'},
    {month:10,phase:'Surf-Kondition',focus:'Kraft, Pop-ups und Cardio verbinden',main:[3,'6–8',135],assist:[2,'8–12',60],pull:'4–6',easy:30,shortEasy:14,interval:'6 × 60 s zügig / 60 s locker',intervalMin:22,power:[4,'2–3'],popup:[3,'3 reaktiv'],skillPopup:[3,'3 schnell'],test:'Bei gleicher Geschwindigkeit niedrigere RPE anstreben; Tempo nicht erzwingen.'},
    {month:11,phase:'Peak',focus:'Hohe Qualität und wenig Ermüdung',main:[3,'5–8',150],assist:[2,'8–10',75],pull:'3–5',easy:25,shortEasy:12,interval:'2 Serien: 5 × 20 s zügig / 40 s locker; 3 Min. Serienpause',intervalMin:23,power:[3,'2–3'],popup:[3,'3 reaktiv'],skillPopup:[3,'3 schnell'],test:'Keine Grind-Reps. Schnell, frisch und technisch präzise trainieren.'},
    {month:12,phase:'Taper & Test',focus:'Ermüdung abbauen und Reise-Readiness prüfen',main:[2,'6–8',150],assist:[2,'8–10',60],pull:'3–5',easy:22,shortEasy:10,interval:'4 × 30 s zügig / 90 s locker',intervalMin:18,power:[2,'2'],popup:[2,'2 reaktiv'],skillPopup:[2,'3 sauber'],test:'Woche 3: 5-km-Zeit, Klimmzüge und 10 Pop-ups testen. Woche 4 sehr leicht.'}
  ];

  const runKmRange=minutes=>`${(minutes*5/60).toFixed(1)}–${(minutes*6.5/60).toFixed(1)} km`;
  const easyRunLabel=minutes=>`${minutes} Min. · ca. ${runKmRange(minutes)}`;

  function makeExercise(key,sets,reps,options={}){
    const base=exerciseLibrary[key],cat=base.cat||'Kraft';
    const guidance={
      Kraft:'Progression: zuerst Wiederholungen steigern. Erst wenn in zwei Einheiten alle Sätze am oberen Ende sauber mit 1–2 Wiederholungen Reserve gelingen, das Gewicht um den kleinsten verfügbaren Schritt erhöhen (Oberkörper meist 1–2 kg, Unterkörper etwa 2.5 kg). Im Monatszielbereich bleiben.',
      Power:'Jede Wiederholung explosiv und sauber. Zwischen den Sätzen 60–90 Sek. pausieren; beenden, sobald Tempo, Sprunghöhe oder Landung nachlässt. Keine Zusatzlast erzwingen.',
      Surf:'Jede Wiederholung einzeln neu aufbauen und technisch sauber ausführen. Bei langsamem oder unsauberem Pop-up die Serie beenden; Qualität vor Wiederholungszahl.',
      Core:'Rumpf und Becken ruhig halten. Erst Wiederholungen oder Haltezeit kontrolliert erhöhen; Widerstand nur im kleinsten Schritt steigern, solange die Position stabil bleibt.',
      Prehab:'Sehr leicht und schmerzfrei arbeiten. Die vorgegebenen 12–15 Wiederholungen langsam und kontrolliert halten; Gewicht nur im kleinsten Schritt erhöhen, wenn Schulterbewegung und Technik unverändert sauber bleiben.'
    }[cat]||'';
    const exerciseGuidance=key==='pullup'?'Progression: jede Wiederholung mit 1–2 Wiederholungen Reserve beenden. Erst wenn alle Sätze in zwei Einheiten am oberen Ende sauber gelingen, die Band-/Maschinenhilfe im kleinsten Schritt reduzieren.':'';
    const finalGuidance=key==='pullup'?exerciseGuidance:guidance;
    return {
      id:`surf-year-${slug(key)}`,name:base.name,sets,reps,media:base.media||'custom',cat,
      kg:options.kg??kgByExercise[options.weightKey||key]??'',trackWeight:options.trackWeight??base.trackWeight??true,
      restSec:options.restSec??60,timeMin:options.timeMin??null,block:options.block||'',howTo:[options.howTo||base.howTo||'',finalGuidance].filter(Boolean).join(' ')
    };
  }

  function buildPlan(cfg){
    const days=emptyDays(),[mainSets,mainReps,mainRest]=cfg.main,[assistSets,assistReps,assistRest]=cfg.assist,[powerSets,powerReps]=cfg.power,[popupSets,popupReps]=cfg.popup,[skillPopupSets,skillPopupReps]=cfg.skillPopup;
    const late=cfg.month>=7;
    const fill=(weekday,title,duration,ex)=>{days[weekday]={weekday,title,durationMin:duration,ex}};
    fill(2,'Upper · Paddelkraft',75,[
      makeExercise('upperWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'popupReaction':'popup',popupSets,popupReps,{restSec:60,block:'A · Power'}),
      makeExercise('bench',mainSets,mainReps,{restSec:mainRest,block:'B1 · Hauptsatz'}),
      makeExercise('pullup',mainSets,cfg.pull,{restSec:mainRest,block:'B2 · Hauptsatz'}),
      makeExercise('row',assistSets,assistReps,{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise(late?'landmine':'incline',late?powerSets:assistSets,late?'4–6 / Seite':assistReps,{restSec:late?90:assistRest,block:late?'C2 · Power':'C2 · Supersatz'}),
      makeExercise('runEasy',1,easyRunLabel(cfg.shortEasy),{restSec:0,timeMin:cfg.shortEasy,block:'Finish'})
    ]);
    fill(3,'Lower · Pop-up & Turns',72,[
      makeExercise('lowerWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'broad':'jump',powerSets,powerReps,{restSec:60,block:'A · Power'}),
      makeExercise(cfg.month>=7?'trap':'squat',mainSets,mainReps,{restSec:mainRest,block:'B · Hauptsatz'}),
      makeExercise('rdl',mainSets,mainReps,{restSec:mainRest,block:'C · Hauptsatz'}),
      makeExercise('split',assistSets,assistReps,{restSec:assistRest,block:'D1 · Supersatz'}),
      makeExercise('pallof',3,'8–10 / Seite',{restSec:45,block:'D2 · Supersatz'}),
      makeExercise('popup',skillPopupSets,skillPopupReps,{restSec:60,block:'Skill'})
    ]);
    fill(5,'Upper · Paddle-Endurance',75,[
      makeExercise('upperWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise('pulldown',mainSets,mainReps,{restSec:mainRest,block:'B1 · Hauptsatz'}),
      makeExercise(late?'landmine':'shoulder',late?powerSets:assistSets,late?'4–6 / Seite':assistReps,{restSec:late?90:assistRest,block:late?'B2 · Power':'B2 · Hauptsatz'}),
      makeExercise('oneRow',assistSets,assistReps+' / Seite',{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise('facepull',3,'12–15',{restSec:45,block:'C2 · Supersatz'}),
      makeExercise('external',2,'12–15 / Seite',{restSec:45,block:'Prehab'}),
      makeExercise('intervals',1,cfg.interval,{restSec:0,timeMin:cfg.intervalMin,block:'Finish'})
    ]);
    fill(6,'Full Body · Surf-Stabilität',75,[
      makeExercise('lowerWarm',1,'6 Min.',{restSec:0,timeMin:6,block:'Warm-up'}),
      makeExercise(late?'medrot':'skater',powerSets,powerReps+(late?' / Seite':''),{restSec:60,block:'A · Power'}),
      makeExercise(cfg.month>=7?'legpress':'trap',mainSets,mainReps,{restSec:mainRest,block:'B · Hauptsatz'}),
      makeExercise('hip',assistSets,assistReps,{restSec:assistRest,block:'C1 · Supersatz'}),
      makeExercise(late?'chop':'deadbug',3,late?'8–10 / Seite':'8 / Seite',{restSec:45,block:'C2 · Supersatz'}),
      makeExercise('carry',3,'30–40 m',{restSec:60,block:'D · Carry'}),
      makeExercise('runEasy',1,easyRunLabel(cfg.easy),{restSec:0,timeMin:cfg.easy,block:'Finish'})
    ]);
    return {id:`surf-year-month-${cfg.month}`,name:`Surf Year · Monat ${cfg.month}`,days,draft:false,programId:PROGRAM_ID,programVersion:PROGRAM_REVISION,programMonth:cfg.month,phase:cfg.phase,focus:cfg.focus,test:cfg.test};
  }

  const plans=configs.map(buildPlan);
  const monthWeeks=[4,4,5,4,4,5,4,4,5,4,4,5];
  const months=configs.map(cfg=>({
    month:cfg.month,planId:`surf-year-month-${cfg.month}`,phase:cfg.phase,focus:cfg.focus,
    weeks:monthWeeks[cfg.month-1],cardio:`Langer Zone-2-Lauf: ${easyRunLabel(cfg.easy)} · kurzer Zone-2-Lauf: ${easyRunLabel(cfg.shortEasy)} · Intervalle: ${cfg.interval}`,test:cfg.test,deload:'Woche 4: ca. 40 % weniger Kraftsätze, kein Muskelversagen, Cardio ca. 30 % kürzer. In den Monaten 3, 6, 9 und 12 folgt eine leichte Benchmark-/Pufferwoche.'
  }));

  function ensureState(state){
    if(!state||!Array.isArray(state.plans))return state;
    const deleted=new Set(state.deletedPlanIds||[]),byId=new Map(state.plans.map((plan,index)=>[plan.id,{plan,index}]));
    let activeProgramPlanChanged=false;
    for(const template of plans){
      if(deleted.has(template.id))continue;
      const entry=byId.get(template.id);
      if(!entry){state.plans.push(structuredClone(template));byId.set(template.id,{plan:state.plans[state.plans.length-1],index:state.plans.length-1});continue}
      const existing=entry.plan;
      const isProgramPlan=existing.programId===PROGRAM_ID||/^surf-year-month-\d+$/.test(String(existing.id||''));
      if(!isProgramPlan||Number(existing.programVersion||1)>=PROGRAM_REVISION)continue;
      const oldPlan=structuredClone(existing),oldDays=oldPlan.days||[];
      if(oldPlan.id===state.activePlanId&&(!Array.isArray(state.planTimeline)||!state.planTimeline.length)){
        state.planTimeline=[{id:'baseline',effectiveFrom:'0001-01-01',planId:oldPlan.id,planName:oldPlan.name,snapshot:structuredClone(oldPlan),updatedAt:0}];
      }
      const updated=structuredClone(template);
      updated.name=oldPlan.name||updated.name;updated.draft=!!oldPlan.draft;
      updated.days=template.days.map(day=>{
        const oldDay=oldDays.find(item=>item.weekday===day.weekday);
        const oldExercises=oldDay?.ex||[];
        const generated=day.ex.map(next=>{
          const old=oldExercises.find(item=>item.id===next.id);
          return old?{...old,...next,name:old.name||next.name,kg:old.kg??next.kg}:next;
        });
        const custom=oldExercises.filter(old=>!day.ex.some(next=>next.id===old.id));
        return oldDay?{...oldDay,...day,title:oldDay.title||day.title,ex:[...generated,...custom]}:{...day,ex:generated};
      });
      state.plans[entry.index]=updated;entry.plan=updated;
      if(updated.id===state.activePlanId)activeProgramPlanChanged=true;
    }
    if(!state.annualProgram||state.annualProgram.id!==PROGRAM_ID)state.annualProgram={id:PROGRAM_ID,startDate:localIso(new Date()),currentMonth:1,installedAt:Date.now()};
    state.annualProgram.startDate=/^\d{4}-\d{2}-\d{2}$/.test(String(state.annualProgram.startDate||''))?state.annualProgram.startDate:localIso(new Date());
    state.annualProgram.currentMonth=Math.min(12,Math.max(1,Number(state.annualProgram.currentMonth)||1));
    state.annualProgram.revision=PROGRAM_REVISION;
    if(activeProgramPlanChanged){
      if(!Array.isArray(state.planTimeline))state.planTimeline=[];
      const active=state.plans.find(plan=>plan.id===state.activePlanId),date=localIso(new Date());
      const revision={id:`${date}_${state.activePlanId}`,effectiveFrom:date,planId:state.activePlanId,planName:active?.name||'',snapshot:active?structuredClone(active):null,updatedAt:Date.now()};
      state.planTimeline=state.planTimeline.filter(item=>item.effectiveFrom!==date);state.planTimeline.push(revision);
      state.planTimeline.sort((a,b)=>String(a.effectiveFrom).localeCompare(String(b.effectiveFrom)));
    }
    return state;
  }

  function stateFragment(startDate=localIso(new Date())){
    return {plans:structuredClone(plans),annualProgram:{id:PROGRAM_ID,revision:PROGRAM_REVISION,startDate,currentMonth:1,installedAt:Date.now()}};
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
