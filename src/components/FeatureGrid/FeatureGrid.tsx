import { ArrowUpRight, ArrowDownLeft, Search, GraduationCap, Banknote, Lightbulb, ChevronRight } from 'lucide-react';
import './FeatureGrid.css';

const features = [
    { icon: <ArrowUpRight size={20} />, label: 'Withdrawal (Cash-Out)', color: '#FF3B30' },
    { icon: <ArrowDownLeft size={20} />, label: 'Transfer', color: '#00C853' },
    { icon: <Search size={20} />, label: 'Balance Enquiry', color: '#2979FF' },
    { icon: <GraduationCap size={20} />, label: 'NELFund (Student bread)', color: '#FF9500' },
    { icon: <Banknote size={20} />, label: 'Borrow from LAPO', color: '#AF52DE' },
    { icon: <Lightbulb size={20} />, label: 'Utility & Bills', color: '#FFCC00' },
];

interface FeatureGridProps {
    onFeatureClick?: (feature: string) => void;
}

const FeatureGrid = ({ onFeatureClick }: FeatureGridProps) => {
    const handleFeatureClick = (label: string) => {
        if (onFeatureClick) {
            if (label.includes('Withdrawal')) onFeatureClick('withdrawal');
            if (label.includes('Transfer')) onFeatureClick('transfer');
        }
    };

    return (
        <div className="feature-list-container">
            <h3 className="section-title">Features</h3>
            <div className="feature-list">
                {features.map((feature, index) => (
                    <button
                        key={index}
                        className="feature-item"
                        onClick={() => handleFeatureClick(feature.label)}
                    >
                        <div className="feature-left">
                            <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                                {feature.icon}
                            </div>
                            <span className="feature-label">{feature.label}</span>
                        </div>
                        <ChevronRight size={16} className="feature-chevron" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FeatureGrid;
