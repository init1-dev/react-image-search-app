import saveAs from "file-saver";
import { SavedImg } from "./interfaces";
import { editDescription } from "../store/searchResults/searchSlice";
import { AppDispatch } from "../store";
import clipboardCopy from 'clipboard-copy';
import Toast from './alerts/swal';

export const getFilteredPhotos = (images:SavedImg[] , searchTerm: string) => {
    const filtered = images.filter(image => image.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
};

export const getPhotosByTag = (images: SavedImg[], tag: string) => {
    if(tag === ""){
        return images;
    }
    const imagesWithTag = images.filter(image => {
        const tags = image.tags.map(tag => tag.title);
        return tags.includes(tag);
    });
    return imagesWithTag;
}

export const getOrderedPhotos = (images: SavedImg[], filter: string) => {
    if (filter === 'newer') {
        return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => {
                const prevDate = new Date(prevPhoto.created_at);
                const nextDate = new Date(nextPhoto.created_at);
                return nextDate.getTime() - prevDate.getTime();
        }).reverse();
    }
    return images.sort((prevPhoto: SavedImg, nextPhoto: SavedImg) => {
        const nextValue = nextPhoto[filter as keyof SavedImg];
        const prevValue = prevPhoto[filter as keyof SavedImg];

        if(typeof nextValue !== 'number' || typeof prevValue !== 'number'){
            return 0;
        }

        return nextValue - prevValue;
    });
};

export const handleDownload = (url: string, description: string) => {
    saveAs(
        url,
        `${description}.jpg`
    );
};

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

export const handleSaveDescription = (id: string, newDescription: string, dispatch: AppDispatch) => {
    dispatch(editDescription({ id, newDescription }))
};