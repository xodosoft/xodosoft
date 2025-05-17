import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface Images {
    secure_url: string;
    public_id: string;
}

interface ImagesStore {
    images: Images[];
    loading: boolean;
    nextCursor: string | null;
    fetchImages: () => Promise<void>;
    loadMoreImages: () => Promise<void>;
    setImages: (newImages: Images[]) => void;
    deleteImage: (public_id: string) => Promise<void>;
}

export const useImagesStore = create<ImagesStore>((set, get) => ({
    images: [],
    loading: false,
    nextCursor: null,

    fetchImages: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload`
            );
            const { images, nextCursor } = response.data;
            set({ images, nextCursor, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error("Failed to fetch images.");
            console.error(error);
        }
    },

    loadMoreImages: async () => {
        const { nextCursor, images } = get();
        if (!nextCursor) return;

        set({ loading: true });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload?cursor=${nextCursor}`
            );
            const { images: newImages, nextCursor: newCursor } = response.data;
            set({
                images: [...images, ...newImages],
                nextCursor: newCursor,
                loading: false,
            });
        } catch (error) {
            set({ loading: false });
            toast.error("Failed to load more images.");
            console.error(error);
        }
    },

    setImages: (newImages) => {
        set((state) => ({
            images: [...newImages, ...state.images],
        }));
    },

    deleteImage: async (public_id) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload?public_id=${public_id}`
            );
            set((state) => ({
                images: state.images.filter((img) => img.public_id !== public_id),
            }));
            toast.success("Image deleted.");
        } catch (error) {
            toast.error("Failed to delete image.");
            console.error(error);
        }
    },
}));
