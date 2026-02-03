import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';
import { Wifi, Loader2, CheckCircle } from 'lucide-react';
import './Modals.css';

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWithdraw: (amount: number) => void;
}

const WithdrawModal = ({ isOpen, onClose, onWithdraw }: WithdrawModalProps) => {
    const [step, setStep] = useState<'tap' | 'detecting' | 'details' | 'pin' | 'success'>('tap');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    // Reset when opened
    useEffect(() => {
        if (isOpen) {
            setStep('tap');
            setAmount('');
            setPin('');
        }
    }, [isOpen]);

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
        // Process withdrawal
        setTimeout(() => {
            onWithdraw(Number(amount));
            setStep('success');
        }, 1000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Cash">
            <div className="withdraw-container">
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
                    <div className="step-details">
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
                            />
                        </div>

                        <button className="primary-btn" onClick={handleAmountSubmit}>
                            Next
                        </button>
                    </div>
                )}

                {step === 'pin' && (
                    <div className="step-pin">
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
                        <button className="primary-btn" onClick={handlePinSubmit} disabled={pin.length < 4}>
                            Confirm
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="step-success">
                        <CheckCircle size={64} className="success-icon" />
                        <h3>Withdrawal Successful</h3>
                        <p>Take your cash 💸</p>
                        <button className="primary-btn" onClick={onClose}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WithdrawModal;
