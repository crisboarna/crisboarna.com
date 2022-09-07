import React, { ChangeEvent, FormEvent, useState } from 'react';

const Form = () => {
  const [state, setState] = useState({
    submitted: false,
    errors: {
      name: '',
      subject: '',
      email: '',
      message: '',
    },
    values: {
      name: '',
      subject: '',
      email: '',
      message: '',
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setState({
      ...state,
      values: { ...state.values, [event.target.name]: event.target.value },
    });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = state.errors;
    let error = false;
    if (state.values.name.length < 2) {
      errors.name = 'Please provide your name';
      error = true;
    }
    if (state.values.subject.length < 5) {
      errors.subject = 'Please provide a subject';
      error = true;
    }
    if (state.values.email.length < 5) {
      errors.email = 'Please provide your email';
      error = true;
    }
    if (state.values.message.length < 5) {
      errors.message = 'Please provide a message';
      error = true;
    }
    if (error) {
      setState({ ...state, errors, submitted: true });
    }
  };

  const { errors, submitted } = state;
  return (
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
            className="form-control"
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
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required={true}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="form-group col-lg-12">
          <label htmlFor="subject">Subject*</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
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
            className="form-control"
            rows={6}
            placeholder="Message..."
            // onChange={handleChange}
            required={true}
          ></textarea>
          <div className="invalid-feedback">{errors.message}</div>
        </div>
      </div>
      <button type="submit" className="btn send_btn theme_btn">
        Send Message
      </button>
    </form>
  );
};

export default Form;
