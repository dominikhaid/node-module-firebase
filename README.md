# Firebase Admin SDK

## Discription

---

This module is developed to extend our base server. It can be easily installed with the Plugin script from the base module. For detailed Information please see [@base-server](https://github.com/dominikhaid/node-base-server.git)

### Module Features

- Add support for firebase Auth and Firestore
- Sample Routes and Functions
- Sample Data



### Setup

---

> git clone https://github.com/dominikhaid/node-base-server.git my-app
> 
> cd my-app
> 
> edit .env //config firebase
> 
> npm run data //add the sample data to firebase
> 
> npm run plugin p=https://github.com/dominikhaid/node-module-firebase.git
> 
> npm run dev
> 
> visit http://localhost/api/

**NOTE:**  all endpoinnts are documented in ./src/http


#### Firebase

```
You need a Firebase Account to use this, get one for free here https://console.firebase.google.com/.
Edit the firebase-service.json https://firebase.google.com/docs/admin/setup#initialize-sdk.
Add your 'https://<DATABASE_NAME>.firebaseio.com' to .env file.
```

- ./src/config/firebase-service.json