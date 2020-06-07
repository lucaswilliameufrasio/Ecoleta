# Ecoleta - Your marketplace of residuos

![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)

> Created following on Next Level Week #1 of [Rocketseat](https://www.rocketseat.com.br).

> The most beautiful frameworks/libs.

> Create beautiful applications.

> react, react native, nodejs, typescript,

![Web and Mobile app screenshot showing the first route of both](https://xo3dpw.ch.files.1drv.com/y4mSLKAV1SlE2AKKidShBl9FPrx3O-JdrAA8VPlVYUbzAcHYdqrTawjEwUfmWBWefvfZ_2-MwE3dAH5lEJUOIfLpatnekuXfOUmkRDup6meP-9pQfFowqnK6kF300jmh4NwhkJr3XBALcVHHPVEWzYXMJCJcbNddTXpL9nGE1H0v_hTtvMCFpM1GyNYgFSqMvw3wzQnoEMLFLUPVfpDhQkRqw/ecoleta-first-repo-picture.jpg?psid=1)
---

## Content


- [Installation](#installation)
- [Usage](#usage)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/lucaswilliameufrasio/Ecoleta.git`

```shell
git clone https://github.com/lucaswilliameufrasio/Ecoleta.git ./FOLDER_NAME
```

### Setup

#### Backend (Required)
> Navigate to project's folder and install packages

```shell
$ cd FOLDER_NAME/backend
$ cp .env.example .env
$ yarn
```
> On .env file, replace HOST, PORT, APP_URL values with yours.

> Note: If you will configure the backend on staging or production environment, replace DB variables and NODE_ENV to staging or production.

> Run the application with

```shell
$ yarn dev
```

> Open http://localhost:3333 on your favorite browser or continue to 
> Note: If you set HOST and PORT they will be used, mine was http://192.168.7.79:3333

#### Web
> Navigate to project's folder and install packages

```shell
$ cd FOLDER_NAME/web
$ yarn
```
> Replace baseURL with your backend url on services/api.ts

##### Note: If you're testing on a device without Google Play Services, uncomment line 70 on 'pages/Points/index.tsx' and fill with your API Key from Geocoding service by Google.

> Run the application with

```shell
$ yarn start
```

> Open http://localhost:3000 on your favorite browser

---

#### Mobile
> Navigate to project's folder and install packages

```shell
$ cd FOLDER_NAME/mobile
$ yarn
```

> Run the expo developer tools with

```shell
$ yarn start
```
> Scan the QRCode with Expo or Expo Client application on your smartphone, or click "Run on Android Device/Emulator"


---

## FAQ

- **Why to use React, React Native and NodeJS**
    - I can reuse the acquired knowledge, that is, I can create something in react and reuse in react native, and it's all javascript / typescript.

- **Where can i get this mobile phone mockup?**
	- [Free Google Pixel 4 & 4 XL Mockup PSD, Ai & EPS - Dribbble](https://dribbble.com/shots/7861301-Free-Google-Pixel-4-4-XL-Mockup-PSD-Ai-EPS)

---

## Support

Reach out to me at one of the following places!

- LinkedIn at <a  href="https://www.linkedin.com/in/lucaswilliameufrasio/"  target="_blank">`linkedin.com/in/lucaswilliameufrasio/`</a>

## License

- **[MIT](http://opensource.org/licenses/mit-license.php)**