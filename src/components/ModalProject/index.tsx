import React from 'react';
import { Project } from '../../models/projects.models';
import { FaGlobe, FaTelegram, FaX } from 'react-icons/fa6';
import { GiEnergyArrow } from 'react-icons/gi';
import Modal from '../Modal';
import Button from '../Button';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    // if (!isVisible) return null;

    return (
        <Modal id={project.projectName} open>
            <div className="p-6 space-y-6">
                <h2 className="text-3xl font-extrabold text-dark text-center uppercase">
                    {project.projectName}
                </h2>
                <p className="text-lg text-gray-600">{project.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <p><strong>Organization Type:</strong> {project.organizationType}</p>
                    <p><strong>Date:</strong> {project.date}</p>
                    <p><strong>City:</strong> {project.city}</p>
                    <p><strong>Country:</strong> {project.country}</p>
                    <p><strong>Region:</strong> {project.region}</p>
                    <p><strong>Energy Category:</strong> <GiEnergyArrow className="inline-block mr-2" />{project.energyCategory}</p>
                    <p><strong>Sub Category:</strong> {project.subCategory}</p>
                    <p><strong>Activity Status:</strong> {project.activityStatus}</p>
                    <p><strong>Source:</strong> {project.source}</p>
                    <p><strong>Latitude:</strong> {project.latitude}</p>
                    <p><strong>Longitude:</strong> {project.longitude}</p>
                </div>

                {project.blockchainImages.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-center">Blockchain Images</h3>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {project.blockchainImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Blockchain ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-center items-center mt-6">
                    <p className="p-4 rounded text-gray-800 shadow-md">
                        Blockchain: <span className="font-semibold">{project.blockchain}</span>
                    </p>
                </div>
                <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-full btn-primary text-white rounded-full"
                >
                    <FaGlobe /> Visit Website
                </a>
                <div className="flex justify-center mt-6">
                    <Button className="btn bg-[#0098EA] text-white rounded-full hover:bg-blue-300 transition-all flex items-center gap-2 w-full">
                        <FaTelegram /> Donate to this project
                    </Button>
                </div>
                <Button onClick={onClose} className="btn bg-red-600 text-white w-full rounded-badge">
                    <FaX />
                    Close
                </Button>
            </div>
        </Modal>
    );
};

export default ProjectModal;
