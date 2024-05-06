
import { defineStore } from "pinia"
import { ref } from "vue"
import router from "@/routes"

export const useAuthStore = defineStore('Auth', () => {
	const user = ref(null)

	async function login(data) {
		try {
			const result = await axios.post('login', data)
			localStorage.setItem('token', `${result.data.type} ${result.data.token}`) // local
			await getUser()
			router.push({ name: 'main' })
		}
		catch (error) {
			return error
		}
	}


	async function sendUserData(formData) {
		const { data } = await axios.post('set_user_data', formData)

		user.value = data
		router.push({ name: 'main' })
	}

	async function getUser() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
		await axios.get('user')
		.then(({ data }) => user.value = data)
		.catch(() => console.clear())
	}


	async function sendSecretCode(props) {
		try {
			const result = await axios.post('sendSecretCode', props)
			if (result.status == 200) router.push({ name: 'secret_code', state: { props } })
			else return result.data
		} catch (err) {
			return err.response.data
		}
	}

	async function logout() {
		const data = await axios.get('logout')

		if (data.status == 200) {
			axios.defaults.headers.common['Authorization'] = null
			localStorage.removeItem('token')
			user.value = null
			router.push({ name: 'login' })
		}
	}

	return { user, getUser, login, sendSecretCode, logout, sendUserData }
})