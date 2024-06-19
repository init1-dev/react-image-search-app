import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
})

export const PopUp = Swal.mixin({
    showConfirmButton: true,
    showCancelButton: true
})

export const Modal = MySwal.mixin({
    position: "center",
    showCloseButton: true,
    showConfirmButton: false
})

export default Toast;