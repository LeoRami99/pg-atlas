import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

const Map = () => {
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        if (!userLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string;
            if (mapContainerRef.current && !mapRef.current) {
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    center: [userLocation.longitude, userLocation.latitude],
                    projection: 'globe',
                    zoom: 2,
                });

                // Controles del mapa
                mapRef.current.addControl(
                    new MapboxGeocoder({
                        accessToken: mapboxgl.accessToken,
                        mapboxgl: mapboxgl as any,
                    })
                );
                mapRef.current.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                    },
                    trackUserLocation: true,
                    showUserHeading: true,
                    fitBoundsOptions: {
                        pitch: 20,
                        zoom: 17,
                    },
                }));

                mapRef.current.addControl(new mapboxgl.FullscreenControl());
                mapRef.current.addControl(new mapboxgl.NavigationControl());
            }
        }

        return () => {
            mapRef.current?.remove();
        };
    }, [userLocation]);

    const mapRef = useRef<mapboxgl.Map>();
    const mapContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {userLocation ? (
                <div id='map-container' ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
            ) : (
                <div className='flex justify-center items-center h-svh flex-col'>
                    <h1 className='text-2xl text-center'>
                        Cargando ubicación... <br />
                        Por favor, acepta la solicitud de ubicación
                    </h1>
                    <img src="/logoPgAtlas.png" alt="Logo PGAtlas" className="w-96" />
                </div>
            )}
        </>
    );
};

export default Map;
