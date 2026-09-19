import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const toastparams: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const successToast = (msg: string) => {
  toast.success(msg, toastparams);
};

export const infoToast = (msg: string) => {
  toast.info(msg, toastparams);
};

export const errorToast = (msg: string) => {
  toast.error(msg, toastparams);
};
