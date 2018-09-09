<template>
  <!--when swipe up on coloring panel expand full bottom nav-->
  <div class="bottom-bar"  v-bind:style="{ height: showColoringPanel ? '26vh' : 'inherit', transform: showColoringPanel && menuCollapsed ? 'translateY(12vh)' : 'translateY(0)' }" v-touch="{
      up: menuExpand,
      down: menuCollapse
    }">
    <!--only show the coloring panel sometimes-->
    <ColoringPanel v-if="showColoringPanel" />
    <div class="control-panel">
      <button type="button" v-bind:style="backButtonStyle" :disabled="!backHandler" v-on:click="backHandler()"><img src="@/assets/back-arrow.png" alt=""/></button>
      <button type="button" v-bind:style="confirmButtonStyle" :disabled="!confirmHandler" v-on:click="confirmHandler()">{{ confirmText }}</button>
      <div class="action-container">
        <button type="button" class="gallery-icon"><img src="@/assets/gallery-icon.png" alt=""/></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ColoringPanel from './ColoringPanel';
export default {
  name: 'BottomNav',
  components: { ColoringPanel },
  props: {
    confirmHandler: Function,
    backHandler: Function,
    showColoringPanel: {
      type: Boolean,
      required: false,
      default: false
    },
    confirmText: {
      type: String,
      required: false,
      default: 'SELECT'
    }
  },
  data: () => ({
    menuCollapsed: true
  }),
  computed: mapState({
    confirmButtonStyle () {
      return { visibility: this.confirmHandler ? 'visible' : 'hidden' };
    },
    backButtonStyle () {
      return { visibility: this.backHandler ? 'visible' : 'hidden' };
    }
  }),
  created () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp') {
        this.menuExpand();
      }
      if (e.key === 'ArrowDown') {
        this.menuCollapse();
      }
    });
  },
  methods: {
    menuExpand: function () {
      this.menuCollapsed = false;
    },
    menuCollapse: function () {
      this.menuCollapsed = true;
    }
  }
};
</script>

<style scoped lang="less">
.bottom-bar {
  background-color: #000;
  width: 100vw;
  height: 12vh;
  position: fixed;
  bottom: 0;
  left: 0;
  transform: translateY(0);
  transition: transform 0.25s;
  .control-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 12vh;
    button[type=button] {
      color: #FFF;
      font-size: 24px;
      -webkit-appearance: none;
      border: none;
      background-color: transparent;
    }
  }
}
button {
  min-width: 50px;
}
button img {
  width: 12px;
}

button.gallery-icon img {
  width: 22px;
}
.action-container {
  display: flex;
  align-items: center;
}
</style>
