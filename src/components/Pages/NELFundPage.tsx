import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './Pages.css';

interface NELFundPageProps {
    onBack: () => void;
}

const NELFundPage = ({ onBack }: NELFundPageProps) => {
    const [step, setStep] = useState<'info' | 'amount'>('info');
    const [formData, setFormData] = useState({
        matricNo: '',
        jambReg: '',
        institution: '',
        amount: ''
    });

    const handleInfoNext = () => {
        if (!formData.matricNo || !formData.institution) {
            alert("Please fill in all student details");
            return;
        }
        setStep('amount');
    };

    const handleSubmit = () => {
        onBack(); // Just go back home, no success step
    };

    return (
        <div className="page-container">
            <header className="page-header transfer-header">
                <div className="header-left">
                    <button className="back-btn-transparent" onClick={step === 'amount' ? () => setStep('info') : onBack}>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="page-title-small">Student Loan (NELFund)</h1>
                </div>
            </header>

            <div className="page-content transfer-layout">
                {step === 'info' && (
                    <div className="transfer-card">
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            {/* Icon removed as requested */}
                        </div>
                        <h2 className="card-heading" style={{ textAlign: 'center' }}>Student Details</h2>
                        <p style={{ textAlign: 'center', color: '#888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Verify your studentship status
                        </p>

                        <div className="material-input-group">
                            <input
                                type="text"
                                placeholder="Matric Number"
                                className="material-input"
                                value={formData.matricNo}
                                onChange={(e) => setFormData({ ...formData, matricNo: e.target.value })}
                            />
                        </div>
                        <div className="material-input-group" style={{ marginTop: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Institution Name"
                                className="material-input"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            />
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255, 59, 48, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                            <p style={{ color: '#FF3B30', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                Notice: You'll pay it back after graduating ohhh 👿
                            </p>
                        </div>

                        <button className="primary-btn green-pill-btn action-btn-bottom" onClick={handleInfoNext}>
                            Next
                        </button>
                    </div>
                )}

                {step === 'amount' && (
                    <div className="transfer-card">
                        <h2 className="card-heading">Disbursement Status</h2>
                        <div className="material-input-group" style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <label className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>Funds Disbursed</label>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#00C853', margin: 0 }}>
                                ₦20,000<span style={{ fontSize: '1rem', color: '#888' }}>.00</span>
                            </h1>
                            <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                has been sent to your account
                            </p>
                        </div>

                        <div style={{ marginTop: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#FF3B30' }}>Crucial Warning! ⚠️</h4>
                            <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                                "You think you're getting free money ba? After graduating and you want to go abroad, everything go first wetin... BLUR BLUR BLURSHIP" ✈️🚫
                            </p>
                        </div>

                        <button className="primary-btn green-pill-btn" onClick={handleSubmit}>
                            See wetin I dey talk?
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NELFundPage;
