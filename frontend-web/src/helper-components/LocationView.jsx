import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const apiKey = "AIzaSyBy1NOGFFQuymSwJw0syVAR73lR1fhVLXg";

const LocationView = (props) => {
  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-96 w-full">
        <Map zoom={15} center={props.position}>
          <Marker position={props.position} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default LocationView;
