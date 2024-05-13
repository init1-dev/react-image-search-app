import { Image } from "../../helpers/interfaces";

export const formatImage = (img: Image) => {
    return {
        id: img.id,
        src_preview: img.urls.small,
        src_regular: img.urls.regular,
        src_full: img.urls.full,
        tags: img.tags,
        alt_description: img.alt_description === null ? "" : img.alt_description,
        description: img.description === null ? "" : img.description,
        width: img.width,
        height: img.height,
        likes: img.likes,
        created_at: new Date(Date.now()).toLocaleDateString("es-ES"),
    };
}