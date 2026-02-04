import { useState } from 'react';
import { ChevronLeft, Printer, CreditCard } from 'lucide-react';
import './Pages.css';

interface BalanceEnquiryPageProps {
    onBack: () => void;
}

const BalanceEnquiryPage = ({ onBack }: BalanceEnquiryPageProps) => {
    const [step, setStep] = useState<'account' | 'pin' | 'result'>('account');
    const [accountNumber, setAccountNumber] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAccountNext = () => {
        if (accountNumber.length !== 10) {
            alert("Please enter a valid 10-digit account number");
            return;
        }
        setStep('pin');
    };

    const handlePinSubmit = () => {
        if (pin.length !== 4) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('result');
        }, 1500); // Simulate network check
    };

    return (
        <div className="page-container">
            <header className="page-header transfer-header">
                <div className="header-left">
                    <button className="back-btn-transparent" onClick={onBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="page-title-small">Balance Enquiry</h1>
                </div>
            </header>

            <div className="page-content transfer-layout">
                {step === 'account' && (
                    <div className="transfer-card">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                backgroundColor: 'rgba(41, 121, 255, 0.1)', color: '#2979FF',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <CreditCard size={32} />
                            </div>
                        </div>
                        <h2 className="card-heading" style={{ textAlign: 'center' }}>Check Balance</h2>
                        <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
                            Enter your account number to retrieve current balance.
                        </p>

                        <div className="material-input-group">
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Account Number"
                                maxLength={10}
                                className="material-input"
                                autoFocus
                                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '1px' }}
                            />
                        </div>

                        <button
                            className="primary-btn green-pill-btn"
                            onClick={handleAccountNext}
                            style={{ stopColor: 'white' }}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === 'pin' && (
                    <div className="step-pin" style={{ marginTop: '2rem' }}>
                        <h3>Security Check</h3>
                        <p>Enter 4-digit PIN for Account ending in {accountNumber.slice(-4)}</p>
                        <input
                            type="password"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="pin-input"
                            autoFocus
                        />
                        <button
                            className="primary-btn green-pill-btn"
                            onClick={handlePinSubmit}
                            disabled={pin.length < 4 || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'View Balance'}
                        </button>
                    </div>
                )}

                {step === 'result' && (
                    <div className="page-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '2rem', flex: 1 }}>
                        <div className="balance-display-card" style={{
                            backgroundColor: '#121212',
                            padding: '2rem',
                            borderRadius: '16px',
                            width: '100%',
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            animation: 'slideIn 0.5s ease-out'
                        }}>
                            <span style={{ color: '#888', fontSize: '1rem' }}>Available Balance</span>
                            <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'white', margin: '1rem 0' }}>
                                $2,450,000<span style={{ fontSize: '1rem', color: '#888' }}>.00</span>
                            </h1>
                            <div style={{ color: '#00C853', fontSize: '0.9rem', fontWeight: '500' }}>
                                ● Account Active
                            </div>
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>Account: {accountNumber}</p>
                            </div>
                        </div>

                        <button className="green-pill-btn" style={{ marginTop: 'auto' }} onClick={() => alert("Printing Receipt... Brrr...")}>
                            <Printer size={20} style={{ marginRight: '8px' }} />
                            Print Receipt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BalanceEnquiryPage;
