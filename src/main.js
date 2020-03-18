import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import * as fb from "firebase/app";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // конфиг firebase для приложениея
    const firebaseConfig = {
      apiKey: "AIzaSyAbWOGTSjUMDJVssuayp_6QTRlYoZFFyCc",
      authDomain: "vue-todo-app-8f8f3.firebaseapp.com",
      databaseURL: "https://vue-todo-app-8f8f3.firebaseio.com",
      projectId: "vue-todo-app-8f8f3",
      storageBucket: "vue-todo-app-8f8f3.appspot.com",
      messagingSenderId: "599715959455",
      appId: "1:599715959455:web:e77f538a612a9e304ec8aa"
    };
    // инициализируем Firebase
    fb.initializeApp(firebaseConfig);
    // проверяем есть ли данные о залогиненном юзере
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user.uid);
      }
    });
  }
}).$mount("#app");
