import { useState, useEffect } from 'react';
import MapComponent from '../MapComponent';
import FiltersComponent from '../FiltersComponent';
// import ProjectModal from './ProjectModal';
import DataGoods from '../../DataGoodsUbi.json';
import { Project } from '../../models/projects.models';

const MapContainer = () => {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(DataGoods as Project[]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    const applyFilters = (filters: { city?: string; country?: string; blockchain?: string }) => {
        const filtered = DataGoods.filter((project: Project) => {
            return (!filters.city || project.city === filters.city) &&
                (!filters.country || project.country === filters.country) &&
                (!filters.blockchain || project.blockchain === filters.blockchain);
        });
        setFilteredProjects(filtered);
    };

    return (
        <div>
            {userLocation ? (
                <>
                    <FiltersComponent applyFilters={applyFilters} />
                    <MapComponent
                        userLocation={userLocation}
                        projects={filteredProjects}
                        onSelectProject={setSelectedProject}
                    />
                    {/* {selectedProject && <ProjectModal project={selectedProject} />} */}
                </>
            ) : (
                <div className='flex justify-center items-center h-screen flex-col'>
                    <h1 className='text-2xl text-center'>
                        Cargando ubicación... <br />
                        Por favor, acepta la solicitud de ubicación
                    </h1>
                    <img src="/logoPgAtlas.png" alt="Logo PGAtlas" className="w-96" />
                </div>
            )}
        </div>
    );
};

export default MapContainer;
