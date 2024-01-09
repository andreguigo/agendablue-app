import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import Button from 'primevue/button';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "./assets/style.css";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(ToastService);

app.component('Button', Button);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InputMask', InputMask);
app.component('InputMask', InputMask);
app.component('Toast', Toast);

app.mount("#app");