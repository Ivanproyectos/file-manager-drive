import Swal from 'sweetalert2';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const defualtSettigs = {
  customClass: {
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-white',
    popup: 'popup-dark' ,
  }
}
export const showSuccess = (msg: string) =>
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: msg,
    //timer: 5000,
    showConfirmButton: true,
    ...defualtSettigs
  });

export const showError = (msg: string, title: string = 'Algo no funcionó como esperábamos') =>
  Swal.fire({
    icon: 'error',
    title: title,
    text: msg,
    showConfirmButton: true,
    ...defualtSettigs,
    customClass: {
      confirmButton: 'btn btn-danger',
    }
  });

export const showInfo = (msg: string) =>
  Swal.fire({
    icon: 'info',
    title: 'Info',
    text: msg,
  });

export const showConfirm = (msg: string): Promise<boolean> =>
  Swal.fire({
    icon: 'question',
    title: '¿Estás seguro?',
    text: msg,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => result.isConfirmed);