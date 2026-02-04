import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './BalanceCard.css';

interface BalanceCardProps {
    balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currency, setCurrency] = useState('UDS');

    const toggleCurrency = () => {
        const currencies = ['UDS', 'NGN', 'GBP'];
        const currentIdx = currencies.indexOf(currency);
        setCurrency(currencies[(currentIdx + 1) % currencies.length]);
    };

    const getSymbol = () => {
        if (currency === 'NGN') return '₦';
        if (currency === 'GBP') return '£';
        return '$'; // Normal USD icon requested
    };

    const formatAmount = (amount: number) => {
        return amount.toLocaleString();
    };

    return (
        <div className="balance-wrapper">
            <div className="yc-label">Somebody call YCombinator and A16z!!!</div>
            <div className="balance-card">
                <div className="balance-header">
                    <span className="balance-label">Balance</span>
                </div>

                <div className="balance-content">
                    <div className="amount-section">
                        <h1 className="balance-amount">
                            {isVisible ? (
                                <>{getSymbol()} {formatAmount(balance)} <span className="currency-suffix">{currency === 'UDS' ? 'dullars' : currency}</span></>
                            ) : '••••••••'}
                        </h1>
                        <span className="last-updated">last updated just now</span>
                    </div>

                    <div className="currency-control">
                        <button className="currency-btn" onClick={toggleCurrency}>
                            {currency} <span className="dropdown-arrow">▼</span>
                        </button>
                        <button
                            className="toggle-visibility-btn"
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BalanceCard;
