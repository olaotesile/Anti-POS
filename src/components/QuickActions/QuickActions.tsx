import { Plus, CreditCard, Gamepad2 } from 'lucide-react';
import './QuickActions.css';

interface QuickActionsProps {
    onAction: (action: string) => void;
}

const QuickActions = ({ onAction }: QuickActionsProps) => {
    return (
        <div className="quick-actions-container">
            <button className="quick-action-btn" onClick={() => onAction('add_money')}>
                <div className="action-icon">
                    <Plus size={24} />
                </div>
                <span className="action-label">Add Money</span>
            </button>

            <button className="quick-action-btn" onClick={() => onAction('sporty')}>
                <div className="action-icon">
                    <Gamepad2 size={24} />
                </div>
                <span className="action-label">Sporty</span>
            </button>

            <button className="quick-action-btn" onClick={() => onAction('atm_card')}>
                <div className="action-icon">
                    <CreditCard size={24} />
                </div>
                <span className="action-label">ATM Card</span>
            </button>
        </div>
    );
};

export default QuickActions;
