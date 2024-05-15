import Swal from 'sweetalert2';

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

export default Toast;