import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback,
} from "reactstrap";
import logo from "/images/iteration-1-images/logo.svg";
import { malzemeler } from '../sahteVeri';
import axios from 'axios';

const initialValues = {
  boyut: '',
  hamur: '',
  malzemeler: [],
  isimSoyisim: '',
  siparisNotu: ''
}

const errorMessages = {
  boyut: "* Boyut seçimi zorunludur.",
  hamur: "* Hamur seçimi zorunludur.",
  isimSoyisim: "* İsim ve soyisim girilmelidir.",
  malzemeler: "* En az 4, en fazla 10 malzeme seçebilirsiniz.",
};

export default function Siparis() {
  const [formData, setFormData] = useState(initialValues);
  const [count, setCount] = useState(1);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  const handleIncrement = () => {
    setCount(count + 1);
  }

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  const toplamHesap = () => {
    const malzemeUcreti = formData.malzemeler.length * 5;
    return (100 + malzemeUcreti) * count;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.boyut) newErrors.boyut = errorMessages.boyut;
    if (!formData.hamur) newErrors.hamur = errorMessages.hamur;
    if (!formData.isimSoyisim || formData.isimSoyisim.length < 3) newErrors.isimSoyisim = errorMessages.isimSoyisim;
    if (formData.malzemeler.length < 4 || formData.malzemeler.length > 10) newErrors.malzemeler = errorMessages.malzemeler;
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => {
      if (type === 'checkbox') {
        if (checked && prevState.malzemeler.length >= 10) return prevState;

        const newMalzemeler = checked
          ? [...prevState.malzemeler, value]
          : prevState.malzemeler.filter((item) => item !== value);

        if (newMalzemeler.length === prevState.malzemeler.length) return prevState;

        return { ...prevState, malzemeler: newMalzemeler };
      }

      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const payload = {
      isim: formData.isimSoyisim,
      hamur: formData.hamur,
      boyut: formData.boyut,
      malzemeler: formData.malzemeler,
      özel: formData.siparisNotu,
    };

    axios.post('https://reqres.in/api/pizza', payload)
      .then(response => {
        console.log('Sipariş başarıyla oluşturuldu:', response);
        setFormData(initialValues);
        setCount(1);
        history.push('/Onay');
      })
      .catch(error => {
        console.error('Sipariş gönderilirken bir hata oluştu:', error);
      });
  }

  return (
    <main>
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
              <h1>100 ₺</h1>
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
      <div className="siparis-form-container">
        <Form onSubmit={handleSubmit} className='abc'>
          <FormGroup>
            <Label>Boyut Seç<span>*</span></Label>
            <FormGroup check>
              <Input
                name='boyut'
                type='radio'
                value="Küçük"
                onChange={handleChange}
              />
              <Label check> Küçük</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name='boyut'
                type='radio'
                value="Orta"
                onChange={handleChange}
              />
              <Label check> Orta</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                name='boyut'
                type='radio'
                value="Büyük"
                onChange={handleChange}
              />
              <Label check> Büyük</Label>
            </FormGroup>
            {errors.boyut && <FormFeedback>{errors.boyut}</FormFeedback>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="hamurKalinligi">Hamur Seç<span>*</span></Label>
            <Input
              id='hamurKalinligi'
              name="hamur"
              type="select"
              onChange={handleChange}
            >
              <option value="">Hamur Kalınlığı Seç</option>
              <option value="İnce">İnce</option>
              <option value="Orta">Orta</option>
              <option value="Kalın">Kalın</option>
            </Input>
            {errors.hamur && <FormFeedback>{errors.hamur}</FormFeedback>}
          </FormGroup>

          <div className='ekMalzemeler'>
            <FormGroup>
              <Label htmlFor='ekMalzemeler'>Ek Malzemeler<span>*</span></Label>
              <FormText htmlFor='ekMalzemeler'>En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</FormText>
              <div className="material-columns">
                {malzemeler.map((malzeme) => {
                  const isChecked = formData.malzemeler.includes(malzeme.name);
                  const isDisabled = !isChecked && formData.malzemeler.length >= 10;

                  return (
                    <div className="material-item" key={malzeme.name}>
                      <Input
                        type="checkbox"
                        name="malzemeler"
                        value={malzeme.name}
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                      />
                      <Label check>{malzeme.label}</Label>
                    </div>
                  );
                })}
              </div>
              {errors.malzemeler && <FormFeedback>{errors.malzemeler}</FormFeedback>}
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
                value={formData.isimSoyisim}
                onChange={handleChange}
              />
              {errors.isimSoyisim && <FormFeedback>{errors.isimSoyisim}</FormFeedback>}
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
                value={formData.siparisNotu}
                onChange={handleChange}
              />
            </FormGroup>
          </div>

          <div className="order-summary">
            <div className="order-summary-quantity">
              <Button onClick={handleDecrement}>-</Button>
              <span> {count} </span>
              <Button onClick={handleIncrement}>+</Button>
            </div>
            <div className="order-summary-card">
              <h5>Sipariş Toplamı</h5>
              <p>Seçimler: {formData.malzemeler.length * 5}₺</p>
              <p>Toplam: {toplamHesap()}₺</p>
            </div>
            <Button className="order-submit-button" disabled={!isValid}>Sipariş Ver</Button>
          </div>
          
        </Form>
      </div>
    </main>
  );
}