import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import IMG1 from '../assets/IMG1.jpg';

export default function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${IMG1})` }}
    >
      <div className="text-center bg-gray-200 bg-opacity-70 p-8 rounded-lg shadow-md max-w-lg w-full mx-4">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4">
          Bisboss
        </h1>
        <p className="text-gray-600 mb-6">Maintain your sales report with one touch.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => loginWithRedirect()}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
