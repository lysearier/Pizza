import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from "/images/iteration-1-images/logo.svg";


export default function () {
  return (
    <>
      <header className="form-header">
        <img src={logo} />
      </header>

      <section className='siparis-alani-container'>
        <div className='siparis-alani-content'>
          <nav className="nav-menu">
            <a href="/">Anasayfa </a>
            <p> - </p>
            <a href="/siparis-olustur"> Sipariş Oluştur</a>
            <h2>Position Absolute Acı Pizza</h2>
            <div className="pizza-bilgi">
          <h1>85.5 ₺</h1>
          <p>4.9</p>
          <p>(200)</p>
        </div>
        <p style={{ color: "#5F5F5F" }}>
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>
          </nav>
        </div>

      </section>
    </>
  )
}