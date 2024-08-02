import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

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
