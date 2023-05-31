import { icon } from "leaflet";
import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import locationIcon from '../images/icon-location.svg'

const MyMarker = ({ position }) => {
  const map = useMap()

  useEffect(()=>{
    map.flyTo(position, 13, {
      animate: true
    })

  }, [map, position])

  const myIcon = new icon({
    iconUrl: locationIcon,
    iconSize: [24, 32]
  })

  return (
    <Marker position={position} icon={myIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default MyMarker;
