import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import DataGoods from '../../DataGoodsUbi.json'

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


                DataGoods.forEach((project) => {
                    const marker = new mapboxgl.Marker()
                        .setLngLat([project.longitude, project.latitude])
                        .addTo(mapRef.current as mapboxgl.Map);
                    marker.getElement().addEventListener('click', () => {
                        mapRef.current?.flyTo({
                            center: [project.longitude, project.latitude],
                            zoom: 10,
                        });
                    });


                    // Configura el evento de clic para abrir el modal
                    marker.getElement().addEventListener('click', () => {
                        // Rellenar el contenido del modal
                        const modalTitle = document.getElementById('modal-title');
                        const modalDescription = document.getElementById('modal-description');
                        const modalWebsite = document.getElementById('modal-website');
                        const modalImage = document.getElementById('modal-image');

                        if (modalTitle && modalDescription && modalWebsite && modalImage) {
                            modalTitle.textContent = project.projectName;
                            modalDescription.textContent = project.description;
                            (modalWebsite as HTMLAnchorElement).href = project.website;
                            (modalImage as HTMLImageElement).src = project.blockchainImages[0] || 'https://via.placeholder.com/400';
                        }

                        // Abrir el modal
                        const modalCheckbox = document.getElementById('project-modal') as HTMLInputElement;
                        if (modalCheckbox) {
                            modalCheckbox.checked = true;
                        }
                    });
                });







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

            <input type="checkbox" id="project-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <figure>
                        <img id="modal-image" src="" alt="Project Image" />
                    </figure>
                    <div className="modal-body">
                        <h2 id="modal-title" className="card-title">
                            Project Name
                        </h2>
                        <p id="modal-description">Project Description</p>
                        <a id="modal-website" href="#" target="_blank" className="text-blue-500">Más información</a>
                        <div className="modal-action">
                            <label htmlFor="project-modal" className="btn">Close</label>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Map;
