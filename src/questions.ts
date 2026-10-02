export type QuestionType = "single" | "multi" | "scale" | "text";

export type Option = {
  value: string;
  label: string;
  hint?: string;
};

export type Question = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  type: QuestionType;
  options?: Option[];
  minLabel?: string;
  maxLabel?: string;
  placeholder?: string;
  optional?: boolean;
};

export const questions: Question[] = [
  {
    id: "first_impression",
    eyebrow: "01 · birinchi taassurot",
    title: "Hozircha meni qanday odam deb tasavvur qilyapsiz?",
    description: "Ko‘p o‘ylamang. Birinchi kelgan javob odatda eng qiziq javob bo‘ladi.",
    type: "single",
    options: [
      { value: "serious", label: "Jiddiy", hint: "Lekin ichida hazili ham bordek" },
      { value: "mysterious", label: "Biroz sirli", hint: "Hali to‘liq tushunmadim" },
      { value: "confident", label: "O‘ziga ishongan", hint: "Gapidan qaytmaydigandek" },
      { value: "kind", label: "Yaxshi ko‘ngilli", hint: "Tashqaridan qattiqroq ko‘rinsa ham" }
    ]
  },
  {
    id: "expectations",
    eyebrow: "02 · siz uchun muhim",
    title: "Sizga yaqin bo‘ladigan insonda nimalar muhim?",
    description: "Bu faqat sevgi haqida emas — do‘stlik va yaqinlikda ham siz uchun muhim bo‘lganlarini tanlang.",
    type: "multi",
    options: [
      { value: "respect", label: "Hurmat" },
      { value: "loyalty", label: "Sadoqat" },
      { value: "responsibility", label: "Mas’uliyat" },
      { value: "care", label: "G‘amxo‘rlik" },
      { value: "humor", label: "Hazil va yengillik" },
      { value: "honesty", label: "Ochiq gaplashish" },
      { value: "freedom", label: "Shaxsiy erkinlikni hurmat qilish" },
      { value: "protection", label: "Yonida o‘zingizni xavfsiz his qilish" }
    ]
  },
  {
    id: "trust_level",
    eyebrow: "03 · ishonch",
    title: "Menga hozir qanchalik ishonasiz?",
    description: "Bu baho emas. Shunchaki hozirgi nuqta.",
    type: "scale",
    minLabel: "Hali deyarli yo‘q",
    maxLabel: "Ancha ishonaman"
  },
  {
    id: "trust_builder",
    eyebrow: "04 · gapmi, amalmi?",
    title: "Sizda ishonchni nima ko‘proq uyg‘otadi?",
    type: "single",
    options: [
      { value: "words", label: "To‘g‘ri va ochiq gaplar" },
      { value: "actions", label: "Amal — gapdan ko‘ra muhim" },
      { value: "time", label: "Vaqt va barqarorlik" },
      { value: "all", label: "Uchalasining birligi" }
    ]
  },
  {
    id: "directness",
    eyebrow: "05 · kichik ogohlantirish",
    title: "Men ko‘p narsani ichimda saqlamay, ochiq aytishga harakat qilaman. Bu sizga qanday?",
    type: "single",
    options: [
      { value: "like", label: "Yoqadi", hint: "Nima bo‘lsa ham ochiq bo‘lsin" },
      { value: "soft", label: "Yoqadi, faqat yumshoqroq aytilsa" },
      { value: "depends", label: "Vaziyatga qarab" },
      { value: "hard", label: "Menga biroz qiyin bo‘lishi mumkin" }
    ]
  },
  {
    id: "conflict",
    eyebrow: "06 · kelishmovchilik",
    title: "Agar ikkimizning fikrimiz to‘g‘ri kelmasa, qaysi yo‘l sizga yaqin?",
    type: "single",
    options: [
      { value: "talk_now", label: "O‘sha zahoti tinch gaplashib olish" },
      { value: "pause", label: "Biroz vaqt berib, keyin gaplashish" },
      { value: "message", label: "Avval yozib tushuntirish osonroq" },
      { value: "depends", label: "Vaziyatga qarab" }
    ]
  },
  {
    id: "jealousy",
    eyebrow: "07 · chegaralar",
    title: "Rashk haqida fikringiz qaysisiga yaqin?",
    description: "Menga ishonch ham, chegarani bilish ham muhim.",
    type: "single",
    options: [
      { value: "little", label: "Ozroq rashk — befarq emasligini ko‘rsatadi" },
      { value: "trust", label: "Ishonch bo‘lsa, rashk kam bo‘lishi kerak" },
      { value: "boundaries", label: "Rashkdan ko‘ra aniq chegaralar muhim" },
      { value: "depends", label: "Hammasi vaziyat va sababga bog‘liq" }
    ]
  },
  {
    id: "date_invite",
    eyebrow: "08 · eng qiziq savol",
    title: "Agar bir kuni uchrashib, tinchgina gaplashishni taklif qilsam, kelarmidingiz?",
    description: "Bu taklif ham, va’da ham emas. Shunchaki bir-birimizni yaxshiroq bilish uchun.",
    type: "single",
    options: [
      { value: "yes", label: "Ha, borardim ✦" },
      { value: "public_place", label: "Ha, tinch va ochiq joy bo‘lsa" },
      { value: "later", label: "Avval yana biroz gaplashib olaylik" },
      { value: "not_ready", label: "Hozircha tayyor emasman" }
    ]
  },
  {
    id: "date_style",
    eyebrow: "09 · tasavvur qiling",
    title: "Birinchi uchrashuv uchun qaysi atmosfera sizga ko‘proq yoqadi?",
    type: "single",
    options: [
      { value: "coffee", label: "Kofe + uzoq suhbat" },
      { value: "walk", label: "Kechki sayr + sokin joy" },
      { value: "activity", label: "Biror qiziq faoliyat + kulgi" },
      { value: "surprise", label: "Joyni menga qoldiring — surprise" }
    ]
  },
  {
    id: "role",
    eyebrow: "10 · vaqt ko‘rsatadi",
    title: "Sizningcha, bu tanishuv qayerga borishi mumkin?",
    description: "Hech narsani hozir nomlash yoki va’da qilish shart emas.",
    type: "single",
    options: [
      { value: "friend", label: "Yaxshi do‘stlik bo‘lishi mumkin" },
      { value: "know_more", label: "Bir-birimizni yaqindan bilib ko‘rish mumkin" },
      { value: "close_person", label: "Vaqt o‘tib yaqin inson bo‘lib qolishimiz mumkin" },
      { value: "unknown", label: "Hech narsaga shoshmaylik — vaqt ko‘rsatadi" }
    ]
  },
  {
    id: "important_traits",
    eyebrow: "11 · xarakter",
    title: "Siz uchun yaqin insonda qaysi sifatlar bo‘lmasa bo‘lmaydi?",
    description: "Sizga eng yaqinlarini belgilang.",
    type: "multi",
    options: [
      { value: "fair", label: "Adolatli" },
      { value: "responsible", label: "Mas’uliyatli" },
      { value: "protective", label: "Himoya qila oladigan" },
      { value: "calm", label: "Vazmin" },
      { value: "ambitious", label: "Maqsadli" },
      { value: "family", label: "Oilani qadrlaydigan" },
      { value: "loyal", label: "Bir so‘zli / sodiq" },
      { value: "understanding", label: "Tushunishga harakat qiladigan" }
    ]
  },
  {
    id: "say_no",
    eyebrow: "12 · eng muhim joylardan biri",
    title: "Menda sizga yoqmagan narsa bo‘lsa, bemalol ochiq ayta olasizmi?",
    type: "single",
    options: [
      { value: "yes", label: "Ha, albatta" },
      { value: "try", label: "Harakat qilaman" },
      { value: "need_trust", label: "Ishonch ko‘paygach osonroq bo‘ladi" },
      { value: "hard", label: "Menga ochiq aytish qiyin" }
    ]
  },
  {
    id: "free_text",
    eyebrow: "13 · oxirgisi",
    title: "Menga hozir aytgingiz kelgan, lekin hali aytmagan bitta gap yoki savol bormi?",
    description: "Xohlasangiz bo‘sh qoldirishingiz mumkin.",
    type: "text",
    optional: true,
    placeholder: "Masalan: siz haqingizda bilmoqchi bo‘lgan narsam..."
  }
];

export const characterNotes: Record<number, { title: string; text: string }> = {
  3: {
    title: "Men haqimda bir detal",
    text: "Men uchun chiroyli gapdan ko‘ra, odamning qilgan amali ko‘proq narsani aytadi."
  },
  7: {
    title: "Yana bir detal",
    text: "Men uchun yaqinlikning nomidan ko‘ra, hurmat va ishonch muhimroq. Hech kimni biror hisga majburlashni xohlamayman."
  },
  10: {
    title: "Va yana...",
    text: "Men nohaqlikni yoqtirmayman. Kelishmovchilik bo‘lsa ham, bir-birini kamsitmay gaplashish tarafdoriman."
  }
};
