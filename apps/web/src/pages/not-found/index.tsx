import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ContactImage from '../../assets/images/svg/contact.svg';

const NotFound = () => (
  <div className="body_wrapper">
    <section className={`error_area text-center align-items-center d-flex`}>
      <div className="container">
        <div className={`error_text`}>
          <h3>Page not found!</h3>
          <p>
            We’re sorry, the page you have looked for does not exist in our
            database!
            <br /> Maybe go to our home page or try to use a search?
          </p>
          <a className="back_btn" href="/">
            Go Back to Home
          </a>
          <h1>404</h1>
          <LazyLoadImage
            src={ContactImage}
            alt={'Not Found Image'}
            effect={'blur'}
          />
        </div>
      </div>
    </section>
  </div>
);

export default NotFound;
