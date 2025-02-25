import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";
import logo from "/images/iteration-1-images/logo.svg";
import { malzemeler } from '../sahteVeri';

export default function Siparis() {
  return (
    <>
      <header className="form-header">
        <img src={logo} />
      </header>

      <div className='siparis-alani-container'>
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
      </div>

      <Form>
        <FormGroup>
          <Label>Boyut Seç<span>*</span></Label>
          <FormGroup check>
            <Input
              name='boyut'
              type='radio'
            />
            <Label check> Küçük</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name='boyut'
              type='radio'
            />
            <Label check> Orta</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              name='boyut'
              type='radio'
            />
            <Label check> Büyük</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="hamurKalinligi">Hamur Seç<span>*</span></Label>
          <Input
            id='hamurKalinligi'
            name="hamur"
            type="select"
          >
            <option value="">Hamur Kalınlığı Seç</option>
            <option value="İnce">İnce</option>
            <option value="Orta">Orta</option>
            <option value="Kalın">Kalın</option>
          </Input>
        </FormGroup>

        <div className='ekMalzemeler'>
          <FormGroup>
            <Label for='ekMalzemeler'>Ek Malzemeler</Label>
            <FormText htmlFor='ekMalzemeler'>En fazla 10 malzeme seçebilirsiniz. 5₺</FormText>
            <div className="material-columns">
              {malzemeler.map((malzeme) => (
                <div className="material-item" key={malzeme.name}>
                  <Input
                    type="checkbox"
                    name={malzeme.name}
                  />
                  <Label check>{malzeme.label}</Label>
                </div>
              ))}
            </div>
          </FormGroup>
        </div>

        <div className='isimSoyisim'>
          <FormGroup className="form-text-area">
            <Label htmlFor="isimSoyisim">İsim-Soyisim<span>*</span> </Label>
            <Input
              id="isimSoyisim"
              name="isimSoyisim"
              placeholder="Lütfen isminizi giriniz"
              type="text"
            />
          </FormGroup>
        </div>

        <div className='siparisNotu'>
          <FormGroup className="form-text-area">
            <Label for="siparisNotu">Sipariş Notu</Label>
            <Input
              id="siparisNotu"
              name="siparisNotu"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              type="text"
            />
          </FormGroup>
        </div>

        <div className="order-summary">
          <div className="order-summary-quantity">
            <Button >-</Button>
            <span>0</span>
            <Button>+</Button>
          </div>
          <div className="order-summary-card">
            <h5>Sipariş Toplamı</h5>
            <p>Seçimler: 10₺</p>
            <p>Toplam: 25₺</p>
          </div>
        </div>
        <Button className="order-submit-button">Sipariş Ver</Button>

      </Form>
    </>
  );
}
