import { ArrowUpRight, ArrowDownLeft, Store, Car, PlayCircle, ChevronLeft } from 'lucide-react';
import './TransactionList.css';

interface TransactionListProps {
    onBack: () => void;
    onTransactionClick: (tx: any) => void;
}

const transactions = [
    { icon: <Car size={20} />, label: 'Uber Ride', amount: '-$15.00', date: 'Today, 2:30 PM', type: 'debit', color: '#000' },
    { icon: <Store size={20} />, label: 'Chicken Republic', amount: '-₦4,500', date: 'Yesterday, 1:15 PM', type: 'debit', color: '#FF0000' },
    { icon: <PlayCircle size={20} />, label: 'Netflix Subscription', amount: '-$12.99', date: 'Feb 1, 9:00 AM', type: 'debit', color: '#E50914' },
    { icon: <ArrowUpRight size={20} />, label: 'Transfer to Opay', amount: '-₦50,000', date: 'Jan 30, 4:20 PM', type: 'debit', color: '#00C853' },
    { icon: <ArrowDownLeft size={20} />, label: 'Refund from Jumia', amount: '+₦12,500', date: 'Jan 28, 10:00 AM', type: 'credit', color: '#FF9900' },
    { icon: <Store size={20} />, label: 'Shoprite', amount: '-₦35,000', date: 'Jan 25, 6:45 PM', type: 'debit', color: '#FF3B30' },
];

const TransactionList = ({ onBack, onTransactionClick }: TransactionListProps) => {
    return (
        <div className="transaction-list-container">
            <div className="transaction-header">
                <button onClick={onBack} className="back-btn">
                    <ChevronLeft size={24} />
                    <span>Back</span>
                </button>
                <h3>Transactions</h3>
            </div>

            <div className="transaction-items">
                {transactions.map((tx, index) => (
                    <div key={index} className="transaction-item" onClick={() => onTransactionClick(tx)} style={{ cursor: 'pointer' }}>
                        <div className="tx-icon" style={{ backgroundColor: `${tx.color}20`, color: tx.color }}>
                            {tx.icon}
                        </div>
                        <div className="tx-details">
                            <span className="tx-label">{tx.label}</span>
                            <span className="tx-date">{tx.date}</span>
                        </div>
                        <span className={`tx-amount ${tx.type === 'credit' ? 'credit' : ''}`}>
                            {tx.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
