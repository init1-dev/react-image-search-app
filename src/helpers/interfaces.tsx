import { DialogProps } from "@mui/material/Dialog";
import { Dispatch, SetStateAction } from "react";

export interface TagInterface {
    title: string;
    type: string;
}

export interface SavedTags {
    name: string;
    count: number;
}

export interface Image {
    id: string;
    width: number;
    height: number;
    likes: number;
    urls: {
        regular: string;
        small: string;
        full: string;
    };
    tags: TagInterface[];
    description: string | null;
    alt_description: string | null;
    user: {
        username: string;
        name: string;
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
    };
}

export interface SearchState {
    images: Image[];
    query: string;
    loading: boolean;
    status: string;
    error: string | null;
}

export interface SavedState {
    images: Image[];
    tags: SavedTags[];
    query: string;
}

export interface SavedImg {
    id: string;
    src_preview: string;
    src_regular: string;
    src_full: string;
    tags: TagInterface[];
    alt_description: string;
    description: string;
    width: number;
    height: number;
    likes: number;
    created_at: string,
}

export interface State {
    saved: {
        images: [],
        query: string
    },
    search: {
    loading: boolean,
    query: string,
    status: string,
    images: [],
    error: null
    }
}

export interface ImageProps {
    alt: string;
    id: string;
}

export interface ImageData {
    src_regular: string;
    description: string;
    width: number;
    height: number;
    likes: number;
}

export interface EditModalProps extends Omit<DialogProps, 'onClose'> {
    open: boolean;
    onClose: () => void;
    image: ImageData;
    isEditVisible?: boolean;
    onSave?: (description: string) => void;
}

export interface SelectedPic {
    id: string;
    src_regular: string;
    description: string;
    width: number;
    height: number;
    likes: number;
}

export interface SearchResultsProps {
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
}