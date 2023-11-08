import React from 'react'
import styles from './CommingSoon.module.css'

export default function CommingSoon() {

    return (

        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.bg}>
                    <video src="/bg.mp4" muted={true} autoPlay={true} loop={true}></video>
                </div>
                <h1>Coming Soon!</h1>
                <h3>Site Almost Ready</h3>
                <div className={styles.progress_bar}><span></span></div>
                <div className={styles.sm}>
                    <a href="https://www.facebook.com/akenord.ma/"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/@AKENORD6800/about"><i className="fab fa-youtube"></i></a>
                    <a href="https://www.instagram.com/akenordofficial/"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@akenordbijoux?_t=8gSHTVGSRVO&_r=1"><i className="fab fa-tiktok"></i></a>
                </div>
            </div>
        </div>

    )
}
