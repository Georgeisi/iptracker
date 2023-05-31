import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MyMarker from "./MyMarker";

const Map = ({ lat, lng }) => {
  const position = [lat, lng];

  return (
    <MapContainer
      style={{ width: "100vw", height: "70vh" }}
      center={position}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <SetViewOnClick animateref={position}/> */}
      {/* <SetCords position={position}/> */}
      <MyMarker position={position} />
    </MapContainer>
  );
};

export default Map;
