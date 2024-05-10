import { DialogProps } from "@mui/material/Dialog";
import { ReactNode } from "react";

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
    description: string | null;
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
    images: Image[],
    query: string
}

export interface SavedImg {
    id: string;
    src_preview: string;
    src_regular: string;
    src_full: string;
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

export interface TooltipProps {
    children: ReactNode;
    text: string;
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
    onSave: (description: string) => void;
    image: ImageData;
}

export interface SelectedPic {
    id: string;
    src_regular: string;
    description: string;
    width: number;
    height: number;
    likes: number;
}