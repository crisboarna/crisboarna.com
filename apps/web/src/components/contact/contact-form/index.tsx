import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { ApiTypes, Mutable } from '@crisboarna.com/types';
import { API_URL } from '../../../constants';

interface FormState {
  submitted: boolean;
  errors: Mutable<ApiTypes.ContactRequestPayload> & { submit: string };
  values: ApiTypes.ContactRequestPayload;
}

const Form = () => {
  const [state, setState] = useState<FormState>({
    submitted: false,
    errors: {
      name: '',
      subject: '',
      email: '',
      message: '',
      submit: '',
    },
    values: {
      name: '',
      subject: '',
      email: '',
      message: '',
    },
  });

  const [{ data, loading, error }, executePost] =
    useAxios<ApiTypes.ContactRequestPayload>(
      { url: `${API_URL}/v1/contact`, method: 'POST' },
      { manual: true }
    );

  useEffect(() => {
    if (error?.message && !errors.submit) {
      setState({
        ...state,
        errors: { ...state.errors, submit: error.message },
      });
    }
  }, [error]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setState({
      ...state,
      values: { ...state.values, [event.target.name]: event.target.value },
      errors: { ...state.errors, submit: '' },
    });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = state.errors;
    let error = false;
    if (state.values.name.length < 2) {
      errors.name = 'Please provide your name';
      errors.submit = '';
      error = true;
    }
    if (state.values.subject.length < 5) {
      errors.subject = 'Please provide a subject';
      errors.submit = '';
      error = true;
    }
    if (state.values.email.length < 5) {
      errors.email = 'Please provide your email';
      errors.submit = '';
      error = true;
    }
    if (state.values.message.length < 10) {
      errors.message = 'Please provide a message';
      errors.submit = '';
      error = true;
    }

    if (error) {
      setState({ ...state, errors, submitted: true });
    } else {
      setState({ ...state, submitted: true });
      executePost({ data: state.values })
        .then((res) => console.log(res))
        .catch((error) => {
          // console.log(error);
        });
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
};

export default Form;
