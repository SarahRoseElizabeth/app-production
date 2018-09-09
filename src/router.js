import Vue from 'vue';
import Router from 'vue-router';
import SwatchPick from './views/SwatchPick.vue';
import SchemePick from './views/SchemePick.vue';
import DesignPick from './views/DesignPick.vue';
import DesignColor from './views/DesignColor.vue';
import DesignShare from './views/DesignShare.vue';
import Explore from './views/Explore.vue';
import GalleryPiece from './views/GalleryPiece.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'swatch',
      component: SwatchPick
    },
    {
      path: '/scheme',
      name: 'scheme',
      component: SchemePick
    },
    {
      path: '/design-pick',
      name: 'design-pick',
      component: DesignPick
    },
    {
      path: '/design-color',
      name: 'design-color',
      component: DesignColor
    },
    {
      path: '/design-share',
      name: 'design-share',
      component: DesignShare
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/gallery-piece',
      name: 'gallery-piece',
      component: GalleryPiece
    }
  ]
});
