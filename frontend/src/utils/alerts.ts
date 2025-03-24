import Swal from 'sweetalert2';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
export const showSuccess = (msg: string) =>
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: msg,
    //timer: 5000,
    showConfirmButton: true,
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-white',
        popup: 'popup-dark' ,
      },
  });

export const showError = (msg: string) =>
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
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