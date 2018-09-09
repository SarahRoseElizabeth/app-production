import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedColor: null,
    previousColors: [],
    selectedScheme: null,
    generatedSchemes: [],
    selectedDesign: null,
    currentColoringValue: ''
  },
  mutations: {
    selectColor (state, color) {
      state.selectedColor = color;
      // if a new color is selected, force generate new color scheme information
      state.selectedScheme = null;
      state.generatedSchemes = [];
    },
    setPrevColors (state, prevColors) {
      state.previousColors = prevColors;
    },
    selectScheme (state, scheme) {
      state.selectedScheme = scheme;
    },
    setGeneratedSchemes (state, schemes) {
      state.generatedSchemes = schemes;
    },
    selectDesign (state, design) {
      state.selectedDesign = design;
    },
    currentColoringValue (state, value) {
      state.currentColoringValue = value;
    }
  },
  actions: {

  }
});
