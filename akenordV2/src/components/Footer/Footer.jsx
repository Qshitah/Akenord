import React from 'react'
import FooterContainer from './FooterContainer'

const footerInfo = 
  {
    address : "562 Wellington Road, Street 32, San Francisco",
    phone: "+01 2222 365 /(+91) 01 2345 6789",
    hours: "10:00 - 18:00, Mon - Sat",
    social: [
      {
        title: "facebook",
        url: ""
      },
      {
        title: "twitter",
        url: ""
      },
      {
        title: "instagram",
        url: ""
      }
      
    ]
  }


export default function Footer() {
  return (
    <footer className='footer container'>
      <FooterContainer info={footerInfo} />

      <div className="footer__bottom">
        <p className="copyright">&copy; 2023 Akenord. All rights reserved</p>
        <span className="designer">Designed by Marouan</span>
      </div>
    </footer>
  )
}
