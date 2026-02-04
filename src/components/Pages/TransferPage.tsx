import { useState } from 'react';
import { Building2, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import '../Modals/Modals.css';
import './Pages.css';

interface TransferPageProps {
    onBack: () => void;
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

const TransferPage = ({ onBack, onTransfer }: TransferPageProps) => {
    // Steps: 'details' (Account+Bank) -> 'bank-select' -> 'amount' -> 'pin' -> 'success'
    const [step, setStep] = useState<'details' | 'bank-select' | 'amount' | 'pin' | 'success'>('details');
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleDetailsNext = () => {
        if (!accountNumber || !selectedBank) {
            alert("Please select a bank and enter account number");
            return;
        }
        setStep('amount');
    };

    const handleAmountNext = () => {
        if (!amount) return;
        setStep('pin');
    };

    const handlePinSubmit = () => {
        if (pin.length !== 4) return;
        setTimeout(() => {
            onTransfer(Number(amount), selectedBank, accountNumber);
            setStep('success');
        }, 1000);
    };

    const handleBankSelect = (bankName: string) => {
        setSelectedBank(bankName);
        setStep('details');
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#000000' }}> {/* Pure black bg */}
            <header className="page-header transfer-header">
                <div className="header-left">
                    <button className="back-btn-transparent" onClick={step === 'bank-select' ? () => setStep('details') : onBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="page-title-small">
                        {step === 'bank-select' ? 'Select Bank' : 'Transfer to Bank Account'}
                    </h1>
                </div>
                {step === 'details' && <button className="header-action-text">History</button>}
            </header>

            <div className="page-content transfer-layout">
                {step === 'details' && (
                    <>
                        <div className="transfer-card">
                            <h2 className="card-heading">Recipient Account</h2>

                            <div className="material-input-group">
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Enter 10 digits Account Number"
                                    maxLength={10}
                                    className="material-input"
                                />
                            </div>

                            <div className="material-selector" onClick={() => setStep('bank-select')}>
                                <span className={selectedBank ? "selected-value" : "placeholder"}>
                                    {selectedBank || "Select Bank"}
                                </span>
                                <ChevronRight size={20} className="selector-icon" />
                            </div>
                        </div>

                        <button className="primary-btn green-pill-btn action-btn-bottom" onClick={handleDetailsNext}>
                            Send dullars
                        </button>
                    </>
                )}

                {step === 'bank-select' && (
                    <div className="bank-list-vertical">
                        {banks.map((bank) => (
                            <button
                                key={bank.name}
                                className="bank-list-item"
                                onClick={() => handleBankSelect(bank.name)}
                            >
                                <div className="bank-icon-small" style={{ backgroundColor: `${bank.color}20`, color: bank.color }}>
                                    <Building2 size={20} />
                                </div>
                                <span>{bank.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 'amount' && (
                    <div className="transfer-card">
                        <h2 className="card-heading">Enter Amount</h2>
                        <div className="material-input-group">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="material-input"
                                autoFocus
                            />
                        </div>
                        <div className="transfer-summary">
                            <small>Transferring to {selectedBank}</small>
                            <p>{accountNumber}</p>
                        </div>
                        <button className="primary-btn green-pill-btn" onClick={handleAmountNext}>
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
                        <button className="primary-btn green-pill-btn" onClick={handlePinSubmit} disabled={pin.length < 4}>
                            Confirm
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="step-success">
                        <CheckCircle size={64} className="success-icon" />
                        <h3>Transfer Successful</h3>
                        <p>Sent ₦{Number(amount).toLocaleString()} to {selectedBank}</p>
                        <button className="primary-btn green-pill-btn" onClick={onBack}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferPage;
