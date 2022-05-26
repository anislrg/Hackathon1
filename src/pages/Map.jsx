/* eslint-disable no-shadow */
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import StatApi from "@components/StatApi";
import StatApiDesktop from "@components/StatApiDesktop";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import "./Map.css";

const center = { lat: 48.473746, lng: 1.011606 };

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();

  const destinationRef = useRef();

  if (!isLoaded) {
    return <h1>Loading ...</h1>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(
      parseInt(results.routes[0].legs[0].distance.text.split(" ")[0], 10)
    );
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }
  return (
    <div className="map-page">
      <section className="search-container">
        <div className="itineraire">
          <div>
            <Autocomplete>
              <input
                type="text"
                placeholder="Départ"
                className="depart-destination"
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div>
            <Autocomplete>
              <input
                type="text"
                placeholder="Destination"
                className="depart-destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
          <div className="calcule">
            <button
              type="button"
              className="btn-calcul"
              onClick={calculateRoute}
            >
              Calculer itinéraire
            </button>
            <button type="button" className="btn-calcul" onClick={clearRoute}>
              <FaTimes />
            </button>
            <button
              type="button"
              className="btn-calcul"
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            >
              <FaLocationArrow className="fleche" />
            </button>
          </div>
        </div>
        <div className="btn">
          <p>
            Distance: {distance} {distance !== "" ? "km" : null}
          </p>
          <p>Durée: {duration}</p>
        </div>
        {distance !== "" && <StatApiDesktop distance={distance} />}
      </section>
      <section className="map-container">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
          options={{
            mapId: "5494dc86c995126a",
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            disableDefaultUI: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </section>
      {distance !== "" && <StatApi distance={distance} />}
    </div>
  );
};
export default Map;
