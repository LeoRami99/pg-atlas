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
                    {selectedProject && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                            {/* <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /> */}
                        </div>
                    )}

                </>
            ) : (
                <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-200 to-green-600 text-white'>
                    <img src='/logoPgAtlas.png' alt='PGAtlas Logo' className='w-64 mb-8' />
                    <h1 className='text-3xl font-bold text-center mb-4'>
                        Loading your location... <br />
                        Please accept the location request.
                    </h1>
                    <p className='text-lg text-center max-w-md'>
                        We need your permission to access your location in order to provide the best experience possible. Thank you for your patience!
                    </p>
                </div>

            )}
        </div>
    );
};

export default MapContainer;
