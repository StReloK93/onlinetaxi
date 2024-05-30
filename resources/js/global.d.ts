import Echo from "laravel-echo"
import * as moment from 'moment'
declare global {
	var echo: Echo;
	var moment: moment.Moment;
}