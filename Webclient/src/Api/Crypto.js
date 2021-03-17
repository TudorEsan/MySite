import Auth from "./Authentification";

const path = 'https://tudoresan.hopto.org/crypto'

export const getCryptoData = async () => {
    const resp = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
  return resp.json();
}

export const addCrypto = async (data) => {
  const resp = await fetch(path, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Authorization": Auth.getAuthorizationHeader()
    },
    body: JSON.stringify({
      ...data,
      user: "Tudor"
    })
  })
  Auth.updateHeaders(resp);
  return resp;
}

export const sellCrypto = async (data) => {
  const resp = await fetch(path + "/sell", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Auth.getAuthorizationHeader()
    },
    body: JSON.stringify({
      ...data,
      user: "Tudor"
    })
  })
  Auth.updateHeaders(resp);
  return resp;
}