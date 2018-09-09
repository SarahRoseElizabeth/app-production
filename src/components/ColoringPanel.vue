<template>
  <div class="coloring-panel-container">
    <div class="pull-tab"><img src="@/assets/tab.png" alt=""/></div>
    <div class="color-container">
      <div class="single-swatch" v-bind:class="{ selected: selectedSwatchButton === 0 }" v-on:click="swatchClickHandler($event, 0)" v-bind:style="{ backgroundColor: swatchButtonColors[0] }"></div>
      <div class="single-swatch" v-bind:class="{ selected: selectedSwatchButton === 1 }" v-on:click="swatchClickHandler($event, 1)" v-bind:style="{ backgroundColor: swatchButtonColors[1] }"></div>
      <div class="single-swatch" v-bind:class="{ selected: selectedSwatchButton === 2 }" v-on:click="swatchClickHandler($event, 2)" v-bind:style="{ backgroundColor: swatchButtonColors[2] }"></div>
      <div class="single-swatch" v-bind:class="{ selected: selectedSwatchButton === 3 }" v-on:click="swatchClickHandler($event, 3)" v-bind:style="{ backgroundColor: swatchButtonColors[3] }"></div>
      <div class="single-swatch" v-bind:class="{ selected: selectedSwatchButton === 4 }" v-on:click="swatchClickHandler($event, 4)" v-bind:style="{ backgroundColor: swatchButtonColors[4] }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColoringPanel',
  data: () => ({
    selectedSwatchButton: 0,
    swatchButtonColors: [
      '',
      '',
      '',
      '',
      ''
    ]
  }),
  created () {
    if (this.$store.state.generatedSchemes.length &&
        this.$store.state.selectedScheme !== null &&
        this.$store.state.previousColors.length &&
        this.$store.state.selectedColor !== null) {
      this.swatchButtonColors = [
        this.$store.state.previousColors[this.$store.state.selectedColor],
        this.$store.state.generatedSchemes[this.$store.state.selectedScheme][3].hex.value,
        this.$store.state.generatedSchemes[this.$store.state.selectedScheme][2].hex.value,
        this.$store.state.generatedSchemes[this.$store.state.selectedScheme][1].hex.value,
        this.$store.state.generatedSchemes[this.$store.state.selectedScheme][0].hex.value
      ];
      this.$store.commit('currentColoringValue', this.swatchButtonColors[this.selectedSwatchButton || 0]);
    }
  },
  methods: {
    swatchClickHandler: function (e, index) {
      this.selectedSwatchButton = index;
      this.$store.commit('currentColoringValue', this.swatchButtonColors[index]);
    }
  }
};
</script>

<style scoped lang="less">
  .pull-tab {
    width: 100vw;
    height: 2vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .pull-tab img {
    width: 30px;
  }
  .color-container {
    width: 100vw;
    height: 12vh;
    display: flex;
    flex-direction: row;
  }
  .single-swatch {
    position: relative;
    width: 20vw;
    &.selected {
      &:after {
        content: '';
        height: 6px;
        width: 6px;
        position: absolute;
        bottom: 10px;
        left: calc(50% - 3px);
        background: #000000;
        border-radius: 50%;
      }
    }
  }
</style>
