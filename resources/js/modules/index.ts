import vuetify from '@/modules/vuetify'
import Echo from '@/modules/echo'
import App from '@/app/app.vue'
import BaseForm from '@/components/BaseForm.vue'
import VCalendar from 'v-calendar'
import money from 'v-money3'
import moment from './moment'
import timer from './timer'
import '@/app/app.css'
import 'v-calendar/style.css';
// @ts-ignore
window.echo = Echo
window.moment = moment

export { vuetify, Echo, App, BaseForm, VCalendar, money, moment, timer }