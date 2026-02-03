import Modal from '../Modal/Modal';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import './Modals.css';

interface AddMoneyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddMoneyModal = ({ isOpen, onClose }: AddMoneyModalProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('4194194194');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Money">
            <div className="bank-details-container">
                <div className="bank-info-row">
                    <span className="label">Bank Name</span>
                    <span className="value">Opay</span>
                </div>
                <div className="bank-info-row">
                    <span className="label">Account Number</span>
                    <div className="value-with-copy">
                        <span>4194194194</span>
                        <button className="copy-btn" onClick={handleCopy}>
                            {copied ? <CheckCircle size={16} color="#00C853" /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>
                <div className="bank-info-row">
                    <span className="label">Account Name</span>
                    <span className="value">User</span>
                </div>

                <div className="info-note">
                    Transfer to this account to top up your AntipOS balance.
                </div>
            </div>
        </Modal>
    );
};

export default AddMoneyModal;
