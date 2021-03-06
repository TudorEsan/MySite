import Auth from "./Authentification";

const path = "https://tudoresan.herokuapp.com/crypto";

export const getCryptoData = async () => {
    const resp = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
      }
    })
  return resp.json();
}

export const addCrypto = async (data) => {
  const resp = await fetch(path, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: Auth.getAuthorizationHeader(),
		},
		body: JSON.stringify({
			usd: data.usd,
			abbreviation: data.type,
			amount: data.amount,
			date: data.date,
			user: window.localStorage.getItem("user"),
		}),
  });
	console.log(resp);
  Auth.updateHeaders(resp);
  return resp;
}

export const sellCrypto = async (data) => {
  const resp = await fetch(path + "/sell", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: Auth.getAuthorizationHeader(),
		},
		body: JSON.stringify({
		price: data.price,
		abbreviation: data.type,
		amount: data.amount,
		date: data.date,
			user: window.localStorage.getItem("user"),
		}),
  });
  Auth.updateHeaders(resp);
  return resp;
}