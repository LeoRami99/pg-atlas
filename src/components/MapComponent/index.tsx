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
            // Remove existing markers to prevent duplicates
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];

            projects.forEach((project) => {
                const marker = new mapboxgl.Marker({
                    color: '#FF0000',
                })
                    .setLngLat([project.longitude, project.latitude])
                    .addTo(mapRef.current as mapboxgl.Map);
                marker.getElement().addEventListener('click', () => onSelectProject(project));
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

            // Create markers after map is initialized
            createMarkers();
        }
    }, [userLocation, createMarkers]);

    useEffect(() => {
        // Update markers when projects change
        createMarkers();
    }, [projects, createMarkers]);

    useEffect(() => {
        if (mapRef.current) {
            const handleMoveEnd = () => {
                if (mapRef.current) {
                    const bounds = mapRef.current.getBounds();
                    markersRef.current.forEach((marker, index) => {
                        const project = projects[index];
                        if (bounds?.contains([project.longitude, project.latitude])) {
                            marker.getElement().style.display = 'block';
                        } else {
                            marker.getElement().style.display = 'none';
                        }
                    });
                }
            };

            mapRef.current.on('moveend', handleMoveEnd);

            return () => {
                if (mapRef.current) {
                    mapRef.current.off('moveend', handleMoveEnd);
                }
            };
        }
    }, [projects]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
