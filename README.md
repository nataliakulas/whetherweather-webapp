# Whether Weather - web application that displays local weather

Features:
- app on start shows weather for your current location (with geolocation),
- app shows 28 europan capitals, user can filter, sort and choose one of them,
- capital and current location can be added to favorites,
- app shows current weather for favorites cities,
- favorites locations are saved in local storage, and can be filtered as well,
- loader on main display screen

Stack: NextJS, Redux, Redux-Saga, styled-components and necessary add-on packs and plugins
Tests with Jest in developement process

## Setup
To run this project in dev version, install it locally using npm:

```
$ cd ../lorem
$ npm install
$ npm run dev
```

Then, you have to provide an api key from https://darksky.net/dev (account is free) and create an .env file in local root catalog.

```
REACT_API_KEY='...api key...'
```

Author: Natalia Kulas

Credits: Icons made by Roundicons from www.flaticon.com
