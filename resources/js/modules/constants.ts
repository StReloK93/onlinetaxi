export const rules = [(value) => [null, ""].includes(value) ? "To'ldiring" : true]

export const moneyConfig = {
	masked: false,
	prefix: '',
	suffix: "",
	thousands: ' ',
	decimal: '.',
	precision: 0,
	disableNegative: true,
	disabled: false,
	min: null,
	max: null,
	allowBlank: true,
	minimumNumberOfCharacters: 0,
	shouldRound: true,
	focusOnRight: false,
}

export const phoneMask = { mask: '## ### ## ##' }

export function hasDuplicates(array) {
	return (new Set(array)).size !== array.length;
}

export function replace(name, text, change) {
	return name.replace(text, change)
}