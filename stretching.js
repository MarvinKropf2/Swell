'use strict';

const stretchGroups = [
  {name:'Oberkörper', exercises:[
    ['Nacken sanft neigen', 'Seitlicher Nacken', ['Setze dich aufrecht auf einen Stuhl und lass beide Schultern locker sinken. Der Blick zeigt nach vorne.', 'Neige ein Ohr langsam in Richtung derselben Schulter. Die gegenüberliegende Schulter bleibt entspannt unten; ziehe nicht mit der Hand am Kopf.', 'Bleibe nur im angenehmen Bewegungsbereich. Richte den Kopf langsam auf und wechsle die Seite. Bei Schwindel, Kribbeln oder Schmerzen die Übung auslassen.']],
    ['Brust öffnen', 'Brust und vordere Schulter', ['Stell dich aufrecht neben einen Türrahmen und lege einen Unterarm locker an den Rahmen. Der Ellbogen bleibt etwas unter Schulterhöhe.', 'Drehe den Brustkorb langsam vom Arm weg, bis sich die Brust angenehm öffnet. Schulter unten lassen und den Rücken nicht ins Hohlkreuz drücken.', 'Atme ruhig weiter, löse die Position langsam und wechsle die Seite. Bei einem Einklemmen in der Schulter den Arm tiefer nehmen oder die Übung auslassen.']],
    ['Schulter quer dehnen', 'Hintere Schulter', ['Stehe oder sitze aufrecht. Führe einen Arm locker vor der Brust zur gegenüberliegenden Seite.', 'Unterstütze den Oberarm mit der anderen Hand oberhalb des Ellbogens und ziehe ihn behutsam näher zur Brust. Die Schulter bleibt weit vom Ohr entfernt.', 'Den Arm nicht am Ellbogengelenk ziehen. Langsam lösen und die andere Seite dehnen.']],
    ['Trizeps und Flanke', 'Armrückseite und seitlicher Oberkörper', ['Hebe einen Arm und beuge den Ellbogen, sodass die Hand locker hinter dem Kopf liegt.', 'Lege die andere Hand leicht an den angehobenen Ellbogen. Lass die Schulter entspannt und neige dich bei Bedarf ein wenig zur Gegenseite, ohne den Ellbogen herunterzudrücken.', 'Halte die Rippen über dem Becken und atme in die gedehnte Flanke. Aufrichten, Arm lösen und Seite wechseln.']],
    ['Unterarme lösen', 'Handgelenke und Unterarme', ['Strecke einen Arm locker nach vorne, der Ellbogen bleibt leicht gebeugt. Die Handfläche zeigt zunächst nach oben.', 'Führe die Finger mit der anderen Hand sanft nach unten und zu dir, bis du ein leichtes Ziehen im Unterarm spürst. Nicht ruckartig ziehen.', 'Löse die Hand, drehe die Handfläche nach unten und beuge das Handgelenk behutsam in die andere Richtung. Anschließend den Arm wechseln.']]
  ]},
  {name:'Hüfte & Beine', exercises:[
    ['Hüftbeuger im Halbkniestand', 'Vordere Hüfte', ['Knie dich auf eine weiche Unterlage und stelle einen Fuß vor dir auf. Halte dich bei Bedarf an einem Stuhl fest.', 'Spanne das Gesäß der hinteren Seite leicht an und kippe das Becken sanft nach hinten. Schiebe es nur wenig nach vorne, bis du die Vorderseite der hinteren Hüfte spürst.', 'Rumpf aufrecht halten und nicht ins Hohlkreuz ausweichen. Behutsam zurückgehen und die Seite wechseln.']],
    ['Vorderen Oberschenkel dehnen', 'Oberschenkelvorderseite', ['Stelle dich neben eine Wand oder einen stabilen Stuhl und halte dich fest. Beuge ein Knie und fasse den Fußrücken oder Knöchel hinter dir.', 'Führe die Ferse behutsam zum Gesäß. Knie bleiben nahe beieinander, Becken und Oberkörper aufrecht.', 'Nur so weit beugen, wie das Knie angenehm bleibt. Den Fuß langsam absetzen und die andere Seite dehnen. Wenn du den Fuß nicht bequem erreichst, diese Dehnung auslassen.']],
    ['Gesäß in Rückenlage', 'Gesäß und äußere Hüfte', ['Lege dich auf den Rücken und stelle beide Füße auf. Lege einen Knöchel auf den gegenüberliegenden Oberschenkel, oberhalb des Knies.', 'Fasse den Oberschenkel des aufgestellten Beins von hinten und führe ihn sanft zum Oberkörper. Kopf und Schultern bleiben am Boden.', 'Die Dehnung soll im Gesäß ankommen, ohne Druck im Knie. Langsam absetzen und die Seite wechseln.']],
    ['Schmetterling im Sitzen', 'Oberschenkelinnenseiten', ['Setze dich aufrecht hin und lege die Fußsohlen locker aneinander. Wenn der Rücken rund wird, setze dich auf ein gefaltetes Handtuch.', 'Lass die Knie von selbst nach außen sinken. Fasse die Füße oder Knöchel, ohne die Knie mit den Händen herunterzudrücken.', 'Neige den geraden Oberkörper bei Bedarf etwas aus der Hüfte nach vorne. Ruhig atmen und anschließend die Beine locker lösen.']]
  ]},
  {name:'Rücken & Beinrückseite', exercises:[
    ['Beinrückseite im Sitzen', 'Hintere Oberschenkel', ['Setze dich auf die vordere Hälfte eines stabilen Stuhls. Strecke ein Bein nach vorne, die Ferse steht auf und das Knie bleibt leicht gebeugt.', 'Richte den Rücken auf und neige den Oberkörper aus der Hüfte zum ausgestreckten Bein. Stütze die Hände auf dem anderen Oberschenkel ab.', 'Gehe nur bis zu einem leichten Ziehen an der Beinrückseite, ohne den Rücken rund zu ziehen. Aufrichten und die Seite wechseln.']],
    ['Wade an der Wand', 'Waden und Sprunggelenke', ['Stelle die Hände an eine Wand und mache mit einem Fuß einen Schritt zurück. Beide Fußspitzen zeigen nach vorne.', 'Lass das hintere Knie locker gestreckt und die hintere Ferse am Boden. Beuge das vordere Knie und lehne dich behutsam zur Wand.', 'Spüre die Dehnung in der hinteren Wade. Nicht federn oder die Ferse anheben. Zurückgehen und die Seite wechseln.']],
    ['Kindhaltung mit langen Armen', 'Rücken und breiter Rückenmuskel', ['Komm auf einer weichen Unterlage in den Vierfüßlerstand. Knie bequem öffnen und die Hüfte langsam Richtung Fersen bewegen.', 'Schiebe die Hände nach vorne und lass Brustkorb und Kopf entspannt absinken. Das Gesäß muss die Fersen nicht erreichen.', 'Atme ruhig in den Rücken. Bei Druck auf den Knien bleibe mit der Hüfte höher oder lege stattdessen die Hände auf einen Tisch und schiebe die Hüfte im Stand zurück.']],
    ['Seitliche Rumpfdehnung', 'Flanken und seitlicher Rumpf', ['Stehe aufrecht mit bequem auseinanderstehenden Füßen. Lege eine Hand an die Hüfte und führe den anderen Arm locker über den Kopf.', 'Neige den Oberkörper langsam zur Seite, ohne dich nach vorne zu drehen. Beide Füße bleiben am Boden und das Becken zeigt nach vorne.', 'Atme in die lange Körperseite. Ohne Schwung aufrichten und die andere Seite dehnen.']]
  ]}
];

