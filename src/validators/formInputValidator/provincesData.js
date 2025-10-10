// utils/provincesData.js
import { Country, State } from "country-state-city";

export const getProvincesByCountry = (countryName) => {
  const country = Country.getAllCountries().find((c) => c.name === countryName);

  if (!country) return [];

  const states = State.getStatesOfCountry(country.isoCode);
  return states.map((state) => state.name);
};
