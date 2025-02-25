import React from 'react';
import homeBanner from '/images/iteration-1-images/home-banner.png';
import homeLogo from '/images/iteration-1-images/logo.svg';

export default function Anasayfa() {
  return (
    <div className="header" style={{ backgroundImage: `url(${homeBanner})` }}>
      <div className="header-content">
        <img src={homeLogo} alt="Logo" className="anasayfa-logo" />
        <p className="anasayfa-text">
          KOD ACIKTIRIR <br /> PİZZA, DOYURUR
        </p>
        <button className="header-button">Acıktım</button>
      </div>
    </div>
  );
}
