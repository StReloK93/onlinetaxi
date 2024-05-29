import vuetify from '@/modules/vuetify'
import Echo from '@/modules/echo'
import axios from '@/modules/axios'
import App from '@/app/app.vue'
import BaseForm from '@/components/BaseForm.vue'
import { AgGridVue } from "ag-grid-vue3"
import VCalendar from 'v-calendar'
import money from 'v-money3'
import moment from './moment'
import timer from './timer'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import '@/app/app.css'
import 'v-calendar/style.css';
// @ts-ignore
window.echo = Echo
window.moment = moment
window.axios = axios


export { vuetify, Echo, axios, App, BaseForm, AgGridVue, VCalendar, money, moment, timer }