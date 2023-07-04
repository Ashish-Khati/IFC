/* eslint-disable no-undef */
import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import style from "../pages/Tracking/Tracking.module.css";

export default function TrackingMap({ markerPos }) {
  return (
    <>
      <GoogleMap
        zoom={10}
        center={markerPos}
        clickableIcons={false}
        mapContainerClassName={style.mapStyling}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {markerPos && <Marker position={markerPos} />}
      </GoogleMap>
    </>
  );
}
