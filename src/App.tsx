import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, LockKeyhole, Moon, Send, Sparkles, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { scenes, getScene, ending, type AnswerMap } from './story';
import './story-extra.scss';

type Page='intro'|'story'|'reveal'|'done';
type Progress={page:Page;step:number;answers:AnswerMap;startedAt:number;sent:boolean};
const key='sirli-inson-story-v2';
const fresh:Progress={page:'intro',step:0,answers:{},startedAt:0,sent:false};
function restore():Progress{
 try{
  const x=JSON.parse(localStorage.getItem(key)||'null');
  if(!x||!['intro','story','reveal','done'].includes(x.page)||!x.answers||typeof x.answers!=='object') return fresh;
  return {page:x.page,step:Math.max(0,Math.min(18,Number(x.step)||0)),answers:x.answers,startedAt:x.startedAt||0,sent:!!x.sent};
 }catch{return fresh}
}
function Ambient(){return <div className="ambient" aria-hidden="true"><div className="orb orb-one"/><div className="orb orb-two"/><div className="grain"/><div className="stars">{Array.from({length:18},(_,i)=><i key={i}/>)}</div></div>}
function clickNote(){
 try{const ctx=new AudioContext();const o=ctx.createOscillator();const g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=587;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.04,ctx.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.15);o.start();o.stop(ctx.currentTime+.17);o.onended=()=>{void ctx.close()}}catch{}
}
export default function App(){
 const [p,setP]=useState<Progress>(restore);
 const [music,setMusic]=useState(false);
 const [opened,setOpened]=useState(false);
 const [name,setName]=useState('');
 const [message,setMessage]=useState('');
 const [consent,setConsent]=useState(false);
 const [submitting,setSubmitting]=useState(false);
 const [error,setError]=useState('');
 const [receipt,setReceipt]=useState('');
 const scene=getScene(p.step,p.answers);
 const selected=p.answers[scene.id];
 const reaction=scene.choices.find(x=>x.id===selected)?.reply;
 const result=ending(p.answers);
 const progress=(p.step+(selected?1:0))/scenes.length*100;
 useEffect(()=>{localStorage.setItem(key,JSON.stringify(p));document.title='Sirli inson · Bizning tasodifiy uchrashuvimiz'},[p]);
 function choose(id:string){setP(x=>({...x,answers:{...x.answers,[scene.id]:id}}));if(music)clickNote()}
 function next(){
  if(!selected)return;
  if(p.step<scenes.length-1){setP(x=>({...x,step:x.step+1}));window.scrollTo({top:0,behavior:'smooth'})}
  else {setP(x=>({...x,page:'reveal'}));window.scrollTo({top:0,behavior:'smooth'})}
 }
 function restart(){
  if(!window.confirm('Hikoyani boshidan boshlaysizmi?'))return;
  setP(fresh);setOpened(false);setName('');setMessage('');setConsent(false);setError('');setReceipt('');localStorage.removeItem(key);
 }
 async function share(){
  if(!consent||submitting||p.sent)return;
  setSubmitting(true);setError('');
  const answers=scenes.map(s=>{const choice=s.choices.find(c=>c.id===p.answers[s.id]);return {id:s.id,question:s.question,answer:p.answers[s.id]||'',answerLabels:[choice?.label||'—']}});
  if(answers.some(a=>!a.answer)){setError('Hikoyada javobsiz savol bor. Iltimos, to‘liq yakunlang.');setSubmitting(false);return}
  if(name.trim())answers.push({id:'visitor_name',question:'Ismi',answer:name.trim(),answerLabels:[name.trim()]});
  if(message.trim())answers.push({id:'visitor_message',question:'Otabekka savol yoki xabar',answer:message.trim(),answerLabels:[message.trim()]});
  answers.push({id:'ending',question:'Badiiy hikoya yakuni',answer:result.title,answerLabels:[result.title]});
  try{
   const response=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers,durationMs:Math.max(0,Math.min(3600000,Date.now()-(p.startedAt||Date.now()))),consent:true})});
   const data=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(data.message||'Telegramga yuborishda xatolik.');
   setReceipt(data.receipt||'');
   setP(x=>({...x,page:'done',sent:true}));
  }catch(e){setError(e instanceof Error?e.message:'Tarmoq xatoligi. Qayta urinib ko‘ring.')}
  finally{setSubmitting(false)}
 }
 return <main className={'app-shell secret-shell secret-'+(p.page==='story'?scene.mood:'night')}>
  <Ambient/>
  <header className="story-header">
   <div className="story-logo"><Sparkles size={17}/> SIRLI <em>INSON</em></div>
   <div className="story-header-tools"><span>{p.page==='story'?'BOB '+scene.chapter+' / 7':p.page==='intro'?'INTERAKTIV HIKOYA':'EPILOG'}</span><button type="button" onClick={()=>setMusic(x=>!x)} className="ghost-btn" aria-label={music?'Tovushni o‘chirish':'Tovushni yoqish'}>{music?<Volume2 size={17}/>:<VolumeX size={17}/>}</button></div>
  </header>
  {p.page==='intro'&&<section className="intro-shell story-intro"><div className="intro-card">
   <p className="kicker">BIR SHAHAR · IKKI QAHRAMON · SIZNING TANLOVINGIZ</p>
   <span className="story-emblem">✦</span>
   <h1>Ba'zi uchrashuvlar<br/><em>tasodif bo‘lmaydi.</em></h1>
   <p className="intro-copy">Telefoningizga kutilmagan xabar keladi. Siz esa voqealarning yo‘nalishini o‘zingiz tanlaysiz. 7 bob, 19 qaror va kutilmagan yakun. Bu savol-javob emas — siz bosh qahramon bo‘lgan kichik interaktiv film.</p>
   <div className="intro-rule"><span>7 bob</span><i/><span>19 tanlov</span><i/><span>5 xil yakun</span></div>
   <button className="primary-btn story-primary" onClick={()=>setP(x=>({...x,page:'story',startedAt:x.startedAt||Date.now()}))}>{p.startedAt?'Hikoyani davom ettirish':'Hikoyani boshlash'} <ArrowRight size={18}/></button>
   <p className="whisper consent-intro"><LockKeyhole size={13}/> Sizning javoblaringiz avtomatik yuborilmaydi. Faqat oxirida rozilik bersangiz, Otabekning Telegram botiga yuboriladi.</p>
  </div></section>}
  {p.page==='story'&&<>
   <div className="topbar story-topbar"><button className="ghost-btn" aria-label="Orqaga" onClick={()=>p.step===0?setP(x=>({...x,page:'intro'})):setP(x=>({...x,step:x.step-1}))}><ArrowLeft size={18}/></button><div className="progress-wrap"><div className="progress-meta"><span>{scene.chapterName}</span><span>{p.step+1} / {scenes.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:progress+'%'}}/></div></div><button className="ghost-btn story-restart" aria-label="Qaytadan boshlash" onClick={restart}><RotateCcw size={15}/></button></div>
   <section className="question-layout story-layout" key={scene.id}>
    <article className="question-card"><p className="eyebrow">{String(p.step+1).padStart(2,'0')} · {scene.chapter}-BOB · {scene.chapterName}</p>
     <h2>{scene.title}</h2><p className="question-description story-narrative">{scene.description}</p>
     <blockquote className="story-dialogue"><span>✦ SIRLI INSON</span><p>{scene.dialogue}</p></blockquote>
    </article>
    <aside className="story-choice-area"><p className="eyebrow">QAROR SIZDA</p><h3>{scene.question}</h3><div className="story-choice-list">
     {scene.choices.map((choice,i)=><button type="button" key={choice.id} className={'option-card story-choice '+(selected===choice.id?'selected':'')} onClick={()=>choose(choice.id)} aria-pressed={selected===choice.id}><span className="option-letter">{i+1}</span><span className="option-copy"><strong>{choice.label}</strong></span><span className="option-check">{selected===choice.id?<Check size={16}/>:<ArrowRight size={15}/>}</span></button>)}
    </div>{reaction&&<div className="story-reaction"><Sparkles size={16}/><span>{reaction}</span></div>}
    <button type="button" className="primary-btn story-primary story-next" onClick={next} disabled={!selected}>{p.step===scenes.length-1?'Yakuniy sahifa':'Davom etish'} <ArrowRight size={18}/></button></aside>
   </section>
  </>}
  {p.page==='reveal'&&<section className="reveal-section">
   <p className="kicker">SO‘NGGI SAHIFA · SIR OCHILADI</p><h1>Hikoyaning ikkinchi<br/><em>qahramoni...</em></h1>
   {!opened?<button className="story-envelope" onClick={()=>setOpened(true)} aria-label="Maktubni ochish"><span>💌</span><b>Sirli maktub</b><small>Ochish uchun bosing</small></button>:<div className="story-letter"><p>Bu hikoyada siz bilan birga bo‘lgan sirli inson...</p><h2>Otabek.</h2><p>Men kelajakni oldindan bilmayman. Balki shunchaki yaxshi suhbatdosh, balki do‘st bo‘lib qolarmiz. Muhimi — hech narsani shoshirmay, bir-birimizni hurmat bilan yaxshiroq tanishimiz.</p><span>— Otabek</span></div>}
   <div className="story-result"><span>HIKOYANGIZ YAKUNI</span><h3>{result.title}</h3><p>{result.text}</p><small>Bu faqat o‘yindagi qarorlarga mos badiiy yakun, haqiqiy his-tuyg‘ular haqidagi tashxis emas.</small></div>
   <div className="story-share"><h3>Hikoyangizni Otabek bilan bo‘lishasizmi?</h3><p>Bu ixtiyoriy. Rozilik bersangiz, 19 ta tanlovingiz, natijangiz va yozgan xabaringiz Otabekning shaxsiy Telegram botiga keladi.</p>
   <label htmlFor="visitor-name">Ismingiz <small>(ixtiyoriy)</small></label><input id="visitor-name" value={name} maxLength={40} placeholder="Ismingiz..." onChange={e=>setName(e.target.value)}/>
   <label htmlFor="visitor-message">Otabekka savol yoki xabar <small>(ixtiyoriy)</small></label><textarea id="visitor-message" value={message} maxLength={600} placeholder="Masalan: bu hikoyaning davomi qanday bo‘lishini xohlardingiz?" onChange={e=>setMessage(e.target.value)}/>
   <label className="story-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>19 ta tanlovim, natijam va yozganlarim Otabekning shaxsiy Telegram botiga yuborilishiga roziman. Rozilik bermasam hech narsa yuborilmaydi.</span></label>
   <button className="primary-btn story-primary" disabled={!consent||submitting} onClick={share}>{submitting?'Yuborilmoqda...':'Telegramga yuborish'} <Send size={17}/></button>
   {error&&<p className="error-text" role="alert">{error}</p>}
   <button className="story-skip" onClick={()=>setP(x=>({...x,page:'done',sent:false}))}>Yubormasdan yakunlash <ArrowRight size={15}/></button></div>
  </section>}
  {p.page==='done'&&<section className="done-shell story-done"><div className="done-card"><div className="done-icon">{p.sent?<Heart size={30}/>:<Moon size={30}/>}</div><p className="kicker">HIKOYA YAKUNLANDI</p><h1>{p.sent?'Rahmat,':'Har bir hikoya'}<br/><em>{p.sent?'hikoyadoshim.':'qadrli.'}</em></h1><p>{p.sent?'Javoblaringiz Telegram botga yuborildi. Bu hikoya sizdan hech qanday va’da yoki qaror kutmaydi.':'Hikoyani o‘zingizda saqlashni tanladingiz. Telegramga hech nima yuborilmadi.'}</p>{receipt&&<p className="story-receipt">Tasdiq: {receipt}</p>}<div className="signature">— Otabek</div><button className="primary-btn story-primary" onClick={restart}><RotateCcw size={17}/> Boshidan o‘ynash</button></div></section>}
  <footer className="story-brand-bottom"><span>BETWEEN US · 2026</span><span>THE STORY IS YOURS ✧</span></footer>
 </main>
}
