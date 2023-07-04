export async function getFuelPrice(address) {
  // return fetch(
  //   `https://price-api-production.up.railway.app/price?search=${address}`
  // )
  //   .then((res) => res.json())
  //   .then((prices) => prices);
  return { diesel: 89.6, petrol: 98 };
}
