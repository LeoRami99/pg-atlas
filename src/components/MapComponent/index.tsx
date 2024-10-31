import { useRef, useEffect } from 'react';
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

            projects.forEach((project) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([project.longitude, project.latitude])
                    .addTo(mapRef.current as mapboxgl.Map);
                marker.getElement().addEventListener('click', () => onSelectProject(project));
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [userLocation, projects, onSelectProject]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
