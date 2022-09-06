import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInRight } from '../../utils/animations';
import { contact, ICONS } from '../../constants';
import Form from './contact-form';

const Contact = () => (
  <section className="contact-area" id="contact">
    <div className="container">
      <div className="row row-reverse">
        <div className="col-md-5">
          <Reveal keyframes={fadeInLeft} duration={500} triggerOnce={true}>
            <div className="contact_info">
              <h4>Contact Info</h4>
              <ul className="nav">
                {contact.map((info) => (
                  <li className="item" key={info.id}>
                    <div className="media">
                      {ICONS[info.icon]}
                      <div className="media-body">
                        <a href={info.target}>{info.text}</a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="col-md-7">
          <Reveal keyframes={fadeInRight} duration={800} triggerOnce={true}>
            <div className="input_form">
              <h4>Contact Form</h4>
              <Form />
              <div id="success">Your message succesfully sent!</div>
              <div id="error">
                Opps! There is something wrong. Please try again
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
