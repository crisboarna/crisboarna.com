import React from 'react';
import { ContactFormErrorsState } from './contact-form.container';

export interface ContactFormProps {
  readonly submitted: boolean;
  readonly submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  readonly handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly errors: ContactFormErrorsState;
}

const ContactForm = ({
  submitted,
  submitHandler,
  handleChange,
  errors,
}: ContactFormProps) => (
  <form
    onSubmit={submitHandler}
    className={`form_class needs-validation ${
      submitted ? `was-validated` : ''
    }`}
    noValidate
  >
    <div className="row">
      <div className="form-group col-lg-6">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${
            submitted && errors.name !== '' ? 'is-invalid' : ''
          }`}
          placeholder="Name"
          onChange={handleChange}
          required={true}
        />
        <div className="invalid-feedback">{errors.name}</div>
      </div>
      <div className="form-group col-lg-6">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          className={`form-control ${
            submitted && errors.email !== '' ? 'is-invalid' : ''
          }`}
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required={true}
        />
        <div className={'invalid-feedback'}>{errors.email}</div>
      </div>
      <div className="form-group col-lg-12">
        <label htmlFor="subject">Subject*</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className={`form-control ${
            submitted && errors.subject !== '' ? 'is-invalid' : ''
          }`}
          placeholder="Subject"
          onChange={handleChange}
          required={true}
        />
        <div className="invalid-feedback">{errors.subject}</div>
      </div>
    </div>
    <div className={'row'}>
      <div className="form-group col-lg-12">
        <label htmlFor="message">Message*</label>
        <textarea
          name="message"
          id="message"
          className={`form-control ${
            submitted && errors.message !== '' ? 'is-invalid' : ''
          }`}
          rows={6}
          placeholder="Message..."
          onChange={handleChange}
          required={true}
        ></textarea>
        <div className="invalid-feedback">{errors.message}</div>
      </div>
    </div>
    <div className={'row'}>
      <div className={'form-group col-lg-12'}>
        <button type="submit" className="btn send_btn theme_btn">
          Send Message
        </button>
        <div
          className="invalid-feedback"
          style={{ display: submitted && errors.message ? 'block' : 'none' }}
        >
          {errors.submit}
        </div>
      </div>
    </div>
  </form>
);

export default ContactForm;
