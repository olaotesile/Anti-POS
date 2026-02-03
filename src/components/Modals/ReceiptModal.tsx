import Modal from '../Modal/Modal';
import { Share2, ChevronLeft, AlertCircle } from 'lucide-react';
import './Modals.css';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: any;
}

const ReceiptModal = ({ isOpen, onClose, transaction }: ReceiptModalProps) => {
    if (!transaction) return null;

    const handleReport = () => {
        alert("Deal with it boy");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="receipt-modal-dark">
            <div className="receipt-header">
                <button className="icon-btn-small" onClick={onClose}>
                    <ChevronLeft size={20} />
                </button>
                <span className="header-title">Transaction</span>
                <button className="icon-btn-small">
                    <Share2 size={20} />
                </button>
            </div>

            <div className="receipt-body-scroll">
                <div className="receipt-main-amount">
                    <div className="amount-text">{transaction.amount}</div>
                    <div className="status-badge">Successful</div>
                    <div className="sub-detail">
                        {transaction.date}
                    </div>
                </div>

                <div className="receipt-section">
                    <div className="detail-row">
                        <span className="detail-label">To</span>
                        <span className="detail-value">{transaction.label}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Bank</span>
                        <span className="detail-value">Kadu Bank</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Description</span>
                        <span className="detail-value">Payment for services</span>
                    </div>
                </div>

                <div className="receipt-section">
                    <div className="detail-row">
                        <span className="detail-label">Payment Method</span>
                        <span className="detail-value">Transfer</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Tinubu's money (Tax)</span>
                        <span className="detail-value">5 dullars</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Account Number</span>
                        <span className="detail-value">2024559102</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Transaction Reference</span>
                        <span className="detail-value tx-ref">REF-{Math.floor(10000000 + Math.random() * 90000000)}</span>
                    </div>
                </div>

                <button className="report-btn" onClick={handleReport}>
                    <AlertCircle size={16} />
                    Report an Issue
                </button>
            </div>
        </Modal>
    );
};

export default ReceiptModal;
