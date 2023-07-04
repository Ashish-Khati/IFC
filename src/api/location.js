const locationIQ_TOKEN = "pk.89a00138203d6864dd794b9665d073ec";

export async function getReverseGeo(latitude, longitude) {
  if (!latitude || !longitude) return {};
  return fetch(
    `https://eu1.locationiq.com/v1/reverse?key=${locationIQ_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`
  )
    .then((res) => res.json())
    .then((address) => address)
    .catch((err) => err.message);
}
