import { createApp } from "vue";
import PrimeVue from "primevue/config";

import App from "./App.vue";

import "primeicons/primeicons.css";

//theme
import "primevue/resources/themes/lara-light-cyan/theme.css";

const app = createApp(App);

app.use(PrimeVue);

app.mount("#app");