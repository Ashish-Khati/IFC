export async function getDirection({ origin, destination }) {
  if (!origin || !destination) return;
  const directionService = new window.google.maps.DirectionsService();
  const res = await directionService.route({
    origin,
    destination,
    travelMode: window.google.maps.TravelMode.DRIVING,
  });
  return res;
}
