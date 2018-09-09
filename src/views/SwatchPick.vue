<template>
  <div class="home page" v-touch="{
      left: swatchForward,
      right: swatchBack
    }">
    <div class="swatch-container" v-bind:style="styleObject">
      <div class="text-container">
        <h1 v-bind:style="textColor">{{ generatedColor }}</h1>
        <h2 v-bind:style="textColor">RGB</h2>
        <h2 v-bind:style="textColor">{{ generatedColorRgb.red }} {{generatedColorRgb.green}} {{generatedColorRgb.blue}}</h2>
      </div>
    </div>
    <BottomNav :confirm-handler="confirmHandler" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
import hexRgb from 'hex-rgb';

// Generation of hex code taken from:
// https://www.paulirish.com/2009/random-hex-color-code-snippets/
function generateNewHex () {
  return '#' + ('000000' + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
}

// Calculation of contrasting color taken and adapted from:
// https://codepen.io/davidhalford/pen/ywEva
function getContrastingColor (hex) {
  const threshold = 200;
  const trimmedHex = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
  const hRed = parseInt((trimmedHex).substring(0, 2), 16);
  const hGreen = parseInt((trimmedHex).substring(2, 4), 16);
  const hBlue = parseInt((trimmedHex).substring(4, 6), 16);
  const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;

  return cBrightness > threshold ? '#000000' : '#ffffff';
}

export default {
  name: 'Swatch',
  components: {
    BottomNav
  },
  data: () => {
    const generated = generateNewHex();
    return {
      generatedColor: generated,
      generatedColorRgb: hexRgb(generated),
      styleObject: {
        backgroundColor: generated
      },
      textColor: {
        color: getContrastingColor(generated)
      },
      previousColors: [generated],
      currentIndex: 0
    };
  },
  methods: {
    confirmHandler: function () {
      // store selected swatch in global store and push to schemePick page
      this.$store.commit('selectColor', this.$data.currentIndex);
      this.$store.commit('setPrevColors', this.$data.previousColors);
      this.$router.push({ name: 'scheme' });
    },
    swatchForward: function () {
      // display color swatches as you move through the array and generate a new one once you reach the end
      if (this.$data.currentIndex < this.$data.previousColors.length - 1) {
        const nextColor = this.$data.previousColors[this.$data.currentIndex + 1];
        this.$data.generatedColor = nextColor;
        this.$data.generatedColorRgb = hexRgb(nextColor);
        this.$data.styleObject.backgroundColor = nextColor;
        this.$data.textColor.color = getContrastingColor(nextColor);
        this.$data.currentIndex += 1;
      } else {
        const newColor = generateNewHex();
        this.$data.generatedColor = newColor;
        this.$data.generatedColorRgb = hexRgb(newColor);
        this.$data.styleObject.backgroundColor = newColor;
        this.$data.textColor.color = getContrastingColor(newColor);
        this.$data.previousColors.push(newColor);
        this.$data.currentIndex += 1;
      }
    },
    swatchBack: function () {
      // display the stored color swatches as you move back through the array
      const previousColor = this.$data.previousColors[Math.max(this.$data.currentIndex - 1, 0)];
      this.$data.generatedColor = previousColor;
      this.$data.generatedColorRgb = hexRgb(previousColor);
      this.$data.styleObject.backgroundColor = previousColor;
      this.$data.textColor.color = getContrastingColor(previousColor);
      this.$data.currentIndex = Math.max(this.$data.currentIndex - 1, 0);
    }
  },
  created: function () {
    // get selected color from the global store
    if (this.$store.state.selectedColor !== null) {
      this.previousColors = this.$store.state.previousColors || [];
      if (this.previousColors.length) {
        this.currentIndex = this.$store.state.selectedColor;
        this.generatedColor = this.previousColors[this.currentIndex];
        this.generatedColorRgb = hexRgb(this.generatedColor);
        this.styleObject.backgroundColor = this.generatedColor;
      }
    }
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.swatchForward();
      }
      if (e.key === 'ArrowLeft') {
        this.swatchBack();
      }
    });
  }
};
</script>

<style scoped>
  body {
    margin: 0;
  }
  .swatch-container{
    width: 100vw;
    height: 100vh;
    position: relative;
    transition: background-color 0.5s;
  }
  .text-container{
    position: absolute;
    height: 30vh;
    left: 25px;
    bottom: 50px;
  }
  h1, h2{
    color: #fff;
    margin-top: 0;
  }
  h1{
    font-size: 28px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  h2{
    font-size: 18px;
    margin-bottom: 0;
    margin-left: 8px;
  }
</style>
