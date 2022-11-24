import React from 'react'
import { GoogleMap, LoadScript, useGoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.90237549367343,
  lng: -56.164436903809175
};

function MyComponent(): JSX.Element | null {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_API_KEY as string
  })

  if (!isLoaded) return null;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </>

  )
}

export default React.memo(MyComponent)