function stretchRoutine(date,p=plan()){
  if(dayForDate(date,p)?.ex?.length)return null;
  const rest=[1,2,3,4,5,6,0].filter(w=>!day(p,w)?.ex?.length),index=rest.indexOf(parseDate(date).getDay());
  if(index<0)return null;
  const slots=Math.min(3,rest.length),groups=stretchGroups.filter((_,i)=>i%slots===index%slots);
  return {title:slots===1?'Ganzkörper-Stretching':groups.map(g=>g.name).join(' · '),exercises:groups.flatMap(g=>g.exercises.map(([name,area,steps],i)=>({id:`stretch-${stretchGroups.indexOf(g)}-${i}`,name,area,howTo:steps.map((step,n)=>`${n+1}. ${step}`).join('\n\n')})))};
}
function optionalStretchCard(date,p=plan()){
  const routine=stretchRoutine(date,p);if(!routine)return '';
  const saved=logsForDate(date).some(log=>log.kind==='stretching');
  if(saved&&state.tab==='calendar')return '';
  return `<div class="card"><span class="tiny">OPTIONAL · STRETCHING</span><h3>${esc(routine.title)}</h3><p class="sub">${routine.exercises.length} Dehnungen${saved?' · Bereits gespeichert':''}</p><button class="secondary full" style="margin-top:14px" data-start-stretch="${esc(date)}">${state.session?.kind==='stretching'&&state.session.date===date?'Stretching fortsetzen':saved?'Stretching ansehen':'Stretching öffnen'} ${ico('arrow')}</button></div>`;
}
function startStretching(date){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return;
  if(state.session&&sessionHasProgress()){
    toast(state.session.kind==='stretching'?'Deine offene Stretching-Routine wird fortgesetzt':'Bitte zuerst dein offenes Workout speichern oder verwerfen');
  }else{
    const routine=stretchRoutine(date);if(!routine)return;
    const p=plan(),saved=logsForDate(date).find(log=>log.kind==='stretching');state.session=saved?{...structuredClone(saved),editId:saved.id}:{id:uid(),kind:'stretching',date,planId:p.id,planName:p.name,dayTitle:routine.title,weekday:parseDate(date).getDay(),created:Date.now(),touched:false,exercises:routine.exercises.map(ex=>({...ex,trackWeight:false,cat:'Stretching',sets:[{done:false,kg:'',reps:'',notes:'',failure:false}]}))};
  }
  if(state.tab==='calendar')resetCalendarSelection();state.tab='training';view.dayDetail=null;view.showPlans=false;view.sessionOpen=true;persist();render();topPage();
}
function renderStretchSession(){
  const s=state.session,pct=Math.round(totalDone()/Math.max(1,totalSets())*100);
  return `<div class="between"><button class="back-btn" data-exit-session>${ico('back')} Zurück</button><span class="tiny">AUTOMATISCH GESPEICHERT</span></div>${header('Optional · Stretching',s.dayTitle)}<p class="sub">Sanft in die Dehnung gehen, ruhig atmen und beide Seiten berücksichtigen. Nicht federn; bei Schmerzen lösen.</p><div class="card"><div class="between"><b data-session-count>${totalDone()} / ${totalSets()} Dehnungen</b><span data-session-pct class="tiny">${pct}%</span></div><div class="progressline"><i data-progressbar style="width:${pct}%"></i></div></div>${section('Dehnungen')}${s.exercises.map((ex,i)=>`<div class="card workout-ex-card"><div class="exercise-head"><div class="grow"><h3>${esc(ex.name)}</h3><small>${esc(ex.area||'Stretching')}</small></div></div><details class="exercise-guide"><summary>So geht’s</summary>${guideContent(ex)}</details><button class="secondary full" style="margin-top:14px" data-stretch-check="${i}" aria-pressed="${ex.sets[0].done}">${ex.sets[0].done?`${ico('check')} Erledigt`:'Als erledigt abhaken'}</button></div>`).join('')}<button class="primary full" data-finish>Stretching speichern ${ico('check')}</button><button class="dangerlink full" data-cancel-session>Stretching verwerfen</button><div class="data-info" style="text-align:center">${esc(fmt(s.date))}</div>`;
}
function stretchSummaryMarkup(log){return `<p class="sub">${completedExercises(log).length} von ${log.exercises.length} Dehnungen erledigt</p>`}
function renderSavedStretch(log){return `<div class="history-workout"><span class="tiny">OPTIONALES STRETCHING</span><h3>${esc(log.dayTitle)}</h3>${stretchSummaryMarkup(log)}${log.exercises.map(ex=>`<div class="history-exercise"><div class="between"><h4>${esc(ex.name)}</h4><span class="mini-count">${ex.sets.some(s=>s.done)?'✓ Erledigt':'Ausgelassen'}</span></div><details class="exercise-guide"><summary>So geht’s</summary>${guideContent(ex)}</details></div>`).join('')}<div class="history-actions"><button class="text-btn" data-edit-log="${esc(log.id)}">Bearbeiten</button><button class="text-btn danger" data-delete-log="${esc(log.id)}" aria-label="Stretching löschen">Löschen</button></div></div>`}
function openStretchSummary(log){modal(`${sheetTop('STRETCHING GESPEICHERT')}<h2>${esc(log.dayTitle)}</h2>${stretchSummaryMarkup(log)}<button class="primary full" style="margin-top:18px" data-close-modal>Fertig</button>`)}
