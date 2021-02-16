const path = 'http://localhost:8000/crypto'

export const getCryptoData = async () => {
    const resp = await fetch(path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
    })
  return resp.json();
}