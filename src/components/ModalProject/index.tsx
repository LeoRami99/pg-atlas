import React from 'react';

interface ProjectModalProps {
    project: {
        projectName: string;
        description: string;
        website: string;
        blockchainImages: string[];
    };
    isVisible: boolean;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <figure>
                    <img
                        src={project.blockchainImages[0] || 'https://via.placeholder.com/400'}
                        alt={project.projectName}
                    />
                </figure>
                <div className="modal-body">
                    <h2 className="card-title">{project.projectName}</h2>
                    <p>{project.description}</p>
                    <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Más información
                    </a>
                    <div className="modal-action">
                        <button onClick={onClose} className="btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
