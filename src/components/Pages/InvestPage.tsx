import { ChevronLeft, ExternalLink } from 'lucide-react';
import './Pages.css';

interface InvestPageProps {
    onBack: () => void;
}

const projects = [
    {
        name: 'Nexr',
        description: 'The future of something amazing',
        url: 'https://Nexr.io'
    },
    {
        name: 'Sentra',
        description: 'Security-first infrastructure',
        url: 'https://github.com/olaotesile/sentra'
    },
    {
        name: 'Kenate',
        description: 'Developer tools that scale',
        url: 'https://github.com/olaotesile/Kenate'
    },
    {
        name: 'Chardow',
        description: 'Design meets functionality',
        url: 'https://github.com/olaotesile/Chardow'
    }
];

const InvestPage = ({ onBack }: InvestPageProps) => {
    return (
        <div className="page-container">
            <header className="page-header transfer-header">
                <div className="header-left">
                    <button className="back-btn-transparent" onClick={onBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="page-title-small">Invest in the Future</h1>
                </div>
            </header>

            <div className="page-content transfer-layout">
                <h2 className="invest-section-title">All Assets Offerings</h2>
                <div className="invest-square-grid">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="invest-square-card"
                        >
                            <div className="invest-link-icon-wrapper">
                                <ExternalLink size={20} color="#00C853" />
                            </div>
                            <h3 className="invest-square-name">{project.name}</h3>
                            <p className="invest-square-desc">{project.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestPage;
