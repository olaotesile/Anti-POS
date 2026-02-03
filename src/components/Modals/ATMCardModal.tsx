import Modal from '../Modal/Modal';
import './Modals.css';
import { Wifi } from 'lucide-react';

interface ATMCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ATMCardModal = ({ isOpen, onClose }: ATMCardModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="My Card">
            <div className="atm-card-visual">
                <div className="card-top">
                    <span className="card-bank">AntipOS Bank</span>
                    <Wifi size={24} className="contactless-icon" />
                </div>
                <div className="card-chip"></div>
                <div className="card-number">
                    <span>5399</span>
                    <span>1234</span>
                    <span>5678</span>
                    <span>9012</span>
                </div>
                <div className="card-details">
                    <div className="detail-group">
                        <span className="detail-label">Card Holder</span>
                        <span className="detail-value">USER</span>
                    </div>
                    <div className="detail-group">
                        <span className="detail-label">Expires</span>
                        <span className="detail-value">09/28</span>
                    </div>
                </div>
                <div className="card-brand">
                    <div className="circle red"></div>
                    <div className="circle yellow"></div>
                </div>
            </div>
        </Modal>
    );
};

export default ATMCardModal;
