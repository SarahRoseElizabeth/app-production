<template>
  <div class="design-pick page" v-touch="{
      left: designForward,
      right: designBack
    }">
     <div class="design-outline">
       <transition name="designAnim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-bind:is="designs[currentIndex]"></div>
       </transition>
     </div>
    <BottomNav :back-handler="backHandler" :confirm-handler="confirmHandler"  />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue';
import design1 from '@/views/designs/design-01.vue';
import design2 from '@/views/designs/design-02.vue';
import design3 from '@/views/designs/design-03.vue';

export default {
  name: 'design-pick',
  components: {
    BottomNav
  },
  data: () => ({
    designs: [
      design1,
      design2,
      design3
    ],
    currentIndex: 0
  }),
  methods: {
    backHandler: function () {
      this.$router.push({ name: 'scheme' });
    },
    confirmHandler: function () {
      this.$store.commit('selectDesign', this.currentIndex);
      this.$router.push({ name: 'design-color' });
    },
    designForward: function () {
      // move through the design selections
      if (this.currentIndex < this.designs.length - 1) {
        this.currentIndex += 1;
      }
    },
    designBack: function () {
      // move back through the design selections
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    }
  },
  created () {
    // display the design previously selected
    if (this.$store.state.selectedDesign !== null) {
      this.currentIndex = this.$store.state.selectedDesign;
    }
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') {
        this.designForward();
      }
      if (e.key === 'ArrowLeft') {
        this.designBack();
      }
    });
  }
};
</script>

<style>
  .design-outline {
    overflow: hidden;
    background-color: #4c4c4d;
    width: 100vw;
    height: 88vh;
  }
  .design-outline svg {
    position: absolute;
    object-fit: contain;
    width: 100vw;
    height: 88vh;
  }
</style>
