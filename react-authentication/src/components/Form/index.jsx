import { useForm } from 'react-hook-form';

const Form = ({message = 'Subimt form', handleFormSubmit}) => {
  const { handleSubmit, register } = useForm();

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' name='email' ref={register({ required: true })} />
      <br />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' ref={register({ required: true })} />
      <br />
      <button type='submit'>{message}</button>
    </form>
  );
};

export default Form;
