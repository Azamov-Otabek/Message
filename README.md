# Message ✦

Yangi tanishuvni bosimsiz, samimiy va hurmatli kichik interaktiv tajribaga aylantiradigan private-style questionnaire.

## G‘oya

Sayt qizga link sifatida yuboriladi. Maqsad uni munosabatga undash emas, bir-birini yaxshiroq tushunish: bu do‘stlik, yaqinlik yoki shunchaki yaxshi tanishuv bo‘lib qolishi mumkin. U 13 ta turli formatdagi savolga javob beradi: variantlar, multi-select, 0–10 slider va erkin matn. Javoblar backend orqali egasining Telegram botiga yuboriladi.

Dizayn: qora / warm white / champagne gold, sokin premium va biroz sirli. Yorqin romantik gradientlar yo‘q.

## Stack

- React + TypeScript + Vite
- SCSS
- Node.js + Express
- Zod validation
- Helmet + rate limiting
- Telegram Bot API
- Railway deploy

## Lokal ishga tushirish

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3001`

Vite development vaqtida `/api` so‘rovlarini backendga proxy qiladi.

## Telegram sozlash

1. Telegram’da `@BotFather` orqali bot oching.
2. Bot tokenni oling.
3. Botga o‘zingiz bir marta xabar yozing.
4. `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` qiymatlarini Railway Variables ichida saqlang.

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

Token hech qachon frontendga yoki GitHub repo ichiga yozilmasligi kerak.

## API

### GET /api/health

Server va Telegram konfiguratsiyasi holatini qaytaradi.

### POST /api/submit

Savol-javoblarni validatsiya qiladi va Telegram’ga formatlangan xabar yuboradi.

Backend IP yoki yashirin tracking ma’lumotlarini yig‘maydi.

## Production

Railway `railway.json` orqali:

```bash
npm run build
npm start
```

Healthcheck: `/api/health`

Frontend production’da Express tomonidan bir domen ichida serve qilinadi.

## Savollarni o‘zgartirish

Barcha savollar:

```
src/questions.ts
```

Telegramdagi ko‘rinish:

```
server/index.ts
```

## Muallif

Otabek Azamov
