import Vue from 'vue'
import Vuex from 'vuex'
import { configure } from '@storybook/vue'

Vue.use(Vuex);

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
