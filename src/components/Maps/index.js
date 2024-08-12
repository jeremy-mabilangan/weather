import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

/**
 * Show the location of the searched address.
 *
 * @param apiKey - Google Maps API key
 * @param map - Google Maps Props
 * @param marker - Google Maps Marker
 *
 * @returns Google map component with marked location.
 */
const Maps = ({ apiKey, map, marker }) => {
  return (
    <APIProvider apiKey={apiKey}>
      <Map {...map}>
        <Marker {...marker} />
      </Map>
    </APIProvider>
  );
};

export default Maps;
