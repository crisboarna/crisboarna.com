import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInRight } from '../../utils/animations';
import { ICONS } from '../../constants';
import { IContact } from './index';
import ContactForm from './components/contact-form';

export interface ContactProps {
  readonly contacts: IContact[];
}

const Contact = ({ contacts }: ContactProps) => (
  <section className="contact-area" id="contact">
    <div className="container">
      <div className="row row-reverse">
        <div className="col-md-5">
          <Reveal keyframes={fadeInLeft} duration={500} triggerOnce={true}>
            <div className="contact_info">
              <h4>Contact Info</h4>
              <ul className="nav">
                {contacts.map((info) => (
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
              <ContactForm />
              <div id="success">Your message successfully sent!</div>
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
