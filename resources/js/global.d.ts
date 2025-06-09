import Echo from "laravel-echo"
import * as moment from 'moment'
declare global {
	var echo: Echo;
	var moment: moment.Moment;
	var Telegram: {
		WebApp: TelegramWebApp;
	};
}

interface TelegramWebApp {
	initData: string;
	initDataUnsafe: {
		user?: {
			id: number;
			first_name: string;
			last_name?: string;
			username?: string;
			language_code?: string;
		};
		chat?: object;
		chat_type?: string;
		query_id?: string;
	};
	version: string;
	platform: string;
	colorScheme: "light" | "dark";
	isExpanded: boolean;
	viewportHeight: number;
	viewportStableHeight: number;
	isClosingConfirmationEnabled: boolean;
	sendData: (data: string) => void;
	expand: () => void;
	close: () => void;
	enableClosingConfirmation: () => void;
	disableClosingConfirmation: () => void;
	showAlert: (message: string, callback?: () => void) => void;
	showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
	showPopup: (params: object, callback?: (button_id: string) => void) => void;
}