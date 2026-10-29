export type Mood = 'night' | 'cafe' | 'rain' | 'garden' | 'sky' | 'letter';
export type Choice = { id: string; label: string; reply: string };
export type Scene = { id:string; chapter:number; chapterName:string; title:string; description:string; dialogue:string; question:string; mood:Mood; choices:Choice[] };
export type AnswerMap = Record<string,string>;
const c=(id:string,label:string,reply:string):Choice=>({id,label,reply});

export const scenes:Scene[]=[
{ id:'invitation',chapter:1,chapterName:'Tasodif',title:'Bir xabar. Ming xil ehtimol.',mood:'night',
 description:'Oddiy oqshom. Telefoningiz ekranida kutilmagan xabar yonadi. Bu haqiqiy uchrashuv emas, siz tanlovlar orqali boshqaradigan badiiy hikoya.',
 dialogue:'«Salom. Bugun shahar chiroyli ko‘rinyapti. Birgalikda kichkina sarguzashtni tasavvur qilamizmi?»',
 question:'Bu xabarga qanday javob yozardingiz?',
 choices:[c('funny','«Kim ekan bu sirli inson? 😂»','«To‘g‘ri savol! Hikoyamiz davomida bilib olasiz.»'),c('know','«Avval biroz tanishib olaylik.»','«Albatta. Shoshilishga hojat yo‘q.»'),c('where','«Qayerga boramiz? 👀»','«Buni siz tanlaysiz!»'),c('later','«Hozir emas, balki keyinroq.»','«Hamma narsaning o‘z vaqti bor.»')]},
{ id:'message',chapter:1,chapterName:'Tasodif',title:'Ilk suhbat',mood:'night',
 description:'Telefon ekranidagi suhbat davom etadi. Sirli inson sizni yaxshiroq bilish uchun birinchi savolni berish huquqini sizga qoldiradi.',
 dialogue:'«Faqat bitta savol berish imkoningiz bo‘lsa, nimani so‘rardingiz?»',question:'Qaysi savolni tanlaysiz?',
 choices:[c('intent','«Nega aynan men bilan gaplashmoqchisiz?»','«Siz bilan suhbat qiziq tuyuldi.»'),c('joke','«O‘zingiz haqingizda kulgili fakt ayting.»','«Bir kuni juda jiddiy turmoqchi bo‘lib o‘zim kulib yuborganman.»'),c('dream','«Eng katta orzuingiz nima?»','«Yaxshi insonlar bilan chiroyli xotiralar yaratish.»'),c('you','«Avval siz gapiring.»','«Menga samimiylik yoqadi. Sizchi?»')]},
{ id:'place',chapter:2,chapterName:'Ilk manzara',title:'Manzilni siz tanlaysiz',mood:'night',
 description:'Tasavvuriy hikoyamizning birinchi manzarasi sizning didingizga qarab o‘zgaradi.',dialogue:'«Qayerda gaplashsak o‘zimizni erkinroq his qilardik?»',question:'Birinchi suhbat uchun qaysi joy?',
 choices:[c('cafe','☕ Deraza yonidagi shinam kafe','Kofe hidi va sokin suhbat.'),c('walk','🌃 Kechki shahar bo‘ylab sayr','Chiroqlar va shoshmasdan tashlangan qadamlar.'),c('music','🎹 Jonli musiqa ostidagi oqshom','Pianinoning mayin notalari yangraydi.'),c('garden','🌿 Sokin bog‘dagi sayr','Shamol va yaproqlarning mayin shiviri.')]},
{ id:'hello',chapter:2,chapterName:'Ilk manzara',title:'Nihoyat, ikki qahramon',mood:'cafe',
 description:'Siz tanlagan manzarada ikki qahramon uchrashadi. Sirli inson sizni samimiy qarshi oladi.',dialogue:'«Eng yaxshi uchrashuv — o‘zingizni qulay his qiladigan joyda bo‘ladigan uchrashuv.»',question:'Birinchi daqiqada nimaga e’tibor berasiz?',
 choices:[c('eyes','👀 Nigohi va samimiyligiga','«Ko‘zlar ham gapiradi, shundaymi?»'),c('humor','😄 Hazilkashligiga','«Unda bugun juda jiddiy bo‘lmaslikka harakat qilaman.»'),c('respect','🤝 Muomalasi va hurmatiga','«Bir-birimizni tinglashdan boshlaymiz.»'),c('calm','🌙 Yonida qanchalik xotirjamligimga','«O‘zingizni erkin his qilishingiz muhim.»')]},
{ id:'icebreaker',chapter:2,chapterName:'Ilk manzara',title:'Bitta savol hammasini o‘zgartiradi',mood:'cafe',
 description:'Suhbat qizg‘in tus oladi. Sirli inson sizning tanlovingizga ko‘ra mavzuni ochadi.',dialogue:'«Bugun biror narsadan tortinmang. Savolni siz tanlang.»',question:'Qaysi mavzuda suhbatlashasiz?',
 choices:[c('childhood','📖 Bolalikdagi eng yaxshi xotira','«Bolalik odamni boshqa ko‘z bilan tanitadi.»'),c('travel','✈️ Orzu qilgan sayohat','«Yangi shahar, yangi xotiralar...»'),c('funny','😂 Eng kulgili voqea','«Mayli, lekin ustimdan kulmaysiz-a?»'),c('values','💫 Hayotdagi qadriyatlar','«Va’daga sodiq qolish men uchun muhim.»')]},
{ id:'smalltalk',chapter:3,chapterName:'Kutilmagan oqshom',title:'Mayda baxtlar siri',mood:'cafe',
 description:'Suhbat o‘rtasida sirli inson kutilmagan kichkina savol beradi.',dialogue:'«Oddiy kundan ham bayram yasaydigan narsa nima?»',question:'Sizni nima ko‘proq quvontiradi?',
 choices:[c('flowers','🌸 Kutilmagan gullar','«Kichik e’tibor ham baxt beradi.»'),c('jokes','😆 Kuldiradigan xabar','«Demak, hazilni yo‘qotmaymiz.»'),c('time','☕ Vaqt ajratib suhbatlashish','«Vaqt — qimmatli sovg‘a.»'),c('peace','🌿 Xotirjam vaqt','«Sokinlik ham go‘zal.»')]},
{ id:'challenge',chapter:3,chapterName:'Kutilmagan oqshom',title:'Kutilmagan shart',mood:'cafe',
 description:'Sirli inson kulib, kichik o‘yin taklif qiladi.',dialogue:'«Kim birinchi kulib yuborsa, ikkinchisining savoliga javob beradi. Kelishdikmi?»',question:'Nima deysiz?',
 choices:[c('deal','😂 «Kelishdik, lekin men yutaman!»','«Unda men mag‘lubiyatga tayyorman.»'),c('trap','👀 «Bu qanday tuzoq?»','«Faqat tabassum tuzog‘i!»'),c('quiet','🌙 «Shunchaki suhbatlashaylik.»','«Siz qanday xohlasangiz shunday.»'),c('reverse','✨ «Birinchi savol meniki.»','«Mikrofon sizda!»')]},
{ id:'rain',chapter:3,chapterName:'Kutilmagan oqshom',title:'Birdan yomg‘ir yog‘di',mood:'rain',
 description:'Shaharning iliq chiroqlari yomg‘ir tomchilarida yaltiraydi. Qo‘lda esa bittagina soyabon.',dialogue:'«Rejissyor hikoyamizga yomg‘ir qo‘shib yuboribdi.»',question:'Qaysi sahnani tanlaysiz?',
 choices:[c('umbrella','☂️ Soyabon ostida sekin yurish','Ikki qahramon bir soyabon ostida yuradi.'),c('run','🏃 Yomg‘irdan qochib yugurish','Ikkalasi ham kulib yuguradi.'),c('wait','☕ Ichkarida kutish','Derazaga urilgan tomchilar musiqa bo‘ladi.'),c('taxi','🚕 Qulay joyga ketish','Qulaylik ham chiroyli qaror.')]},
{ id:'oops',chapter:3,chapterName:'Kutilmagan oqshom',title:'Va birdan... 😂',mood:'rain',
 description:'Sirli inson bexosdan ko‘lmakka oyoq bosadi! Hech kim jarohatlanmaydi, ammo kulgini to‘xtatish qiyin.',dialogue:'«Aftidan, bu oqshomning eng qahramonona sahnasi bo‘ldi.»',question:'Qanday javob berardingiz?',
 choices:[c('laugh','😂 «Qaytadan takrorlaysizmi?»','«Faqat boshqa tufli bilan!»'),c('help','🤍 «Hammasi joyidami?»','«Rahmat, hammasi yaxshi.»'),c('warn','😏 «Aytdim-ku, ehtiyot bo‘ling deb!»','«Endi maslahatni tinglayman.»'),c('both','🤣 «Kulganimdan o‘zim ham yiqilaman!»','Ikki qahramon birga kuladi.')]},
{ id:'memory',chapter:4,chapterName:'Chin suhbat',title:'Esda qoladigan lahza',mood:'night',
 description:'Yomg‘ir asta-sekin to‘xtaydi. Oqshom esa davom etadi.',dialogue:'«Shu oqshomdan bitta xotira qoldirsak, qaysi bo‘lsin?»',question:'Siz nima deb javob berasiz?',
 choices:[c('talk','💬 Samimiy suhbat','«Suhbatlar odamlarni yaqinlashtiradi.»'),c('laugh','😄 Birga kulganimiz','«Demak, yomg‘ir behuda yog‘mabdi!»'),c('view','🌆 Shahar manzarasi','«Chiroyli manzaralar unutilmaydi.»'),c('freedom','🌿 O‘zimni erkin his qilganim','«Bundan ortiq nima kerak?»')]},
{ id:'silence',chapter:4,chapterName:'Chin suhbat',title:'Sukut ham suhbatdir',mood:'sky',
 description:'Bir necha soniya jimlik. Lekin bu noqulay sukut emas.',dialogue:'«Ba’zan birga jim o‘tirish ham yaxshi, to‘g‘rimi?»',question:'Siz qanday o‘ylaysiz?',
 choices:[c('comfort','🌙 Yaqin odam bilan sukut yoqimli','«Ba’zi lahzalar so‘zsiz ham tushunarli.»'),c('talk','💬 Suhbatni davom ettiraman','«Unda savol sizdan!»'),c('joke','😂 Sukutni hazil bilan buzaman','«Buni kutgandim!»'),c('depends','🍃 Kayfiyatimga bog‘liq','«Bu ham tabiiy.»')]},
{ id:'skyline',chapter:4,chapterName:'Chin suhbat',title:'Shahar chiroqlari ortidagi orzular',mood:'sky',
 description:'Siz manzaraga qarab turibsiz, suhbat biroz chuqurlashadi.',dialogue:'«Kelajakdan eng ko‘p nimani kutasiz?»',question:'Qaysi javob sizga yaqin?',
 choices:[c('peace','🕊️ Baxtli va xotirjam kunlar','«Xotirjamlik bebaho.»'),c('growth','🚀 Katta yutuqlar','«Orzular uchun harakat qilamiz.»'),c('family','❤️ Yaqinlarim bilan yaxshi lahzalar','«Eng qimmat xotiralar odamlar bilan.»'),c('freedom','🌍 Erkinlik va sarguzashtlar','«Yangi kun — yangi sahifa.»')]},
{ id:'values',chapter:5,chapterName:'Qarorlar',title:'Eng muhim qadriyat',mood:'sky',
 description:'Hikoya endi ikki inson o‘rtasidagi ishonch haqida.',dialogue:'«Har qanday yaqin munosabatda siz uchun nima eng muhim?»',question:'Bittasini tanlash kerak bo‘lsa...',
 choices:[c('trust','🤝 Ishonch','«Ishonchning o‘rni bo‘lakcha.»'),c('honesty','✨ Rostgo‘ylik','«Rost gap har doim qadrlidir.»'),c('respect','🌿 O‘zaro hurmat','«Hurmatdan boshlaymiz.»'),c('joy','☀️ Bir-birini quvontirish','«Tabassum ham muhim.»')]},
{ id:'busy',chapter:5,chapterName:'Qarorlar',title:'Vaqt kam bo‘lib qolsa...',mood:'garden',
 description:'Tasavvur qiling: sizga yaqin inson ish bilan band va bir necha kundir kamroq vaqt ajratmoqda.',dialogue:'«Bunday paytda bir-birimizni qanday tushunsak bo‘ladi?»',question:'Siz nima qilardingiz?',
 choices:[c('talk','💬 E’tibor kerakligini ochiq aytaman','«Ochiq suhbat aniqroq bo‘ladi.»'),c('understand','🫶 Vaziyatini tushunishga urinaman','«Tushunish ham e’tibor.»'),c('balance','⚖️ Birgalikda vaqt topamiz','«Yechimni birga izlaymiz.»'),c('space','🌿 Biroz masofa saqlayman','«O‘zingizga vaqt ajrating.»')]},
{ id:'conflict',chapter:5,chapterName:'Qarorlar',title:'Ikki xil fikr',mood:'garden',
 description:'Ikki qahramon bir masalada turlicha o‘ylab qoldi. Hech kim baqirmaydi.',dialogue:'«Bunday paytda qanday yo‘l tutgan yaxshi?»',question:'Qaysi yondashuvni tanlaysiz?',
 choices:[c('talk','🗣️ Shu zahoti tinchgina gaplashish','«Bir-birimizni eshitamiz.»'),c('pause','🌙 Keyinroq suhbatlashish','«Vaqt ham yordam beradi.»'),c('write','✉️ Avval yozib tushuntirish','«Ba’zan yozilgan fikr ravshanroq.»'),c('accept','🤝 Turli fikrni hurmat qilish','«Bir xil fikrda bo‘lish shart emas.»')]},
{ id:'boundaries',chapter:5,chapterName:'Qarorlar',title:'Shoshilmaslik ham tanlov',mood:'garden',
 description:'Sirli inson sizni yaxshiroq tanimoqchi, ammo sizga vaqt kerak. U shoshirmaydi.',dialogue:'«Qanday davom etishni o‘zingiz tanlang.»',question:'Qaysi fikr sizga yaqin?',
 choices:[c('slow','🌿 Shoshilmay tanishish','«Hammasining o‘z vaqti bor.»'),c('friend','🤝 Avval do‘stlik','«Do‘stlik ham chiroyli.»'),c('open','💫 Ochiq suhbatlashish','«Sizni tinglashni xohlayman.»'),c('unknown','🌙 Hozircha noma’lum','«Tanlovingizni hurmat qilaman.»')]},
{ id:'gift',chapter:6,chapterName:'Sirli maktub',title:'Stol ustida konvert',mood:'letter',
 description:'Oqshom yakunlanmoqda. Sirli inson sovg‘a emas, maktub uzatadi.',dialogue:'«Xohlasangiz o‘qing. Javob berishga majbur emassiz.»',question:'Nima qilardingiz?',
 choices:[c('now','💌 Shu yerda o‘qiyman','Konvert mayin shivirlab ochiladi.'),c('later','🌙 Keyinroq o‘qiyman','Maktub siz bilan qoladi.'),c('ask','👀 «Ichida nima yozilgan?»','«Faqat samimiy niyat.»'),c('decline','🍃 «Hozircha olmasam bo‘ladimi?»','«Albatta, muammo yo‘q.»')]},
{ id:'letter',chapter:6,chapterName:'Sirli maktub',title:'Maktubdagi satrlar',mood:'letter',
 description:'Xatdagi samimiy so‘zlar shoshilish yoki va’da talab qilmaydi.',dialogue:'«Men kelajak qanday bo‘lishini bilmayman. Balki do‘st, balki yaxshi suhbatdosh bo‘larmiz. Muhimi, bir-birimizni hurmat qilish.»',
 question:'Bu satrlardan keyin qanday tuyg‘u qoladi?',
 choices:[c('peace','🤍 Xotirjamlik','«Demak, hikoya o‘z vazifasini bajardi.»'),c('smile','😊 Iliq tabassum','«Tabassumning o‘zi ham baxt.»'),c('intrigue','👀 Davomini bilgim keldi','«Unda so‘nggi sahifaga o‘tamiz.»'),c('neutral','🌿 Oddiy yaxshi taassurot','«Oddiy yaxshilik ham qadrlidir.»')]},
{ id:'final',chapter:7,chapterName:'Davomi',title:'Oxirgi sahifani siz yozasiz',mood:'sky',
 description:'Oqshom tugayapti. Bu hikoyaning davomini haqiqiy hayotda davom ettirish shart emas.',dialogue:'«Bir-birimizni yaxshiroq tanishish haqidagi fikrga qanday qaraysiz?»',question:'Hikoyaga qanday yakun tanlaysiz?',
 choices:[c('continue','❤️ Yana suhbatlashib ko‘rish mumkin','«Yangi sahifa ochiq qoladi.»'),c('friends','🤝 Do‘st bo‘lib qolish mumkin','«Do‘stlik ham qadrli.»'),c('slow','🌙 Shoshmaylik, vaqt ko‘rsatadi','«Albatta, shoshmaymiz.»'),c('unknown','✨ Hozircha noma’lum qolsin','«Bu ham chiroyli tanlov.»')]}
];

