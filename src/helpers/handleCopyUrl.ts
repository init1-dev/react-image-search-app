import clipboardCopy from 'clipboard-copy';
import Toast from './alerts/swal';

export const handleCopyUrl = (url: string) => {
    clipboardCopy(url)
        .then(() => {
            Toast.fire({
                icon: "success",
                html: `<h4 class="swal-success">Url copied successfully</h4>`,
                background: "#499b49"
            });
        })
}