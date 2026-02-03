import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import './Modals.css';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTransfer: (amount: number, bank: string, account: string) => void;
}

const banks = [
    { name: 'Moniefoint', color: '#035397' },
    { name: 'Kadu', color: '#4B3F72' },
    { name: 'Ofay', color: '#00C853' },
    { name: 'UAB', color: '#D32F2F' },
    { name: 'Last Bank', color: '#F57C00' },
    { name: 'Unaccess Bank', color: '#0288D1' },
];

const TransferModal = ({ isOpen, onClose, onTransfer }: TransferModalProps) => {
    const [step, setStep] = useState<'bank' | 'account' | 'pin' | 'success'>('bank');
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStep('bank');
            setSelectedBank('');
            setAccountNumber('');
            setAmount('');
            setPin('');
        }
    }, [isOpen]);

    const handleBankSelect = (bankName: string) => {
        setSelectedBank(bankName);
        setStep('account');
    };

    const handleAccountSubmit = () => {
        if (!accountNumber || !amount) return;
        setStep('pin');
    };

    const handlePinSubmit = () => {
        if (pin.length !== 4) return;
        setTimeout(() => {
            onTransfer(Number(amount), selectedBank, accountNumber);
            setStep('success');
        }, 1000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Transfer Money">
            <div className="withdraw-container">
                {step === 'bank' && (
                    <div className="bank-grid">
                        {banks.map((bank) => (
                            <button
                                key={bank.name}
                                className="bank-option"
                                onClick={() => handleBankSelect(bank.name)}
                            >
                                <div className="bank-icon" style={{ backgroundColor: `${bank.color}20`, color: bank.color }}>
                                    <Building2 size={24} />
                                </div>
                                <span>{bank.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 'account' && (
                    <div className="step-details">
                        <div className="input-group">
                            <label>Selected Bank</label>
                            <div className="selected-bank-display">
                                <Building2 size={16} />
                                {selectedBank}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Account Number</label>
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="0000 0000 00"
                                maxLength={10}
                                autoFocus
                            />
                        </div>

                        <div className="input-group">
                            <label>Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                            />
                        </div>

                        <button className="primary-btn" onClick={handleAccountSubmit}>
                            Next
                        </button>
                    </div>
                )}

                {step === 'pin' && (
                    <div className="step-pin">
                        <h3>Enter PIN</h3>
                        <p>Enter your 4-digit PIN to confirm transfer</p>
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
                        <h3>Transfer Successful</h3>
                        <p>Sent ₦{Number(amount).toLocaleString()} to {selectedBank}</p>
                        <button className="primary-btn" onClick={onClose}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default TransferModal;
