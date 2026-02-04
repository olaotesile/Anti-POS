import Modal from '../Modal/Modal';
import { Briefcase } from 'lucide-react';
import './Modals.css';

interface LAPOModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LAPOModal = ({ isOpen, onClose }: LAPOModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Borrow from LAPO">
            <div className="sporty-message-container">
                <div className="sporty-icon">
                    <Briefcase size={48} color="#AF52DE" />
                </div>
                <p className="sporty-text">Focus on your career so you'll stop borrowing money!!</p>
                <div className="sporty-subtext">I'm not borrowing you shingbain</div>
            </div>
        </Modal>
    );
};

export default LAPOModal;
