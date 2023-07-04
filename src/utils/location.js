import { roundToDecimal } from "./math";

export function islocationEqual(loc1, loc2) {
  if (roundToDecimal(loc1.latitude, 1) === roundToDecimal(loc2.latitude, 1)) {
    if (
      roundToDecimal(loc1.longitude, 1) === roundToDecimal(loc2.longitude, 1)
    ) {
      return true;
    }
    return false;
  }
  return false;
}

const findName = (level, components) => {
  const temp = components.find((obj) => {
    return obj.types[0] && obj.types[0] === level;
  });
  return temp?.long_name;
};

export const getStructuredLocation = (place) => {
  if (!place)
    return {
      city: "",
      state: "",
      country: "",
      postalCode: "",
      addressLine: "",
      latitude: "",
      longitude: "",
    };
  const { address_components, formatted_address, geometry } = place;
  const location = {
    city: address_components[0].long_name,
    state: findName("administrative_area_level_1", address_components) || "",
    country: findName("country", address_components) || "",
    postalCode: findName("postal_code", address_components) || "",
    addressLine: formatted_address,
    latitude: geometry.location.lat(),
    longitude: geometry.location.lng(),
  };
  return location;
};
