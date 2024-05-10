import clipboardCopy from 'clipboard-copy';
import Toast from './alerts/swal';

export const handleCopyUrl = (url: string) => {
    clipboardCopy(url)
        .then(() => {
            Toast.fire({
                icon: "success",
                title: "Url copied successfully"
            });
        })
}