import ContactForm from './contact-form.ui';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { ApiTypes, Mutable } from '@crisboarna.com/types';
import { API_URL } from '../../../../constants';

interface FormState {
  submitted: boolean;
  errors: Mutable<ApiTypes.ContactRequestPayload> & { submit: string };
  values: ApiTypes.ContactRequestPayload;
}

export interface ContactFormErrorsState {
  readonly name: string;
  readonly subject: string;
  readonly email: string;
  readonly message: string;
  readonly submit: string;
}

const defaultErrorsState: ContactFormErrorsState = {
  name: '',
  subject: '',
  email: '',
  message: '',
  submit: '',
};

const ContactFormContainer = () => {
  const [state, setState] = useState<FormState>({
    submitted: false,
    errors: defaultErrorsState,
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
    let error = false;
    const newErrors = JSON.parse(JSON.stringify(defaultErrorsState));
    if (state.values.name.length < 2) {
      newErrors.name = 'Please provide your name';
      error = true;
    }
    if (state.values.subject.length < 5) {
      newErrors.subject =
        'Please provide a subject that is longer than 5 characters.';
      error = true;
    }
    if (!/\S+@\S+\.\S+/.test(state.values.email)) {
      newErrors.email = 'Please provide your email';
      error = true;
    }
    if (state.values.message.length < 10) {
      newErrors.message =
        'Please provide a message that is longer than 10 characters.';
      error = true;
    }

    if (error) {
      setState({ ...state, errors: newErrors, submitted: true });
    } else {
      setState({
        ...state,
        errors: JSON.parse(JSON.stringify(defaultErrorsState)),
        submitted: true,
      });
      executePost({ data: state.values })
        .then((res) => console.log(res))
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const { errors, submitted } = state;

  return (
    <ContactForm
      submitted={submitted}
      submitHandler={submitHandler}
      handleChange={handleChange}
      errors={errors}
    />
  );
};

export default ContactFormContainer;
