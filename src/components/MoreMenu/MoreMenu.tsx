import { Crown, CreditCard, ShieldCheck, Users, Lock, FileText, LogOut, ChevronRight, User } from 'lucide-react';
import './MoreMenu.css';

const menuItems = [
    { icon: <Crown size={20} className="icon-gold" />, label: 'Get AntipOS Premium', desc: null },
    { icon: <CreditCard size={20} />, label: 'Cards', desc: null },
    { icon: <ShieldCheck size={20} />, label: 'Security', desc: null },
    { icon: <Users size={20} />, label: 'Referrals', desc: null },
    { icon: <Lock size={20} />, label: 'Account Limits', desc: null },
    { icon: <FileText size={20} />, label: 'Legal', desc: null },
];

const MoreMenu = () => {
    const handleSignout = () => {
        alert("You a'int going nowhere! 😈");
    };

    return (
        <div className="more-menu-container">
            <h2 className="more-title">More</h2>

            <div className="user-details-card">
                <div className="user-avatar-large">
                    <User size={32} />
                </div>
                <div className="user-text-info">
                    <h3 className="user-fullname">User</h3>
                    <p className="account-number">Account: 4194194194</p>
                </div>
                <ChevronRight size={20} className="chevron" />
            </div>

            <div className="menu-list">
                {menuItems.map((item, index) => (
                    <button key={index} className="menu-item">
                        <div className="menu-item-left">
                            <div className="menu-icon-wrapper">
                                {item.icon}
                            </div>
                            <span className="menu-label">{item.label}</span>
                        </div>
                        <ChevronRight size={16} className="menu-chevron" />
                    </button>
                ))}

                <button className="menu-item signout" onClick={handleSignout}>
                    <div className="menu-item-left">
                        <div className="menu-icon-wrapper">
                            <LogOut size={20} color="#FF3B30" />
                        </div>
                        <span className="menu-label text-danger">Signout</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default MoreMenu;
