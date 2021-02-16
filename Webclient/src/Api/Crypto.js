const path = 'http://tudoresan.hopto.org:8000/crypto'

export const getCryptoData = async () => {
    const resp = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
  return resp.json();
}