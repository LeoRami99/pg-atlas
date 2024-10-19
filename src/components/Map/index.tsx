import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'

// type MapProps = {
//     props?: any;
// }

const Map = () => {
    useEffect(() => {
        let latitude: number;
        let longitude: number;
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string;
            if (mapContainerRef.current) {
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    center: [longitude, latitude],
                    projection: "globe",

                });
                // conntroles del mapa
                mapRef.current.addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl as any,
                    })
                );
                mapRef.current.addControl(
                    new mapboxgl.GeolocateControl({
                        positionOptions: {
                            enableHighAccuracy: true
                        },
                        trackUserLocation: true,
                        showUserHeading: true,
                        fitBoundsOptions: {
                            pitch: 20,
                            animate: true

                        }
                    })
                );
                mapRef.current.addControl(new mapboxgl.FullscreenControl());
                mapRef.current.addControl(new mapboxgl.NavigationControl());
            }
        });

        return () => {
            mapRef.current?.remove();
        }
    }, [])
    const mapRef = useRef<mapboxgl.Map>()
    const mapContainerRef = useRef<HTMLDivElement>(null)


    return (
        <>
            <div id='map-container' ref={mapContainerRef} />
        </>
    )
}

export default Map;