import { User, Bell, Search, ChevronRight } from 'lucide-react';
import './Header.css';

interface HeaderProps {
    userName?: string;
    onProfileClick?: () => void;
}

const Header = ({ userName = 'User', onProfileClick }: HeaderProps) => {
    return (
        <header className="header">
            <div className="user-info" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                <div className="avatar-placeholder">
                    <User size={20} />
                </div>
                <span className="user-name">{userName}</span>
                <ChevronRight size={16} className="chevron" />
            </div>

            <div className="search-container desktop-only">
                <Search size={18} className="search-icon-input" />
                <input type="text" placeholder="Search" className="search-input" />
            </div>

            <div className="header-actions">
                <button className="icon-btn mobile-only">
                    <Search size={18} />
                </button>
                <button className="icon-btn">
                    <Bell size={18} />
                </button>
            </div>
        </header>
    );
};

export default Header;
