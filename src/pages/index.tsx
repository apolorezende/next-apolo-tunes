import { useState} from 'react';
import { createUser} from './api/FakeApiUser';
import Loading from '../components/Loading';

export default function Login({ history }: any) {
  const [btnD, setBtnD] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const valInputLogin = ({ target: { value } }: any) => {
    setInputValue(value);
    valInput(value);
  };

  const valInput = (value: any) => {
    const minInput = 3;
    setBtnD(value.length < minInput);
  };

  const submitForm = async () => {
    setLoading(true);
    const userInfo = { name: inputValue };
    await createUser(userInfo);
    setLoading(false);
    window.location.href = '/search';
};

  return (
    loading ? <Loading /> : (
      <div className='h-screen flex items-center justify-center'>
        <div className='bg-gray-300 py-10 text-center px-8'>
          <p>Login</p>
          <form className='flex flex-col justify-center content-center'>
            <p>Nome de usuario</p>
            <input
              className=''
              onChange={valInputLogin}
              type="text"
              value={inputValue}
              name="inputValue"
            />
            <button
              type="button"
              disabled={btnD}
              onClick={submitForm}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  );
}
