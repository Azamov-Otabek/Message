export type Mood = 'night' | 'cafe' | 'rain' | 'garden' | 'sky' | 'letter';
export type Choice = { id:string; label:string; reply:string };
export type Scene = {id:string; chapter:number; chapterName:string; title:string; description:string; dialogue:string; question:string; mood:Mood; choices:Choice[]};
export type AnswerMap = Record<string,string>;
const c=(id:string,label:string,reply:string):Choice=>({id,label,reply});
export const scenes:Scene[]=[
{id:'invitation',chapter:1,chapterName:'Noma’lumdan xabar',title:'Kim bu o‘zi? 👀',mood:'night',
description:'Kechqurun telefonda o‘tiribsan. Birdan notanish akkauntdan xabar keldi. Kimligini bilmaysan. Bu o‘yin, haqiqiy uchrashuvga rozilik degani emas.',
dialogue:'«Salom 😂 Bir o‘yin bor. 10 daqiqa vaqtin bo‘lsa, zo‘r narsa ko‘rsataman. Zerikmaysan, va’da!»',
question:'Nima deb javob berasan?',
choices:[c('funny','😂 «Avval kimligingni ayt-chi?»','«Ha, savol joyida. Hozircha sir bo‘lib turay 😅»'),c('know','«Nima o‘yin ekan, tushuntir.»','«O‘zing boshqaradigan bir hikoya. Ko‘rasan.»'),c('where','👀 «10 daqiqada nima bo‘larkan?»','«Hali boshida turibmiz-ku. Davom et!»'),c('later','«Hozir uncha vaqtim yo‘q.»','«Mayli, xohlagan payting davom ettirasan.»')]},
{id:'message',chapter:1,chapterName:'Noma’lumdan xabar',title:'Gapni qayerdan boshlaymiz?',mood:'night',
description:'Notanish odam birinchi bo‘lib yozdi. Endi navbat senda. Oddiy chatdagidek gap ketayapti.',
dialogue:'«Mayli, birinchi savol senda. Istagan narsangni so‘ra, faqat kartamning kodini emas 😂»',
question:'Nima so‘raysan?',
choices:[c('intent','«Menga nega yozding o‘zi?»','«Chunki sen bilan gaplashish qiziq bo‘lishi mumkin deb o‘yladim.»'),c('joke','😂 «O‘zing haqingda kulgili fakt ayt.»','«Bir marta to‘g‘ri manzilga borib ham adashganman 😭»'),c('dream','«Hayotdagi maqsading nima?»','«O‘zim yoqtirgan ishni qilib, bemalol yashash.»'),c('you','«Avval o‘zingni tanishtir.»','«Tinchroq odamman. Lekin hazil boshlansa, to‘xtatish qiyin 😅»')]},
{id:'place',chapter:2,chapterName:'Qayerga boramiz?',title:'Joyni sen tanla',mood:'night',
description:'Tasavvur qil: ikkoving ilk marta ko‘rishmoqchisanlar. Ochiq, odamlar bor joyda, bemalol gaplashadigan uchrashuv.',
dialogue:'«Qara, joyni o‘zing tanla. Men “qayerga desang o‘sha” deyadigan odamman 😁»',
question:'Birinchi uchrashuvga qayer yaxshi?',
choices:[c('cafe','☕ Kafe, kofe ichib gaplashamiz','«Zo‘r. Faqat menyuni 20 daqiqa tanlab o‘tirmaylik 😂»'),c('walk','🚶 Shaharda aylanamiz','«Gap bo‘lishi aniq. Qadam sanab ketmasak bo‘ldi.»'),c('music','🎵 Musiqa bor joyga boramiz','«Bo‘ldi, playlistni sen tanla.»'),c('garden','🌳 Parkda yursak bo‘ladi','«Toza havo, yaxshi gap — yetadi.»')]},
{id:'hello',chapter:2,chapterName:'Qayerga boramiz?',title:'Birinchi 5 daqiqa',mood:'cafe',
description:'Uchrashdinglar. Boshida ozgina tortinish bor, keyin gap sekin ochilyapti.',
dialogue:'«Nihoyat ko‘rishdik. Nima, tasavvuringdagidekmanmi yoki rasmdagidan boshqachamanmi? 😂»',
question:'Birinchi nimaga qaraysan?',
choices:[c('eyes','👀 Ko‘ziga, o‘zini tutishiga','«Qattiq tikilib ketma, hayajon bosadi 😁»'),c('humor','😄 Hazili bormi, yo‘qmi','«Bo‘ldi, unda bugun zerikish yo‘q.»'),c('respect','🤝 Muomalasi qandayligiga','«Gap to‘g‘ri. Hurmat birinchi o‘rinda.»'),c('calm','😌 Yonida o‘zimni qanday his qilishimga','«O‘zingni bemalol tut. Rol o‘ynash shartmas.»')]},
{id:'icebreaker',chapter:2,chapterName:'Qayerga boramiz?',title:'Gap tugab qolsa-chi?',mood:'cafe',
description:'Bir zum jimlik bo‘ldi. Sirli yigit telefonini chetga qo‘yib, gap boshladi.',
dialogue:'«Intervyuga kelmaganmiz-ku 😅 Qaysi mavzuda gaplashamiz?»',
question:'Senga qaysi suhbat yoqadi?',
choices:[c('childhood','😂 Bolalikdagi sharmandali voqealar','«Bu mavzuda menda material ko‘p, aytib qo‘yay.»'),c('travel','✈️ Borishni orzu qilgan joylar','«Mayli, bittamiz yo‘lni bilib yursa bo‘ldi 😂»'),c('funny','🤣 Memlar, prikollar, kulgili gaplar','«Bo‘ldi, jiddiy bo‘lish bugunga bekor.»'),c('values','💬 Odamlar, hayot, munosabatlar','«Unda rost gaplashamiz, bezaksiz.»')]},
{id:'smalltalk',chapter:3,chapterName:'Kutilmagan voqea',title:'Kichkina e’tibor',mood:'cafe',
description:'Ofitsiant kelib, «Yana nimadir olasizlarmi?» deb so‘radi. Yigit senga qaradi.',
dialogue:'«Qara, yaxshi kayfiyat uchun senga nima olib bersam bo‘ladi?»',
question:'Qaysi variant yoqadi?',
choices:[c('flowers','🌷 Guldasta bo‘lsa yomonmas','«Mayli, faqat gulni sendan katta qilib yubormayman 😂»'),c('jokes','😂 Hech narsa kerakmas, kuldirsang bo‘ldi','«Oson deyapsan-u, endi bosim menda 😄»'),c('time','☕ Shunchaki o‘tirib gaplashamiz','«Mana shu eng zo‘ri aslida.»'),c('peace','🍰 Biror shirinlik olib ber','«Desertga qarshi odam topilmasa kerak.»')]},
{id:'challenge',chapter:3,chapterName:'Kutilmagan voqea',title:'Keling, bitta o‘yin!',mood:'cafe',
description:'Gap qiziq ketayotganda yigit kulib yubordi. Keyin bitta taklif berdi.',
dialogue:'«3 ta fakt aytaman. Bittasi yolg‘on. Topolmasang, keyingi savolga javob berasan. O‘ynaymizmi?»',
question:'Nima deysan?',
choices:[c('deal','🔥 «O‘ynaymiz, yutqazmaysanmi?»','«Shuncha ishonch qayerdan? 😂»'),c('trap','🤨 «O‘zi qanday o‘yin bu?»','«Oddiy, faqat yutqazib qo‘ymasang bo‘ldi.»'),c('quiet','😌 «O‘yin shartmas, gaplashamiz.»','«Mayli. Suhbatning o‘zi yaxshi ketayapti.»'),c('reverse','😏 «Birinchi men savol beraman.»','«Vay, o‘yin endi boshlandi!»')]},
{id:'rain',chapter:3,chapterName:'Kutilmagan voqea',title:'E, yomg‘ir boshlangan-ku! ☔',mood:'rain',
description:'Tashqariga chiqsanglar, yomg‘ir yog‘ayapti. Rejada bunday gap yo‘q edi.',
dialogue:'«Ob-havoni tekshirmaganim aniq bo‘ldi 😂 Endi nima qilamiz?»',
question:'Sen nima taklif qilasan?',
choices:[c('umbrella','☂️ Soyabon bo‘lsa, aylanamiz','«Bitta soyabon topildi. Yomg‘irdan qo‘rqmas ekanmiz.»'),c('run','🏃 «Yuguramiz, kim oxirgi — yutqazdi!»','«Mayli, lekin sekinroq, tufli yangi 😭»'),c('wait','☕ Biror joyga kirib kutamiz','«To‘g‘ri, shamollab qolish shartmas.»'),c('taxi','🚕 Taksi chaqiramiz','«Zo‘r, qulaylik ham kerak.»')]},
{id:'oops',chapter:3,chapterName:'Kutilmagan voqea',title:'Yomg‘irning prikali 😂',mood:'rain',
description:'Sirli yigit kichkina ko‘lmakni ko‘rmay qoldi. Krossovkasi shalop etib suvga botdi. O‘zi ham kulib yubordi.',
dialogue:'«Ajoyib. Hozir bir oy shu voqeani eslatib yurasan, a? 😑😂»',
question:'Nima deb javob berasan?',
choices:[c('laugh','🤣 «Videoga olishim kerak ekan!»','«Yaxshiyam olmabsan, meme bo‘lib ketardim.»'),c('help','🤍 «Bo‘ldi, hech narsa qilmadi, yuraqol.»','«Rahmat, vaziyatdan qutqarding.»'),c('warn','😏 «Ehtiyot bo‘l dedim-ku!»','«Mayli, mayli, tan oldim 😂»'),c('both','😂 «Men bo‘lsam battar yiqilardim!»','«Unda ikkovimizga ham quruq yo‘l kerak.»')]},
{id:'memory',chapter:4,chapterName:'Bir-birimizni bilamiz',title:'Bugundan nimasi esda qoladi?',mood:'night',
description:'Yomg‘ir sekin to‘xtadi. Qarasang, o‘zing ham bilmay vaqt o‘tib ketibdi.',
dialogue:'«Bugun yomon o‘tmadi, to‘g‘rimi? Bir narsani eslab qolsang, nima bo‘lardi?»',
question:'Nimani tanlaysan?',
choices:[c('talk','💬 Rostdan gaplashganimizni','«Menga ham yolg‘on gaplarsiz suhbat yoqadi.»'),c('laugh','😂 Ko‘lmakdagi voqeani, albatta','«E, shu voqeani umrbod eslatasan shekilli 😭»'),c('view','📸 Birga tushgan rasmimizni','«Yaxshi chiqsin faqat, 50 ta dubldan keyin 😂»'),c('freedom','😌 O‘zimni erkin his qilganimni','«Mana shunaqa bo‘lsa, zo‘r.»')]},
{id:'silence',chapter:4,chapterName:'Bir-birimizni bilamiz',title:'Telefon jiringlasa...',mood:'sky',
description:'Gaplashib o‘tirgan paytda uning telefoni jiringladi. U qaradi-yu, ovozini o‘chirdi.',
dialogue:'«Hozir gaplashyapmiz-ku. Keyin o‘zim qo‘ng‘iroq qilaman.»',
question:'Bunaqa vaziyatda nima deb o‘ylaysan?',
choices:[c('comfort','😊 «E’tibor berayotgani yaxshi ekan.»','«Gaplashayotgan odamni tinglashga harakat qilaman.»'),c('talk','📱 «Muhim bo‘lsa javob beraver.»','«Rahmat. Shoshilinchmas ekan.»'),c('joke','😂 «Kim ekan, meni rashk qildirma?»','«Telefon kompaniyasidan bo‘lsa-chi? 😂»'),c('depends','🤷 «Kim qo‘ng‘iroq qilganiga bog‘liq.»','«To‘g‘ri, vaziyatga qaraladi.»')]},
{id:'skyline',chapter:4,chapterName:'Bir-birimizni bilamiz',title:'Bir kun bo‘sh bo‘lsa...',mood:'sky',
description:'Suhbat kelajakdagi rejalar haqida ketdi. Juda katta gaplar emas, oddiy hayot.',
dialogue:'«Bir kun hech qanday ish bo‘lmasa, nima qilarding?»',
question:'Qaysi reja sendan chiqadi?',
choices:[c('peace','😴 Rosa mazza qilib dam olaman','«Ha, ba’zida hech narsa qilmaslik ham reja.»'),c('growth','💻 Biror yangi narsa o‘rganaman','«Vaqtni zo‘r ishlatarkan-san.»'),c('family','❤️ Yaqinlarim bilan bo‘laman','«Oila uchun vaqt topish zo‘r.»'),c('freedom','🚗 Biror joyga ketib qolaman','«Shunchaki mashinaga o‘tirib ketish ham yoqadi.»')]},
{id:'values',chapter:5,chapterName:'Rost gap',title:'Munosabatda nima muhim?',mood:'sky',
description:'Endi biroz jiddiy savol. Lekin intervyu emas — shunchaki fikrlar.',
dialogue:'«Qara, senga yoqadigan odamda bitta narsa bo‘lishi shart bo‘lsa, nima bo‘lardi?»',
question:'Bittasini tanla:',
choices:[c('trust','🤝 Ishonsa bo‘ladigan odam bo‘lsin','«Ishonch bo‘lmasa, qiyin.»'),c('honesty','💬 Orqamdan emas, yuzimga gapirsin','«Rost gap ba’zan yoqmasa ham yaxshi.»'),c('respect','🫶 Hurmat qilishni bilsin','«Hurmat bo‘lsa, gaplashib olamiz.»'),c('joy','😂 Yonida zerikib qolmay','«Kulgi ham kerak-da.»')]},
{id:'busy',chapter:5,chapterName:'Rost gap',title:'Kech javob bersa-chi?',mood:'garden',
description:'Tasavvur qil: kecha zo‘r gaplashdinglar. Bugun esa u ish bilan band bo‘lib, ancha kech yozdi.',
dialogue:'«Uzr, ishlar chiqib qoldi. Endi bo‘shadim.»',
question:'Sening javobing qanday bo‘lardi?',
choices:[c('talk','💬 «Band bo‘lsang, aytib qo‘ysang bo‘lardi.»','«Ha, oldindan aytishim kerak edi.»'),c('understand','🙂 «Mayli, tushunaman.»','«Rahmat. O‘zingda nima gap?»'),c('balance','🕒 «Ikkalamizga qulay vaqt topamiz.»','«Yaxshi fikr, kelishib olamiz.»'),c('space','🌿 «Hozircha o‘zimning ishlarim bilan bo‘laman.»','«Mayli, o‘zingga vaqt ajrat.»')]},
{id:'conflict',chapter:5,chapterName:'Rost gap',title:'Fikrlar to‘g‘ri kelmasa?',mood:'garden',
description:'Bir mavzuda ikkoving har xil fikrdasanlar. Janjal yo‘q, lekin kim haq ekanini ham bilmayapsanlar.',
dialogue:'«Mayli, men boshqacha o‘ylayman. Lekin sening fikringni ham eshitaman.»',
question:'Nima qilasan?',
choices:[c('talk','🗣️ «Hozir gaplashib olaylik.»','«Bo‘ldi, bemalol ayt.»'),c('pause','😅 «Sal keyin gaplashamiz.»','«Xo‘p, sal tinchib olamiz.»'),c('write','📲 «Yaxshisi yozib tushuntiraman.»','«O‘qib chiqaman, mayli.»'),c('accept','🤝 «Har xil fikr bo‘lishi normal.»','«Ha, doim bir xil o‘ylash shartmas.»')]},
{id:'boundaries',chapter:5,chapterName:'Rost gap',title:'Qanaqa davom ettiramiz?',mood:'garden',
description:'U senga yana gaplashib turishni taklif qilmoqchi. Lekin qayergacha borishi haqida hech kim aniq bilmaydi.',
dialogue:'«Menga sen bilan gaplashish yoqdi. Lekin qanday davom etishi sening ham xohishingga bog‘liq.»',
question:'Qaysi javob senga yaqin?',
choices:[c('slow','🌿 «Shoshmasdan tanishamiz.»','«Mayli, shoshilmaymiz.»'),c('friend','🤝 «Avval do‘st bo‘lib gaplashamiz.»','«Bo‘ldi, bemalol.»'),c('open','💬 «Gaplashamiz, keyin ko‘ramiz.»','«Kelishdik.»'),c('unknown','🤷 «Hali bilmayman.»','«Bu ham javob. Majburlash yo‘q.»')]},
{id:'gift',chapter:6,chapterName:'Bitta sir bor',title:'Senga bitta narsa bor 📩',mood:'letter',
description:'Ketishdan oldin u telefonini olib, nimadir yozdi. Keyin ekranni senga uzatdi.',
dialogue:'«Senga bitta qisqa yozuv qoldirdim. Xohlasang o‘qi. Katta gap emas, xavotir olma 😅»',
question:'Nima deysan?',
choices:[c('now','👀 «Qani, hozir o‘qiyman.»','«Mayli, bemalol.»'),c('later','😌 «Uyga borgach o‘qiyman.»','«Bo‘ladi, qachon xohlasang.»'),c('ask','😂 «Sirli qilib yubording-ku, nima yozding?»','«O‘qi, keyin kulma faqat 😂»'),c('decline','🌿 «Hozir o‘qimasam ham bo‘ladimi?»','«Albatta. O‘zing bilasan.»')]},
{id:'letter',chapter:6,chapterName:'Bitta sir bor',title:'Yozgan gapi oddiy ekan',mood:'letter',
description:'Qisqagina yozuv chiqdi. Na she’r, na katta va’da. Shunchaki oddiy, rost gap.',
dialogue:'«Qara, sen bilan gaplashganim zo‘r bo‘ldi. Hamma narsani tezlashtirmoqchimasman. Yana gaplashsak, xursand bo‘laman. Yo‘q desang ham xafa bo‘lmayman.»',
question:'Bunga nima deb javob berarding?',
choices:[c('peace','🙂 «Yaxshi, tushunarli.»','«Bo‘ldi, ortiqcha drama yo‘q.»'),c('smile','😊 «Menga ham bugun yoqdi.»','«Rostdanmi? Zo‘r-ku!»'),c('intrigue','👀 «Sening kimligingni hali bilmayman-ku.»','«Ha, eng qiziq joyiga keldik...»'),c('neutral','🤷 «Ko‘ramiz, hozir hech narsa demayman.»','«Mayli, bemalol o‘ylab ko‘r.»')]},
{id:'final',chapter:7,chapterName:'Oxiri nima bo‘ladi?',title:'Xo‘sh, keyinchi? 😄',mood:'sky',
description:'O‘yin shu yerda tugayapti. Endi haqiqiy hayotda nima bo‘lishini oldindan aytish shartmas.',
dialogue:'«Yana gaplashib turamizmi? Yo‘q desang ham normal, gap yo‘q.»',
question:'Sening javobing?',
choices:[c('continue','❤️ «Ha, yana gaplashamiz.»','«Kelishdik, unda ko‘rishguncha!»'),c('friends','🤝 «Do‘st bo‘lib gaplashsak bo‘ladi.»','«Bo‘ladi, do‘stlik ham zo‘r.»'),c('slow','😌 «Hali shoshmaylik.»','«Xo‘p. Hech qayoqqa yugurmaymiz.»'),c('unknown','👀 «Hozir aniq javobim yo‘q.»','«Tushunarli, bosim yo‘q.»')]}
];
export function getScene(index:number,answers:AnswerMap):Scene {
 const s=scenes[index];
 if(!s) return scenes[0];
 if(s.id==='message'&&answers.invitation==='later')return {...s,description:'Keyinroq yana kirib, o‘yinni davom ettirding. U sening vaqtingni hurmat qildi.',dialogue:'«Hozir bo‘shadingmi? Senga bitta savol berish navbatini beraman 😄»'};
 if(s.id==='hello'){
  if(answers.place==='garden')return {...s,mood:'garden',description:'Parkda ochiq havoda ko‘rishdinglar. Dastlab sal tortindinglar, keyin gap ochildi.'};
  if(answers.place==='walk')return {...s,mood:'night',description:'Shaharda aylanib yuribsizlar. Qadam tashlagan sari gaplar ham ko‘payyapti.'};
  if(answers.place==='music')return {...s,mood:'sky',description:'Musiqa bor joyni tanlaganding. O‘tiribsanlar, yoningizda yaxshi qo‘shiq yangrayapti.'};
 }
 if(s.id==='smalltalk'&&answers.icebreaker==='funny')return {...s,description:'Memlardan gap ochilib, ikkoving rosa kuldinglar. Ofitsiant kelib yana nimadir olasizlarmi deb so‘radi.'};
 if(s.id==='oops'&&answers.rain==='wait')return {...s,description:'Yomg‘irni ichkarida kutib turibsizlar. Yigit tashqariga bir qadam chiqishi bilan krossovkasini ko‘lmakka botirib oldi 😂'};
 if(s.id==='oops'&&answers.rain==='taxi')return {...s,description:'Taksi kelguncha kutib turibsizlar. Yigit mashina tomonga yuguraman deb ko‘lmakka bosib oldi 😂'};
 if(s.id==='memory'&&answers.oops==='help')return {...s,dialogue:'«Vaziyatda kulmay, holatimni so‘rading. Rahmat. Bugundan bitta narsa esda qolsa, nima bo‘lardi?»'};
 if(s.id==='letter'&&answers.gift==='decline')return {...s,description:'Sen yozuvni hozir o‘qishni xohlamading. U buni qabul qildi va yozuv o‘rniga bir og‘iz oddiy gap aytdi.',dialogue:'«Mayli, o‘qimasang ham bo‘ladi. Gapim shuki: sen bilan gaplashish zo‘r. Yana suhbatlashsak xursand bo‘laman, xohlamasang ham tushunaman.»'};
 return s;
}
export function ending(answers:AnswerMap){
 const f=answers.final;
 if(f==='friends')return {title:'Do‘stlik ham zo‘r 🤝',text:'Senga do‘stona gaplashish qulayroq ekan. Shu ham yaxshi. Hech kim hech kimdan ortiqcha narsa kutmaydi.'};
 if(f==='slow')return {title:'Shoshmaymiz 😌',text:'Sekin-sekin tanishgan ham yaxshi. Hozir hech narsaga nom qo‘yish shartmas.'};
 if(f==='unknown')return {title:'Hali bilmadik 👀',text:'Hozir aniq javob yo‘q. Bu ham normal. Keyin nima bo‘lishini vaqt ko‘rsatadi.'};
 const playful=['funny','joke','deal','run','laugh','both'].filter(id=>Object.values(answers).includes(id)).length;
 return playful>=2?{title:'Kulgi hali tugamadi 😂',text:'Ssenariyda rosa kuldik. Real hayotda ham shunaqa oson gaplashib ketsak, zo‘r bo‘lardi.'}:{title:'Yana gaplashamizmi? ❤️',text:'O‘yin tugadi, lekin suhbat tugashi shartmas. Qolganini shoshmay ko‘ramiz.'};
}
