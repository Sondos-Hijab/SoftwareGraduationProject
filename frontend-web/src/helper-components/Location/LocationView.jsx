import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import React from "react";

const containerStyle = {
  width: "100%",
  height: "30rem",
};

const LocationView = (props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBy1NOGFFQuymSwJw0syVAR73lR1fhVLXg",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.position}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={props.position} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default LocationView;
