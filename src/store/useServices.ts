import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface Services {
    createdAt: string;
    id: string;
    title: string;
    image: string;
    description: string;
    serviceDetails: string;
}

interface ServiceStore {
    services: Services[];
    setServices: (services: Services[]) => void;
}

export const useServiceStore = create<ServiceStore>((set) => {
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
            const data: Services[] = response.data;
            set({ services: data });
        } catch (error) {
            console.error("Failed to fetch services:", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
    };

    fetchServices();

    return {
        services: [],
        setServices: (services: Services[]) => set({ services }),
    };
});
