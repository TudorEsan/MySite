class Auth {
	static #PATH = "https://tudoresan.herokuapp.com/auth";

	static isLogedIn() {
		return !!window.localStorage.getItem("token");
	}

	static async updateHeaders(resp) {
		if (resp.status === 200) {
			const localStorage = window.localStorage;
			console.log(resp.headers);
			const [token, refreshToken] = resp.headers
				.get("Authorization")
				.split(" ");
			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refreshToken);
		} else if (resp.status === 401) {
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		}
	}

	static getAuthorizationHeader() {
		const token = window.localStorage.getItem("token");
		const refreshToken = window.localStorage.getItem("refreshToken");
		return token + " " + refreshToken;
	}

	static async login(user, password) {
		const resp = await fetch(this.#PATH + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: user,
				password: password,
			}),
		});
		console.log(resp.headers.get("Authorization"));
		this.updateHeaders(resp);
		if (resp.status !== 200) {
			const body = await resp.json();
			return body.message;
		}
		window.localStorage.setItem("user", user);
		return;
	}
}

export default Auth;
