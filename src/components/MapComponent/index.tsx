import { useRef, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Project } from '../../models/projects.models';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

interface MapComponentProps {
    userLocation: { latitude: number; longitude: number };
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ userLocation, projects, onSelectProject }) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    const createMarkers = useCallback(() => {
        if (mapRef.current) {
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];

            projects.forEach((project) => {
                const el: HTMLDivElement = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = `url('/marker.png')`;
                el.style.width = '50px';
                el.style.height = '50px';
                el.style.cursor = 'pointer';
                el.style.backgroundSize = 'cover';


                const marker = new mapboxgl.Marker(
                    el
                )
                    .setLngLat([project.longitude, project.latitude])
                    .addTo(mapRef.current as mapboxgl.Map);


                el.addEventListener('click', () => {
                    mapRef.current?.flyTo({
                        center: [project.longitude, project.latitude],
                        zoom: 10,
                        essential: true
                    });

                    onSelectProject(project);
                });

                markersRef.current.push(marker);
            });
        }
    }, [projects, onSelectProject]);

    useEffect(() => {
        if (userLocation && mapContainerRef.current && !mapRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY as string;
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                center: [userLocation.longitude, userLocation.latitude],
                projection: 'globe',
                zoom: 2,
            });

            mapRef.current.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl as any }));
            mapRef.current.addControl(new mapboxgl.GeolocateControl());
            mapRef.current.addControl(new mapboxgl.NavigationControl());
            createMarkers();
        }
    }, [userLocation, createMarkers]);

    useEffect(() => {
        createMarkers();
    }, [projects, createMarkers]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
