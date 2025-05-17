"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TipTapEditor from "./tiptap-editor"
import { JobSchema, JobStatus, JobType } from "@/lib/validationSchemas"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import JobFormSkeleton from "./job-posting-form-skeleton"

interface JobPostingFormProps {
    jobId?: string;
}

export default function JobPostingForm({ jobId }: JobPostingFormProps) {

    const [editorKey, setEditorKey] = useState(0);
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(!!jobId);

    const router = useRouter();

    const form = useForm<z.infer<typeof JobSchema>>({
        resolver: zodResolver(JobSchema),
        defaultValues: {
            title: "",
            description: "",
            jobDetails: "<p></p>",
            location: "",
            salaryMin: 0,
            salaryMax: 0,
            jobType: JobType.FULL_TIME,
            status: JobStatus.ACTIVE,
        },
    })

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/jobs?id=${jobId}`);
            if (response.data) {
                toast.success(response.data.message);
                router.push("/dashboard/jobs");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        } finally {
            setIsDeleting(false);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (jobId && initialLoad) {
            const fetchJob = async () => {
                try {
                    const response = await axios.get(`/api/jobs?id=${jobId}`);
                    const job = response.data;

                    form.reset({
                        title: job.title,
                        description: job.description,
                        jobDetails: job.jobDetails,
                        location: job.location,
                        salaryMin: job.salaryMin,
                        salaryMax: job.salaryMax,
                        jobType: job.jobType,
                        status: job.status,
                    });

                    setInitialLoad(false);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch job data");
                }
            };
            fetchJob();
        }
    }, [jobId, form, initialLoad]);

    async function onSubmit(data: z.infer<typeof JobSchema>) {
        setIsSubmitting(true);
        try {
            const response = jobId
                ? await axios.patch(`/api/jobs?id=${jobId}`, data)
                : await axios.post("/api/jobs", data);

            if (response.data) {
                toast.success(response.data.message);
                if (!jobId) {
                    form.reset();
                    setEditorKey(prev => prev + 1);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (initialLoad) {
        return JobFormSkeleton();
    }

    return (
        <div className="max-w-3xl py-8">
            <h1 className="text-2xl font-bold mb-6">{jobId ? "Update Job" : "Create Job"}</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                                </FormControl>
                                <FormDescription>The title of the job position (2-50 characters).</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Brief overview of the position" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormDescription>A brief summary of the job (50-300 characters).</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="jobDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Detailed Job Description</FormLabel>
                                <FormControl>
                                    <TipTapEditor
                                        content={field.value}
                                        onChange={field.onChange}
                                        key={editorKey}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. New York, NY" {...field} />
                                </FormControl>
                                <FormDescription>Where the job is located.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="salaryMin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minimum Salary</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 50000"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="salaryMax"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum Salary</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="e.g. 80000"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="jobType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select job type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={JobType.FULL_TIME}>Full Time</SelectItem>
                                            <SelectItem value={JobType.PART_TIME}>Part Time</SelectItem>
                                            <SelectItem value={JobType.REMOTE}>Remote</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={JobStatus.ACTIVE}>Active</SelectItem>
                                            <SelectItem value={JobStatus.INACTIVE}>Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button type="submit" disabled={isSubmitting || isDeleting} size="sm">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    {jobId ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                jobId ? "Update Job" : "Create Job"
                            )}
                        </Button>

                        {
                            jobId && (
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant={"destructive"} disabled={isSubmitting || isDeleting} size={"sm"}>
                                            {isDeleting ? (
                                                <>
                                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                "Delete"
                                            )}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Delete Job</DialogTitle>
                                            <DialogDescription>Are you sure you want to delete this job? This action cannot be undone.</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="gap-2 sm:justify-end">
                                            <Button size={"sm"} variant="outline" onClick={() => setOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button size={"sm"} variant="destructive" disabled={isSubmitting || isDeleting} onClick={handleDelete}>
                                                {isDeleting ? (
                                                    <>
                                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    "Delete"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )
                        }

                    </div>

                </form>
            </Form>
        </div>
    )
}