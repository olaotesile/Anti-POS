import { useState } from 'react';
import { Wifi, Loader2, CheckCircle, ChevronLeft } from 'lucide-react';
import '../Modals/Modals.css'; // Reuse stylings
import './Pages.css';

interface WithdrawPageProps {
    onBack: () => void;
    onWithdraw: (amount: number) => void;
}

const WithdrawPage = ({ onBack, onWithdraw }: WithdrawPageProps) => {
    const [step, setStep] = useState<'tap' | 'detecting' | 'details' | 'pin' | 'success'>('tap');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleTap = () => {
        setStep('detecting');
        setTimeout(() => {
            setStep('details');
        }, 1500);
    };

    const handleAmountSubmit = () => {
        if (!amount) return;
        setStep('pin');
    };

    const handlePinSubmit = () => {
        if (pin.length !== 4) return;
        setTimeout(() => {
            onWithdraw(Number(amount));
            setStep('success');
        }, 1000);
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <button className="back-btn-circle" onClick={onBack}>
                    <ChevronLeft size={24} />
                </button>
                <h1 className="page-title-small">Withdraw Cash</h1>
            </header>

            <div className="page-content withdraw-page-layout">
                {step === 'tap' && (
                    <div className="step-tap" onClick={handleTap}>
                        <div className="tap-animation">
                            <Wifi size={64} />
                        </div>
                        <p>Tap card to begin</p>
                    </div>
                )}

                {step === 'detecting' && (
                    <div className="step-loading">
                        <Loader2 size={48} className="spinner" />
                        <p>Reading Card...</p>
                    </div>
                )}

                {step === 'details' && (
                    <div className="step-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div className="detected-card">
                            <div className="card-mini">
                                <span>AntiPOS Bank</span>
                                <span>**** 9012</span>
                            </div>
                            <div className="card-info">
                                <span className="label">Account Name</span>
                                <span className="value">USER</span>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Amount to Withdraw</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                autoFocus
                                className="rounded-input"
                            />
                        </div>

                        <button className="primary-btn action-btn-bottom" onClick={handleAmountSubmit}>
                            Next
                        </button>
                    </div>
                )}

                {step === 'pin' && (
                    <div className="step-pin" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3>Enter PIN</h3>
                        <p>Enter your 4-digit PIN to confirm</p>
                        <input
                            type="password"
                            maxLength={4}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="pin-input"
                            autoFocus
                        />
                        <button className="primary-btn action-btn-bottom" onClick={handlePinSubmit} disabled={pin.length < 4}>
                            Confirm
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="step-success">
                        <CheckCircle size={64} className="success-icon" />
                        <h3>Withdrawal Successful</h3>
                        <p>Take your cash 💸</p>
                        <button className="primary-btn" onClick={onBack}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawPage;
