import React from "react";
import styles from './AboutUs.module.css';

export default function AboutUs() {
    const handleContactUs = () => {
        const email = 'support@akenord.ma';
        window.location.href = `mailto:${email}`;
      };
  return (
    <div className={styles.body}>
      <div className={styles.about}>
        <div className={styles.inner_section}>
          <h1>About Us</h1>
          <p className={styles.text}>
            Welcome to Akenord Fashion Jewelry Store, where each piece is a narrative, and style is an art form.

            At Akenord, we transcend the conventional role of a store; we are curators of individuality, offering meticulously selected jewelry that goes beyond mere adornment—it evolves into a timeless expression of your unique style.

            Our collection is a jubilation of creativity, a dedication to quality, and a promise to enhance your individuality. From chic contemporary designs to timeless classics, Akenord boasts a diverse range of fashion jewelry, catering to various tastes and occasions.

            We firmly believe that jewelry is more than an accessory; it's a statement, an emotion, and a connection to meaningful moments. Allow our thoughtfully curated selection to guide you to the perfect piece, resonating with your personality and enhancing your beauty.

            Thank you for choosing Akenord Fashion Jewelry Store as your partner in style. Explore our collection, embrace your uniqueness, and let our jewelry become an integral part of your story.

            For inquiries, contact us at support@akenord.ma, and stay updated by following us on [Social Media Handles].
          </p>
          <div className="btn">
          <button onClick={handleContactUs}>Contact Us</button>
                    </div>
        </div>
      </div>
    </div>
  );
}
