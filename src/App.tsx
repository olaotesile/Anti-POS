import { useState } from 'react';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import BalanceCard from './components/BalanceCard/BalanceCard';
import FeatureGrid from './components/FeatureGrid/FeatureGrid';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import TransactionList from './components/TransactionList/TransactionList';
import TransferPage from './components/Pages/TransferPage';
import WithdrawPage from './components/Pages/WithdrawPage';
import MoreMenu from './components/MoreMenu/MoreMenu';
import QuickActions from './components/QuickActions/QuickActions';
import BalanceEnquiryPage from './components/Pages/BalanceEnquiryPage';
import NELFundPage from './components/Pages/NELFundPage';
import AddMoneyModal from './components/Modals/AddMoneyModal';
import SportyModal from './components/Modals/SportyModal';
import ATMCardModal from './components/Modals/ATMCardModal';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
    const [showSportyModal, setShowSportyModal] = useState(false);
    const [showATMCardModal, setShowATMCardModal] = useState(false);

    const handleFeatureClick = (feature: string) => {
        if (feature === 'withdrawal') setCurrentView('withdraw');
        if (feature === 'transfer') setCurrentView('transfer');
        if (feature === 'balance') setCurrentView('balance');
        if (feature === 'nelfund') setCurrentView('nelfund');
    };

    const handleQuickAction = (action: string) => {
        if (action === 'add_money') setShowAddMoneyModal(true);
        if (action === 'sporty') setShowSportyModal(true);
        if (action === 'atm_card') setShowATMCardModal(true);
    };

    const handleTransfer = (amount: number, bank: string, account: string) => {
        console.log('Transfer:', amount, bank, account);
        setCurrentView('home');
    };

    const handleWithdraw = (amount: number) => {
        console.log('Withdraw:', amount);
        setCurrentView('home');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'transfer':
                return <TransferPage onBack={() => setCurrentView('home')} onTransfer={handleTransfer} />;
            case 'withdraw':
                return <WithdrawPage onBack={() => setCurrentView('home')} onWithdraw={handleWithdraw} />;
            case 'balance':
                return <BalanceEnquiryPage onBack={() => setCurrentView('home')} />;
            case 'nelfund':
                return <NELFundPage onBack={() => setCurrentView('home')} />;
            case 'history':
                return (
                    <>
                        <BalanceCard balance={2450000.00} />
                        <QuickActions onAction={handleQuickAction} />
                        <TransactionList onBack={() => setCurrentView('home')} onTransactionClick={(tx) => console.log(tx)} />
                    </>
                );
            case 'more':
                return <MoreMenu />;
            case 'home':
            default:
                return (
                    <>
                        <BalanceCard balance={2450000.00} />
                        <QuickActions onAction={handleQuickAction} />
                        <TransactionHistory onToggle={() => setCurrentView('history')} />
                        <FeatureGrid onFeatureClick={handleFeatureClick} />
                    </>
                );
        }
    };

    return (
        <div className="app-shell">
            <Header />
            <main className="main-content">
                {renderContent()}
            </main>
            <BottomNav
                activeTab={currentView === 'more' ? 'more' : 'home'}
                onTabChange={(tab: string) => {
                    if (tab === 'more') setCurrentView('more');
                    else setCurrentView('home');
                }}
            />

            {/* Modals */}
            <AddMoneyModal isOpen={showAddMoneyModal} onClose={() => setShowAddMoneyModal(false)} />
            <SportyModal isOpen={showSportyModal} onClose={() => setShowSportyModal(false)} />
            <ATMCardModal isOpen={showATMCardModal} onClose={() => setShowATMCardModal(false)} />
        </div>
    );
}

export default App;
