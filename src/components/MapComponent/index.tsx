import { useRef, useEffect, useCallback, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Project } from "../../models/projects.models";
import useCoordinates from "../../hooks/useCoordinates";
// const { MapboxDirections } = require('@mapbox/mapbox-gl-directions');
import { useViewProjects } from "../../hooks/useViewProjects";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css";
import Button from "../Button";
import { IoIosCloseCircle } from "react-icons/io";

interface MapComponentProps {
    userLocation: { latitude: number; longitude: number };
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ userLocation, projects, onSelectProject }) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const { viewProjects, setViewProjects } = useViewProjects();
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);
    const setCoordinates = useCoordinates().setCoordinates;
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const createMarkers = useCallback(() => {
        if (mapRef.current) {
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            projects.forEach((project) => {
                // Filtrar proyectos con coordenadas inválidas
                if (
                    project.latitude === 0 ||
                    project.longitude === 0
                ) {
                    return;
                }

                const el: HTMLDivElement = document.createElement("div");
                el.className = "marker";
                el.style.backgroundColor = `${project.energyCategory.color}`;
                el.style.width = "15px";
                el.style.height = "15px";
                el.style.cursor = "pointer";
                el.style.borderRadius = "50%";
                el.style.border = "1px solid #333";
                el.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

                // Crear el marcador y añadirlo al mapa
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([project.longitude, project.latitude])
                    .addTo(mapRef.current as mapboxgl.Map);

                // Agregar evento de clic para mover el mapa y seleccionar el proyecto
                el.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (mapRef.current) {
                        mapRef.current.flyTo({
                            center: [project.longitude, project.latitude],
                            zoom: 10,
                            pitch: 45,
                            essential: true,
                        });
                        const onMoveEnd = () => {
                            onSelectProject(project);
                            if (mapRef.current) {
                                mapRef.current.off("moveend", onMoveEnd);
                            }
                        };
                        mapRef.current.on("moveend", onMoveEnd);
                    }
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
                projection: "globe",
                style: isMobile
                    ? "mapbox://styles/mapbox/standard"
                    : "mapbox://styles/mapbox/standard",
                zoom: 4,
                tessellationStep: 2,
                touchPitch: true,
            });
            //fix the typo of mapboxgl
            // mapRef.current.addControl(new MapboxDirections({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl as any }) as unknown as mapboxgl.IControl);
            mapRef.current.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl as any }) as unknown as mapboxgl.IControl);
            mapRef.current.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true, showUserLocation: true }));
            mapRef.current.addControl(new mapboxgl.NavigationControl());
            mapRef.current.addControl(new mapboxgl.FullscreenControl());

            const secondsPerRevolution = 240;
            const maxSpinZoom = 5;
            const slowSpinZoom = 3;
            let userInteracting = false;
            const spinEnabled = true;
            function spinGlobe() {
                const zoom = mapRef.current?.getZoom() ?? 0;
                if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
                    let distancePerSecond = 360 / secondsPerRevolution;
                    if (zoom > slowSpinZoom) {
                        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                        distancePerSecond *= zoomDif;
                    }
                    const center = mapRef.current?.getCenter();
                    if (!center) return;
                    center.lng -= distancePerSecond;
                    mapRef.current?.easeTo({ center, duration: 1000, easing: (n) => n });
                }
            }
            mapRef.current.on("click", (e) => {
                if (!mapRef.current) return;

                // Verifica si el clic fue en un marcador
                const features = mapRef.current.queryRenderedFeatures(e.point, {
                    layers: [], // Debes usar el id de la capa de tus marcadores si los has agregado a través de una fuente
                });

                if (features.length) {
                    // Si hay características en el punto del clic, significa que el clic fue en un marcador.
                    return;
                }

                // Si no se hizo clic en un marcador, procede a capturar las coordenadas y mostrar el modal del proyecto
                const { lng, lat } = e.lngLat;

                const modal = document.getElementById("modal-register-project") as HTMLDialogElement;
                modal?.showModal();
                setCoordinates(lat, lng);
            });

            mapRef.current?.on("mousedown", () => {
                userInteracting = true;
            });
            mapRef.current?.on("dragstart", () => {
                userInteracting = true;
            });
            mapRef.current?.on("moveend", () => {
                spinGlobe();
            });

            spinGlobe();
            createMarkers();
        }
    }, [userLocation, createMarkers, isMobile, setCoordinates]);

    useEffect(() => {
        createMarkers();


    }, [projects, createMarkers]);

    useEffect(() => {
        const handleScroll = () => {
            projects.forEach((project) => {
                const element = document.getElementById(project.projectName);
                if (element) {
                    const bounds = element.getBoundingClientRect();
                    const featuresContainer = document.getElementById("features");
                    const containerBounds = featuresContainer?.getBoundingClientRect();
                    if (containerBounds && bounds.top < containerBounds.bottom && bounds.bottom > containerBounds.top) {
                        if (activeProject !== project.projectName) {
                            setActiveProject(project.projectName);
                            mapRef.current?.flyTo({
                                center: [project.longitude, project.latitude],
                                zoom: 10,
                                pitch: 45,
                                essential: true,
                            });
                        }
                    }
                }
            });
        };

        const featuresContainer = document.getElementById("features");
        featuresContainer?.addEventListener("scroll", handleScroll);
        return () => {
            featuresContainer?.removeEventListener("scroll", handleScroll);
        };
    }, [projects, activeProject, createMarkers, viewProjects]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div ref={mapContainerRef} id="map" style={{ width: "100%", height: "100vh" }} />
            {viewProjects && (
                <div id="features" className="bg-white z-50 flex-col flex">
                    <div className="flex justify-end top-0 sticky z-10">
                        <Button onClick={() => setViewProjects(false)} className="top-0 right-0 m-4 text-2xl text-dark">
                            <IoIosCloseCircle />
                        </Button>
                    </div>
                    {projects.map((project) => (
                        <section key={project.projectName} id={project.projectName} className={activeProject === project.projectName ? "active" : ""}>
                            <h3>{project.projectName}</h3>
                            <p>{project.description}</p>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MapComponent;
