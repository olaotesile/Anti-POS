import { useState } from 'react';
import { ChevronLeft, Zap, Droplets, Wifi, Tv, Phone, CreditCard, ChevronRight } from 'lucide-react';
import './Pages.css';

interface UtilityPageProps {
    onBack: () => void;
}

const categories = [
    { icon: <Zap size={20} />, label: 'Electricity', color: '#FFCC00', providers: ['EKEDC', 'IKEDC', 'AEDC', 'PHED'] },
    { icon: <Phone size={20} />, label: 'Airtime & Data', color: '#00C853', providers: ['MTN', 'Airtel', 'Glo', '9mobile'] },
    { icon: <Tv size={20} />, label: 'Cable TV', color: '#E50914', providers: ['DSTV', 'GOtv', 'Startimes', 'Showmax'] },
    { icon: <Wifi size={20} />, label: 'Internet', color: '#2979FF', providers: ['Spectranet', 'Smile', 'Swift', 'ipNX'] },
    { icon: <Droplets size={20} />, label: 'Water', color: '#00BCD4', providers: ['Lagos Water Corp', 'FWSC'] },
    { icon: <CreditCard size={20} />, label: 'Betting', color: '#AF52DE', providers: ['Bet9ja', 'SportyBet', '1xBet', 'NairaBet'] },
];

const UtilityPage = ({ onBack }: UtilityPageProps) => {
    const [step, setStep] = useState<'categories' | 'providers' | 'form' | 'success'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [formData, setFormData] = useState({ meterNo: '', amount: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleCategoryClick = (category: any) => {
        setSelectedCategory(category);
        setStep('providers');
    };

    const handleProviderClick = (provider: string) => {
        setSelectedProvider(provider);
        setStep('form');
    };

    const handleSubmit = () => {
        if (!formData.meterNo || !formData.amount) {
            alert('Please fill in all fields');
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('success');
        }, 2000);
    };

    const getPlaceholder = () => {
        if (selectedCategory?.label === 'Airtime & Data') return 'Phone Number';
        if (selectedCategory?.label === 'Cable TV') return 'Smart Card Number';
        if (selectedCategory?.label === 'Betting') return 'User ID';
        return 'Meter/Account Number';
    };

    return (
        <div className="page-container">
            <header className="page-header transfer-header">
                <div className="header-left">
                    <button className="back-btn-transparent" onClick={
                        step === 'providers' ? () => setStep('categories') :
                            step === 'form' ? () => setStep('providers') :
                                step === 'success' ? () => { setStep('categories'); setSelectedCategory(null); } :
                                    onBack
                    }>
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="page-title-small">
                        {step === 'categories' ? 'Utility & Bills' :
                            step === 'providers' ? selectedCategory?.label :
                                step === 'form' ? selectedProvider :
                                    'Success'}
                    </h1>
                </div>
            </header>

            <div className="page-content transfer-layout">
                {step === 'categories' && (
                    <div className="utility-grid">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                className="utility-category-btn"
                                onClick={() => handleCategoryClick(cat)}
                            >
                                <div className="utility-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                                    {cat.icon}
                                </div>
                                <span className="utility-label">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 'providers' && selectedCategory && (
                    <div className="provider-list">
                        {selectedCategory.providers.map((provider: string, index: number) => (
                            <button
                                key={index}
                                className="provider-item"
                                onClick={() => handleProviderClick(provider)}
                            >
                                <span className="provider-name">{provider}</span>
                                <ChevronRight size={18} className="provider-chevron" />
                            </button>
                        ))}
                    </div>
                )}

                {step === 'form' && (
                    <div className="transfer-card">
                        <h2 className="card-heading">Pay {selectedProvider}</h2>
                        <div className="material-input-group">
                            <input
                                type="text"
                                placeholder={getPlaceholder()}
                                className="material-input"
                                value={formData.meterNo}
                                onChange={(e) => setFormData({ ...formData, meterNo: e.target.value })}
                            />
                        </div>
                        <div className="material-input-group" style={{ marginTop: '1rem' }}>
                            <input
                                type="number"
                                placeholder="Amount (₦)"
                                className="material-input"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>

                        <button
                            className="primary-btn green-pill-btn"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : `Pay ₦${formData.amount || '0'}`}
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="page-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '2rem', flex: 1 }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            backgroundColor: 'rgba(0, 200, 83, 0.1)', color: '#00C853',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {selectedCategory?.icon}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Payment Successful!</h2>
                            <p style={{ color: '#888', maxWidth: '80%', margin: '0 auto' }}>
                                ₦{Number(formData.amount).toLocaleString()} paid to {selectedProvider}
                            </p>
                            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                Ref: {formData.meterNo}
                            </p>
                        </div>

                        <button className="green-pill-btn" style={{ marginTop: 'auto' }} onClick={onBack}>
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UtilityPage;
