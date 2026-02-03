import Modal from '../Modal/Modal';
import { Share2 } from 'lucide-react';
import './Modals.css';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any; // Type strictly later
}

const ReceiptModal = ({ isOpen, onClose, transaction }: ReceiptModalProps) => {
    if (!transaction) return null;

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Transaction Receipt',
                text: `Transaction of ${transaction.amount} at ${transaction.label}`,
            }).catch(console.error);
        } else {
            alert("Receipt shared! (Mock)");
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="receipt-modal">
            <div className="receipt-container">
                <div className="receipt-icon-large" style={{ color: transaction.color, backgroundColor: `${transaction.color}15` }}>
                    {transaction.icon}
                </div>

                <h2 className="receipt-amount">{transaction.amount}</h2>
                <div className="receipt-label">{transaction.label}</div>

                <div className="receipt-details-list">
                    <div className="receipt-row">
                        <span className="label">Date</span>
                        <span className="value">{transaction.date}</span>
                    </div>
                    <div className="receipt-row">
                        <span className="label">Transaction Type</span>
                        <span className="value">{transaction.type === 'debit' ? 'Debit' : 'Credit'}</span>
                    </div>
                    <div className="receipt-row">
                        <span className="label">Status</span>
                        <span className="value" style={{ color: '#00C853' }}>Successful</span>
                    </div>
                    <div className="receipt-row">
                        <span className="label">Reference</span>
                        <span className="value">REF-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                </div>

                <button className="share-btn" onClick={handleShare}>
                    <Share2 size={20} /> Share Receipt
                </button>
            </div>
        </Modal>
    );
};

export default ReceiptModal;
