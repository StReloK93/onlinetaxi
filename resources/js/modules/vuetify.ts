import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//@ts-ignore
import colors from 'vuetify/lib/util/colors'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
const color = 'primary'
const variant = 'underlined'

const defaultInputParams = { color: color, variant: variant, hideDetails: "auto", noDataText: "Qo'llanma to'ldirilmagan", density: "compact" }
export default createVuetify({
	components: {
		...components,
		VDatePicker: false,
	},
	directives,

	defaults: {
		VSelect: { ...defaultInputParams, chips: true },
		VList: { color: color },
		VTextarea: { ...defaultInputParams, rows: 3 },
		VTextField: defaultInputParams,
		VFileInput: defaultInputParams,
		VBtn: { color: color },
		VAutocomplete: { ...defaultInputParams, chips: true },
		VRadioGroup: defaultInputParams,
		VCombobox: defaultInputParams,
		VSwitch: defaultInputParams,
		VCheckbox: defaultInputParams,
		VCardTitle: { class: "bg-blue-grey-lighten-5" },
	},
	display: {mobileBreakpoint: 'sm'},

	theme: {
		themes: {
			light: {
				dark: false,
				colors: {
					primary: colors.pink.darken1, // #E53935
					secondary: colors.yellow.darken4, // #E53935
				}
			},
		},
	},
})