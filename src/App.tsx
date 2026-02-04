import { useState } from 'react';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import BalanceCard from './components/BalanceCard/BalanceCard';
import Footer from './components/Footer/Footer';
import FeatureGrid from './components/FeatureGrid/FeatureGrid';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import TransactionList from './components/TransactionList/TransactionList';
import TransferPage from './components/Pages/TransferPage';
import WithdrawPage from './components/Pages/WithdrawPage';
import MoreMenu from './components/MoreMenu/MoreMenu';
import QuickActions from './components/QuickActions/QuickActions';
import BalanceEnquiryPage from './components/Pages/BalanceEnquiryPage';
import NELFundPage from './components/Pages/NELFundPage';
import UtilityPage from './components/Pages/UtilityPage';
import InvestPage from './components/Pages/InvestPage';
import AddMoneyModal from './components/Modals/AddMoneyModal';
import SportyModal from './components/Modals/SportyModal';
import ATMCardModal from './components/Modals/ATMCardModal';
import LAPOModal from './components/Modals/LAPOModal';
import ReceiptModal from './components/Modals/ReceiptModal';
import InvestModal from './components/Modals/InvestModal';
import ProfileModal from './components/Modals/ProfileModal';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
    const [showSportyModal, setShowSportyModal] = useState(false);
    const [showATMCardModal, setShowATMCardModal] = useState(false);
    const [showLAPOModal, setShowLAPOModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [showInvestModal, setShowInvestModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [userName, setUserName] = useState('User');
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    const handleFeatureClick = (feature: string) => {
        if (feature === 'withdrawal') setCurrentView('withdraw');
        if (feature === 'transfer') setCurrentView('transfer');
        if (feature === 'balance') setCurrentView('balance');
        if (feature === 'nelfund') setCurrentView('nelfund');
        if (feature === 'lapo') setShowLAPOModal(true);
        if (feature === 'utility') setCurrentView('utility');
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

    const handleTransactionClick = (tx: any) => {
        setSelectedTransaction(tx);
        setShowReceiptModal(true);
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
            case 'utility':
                return <UtilityPage onBack={() => setCurrentView('home')} />;
            case 'invest':
                return <InvestPage onBack={() => setCurrentView('home')} />;
            case 'history':
                return (
                    <>
                        <BalanceCard balance={2450000.00} />
                        <QuickActions onAction={handleQuickAction} />
                        <TransactionList onBack={() => setCurrentView('home')} onTransactionClick={handleTransactionClick} />
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
                        <Footer />
                    </>
                );
        }
    };

    return (
        <div className="app-shell">
            <Header userName={userName} onProfileClick={() => setShowProfileModal(true)} />
            <main className="main-content">
                {renderContent()}
            </main>
            <BottomNav
                activeTab={currentView === 'more' ? 'more' : 'home'}
                onTabChange={(tab: string) => {
                    if (tab === 'more') setCurrentView('more');
                    else if (tab === 'invest') setCurrentView('invest');
                    else setCurrentView('home');
                }}
            />

            {/* Modals */}
            <AddMoneyModal isOpen={showAddMoneyModal} onClose={() => setShowAddMoneyModal(false)} />
            <SportyModal isOpen={showSportyModal} onClose={() => setShowSportyModal(false)} />
            <ATMCardModal isOpen={showATMCardModal} onClose={() => setShowATMCardModal(false)} />
            <LAPOModal isOpen={showLAPOModal} onClose={() => setShowLAPOModal(false)} />
            <ReceiptModal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} transaction={selectedTransaction} />
            <InvestModal isOpen={showInvestModal} onClose={() => setShowInvestModal(false)} />
            <ProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                currentName={userName}
                onNameChange={setUserName}
            />
        </div>
    );
}

export default App;
