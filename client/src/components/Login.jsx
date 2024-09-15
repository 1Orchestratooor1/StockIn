import { useState } from 'react';
import Banner from '../../public/login-banner.png';
import Home from '../pages/Home';
import PasswordRecoveryDialog from '../components/ForgotPassword';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault(); // Evita el envío del formulario por HTTP
    const data = {
      email: email,
      password: password
    }
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        setLoginSuccessful(true);
        setErrorMessage('');
      } else {
        setLoginSuccessful(false);
        setErrorMessage(result.message || 'Login failed. Please try again.');
      }
    })
    .catch(error => {
      console.log(error);
      setErrorMessage('An error occurred. Please try again later.');
    });
  }

  return (
    <>
      {loginSuccessful ? (
        <Home />
      ) : (
        <div className="flex px-4 items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="hidden md:block">
                <img src={Banner} alt="Login illustration" className="w-full h-full object-cover"/>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-800">Welcome to StockIn</h1>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>
                <form method="post" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength="8"
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <div className="flex justify-between items-center">
                      {errorMessage && (
                        <div className="text-red-500 ml-2 mt-3 text-sm">{errorMessage}</div>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsDialogOpen(true)}
                        className="inline-block text-sm text-blue-600 ml-2 mt-3 mr-3 cursor-pointer hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && (
        <PasswordRecoveryDialog onClose={() => setIsDialogOpen(false)} />
      )}
    </>
  );
}
