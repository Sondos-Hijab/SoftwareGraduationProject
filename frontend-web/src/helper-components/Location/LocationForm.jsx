import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const apiKey = "AIzaSyBy1NOGFFQuymSwJw0syVAR73lR1fhVLXg";
const libraries = ["places"];

const LocationForm = (props) => {
  const position = { lat: 32.2228832, lng: 35.2457401 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const mapContainerStyle = {
    width: props.width,
    height: "300px",
  };
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={position}
        onClick={(event) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          props.handleMapClick({ lat, lng });
        }}
      >
        {props.selectedMarker && <Marker position={props.selectedMarker} />}
      </GoogleMap>
    </div>
  );
};

export default LocationForm;
