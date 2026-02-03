import { Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <p className="footer-text">
                wanna invest? <a href="mailto:bootesile@gmail.com" className="footer-link highlight">send me an email</a>
            </p>
            <div className="footer-github">
                <a href="https://github.com/olaotesile/Anti-POS" target="_blank" rel="noopener noreferrer" className="footer-link icon-link">
                    <Github size={18} /> star on github
                </a>
            </div>
        </footer>
    );
};

export default Footer;
