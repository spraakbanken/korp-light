import { useContext } from 'react';
import SettingsContext from '../../services/SettingsContext';
import './Footer.css';

import ChalmersLogoDark from '../../assets/ChalmersLogoDark.svg';
import ChalmersLogoLight from '../../assets/ChalmersLogoLight.svg';


const Footer = ({ className }) => {
  const { settings } = useContext(SettingsContext);

  const footerImage = settings.theme === "light" ? ChalmersLogoLight : ChalmersLogoDark;

  return (
    <footer className={`footer ${className}`}>
      <img src={footerImage} alt='footer' className='footer-image' />
    </footer>
  );
};

export default Footer;
