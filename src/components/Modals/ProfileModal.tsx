import { useState } from 'react';
import Modal from '../Modal/Modal';
import './Modals.css';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentName: string;
    onNameChange: (name: string) => void;
}

const ProfileModal = ({ isOpen, onClose, currentName, onNameChange }: ProfileModalProps) => {
    const [name, setName] = useState(currentName);

    const handleSave = () => {
        if (name.trim()) {
            onNameChange(name.trim());
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
            <div className="profile-modal-content">
                <div className="material-input-group" style={{ marginTop: '0.5rem' }}>
                    <label className="input-label">Display Name</label>
                    <input
                        type="text"
                        className="material-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <button className="green-pill-btn" style={{ marginTop: '1.5rem', width: '100%' }} onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </Modal>
    );
};

export default ProfileModal;
