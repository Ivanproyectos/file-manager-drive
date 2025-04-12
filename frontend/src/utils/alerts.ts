import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = Cookies.get('theme')

const defualtSettigs = {
  customClass: {
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-white',
    popup: theme == 'dark' ? 'popup-dark' : '',
  },
}
export const showSuccess = (msg: string) =>
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: msg,
    //timer: 5000,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    ...defualtSettigs,
  })

export const showError = (
  msg: string,
  title: string = 'Algo no funcionó como esperábamos'
) =>
  Swal.fire({
    icon: 'error',
    title: title,
    text: msg,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    ...defualtSettigs,
    customClass: {
      confirmButton: 'btn btn-danger',
    },
  })

export const showInfo = (msg: string) =>
  Swal.fire({
    icon: 'info',
    title: 'Info',
    text: msg,
  })

export const showConfirm = (msg: string): Promise<boolean> =>
  Swal.fire({
    icon: 'question',
    title: '¿Estás seguro?',
    text: msg,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    ...defualtSettigs,
  }).then((result) => result.isConfirmed)
