import { useState, useEffect } from 'react';
import MapComponent from '../MapComponent';
import FiltersComponent from '../FiltersComponent';
import { Project } from '../../models/projects.models';
import { getProjectsFilters } from '../../services/projects.service';
import { Filters } from '../../types/filters.type';

import ProjectModal from '../ModalProject';
import FormRegisterProject from '../FormRegisterProject';
import "./index.css"

const MapContainer = () => {
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const filters: Filters = {
        blockchain: '',
        activityStatus: '',
        country: '',
        region: '',
        category: '',
        organizationType: '',
        date: '',
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            getProjectsFilters(filters).then((response) => {
                setFilteredProjects(response.data as Project[]);
            });
        });
    }, []);

    const applyFilters = async (filters: Filters) => {
        const filtered = getProjectsFilters(filters).then((response) => {
            return response.data || response as Project[];
        });
        setFilteredProjects(await filtered);
    };

    const handleSelectProject = (project: Project) => {
        setSelectedProject(project);
    };



    return (
        <div>
            {userLocation ? (
                <>
                    <FormRegisterProject getProjects={
                        () => getProjectsFilters(filters).then((response) => {
                            setFilteredProjects(response.data as Project[]);
                        })
                    } />
                    <FiltersComponent applyFilters={applyFilters} />
                    <MapComponent
                        userLocation={userLocation}
                        projects={filteredProjects}
                        onSelectProject={handleSelectProject}
                    />

                    {selectedProject && (
                        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} key={selectedProject.projectName} />
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
