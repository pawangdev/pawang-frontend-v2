import { Button, Input, Label } from "@windmill/react-ui";
import React, { useState } from "react";
import OneSignal from "react-onesignal";
import { toast } from "react-hot-toast";
import { login } from "../../../features/userSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userLogin } from "../../../api/auth.api";
import { GoogleIcon } from "../../../icons";
import { Dialog } from "@headlessui/react";

function Login() {
  const dispatch = useDispatch();
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [isOpenReminder, setIsOpenReminder] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (!(await OneSignal.isPushNotificationsEnabled())) {
        setIsOpenReminder(true);
        await OneSignal.showNativePrompt()
          .then(() => setIsOpenReminder(false))
          .catch(() => setIsOpenReminder(false));
      }

      data["onesignal_id"] = await OneSignal.getUserId();

      const user = await userLogin(data);
      if (user.status === 200) {
        toast.success("Berhasil Login !");
        sessionStorage.setItem("token", user.data.data.access_token);
        dispatch(login(user.data.data));

        history.replace("/app");
      } else {
        if (user == "WRONG_PASSWORD") toast.error("Password Salah !");
        else if (user == "EMAIL_NOT_FOUND")
          toast.error("Email Tidak Terdaftar !");
        else toast.error("Terjadi Kesalahan !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <Dialog
        className="relative z-50"
        open={isOpenReminder}
        onClose={() => setIsOpenReminder(false)}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4">
            <Dialog.Title className="font-medium text-lg">
              Mohon Maaf !
            </Dialog.Title>
            <hr className="-mx-4 my-2" />
            <Dialog.Description className="text-gray-600">
              Agar Aplikasi ini dapat berjalan dengan baik, mohon untuk
              menyalakan notifikasi pada browser anda.
            </Dialog.Description>
            <button
              className="bg-blue-500 text-white text-sm p-2 rounded mt-4 shadow w-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none"
              onClick={() => setIsOpenReminder(false)}
            >
              Nyalakan Notifikasi
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="overflow-y-auto md:flex-row">
          <main className="p-6 sm:p-12">
            <h1 className="mb-4 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
              LOG IN
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label className="mt-4 font-semibold">
                <span>Email</span>
                <Input
                  {...register("email", {
                    required: true,
                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  })}
                  className="mt-1"
                  type="email"
                  placeholder="Masukkan Email Anda"
                />
              </Label>
              {errors.email && errors.email.type === "required" && (
                <p className="mt-1 text-red-500">Email wajib diisi.</p>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <p className="mt-1 text-red-500">Email tidak valid.</p>
              )}

              <Label className="mt-4 font-semibold">
                <span>Password</span>
                <Input
                  {...register("password", { required: true, minLength: 8 })}
                  className="mt-1"
                  type="password"
                  placeholder="Masukkan Password Anda"
                />
              </Label>
              {errors.password && errors.password.type === "required" && (
                <p className="mt-1 text-red-500">Password wajib diisi.</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="mt-1 text-red-500">
                  Password minimal 8 karakter.
                </p>
              )}

              <p className="mt-4 text-right">
                <Link
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  to="/forgot-password"
                >
                  Lupa Password
                </Link>
              </p>

              <button className="w-full px-3 py-2 mx-auto mt-4 text-white bg-blue-500 rounded shadow">
                Masuk
              </button>

              <hr className="my-8" />

              <p className="mt-4 text-sm text-center text-gray-500">Atau</p>

              <Button className="mt-4" block layout="outline">
                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Masuk dengan Google
              </Button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-500">
              Belum Punya Akun ?
              <Link
                className="ml-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                to="/register"
              >
                Daftar
              </Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
