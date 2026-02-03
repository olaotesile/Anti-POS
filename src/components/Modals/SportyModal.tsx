import Modal from '../Modal/Modal';
import { Frown } from 'lucide-react';
import './Modals.css';

interface SportyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SportyModal = ({ isOpen, onClose }: SportyModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sporty">
            <div className="sporty-message-container">
                <div className="sporty-icon">
                    <Frown size={48} color="#FF3B30" />
                </div>
                <p className="sporty-text">Omo, God will deliver you ohh 🙏🏾</p>
                <div className="sporty-subtext">Stop gambling your school fees.</div>
            </div>
        </Modal>
    );
};

export default SportyModal;
