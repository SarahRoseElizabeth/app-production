# Welcome to Hue Circle!

This is a PhoneGap App built using the Vue.JS framework.
1. The traditional phonegap `/www` folder contains code from the build process. The actual source code is in `/src` with the screens in `/src/views` and the sub-components in `/src/comopnents`. 
1. `App.vue` is the root view/component, `router.js` shows what the routes are for each screen, and `store.js` is the global app data store for things that need to go between screens.
1. The root `index.html` is in `/public`.

All of that gets moved to `/www` when we do `npm run build`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
Builds the Vue project to the `/www` folder so that phonegap can use it
```
npm run build
```

# Hue Circle - PhoneGap App

Use the `/www` folder as usual for PhoneGap.

### Building on PhoneGap Build:

Make sure to include `/www`, `config.xml`, and `res` folder when creating an archive to put on PhoneGap Build. Don't forget to `npm run build` before you do this so you have the newest version of the Vue stuff in `/www`!

