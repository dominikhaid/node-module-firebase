# Node.js Firebase Auth & Firestore API example

## Included Modules

- Morgan Logger
- XSS
- Fire-Admin
- Multer Upload Handler
- Bodypaser
- Jwt
- Cors
- Express
- Next.js
- mongoose
- Helmet
- .env

## Files And Folders

- server-config.json -> CORS, HELMET, JWT and some other options
- /public -> assets, next
- /log -> morgan server logs
- /src/bin -> basic server modules
- /src/includes -> express middelware
- /src/http/ -> http reuqests, api routes
- /src/pages/-> next.js pages
- /src/pages/api -> next.js api routes
- /data -> example data

## Use

1. yarn install
2. edit .env //config firebase
3. npm run data //add the sample data to firebase
4. nom run dev
5. visit http://localhost/api/
6. run rquests from ./http

### Firebase

```
You need a Firebase Account to use this, get one for free here https://console.firebase.google.com/.
Edit the firebase-service.json https://firebase.google.com/docs/admin/setup#initialize-sdk.
Add your 'https://<DATABASE_NAME>.firebaseio.com' to .env file.
```

### Scripts

- npm run install
- npm run start -> prod mode
- npm run dev -> dev mode
- npm run build -> next build
- npm run format -> format files with prettier
- npm run data insert example data from ./data to firebase

## Routes

```
See ./src/http for all prepared routes.
```
