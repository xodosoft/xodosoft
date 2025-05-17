import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface Jobs {
    createdAt: string,
    id: string,
    title: string,
    description: string,
    jobDetails: string,
    status: "ACTIVE" | "INACTIVE",
    salaryMin: number,
    salaryMax: number,
    location: string,
    jobType: "REMOTE" | "PART_TIME" | "FULL_TIME"
}

interface JobStoreData {
    jobs: Jobs[];
    setJobs: (jobs: Jobs[]) => void;
    loading: boolean;
    error: string | null;
}

export const useJobStore = create<JobStoreData>((set) => {
    const fetchJobs = async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?status=ACTIVE`);
            const data: Jobs[] = response.data;
            set({ jobs: data, loading: false });
        } catch (error) {
            set({ loading: false, error: "Failed to fetch jobs" });
            console.error("Failed to fetch jobs:", error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        }
    };

    fetchJobs();

    return {
        jobs: [],
        setJobs: (jobs: Jobs[]) => set({ jobs }),
        loading: false,
        error: null,
    };
});