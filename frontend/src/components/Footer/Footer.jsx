import { useContext } from 'react';
import SettingsContext from '../../services/SettingsContext';
import './Footer.css';

import ChalmersLogoDark from '../../assets/ChalmersLogoDark.png';
import ChalmersLogoLight from '../../assets/ChalmersLogoLight.svg';


const Footer = () => {
  const { settings } = useContext(SettingsContext);

  const footerImage =  settings.theme === "light" ? ChalmersLogoLight : ChalmersLogoDark; 

  return (
    <footer className='footer'>
      <img src={footerImage} alt='footer' className='footer-image' />
    </footer>
  );
};

export default Footer;
