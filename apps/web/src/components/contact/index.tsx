import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInRight } from '../../utils/animations';
import { contact } from '../../constants';
import Form from './contact-form';

const Contact = () => (
  <section className="contact-area" id="contact">
    <div className="container">
      <div className="row row-reverse">
        {contact.map((item) => {
          return (
            <div className="col-md-5" key={item.title}>
              <Reveal keyframes={fadeInLeft} duration={500} triggerOnce={true}>
                <div className="contact_info">
                  <h4>{item.title}</h4>
                  <ul className="nav">
                    {item.menuItems.map((info) => {
                      return (
                        <li className="item" key={info.id}>
                          <div className="media">
                            <i className={info.icon}></i>
                            <div className="media-body">
                              <a href={info.target}>{info.text}</a>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>
          );
        })}
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
