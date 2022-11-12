import React from 'react'
import { Link } from 'react-router-dom'

//import ImageLight from '../assets/img/login-office.jpeg'
//import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GoogleIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'

function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="overflow-y-auto md:flex-row">
          <main className="flex items-center p-6 sm:p-12">
            <div className="w-full">
              <h1 className="mb-4 text-xl text-center font-semibold text-gray-700 dark:text-gray-200">LOG IN</h1>
              <Label className="mt-4 font-semibold">
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="Masukkan Email Anda" />
              </Label>

              <Label className="mt-4 font-semibold">
                <span>Password</span>
                <Input className="mt-1" type="password" placeholder="Masukkan Password Anda" />
              </Label>

              <p className="mt-4 text-right">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Lupa Password
                </Link>
              </p>

              <Button className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-4 text-sm text-center text-gray-500">
                Atau
              </p>

              <Button className="mt-4" block layout="outline">
                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Masuk dengan Google
              </Button>

              <p className="mt-4 text-sm text-center text-gray-500">
                Belum Punya Akun? 
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/register"
                >
                  Daftar
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
