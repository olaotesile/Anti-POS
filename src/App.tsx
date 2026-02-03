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
import WithdrawModal from './components/Modals/WithdrawModal';
import TransferModal from './components/Modals/TransferModal';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showHistory, setShowHistory] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [balance, setBalance] = useState(1000000);

  const handleQuickAction = (action: string) => {
    setActiveModal(action);
  };

  const handleFeatureClick = (feature: string) => {
    setActiveModal(feature);
  };

  const handleWithdraw = (amount: number) => {
    setBalance(prev => prev - amount);
  };

  const handleTransfer = (amount: number, bank: string, account: string) => {
    setBalance(prev => prev - amount);
    // Could add transaction to history here later
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
      {/* Header is always visible for now, or hide on 'More'? Usually visible */}
      {activeTab === 'home' && <Header />}

      <main style={{ paddingTop: '5rem' }}>
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
            <Footer />

            {/* Modals */}
            <AddMoneyModal isOpen={activeModal === 'add_money'} onClose={closeModal} />
            <ATMCardModal isOpen={activeModal === 'atm_card'} onClose={closeModal} />
            <SportyModal isOpen={activeModal === 'sporty'} onClose={closeModal} />
            <WithdrawModal isOpen={activeModal === 'withdrawal'} onClose={closeModal} onWithdraw={handleWithdraw} />
            <TransferModal isOpen={activeModal === 'transfer'} onClose={closeModal} onTransfer={handleTransfer} />
            <ReceiptModal isOpen={activeModal === 'receipt'} onClose={closeModal} transaction={selectedTx} />
          </>
        )}

        {activeTab === 'more' && <MoreMenu />}

        {/* Placeholders for other tabs */}
        {(activeTab === 'invest' || activeTab === 'learn') && (
          <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
            <h3>Coming Soon</h3>
            <p>This goofy feature isn't ready yet.</p>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
