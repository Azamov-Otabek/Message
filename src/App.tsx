import { useEffect, useLayoutEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Heart, LockKeyhole, Moon, Send, Sparkles, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { scenes, getScene, ending, type AnswerMap } from './story';
import './story-extra.scss';

type Page='intro'|'story'|'reveal'|'done';
type Progress={page:Page;step:number;answers:AnswerMap;startedAt:number;sent:boolean};
const key='sirli-inson-story-v3';
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
 useEffect(()=>{localStorage.setItem(key,JSON.stringify(p));document.title='Sirli inson · Xo‘sh, keyinchi? 😄'},[p]);
 // Every selected decision and every scene change starts at the very top,
 // including on mobile Safari where smooth scrolling can finish too late.
 useLayoutEffect(()=>{
  window.scrollTo({top:0,left:0,behavior:'instant' as ScrollBehavior});
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
 },[p.page,p.step,selected]);
 function choose(id:string){setP(x=>({...x,answers:{...x.answers,[scene.id]:id}}));if(music)clickNote()}
 function next(){
  if(!selected)return;
  if(p.step<scenes.length-1){setP(x=>({...x,step:x.step+1}))}
  else {setP(x=>({...x,page:'reveal'}))}
 }
 function restart(){
  if(!window.confirm('O‘yinni boshidan boshlaymizmi?'))return;
  setP(fresh);setOpened(false);setName('');setMessage('');setConsent(false);setError('');setReceipt('');localStorage.removeItem(key);
 }
 async function share(){
  if(!consent||submitting||p.sent)return;
  setSubmitting(true);setError('');
  const answers=scenes.map(s=>{const choice=s.choices.find(c=>c.id===p.answers[s.id]);return {id:s.id,question:s.question,answer:p.answers[s.id]||'',answerLabels:[choice?.label||'—']}});
  if(answers.some(a=>!a.answer)){setError('Bitta-ikkita savol qolib ketgan. Hammasini belgilab chiq.');setSubmitting(false);return}
  if(name.trim())answers.push({id:'visitor_name',question:'Ismi',answer:name.trim(),answerLabels:[name.trim()]});
  if(message.trim())answers.push({id:'visitor_message',question:'Otabekka savol yoki xabar',answer:message.trim(),answerLabels:[message.trim()]});
  answers.push({id:'ending',question:'O‘yin yakuni',answer:result.title,answerLabels:[result.title]});
  try{
   const response=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({answers,durationMs:Math.max(0,Math.min(3600000,Date.now()-(p.startedAt||Date.now()))),consent:true})});
   const data=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(data.message||'Telegramga yuborishda xatolik.');
   setReceipt(data.receipt||'');
   setP(x=>({...x,page:'done',sent:true}));
  }catch(e){setError(e instanceof Error?e.message:'Internetda muammo bor shekilli. Yana urinib ko‘r.')}
  finally{setSubmitting(false)}
 }
 return <main className={'app-shell secret-shell secret-'+(p.page==='story'?scene.mood:'night')}>
  <Ambient/>
  <header className="story-header">
   <div className="story-logo"><Sparkles size={17}/> SIRLI <em>INSON</em></div>
   <div className="story-header-tools"><span>{p.page==='story'?'BOB '+scene.chapter+' / 7':p.page==='intro'?'INTERAKTIV O‘YIN':'OXIRI'}</span><button type="button" onClick={()=>setMusic(x=>!x)} className="ghost-btn" aria-label={music?'Tovushni o‘chirish':'Tovushni yoqish'}>{music?<Volume2 size={17}/>:<VolumeX size={17}/>}</button></div>
  </header>
  {p.page==='intro'&&<section className="intro-shell story-intro"><div className="intro-card">
   <p className="kicker">BIRTA LINK · 19 TA TANLOV · BIRTA SIR</p>
   <span className="story-emblem">✦</span>
   <h1>Qara, bitta o‘yin bor.<br/><em>O‘ynab ko‘ramizmi? 😏</em></h1>
   <p className="intro-copy">Telefonga notanish odamdan xabar keladi. Keyin nima bo‘lishini o‘zing hal qilasan: qayerga borasizlar, nima gaplashasizlar, hatto yomg‘irda nima qilishinggacha 😂 Oxirida bitta sir ham bor.</p>
   <div className="intro-rule"><span>7 qism</span><i/><span>19 savol</span><i/><span>5 xil yakun</span></div>
   <button className="primary-btn story-primary" onClick={()=>setP(x=>({...x,page:'story',startedAt:x.startedAt||Date.now()}))}>{p.startedAt?'Davom etamiz':'Boshladik 😎'} <ArrowRight size={18}/></button>
   <p className="whisper consent-intro"><LockKeyhole size={13}/> Javoblaring yashirincha hech kimga ketmaydi. Faqat oxirida o‘zing ruxsat bersang, Otabekning Telegramiga yuboriladi.</p>
  </div></section>}
  {p.page==='story'&&<>
   <div className="topbar story-topbar"><button className="ghost-btn" aria-label="Orqaga" onClick={()=>p.step===0?setP(x=>({...x,page:'intro'})):setP(x=>({...x,step:x.step-1}))}><ArrowLeft size={18}/></button><div className="progress-wrap"><div className="progress-meta"><span>{scene.chapterName}</span><span>{p.step+1} / {scenes.length}</span></div><div className="progress-track"><div className="progress-fill" style={{width:progress+'%'}}/></div></div><button className="ghost-btn story-restart" aria-label="Qaytadan boshlash" onClick={restart}><RotateCcw size={15}/></button></div>
   <section className="question-layout story-layout" key={scene.id}>
    <article className="question-card"><p className="eyebrow">{String(p.step+1).padStart(2,'0')} · {scene.chapter}-BOB · {scene.chapterName}</p>
     <h2>{scene.title}</h2><p className="question-description story-narrative">{scene.description}</p>
     <blockquote className="story-dialogue"><span>✦ SIRLI INSON</span><p>{scene.dialogue}</p></blockquote>
    </article>
    <aside className="story-choice-area"><p className="eyebrow">O‘ZING TANLA 👇</p><h3>{scene.question}</h3><div className="story-choice-list">
     {scene.choices.map((choice,i)=><button type="button" key={choice.id} className={'option-card story-choice '+(selected===choice.id?'selected':'')} onClick={()=>choose(choice.id)} aria-pressed={selected===choice.id}><span className="option-letter">{i+1}</span><span className="option-copy"><strong>{choice.label}</strong></span><span className="option-check">{selected===choice.id?<Check size={16}/>:<ArrowRight size={15}/>}</span></button>)}
    </div>{reaction&&<div className="story-reaction"><Sparkles size={16}/><span>{reaction}</span></div>}
    <button type="button" className="primary-btn story-primary story-next" onClick={next} disabled={!selected}>{p.step===scenes.length-1?'Oxirgi qism 😏':'Keyingisi →'} <ArrowRight size={18}/></button></aside>
   </section>
  </>}
  {p.page==='reveal'&&<section className="reveal-section">
   <p className="kicker">OXIRIGA HAM YETDIK 😅</p><h1>Xo‘sh, sirli yigit<br/><em>kim ekan? 👀</em></h1>
   {!opened?<button className="story-envelope" onClick={()=>setOpened(true)} aria-label="Maktubni ochish"><span>💌</span><b>Bitta sir bor</b><small>Ko‘rish uchun bos</small></button>:<div className="story-letter"><p>Shuncha vaqt gaplashib kelgan sirli yigit aslida...</p><h2>Otabek.</h2><p>Ha, shu o‘yinni senga men tayyorladim 😅 Shunchaki sen bilan sal boshqacharoq, qiziqroq gaplashgim keldi. Hech qanday bosim yo‘q. Qolganini o‘zimiz bilib olamiz.</p><span>— Otabek</span></div>}
   <div className="story-result"><span>O‘YINDAGI NATIJANG</span><h3>{result.title}</h3><p>{result.text}</p><small>Bu shunchaki o‘yindagi tanlovlaringga mos natija. Hislaringni o‘yin hal qilmaydi.</small></div>
   <div className="story-share"><h3>Javoblaringni menga yuborasanmi? 📩</h3><p>Agar xohlasang, 19 ta javobing, o‘yin natijang va yozgan xabaring Telegramimga keladi. Xohlamasang — shunchaki chiqib ketaverasan, muammo yo‘q.</p>
   <label htmlFor="visitor-name">Isming <small>(xohlasang)</small></label><input type="text" id="visitor-name" value={name} maxLength={40} placeholder="Isming..." onChange={e=>setName(e.target.value)}/>
   <label htmlFor="visitor-message">Menga bitta gap yoki savol qoldir <small>(xohlasang)</small></label><textarea id="visitor-message" value={message} maxLength={600} placeholder="Masalan: bu o‘yinni qayerdan topding? 😂" onChange={e=>setMessage(e.target.value)}/>
   <label className="story-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>19 ta javobim, natijam va yozgan xabarim Otabekning shaxsiy Telegram botiga yuborilishiga roziman. Belgilamasam, hech narsa yuborilmaydi.</span></label>
   <button className="primary-btn story-primary" disabled={!consent||submitting} onClick={share}>{submitting?'Yuborilmoqda...':'Javoblarni yuborish 📩'} <Send size={17}/></button>
   {error&&<p className="error-text" role="alert">{error}</p>}
   <button className="story-skip" onClick={()=>setP(x=>({...x,page:'done',sent:false}))}>Yubormay chiqish <ArrowRight size={15}/></button></div>
  </section>}
  {p.page==='done'&&<section className="done-shell story-done"><div className="done-card"><div className="done-icon">{p.sent?<Heart size={30}/>:<Moon size={30}/>}</div><p className="kicker">BO‘LDI, O‘YIN TUGADI</p><h1>{p.sent?'Zo‘r, rahmat!':'Bo‘ldi, gap yo‘q!'}<br/><em>{p.sent?'Xabaring keldi 😄':'Keyin ko‘rishamiz 👋'}</em></h1><p>{p.sent?'Javoblaring Telegramga yuborildi. Endi shunchaki gaplashib yuramiz, hech qanday majburiyat yo‘q.':'Mayli, o‘yinni o‘zingda qoldirding. Telegramga hech nima yuborilmadi.'}</p>{receipt&&<p className="story-receipt">Tasdiq: {receipt}</p>}<div className="signature">— Otabek</div><button className="primary-btn story-primary" onClick={restart}><RotateCcw size={17}/> Yana boshidan o‘ynash</button></div></section>}
  <footer className="story-brand-bottom"><span>BETWEEN US · 2026</span><span>SHUNCHAKI O‘YIN 😄</span></footer>
 </main>
}
