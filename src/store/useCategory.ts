import axios from "axios"
import { toast } from "sonner"
import { create } from "zustand"


type Project = {
    id: string
    title: string
}

type Category = {
    id: string
    name: string
    projects: Project[]
}

type CategoryState = {
    categories: Category[]
    isLoading: boolean

    // Actions
    fetchCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,

    fetchCategories: async () => {
        try {
            set({ isLoading: true })

            const response = await axios.get("/api/categories");
            const data: Category[] = response.data;
            set({ categories: data, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
            console.error("Error fetching categories:", error)
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
    }
}))
