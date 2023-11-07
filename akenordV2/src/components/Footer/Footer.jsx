import React from 'react'
import FooterContainer from './FooterContainer'

const footerInfo = 
  {
    address : "SOUK AL MASSIRA EL KHADRA, Fnideq 93100",
    phone: "+212 654404611 ",
    hours: "07:00 - 21:00, Mon - Sun",
    social: [
      {
        title: "facebook",
        url: "https://www.facebook.com/akenord.ma/"
      },
      {
        title: "instagram",
        url: "https://www.instagram.com/akenordofficial/"
      }
      
    ]
  }


export default function Footer() {
  return (
    <footer className='footer container'>
      <FooterContainer info={footerInfo} />

      <div className="footer__bottom">
        <p className="copyright">&copy; 2023 Akenord. All rights reserved</p>
        <span className="designer">Developped by Qshitah</span>
      </div>
    </footer>
  )
}
