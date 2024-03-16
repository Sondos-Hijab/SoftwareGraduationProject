import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const apiKey = "AIzaSyBy1NOGFFQuymSwJw0syVAR73lR1fhVLXg";

const LocationView = (props) => {
  const position = { lat: 32.2228832, lng: 35.2457401 };

  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-96 w-full">
        <Map zoom={15} center={position}>
          <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default LocationView;
