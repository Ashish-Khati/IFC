import { Marker as GMarker } from "@react-google-maps/api";

export default function Marker(prop) {
  //   useEffect(() => {
  //     if (!route) return;
  //     const path = route.routes[0].overview_path;
  //     path.forEach(({ lat, lng }, index) => {
  //       setTimeout(() => {
  //         setPosition({ lat: lat(), lng: lng() });
  //       }, 1000 * index);
  //     });
  //   }, [route]);

  return <GMarker position={prop.position} />;
}
