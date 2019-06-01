import Vue from 'nativescript-vue';
import Login from './components/Login.vue';
import store from './store';
import * as application from 'tns-core-modules/application';
import VueDevtools from 'nativescript-vue-devtools';
import SwipeLayout from 'nativescript-swipe-layout';

import {
  init,
  LoginBehavior
} from 'nativescript-facebook';

import FacebookPlugin from "nativescript-facebook/vue";

Vue.use(FacebookPlugin);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools);
}

Vue.registerElement('SwipeLayout', () => require("nativescript-swipe-layout").SwipeLayout);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

application.on(application.launchEvent, function (args) {
  init("1771472059772879", LoginBehavior.LoginBehaviorWeb);
});

new Vue({
store,
  render: h => h('frame', [h(Login)])
}).$start();
