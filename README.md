# Sirli inson — interaktiv romantik hikoya ✦

**7 bob, 19 tanlov, 5 xil yakun.** Tanlovlarga qarab o‘zgaradigan sahnalar, tungi shahar, yomg‘ir, sirli maktub va yakunda Otabekning ismi ochiladi.

React + TypeScript + Vite + SCSS + Express + Zod + Telegram Bot API.

## Xususiyatlari

- Qiz haqiqiy interaktiv hikoyani boshqaradi.
- O‘yin joyini browser localStorage xotirasida saqlaydi, qayta ochganda davom ettirish mumkin.
- iPhone va kompyuter ekranlariga moslashgan, yumshoq animatsiyalar.
- Hikoyaning oxirida **rozilik** bilan ism, barcha 19 ta javob, natija va ixtiyoriy shaxsiy xabar botga yuboriladi.
- Yubormasdan yakunlash ham mumkin; javoblar yashirincha Telegramga ketmaydi.
- Token faqat serverdagi environment variables’da turadi.
- Rate-limit, Helmet, Zod tekshiruvlari va Telegram HTML escaping.

## Lokal ishga tushirish

Node.js 20.19+ yoki 22.

~~~bash
npm install
cp .env.example .env
npm run dev
~~~

Frontend: http://localhost:5173  
Backend: http://localhost:3001/api/health

~~~bash
npm run typecheck
npm run build
npm start
~~~

## Render'da bepul ishga tushirish

Railway’da yana xarajat chiqarmaslik uchun **render.yaml** blueprinti tayyor.

1. Render akkauntini GitHub bilan ulang.
2. Repo: **Azamov-Otabek/Message**, branch: **sirli-inson**.
3. Blueprint yoki Web Service yarating. **Free** planni tanlang.
4. Build: npm install --no-audit --no-fund && npm run build
5. Start: npm start
6. Environment variablesni serverda kiriting:

~~~env
NODE_ENV=production
TELEGRAM_BOT_TOKEN=BotFather orqali olgan yangi tokeningiz
TELEGRAM_CHAT_ID=shaxsiy Telegram chat ID
~~~

Botga avval /start yuboring. Tokenni GitHubga, frontend kodiga yoki suhbatga kiritmang. Oldin chatda tarqalgan tokenni BotFather yordamida yangilang.

Healthcheck: /api/health. Bu manzil telegramConfigured: true desa, muhit o‘zgaruvchilari kiritilganini bildiradi; haqiqiy yetkazish sinovi uchun o‘yinning oxirida yuborib ko‘rish kerak.

Render Free servis 15 daqiqa faolsiz qolsa uyquga ketishi mumkin. Ilk so‘rovda qayta ishga tushishi vaqt oladi. Free limitlardan oshganda karta bog‘langan hisoblar pullanishi mumkin; limitlarni nazorat qiling.

Railway deploy fayli qolgan, biroq to‘lovni qayta boshlamaslik uchun servislarni avtomatik yoqmang.

## Loyihaning muhim fayllari

- src/story.ts — boblar va variantlar.
- src/App.tsx — o‘yinning interfeysi, progress, rozilik va yakun.
- src/story-extra.scss — dizayn va mobillik.
- server/index.ts — Telegramga yuboruvchi Express API.
- render.yaml — bepul deploy rejasi.

## Maxfiylik

Javoblar faqat oxirida odam ongli ravishda rozilik berganidan keyin yuboriladi. Yuborishni rad qilish mumkin. Natijalar psixologik tashxis emas.

© 2026 Otabek
