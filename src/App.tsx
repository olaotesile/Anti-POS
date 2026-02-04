import { useState } from 'react';
import Header from './components/Header/Header';
import BalanceCard from './components/BalanceCard/BalanceCard';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import FeatureGrid from './components/FeatureGrid/FeatureGrid';
import TransactionList from './components/TransactionList/TransactionList';
import QuickActions from './components/QuickActions/QuickActions';
import BottomNav from './components/BottomNav/BottomNav';
import Footer from './components/Footer/Footer';
import MoreMenu from './components/MoreMenu/MoreMenu';
import AddMoneyModal from './components/Modals/AddMoneyModal';
import ATMCardModal from './components/Modals/ATMCardModal';
import ReceiptModal from './components/Modals/ReceiptModal';
import SportyModal from './components/Modals/SportyModal';
import WithdrawPage from './components/Pages/WithdrawPage';
import TransferPage from './components/Pages/TransferPage';
import './index.css';

type ViewState = 'dashboard' | 'withdraw' | 'transfer';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showHistory, setShowHistory] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [balance, setBalance] = useState(1000000);

  const handleQuickAction = (action: string) => {
    setActiveModal(action);
  };

  const handleFeatureClick = (feature: string) => {
    if (feature === 'withdrawal') {
      setCurrentView('withdraw');
    } else if (feature === 'transfer') {
      setCurrentView('transfer');
    } else {
      setActiveModal(feature);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleWithdraw = (amount: number) => {
    setBalance(prev => prev - amount);
    // Could stay on success screen then go back, or go back immediately?
    // The page handles success state, user clicks "Done" to go back.
  };

  const handleTransfer = (amount: number, bank: string, account: string) => {
    setBalance(prev => prev - amount);
    console.log(`Transferred ${amount} to ${account} at ${bank}`);
  };

  const handleTransactionClick = (tx: any) => {
    setSelectedTx(tx);
    setActiveModal('receipt');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedTx(null);
  };

  return (
    <div className="app-container">
      {/* Header is always visible */}
      <Header />

      <main style={{ paddingTop: '5rem', paddingBottom: '6rem', minHeight: '100vh', boxSizing: 'border-box' }}>
        {currentView === 'dashboard' && (
          <>
            {activeTab === 'home' && (
              <>
                <BalanceCard balance={balance} />
                {!showHistory ? (
                  <>
                    <QuickActions onAction={handleQuickAction} />
                    <TransactionHistory onToggle={() => setShowHistory(true)} />
                    <FeatureGrid onFeatureClick={handleFeatureClick} />
                  </>
                ) : (
                  <TransactionList
                    onBack={() => setShowHistory(false)}
                    onTransactionClick={handleTransactionClick}
                  />
                )}
                {/* Footer only on dashboard/home */}
                <Footer />

                {/* Modals */}
                <AddMoneyModal isOpen={activeModal === 'add_money'} onClose={closeModal} />
                <ATMCardModal isOpen={activeModal === 'atm_card'} onClose={closeModal} />
                <SportyModal isOpen={activeModal === 'sporty'} onClose={closeModal} />
                <ReceiptModal isOpen={activeModal === 'receipt'} onClose={closeModal} transaction={selectedTx} />
              </>
            )}

            {activeTab === 'more' && <MoreMenu />}

            {(activeTab === 'invest' || activeTab === 'learn') && (
              <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                <h3>Coming Soon</h3>
                <p>This goofy feature isn't ready yet.</p>
              </div>
            )}
          </>
        )}

        {currentView === 'withdraw' && (
          <WithdrawPage onBack={handleBackToDashboard} onWithdraw={handleWithdraw} />
        )}

        {currentView === 'transfer' && (
          <TransferPage onBack={handleBackToDashboard} onTransfer={handleTransfer} />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
