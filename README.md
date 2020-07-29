
# Ecoleta - Your marketplace of residuos

![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)

> Created following on Next Level Week #1 of [Rocketseat](https://www.rocketseat.com.br).

> The most beautiful frameworks/libs.

> Create beautiful applications.

> react, react native, nodejs, typescript,

![Web and Mobile app screenshot showing the first route of both](https://xo3dpw.ch.files.1drv.com/y4mSLKAV1SlE2AKKidShBl9FPrx3O-JdrAA8VPlVYUbzAcHYdqrTawjEwUfmWBWefvfZ_2-MwE3dAH5lEJUOIfLpatnekuXfOUmkRDup6meP-9pQfFowqnK6kF300jmh4NwhkJr3XBALcVHHPVEWzYXMJCJcbNddTXpL9nGE1H0v_hTtvMCFpM1GyNYgFSqMvw3wzQnoEMLFLUPVfpDhQkRqw/ecoleta-first-repo-picture.jpg?psid=1)
---
## :technologist: Technologies

The following technologies was used to built the project:

- [Expo](https://expo.io/)
- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)


## :books: Content

- 🖥 [Requirements](#requirements)
- 📦 [Usage](#usage)
- :question: [FAQ](#faq)
- :office_worker:  [Author](#author)
- :scroll: [License](#license)


---
<h2 id="requirements">🖥 Requirements </h2>

 - NodeJS
 - Git

<h2 id="usage">📦 Usage</h2>

### Clone the repository

👉  Clone this repo to your local machine using:

```shell
git clone https://github.com/lucaswilliameufrasio/Ecoleta.git
```

### 🔨 Setup

#### :brain: Backend (Required)
👉 Navigate to project's folder and install dependencies:

```shell
$ cd Ecoleta/backend
$ cp .env.example .env
$ yarn
```
> On .env file, replace HOST, PORT, APP_URL values with yours.

👉  Create database structure and fill with initial data with:

```shell
$ yarn knex:migrate-latest
$ yarn knex:seed
```

👉  Run the application with:

```shell
$ yarn dev
```

> Open http://localhost:3333 on your favorite browser or continue to the next step.
> Note: If you set HOST and PORT they will be used, mine was http://192.168.7.79:3333.

####  :earth_americas: Web
👉 Navigate to web application folder and install dependencies with:

```shell
$ cd Ecoleta/web
$ yarn
```
> Replace baseURL with your backend url on services/api.ts

👉  Run the application with:

```shell
$ yarn start
```

👉 Open http://localhost:3000 on your favorite browser.

---

#### :iphone: Mobile
👉 Navigate to project's folder and install dependencies:

```shell
$ cd Ecoleta/mobile
$ yarn
```

> Replace baseURL with your backend url on services/api.ts

##### Note: If you're testing on a device without Google Play Services, uncomment line 70 on 'mobile/pages/Points/index.tsx' and fill with your API Key from Geocoding service by Google.

👉 Run the expo developer tools with:

```shell
$ yarn start
```
👉  Scan the QRCode with Expo or Expo Client application on your smartphone, or click "Run on Android Device/Emulator"

---

<h2 id="faq">:question: FAQ</h2>

- **Why to use React, React Native and NodeJS**
    - I can reuse the acquired knowledge, that is, I can create something in react and reuse in react native, and it's all javascript / typescript.

- **Where can i get this mobile phone mockup?**
	- [Free Google Pixel 4 & 4 XL Mockup PSD, Ai & EPS - Dribbble](https://dribbble.com/shots/7861301-Free-Google-Pixel-4-4-XL-Mockup-PSD-Ai-EPS)

---

<h2 id="author">:office_worker: Author</h2>

 Reach me out at one of the following places:
 
[![Linkedin Badge](https://img.shields.io/badge/-Lucas%20William-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://linkedin.com/in/lucaswilliameufrasio/)](https://linkedin.com/in/lucaswilliameufrasio/)

<h2 id="license">:scroll: License</h2>

- **[MIT](http://opensource.org/licenses/mit-license.php)**
