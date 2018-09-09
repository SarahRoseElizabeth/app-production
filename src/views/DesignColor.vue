<template>
  <div class="design-color page">
    <div class="design-outline"><div v-bind:is="designs[currentIndex]"></div></div>
    <BottomNav :back-handler="backHandler" :confirm-handler="confirmHandler" :show-coloring-panel="true" confirm-text="DONE" />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
import design1 from '@/views/designs/design-01.vue';
import design2 from '@/views/designs/design-02.vue';
import design3 from '@/views/designs/design-03.vue';
export default {
  name: 'DesignColor',
  components: {
    BottomNav
  },
  data: () => ({
    designs: [
      design1,
      design2,
      design3
    ],
    currentIndex: 0,
    primaryColor: 0,
    primaryColorArray: [],
    selectedScheme: 0,
    schemeArray: []
  }),
  methods: {
    backHandler: function () {
      this.$router.push({ name: 'design-pick' });
    },
    confirmHandler: function () {
      console.log('confirm');
    }
  },
  created () {
    // retrieve the primary color, selected color scheme and selected design from the global store
    if (this.$store.state.selectedDesign !== null) {
      this.currentIndex = this.$store.state.selectedDesign;
    }
    if (this.$store.state.selectedColor !== null) {
      this.primaryColor = this.$store.state.selectedColor;
    }
    if (this.$store.state.previousColors.length) {
      this.primaryColorArray = this.$store.state.previousColors;
    }
    if (this.$store.state.selectedScheme !== null) {
      this.selectedScheme = this.$store.state.selectedScheme;
    }
    if (this.$store.state.generatedSchemes.length) {
      this.schemeArray = this.$store.state.generatedSchemes;
    }
  },
  mounted () {
    // bind the SVG shape clicks
    document.querySelectorAll('svg polygon, svg polyline, svg rect, svg path').forEach((shape) => {
      shape.addEventListener('click', (e) => {
        // fill SVG shape with stored color
        e.target.style.fill = this.$store.state.currentColoringValue;
      });
    });
  }
};
</script>

<style scoped>
  .design-outline {
    overflow: hidden;
    background-color: #4c4c4d;
  }
  .design-outline svg {
    object-fit: contain;
    width: 100vw;
    height: 88vh;
  }
</style>
