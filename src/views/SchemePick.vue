<template>
  <div class="scheme page" v-touch="{
      left: schemeForward,
      right: schemeBack
    }">
    <div class="side-swatch" v-bind:style="{ backgroundColor: generatedSchemes.length ? generatedSchemes[currentIndex][0].hex.value : defaultBackgrounds[0] }"><h1>{{ generatedSchemes.length ? generatedSchemes[currentIndex][0].hex.value : defaultSwatchText }}</h1></div>
    <div class="side-swatch" v-bind:style="{ backgroundColor: generatedSchemes.length ? generatedSchemes[currentIndex][1].hex.value : defaultBackgrounds[1] }"><h1>{{ generatedSchemes.length ? generatedSchemes[currentIndex][1].hex.value : defaultSwatchText }}</h1></div>
    <div class="side-swatch" v-bind:style="{ backgroundColor: generatedSchemes.length ? generatedSchemes[currentIndex][2].hex.value : defaultBackgrounds[2] }"><h1>{{ generatedSchemes.length ? generatedSchemes[currentIndex][2].hex.value : defaultSwatchText }}</h1></div>
    <div class="side-swatch" v-bind:style="{ backgroundColor: generatedSchemes.length ? generatedSchemes[currentIndex][3].hex.value : defaultBackgrounds[3] }"><h1>{{ generatedSchemes.length ? generatedSchemes[currentIndex][3].hex.value : defaultSwatchText }}</h1></div>
    <div class="main-swatch" v-bind:style="mainSwatchStyle"><h1>{{ selectedColor }}</h1></div>
    <BottomNav :back-handler="backHandler" :confirm-handler="confirmHandler" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Swatch',
  components: {
    BottomNav
  },
  computed: mapState({
    selectedColor: state => state.previousColors ? state.previousColors[state.selectedColor] : '',
    mainSwatchStyle: state => ({ backgroundColor: state.previousColors ? state.previousColors[state.selectedColor] : '' })
  }),
  created () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.schemeForward();
      }
      if (e.key === 'ArrowLeft') {
        this.schemeBack();
      }
    });
    if (this.$store.state.selectedScheme !== null && this.$store.state.generatedSchemes.length) {
      this.currentIndex = this.$store.state.selectedScheme;
      this.generatedSchemes = this.$store.state.generatedSchemes;
    } else {
      axios
        .all([
          axios.get(`http://www.thecolorapi.com/scheme?hex=${this.selectedColor.slice(1)}&mode=analogic&count=4`),
          axios.get(`http://www.thecolorapi.com/scheme?hex=${this.selectedColor.slice(1)}&mode=complement&count=4`),
          axios.get(`http://www.thecolorapi.com/scheme?hex=${this.selectedColor.slice(1)}&mode=triad&count=4`),
          axios.get(`http://www.thecolorapi.com/scheme?hex=${this.selectedColor.slice(1)}&mode=quad&count=4`)
        ])
        .then(axios.spread((analogic, complement, triad, quad) => {
          let arr = [];
          (analogic.data && analogic.data.colors) && arr.push(analogic.data.colors);
          (complement.data && complement.data.colors) && arr.push(complement.data.colors);
          (triad.data && triad.data.colors) && arr.push(triad.data.colors);
          (quad.data && quad.data.colors) && arr.push(quad.data.colors);
          this.generatedSchemes = arr;
        }));
    }
  },
  data: () => ({
    generatedSchemes: [],
    defaultBackgrounds: [
      '#EEEEEE',
      '#DDDDDD',
      '#CCCCCC',
      '#BBBBBB'
    ],
    defaultSwatchText: 'LOADING...',
    currentIndex: 0
  }),
  methods: {
    schemeForward: function () {
      if (this.currentIndex < this.generatedSchemes.length - 1) this.currentIndex += 1;
    },
    schemeBack: function () {
      if (this.currentIndex > 0) this.currentIndex -= 1;
    },
    confirmHandler: function () {
      this.$store.commit('selectScheme', this.currentIndex);
      this.$store.commit('setGeneratedSchemes', this.generatedSchemes);
      this.$router.push({ name: 'design-pick' });
    },
    backHandler: function () {
      this.$router.push({ name: 'swatch' });
    }
  }
};
</script>

<style scoped>
  body {
    margin: 0;
  }
  .side-swatch {
    height: 15vh;
    width: 100vw;
    display: flex;
    align-items: center;
    transition: background-color 0.5s;
  }
  .main-swatch {
    height: 40vh;
    width: 100vw;
    display: flex;
    align-items: center;
  }
  h1 {
    margin-left: 25px;
    margin-bottom: 0;
  }
</style>
