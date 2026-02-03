import { Home, TrendingUp, BookOpen, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import './BottomNav.css';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling up or at/near top
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsVisible(true);
            }
            // Hide if scrolling down and not at top
            else if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`bottom-nav ${!isVisible ? 'hidden' : ''}`}>
            <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => onTabChange('home')}
            >
                <Home size={20} />
                <span className="nav-label">Home</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'invest' ? 'active' : ''}`}
                onClick={() => onTabChange('invest')}
            >
                <TrendingUp size={20} />
                <span className="nav-label">Invest</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'learn' ? 'active' : ''}`}
                onClick={() => onTabChange('learn')}
            >
                <BookOpen size={20} />
                <span className="nav-label">Learn</span>
            </button>
            <button
                className={`nav-item ${activeTab === 'more' ? 'active' : ''}`}
                onClick={() => onTabChange('more')}
            >
                <Menu size={20} />
                <span className="nav-label">More</span>
            </button>
        </nav>
    );
};

export default BottomNav;
