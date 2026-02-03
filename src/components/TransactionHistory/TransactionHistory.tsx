import { Receipt } from 'lucide-react';
import './TransactionHistory.css';

interface TransactionHistoryProps {
    onToggle: () => void;
}

const TransactionHistory = ({ onToggle }: TransactionHistoryProps) => {
    return (
        <div className="transaction-history-container">
            <button className="view-history-btn" onClick={onToggle}>
                <Receipt size={20} />
                <span>View Transaction History</span>
                <div className="receipt-stack">
                    <div className="receipt-mock"></div>
                    <div className="receipt-mock"></div>
                </div>
            </button>
        </div>
    );
};

export default TransactionHistory;
