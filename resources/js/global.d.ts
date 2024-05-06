import Echo from "laravel-echo"
import { AxiosStatic } from "axios"
import * as moment from 'moment'
declare global {
	var echo: Echo;
	var axios: AxiosStatic;
	var moment: moment.Moment;
}