import React, { ChangeEvent, FormEvent, useState } from 'react';

const Form = () => {
  const [state, setState] = useState({
    errors: {
      name: '',
      subject: '',
      phone: '',
      email: '',
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const errors = state.errors;

    switch (name) {
      case 'name':
        errors.name = value.length === 0 ? 'Name is not empty' : '';
        break;
      case 'subject':
        errors.subject = value.length < 5 ? 'Subject must be 5 characters' : '';
        break;
      case 'phone':
        errors.phone = value.length < 5 ? 'phone is not empty' : '';
        break;
      case 'email':
        errors.email = value.length < 5 ? 'Subject is not empty' : '';
        // const appos = value.indexOf('@');
        // const dots = value.lastIndexOf('.');

        // if (value.indexOf('@') < 1 || dots - appos < 2) {
        //   errors.email = 'please enter valid email';
        // }

        break;

      default:
        break;
    }
    setState({ errors, [name]: value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { errors } = state;
  return (
    <form onSubmit={submitHandler} className="form_class">
      <div className="row">
        <div className="col-lg-6">
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Your Name*"
            onChange={handleChange}
          />
          <p>{errors.name}</p>
        </div>
        <div className="col-lg-6">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Your Email*"
            onChange={handleChange}
          />
          <p>{errors.email}</p>
        </div>
        <div className="col-lg-6">
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-control"
            placeholder="Subject*"
            onChange={handleChange}
          />
          <p>{errors.subject}</p>
        </div>
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone*"
            onChange={handleChange}
          />
          <p>{errors.phone}</p>
        </div>
      </div>
      <textarea
        name="message"
        id="message"
        className="form-control"
        rows={6}
        placeholder="Your Message ..."
        // onChange={handleChange}
      ></textarea>
      <button type="submit" className="btn send_btn theme_btn">
        Send Message
      </button>
    </form>
  );
};

export default Form;