export function getScene(index:number, answers:AnswerMap):Scene {
 const s=scenes[index];
 if(s.id==='hello'){
  const place=answers.place;
  if(place==='garden')return {...s,mood:'garden',description:'Shamol va yaproqlar orasida suhbat boshlanadi. Siz bog‘ni tanlagansiz.'};
  if(place==='walk')return {...s,mood:'night',description:'Shahar chiroqlari ostida sekin yurasiz. Siz sayrni tanlagansiz.'};
  if(place==='music')return {...s,mood:'sky',description:'Jonli pianino yangraydi. Siz musiqali oqshomni tanlagansiz.'};
 }
 if(s.id==='letter'&&answers.gift==='decline')return {...s,description:'Siz xatni olmaslikni tanladingiz. Sirli inson bu qarorni hurmat qiladi va shunchaki qisqa fikr aytadi.'};
 return s;
}
export function ending(answers:AnswerMap) {
 const f=answers.final;
 if(f==='friends')return {title:'Qadrli tanishuv',text:'Har bir tanishuv muhabbatga aylanishi shart emas. Do‘stlik ham qadrli.'};
 if(f==='slow')return {title:'Shoshilmasdan',text:'Eng yaxshi hikoyalar ba’zan shoshilmasdan yoziladi.'};
 if(f==='unknown')return {title:'Noma’lum sahifa',text:'Davomini vaqt ko‘rsatadi. Qanday bo‘lsa ham hurmat o‘zgarmaydi.'};
 const playful=['funny','joke','deal','run','laugh','both'].filter(id=>Object.values(answers).includes(id)).length;
 return playful>=2?{title:'Sarguzasht endi boshlanadi',text:'Kulgi bilan boshlangan hikoyalarning davomida ham ajoyib voqealar bo‘lishi mumkin.'}:{title:'Bu hali boshlanishi',text:'Ba’zan eng chiroyli hikoyalar oddiy suhbatlardan boshlanadi.'};
}
