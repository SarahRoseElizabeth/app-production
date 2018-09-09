<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import 'assets/css/animate.min.css';

@font-face {
  font-family: 'Varela Round';
  src: url('assets/fonts/Varela_Round/VarelaRound-Regular.ttf');
}
#app {
  h1, h2, h3, h4, h5, button {
    font-family: 'Varela Round', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }
  h1, h2 {
    color: #fff;
    margin-top: 0;
  }
  h1 {
    font-size: 28px;
    text-transform: uppercase;
  }
  .page {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
