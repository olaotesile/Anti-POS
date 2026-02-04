import Modal from '../Modal/Modal';
import { ExternalLink, Rocket, Shield, Code, Palette } from 'lucide-react';
import './Modals.css';

interface InvestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const projects = [
    {
        name: 'Nexr',
        description: 'The future of something amazing',
        url: 'https://Nexr.io',
        icon: <Rocket size={24} />,
        color: '#00C853'
    },
    {
        name: 'Sentra',
        description: 'Security-first infrastructure',
        url: 'https://github.com/olaotesile/sentra',
        icon: <Shield size={24} />,
        color: '#2979FF'
    },
    {
        name: 'Kenate',
        description: 'Developer tools that scale',
        url: 'https://github.com/olaotesile/Kenate',
        icon: <Code size={24} />,
        color: '#FF9500'
    },
    {
        name: 'Chardow',
        description: 'Design meets functionality',
        url: 'https://github.com/olaotesile/Chardow',
        icon: <Palette size={24} />,
        color: '#AF52DE'
    }
];

const InvestModal = ({ isOpen, onClose }: InvestModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invest in the Future">
            <div className="invest-container">
                <p className="invest-intro">
                    Support these projects and be part of something big.
                </p>
                <div className="invest-grid">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="invest-card"
                        >
                            <div className="invest-icon" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                                {project.icon}
                            </div>
                            <div className="invest-info">
                                <h3 className="invest-name">{project.name}</h3>
                                <p className="invest-desc">{project.description}</p>
                            </div>
                            <ExternalLink size={16} className="invest-link-icon" />
                        </a>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default InvestModal;
