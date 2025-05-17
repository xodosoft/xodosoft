"use client";

import { Loader2, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import { formattedDate } from "@/app/dashboard/applications/columns";
import { ApplicationSkeleton } from "./application-details-skeleton";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

interface JobPostingFormProps {
    applicationId: string;
}

export type Application = {
    id: string;
    name: string;
    email: string;
    resume: string;
    coverLetter: string;
    phone: string;
    appliedAt: string;
};

export default function ApplicationDetails({ applicationId }: JobPostingFormProps) {

    const [application, setApplication] = useState<Application | null>(null);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!applicationId) return notFound();

        const fetchApplication = async () => {
            try {
                const response = await axios.get(`/api/applications?id=${applicationId}`);

                if (response.data) {
                    setApplication(response.data);
                }

            } catch (error) {
                console.error("Error fetching application:", error);
                notFound();
            } finally {
                setInitialLoad(false);
            }
        };

        fetchApplication();
    }, [applicationId]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`/api/applications?id=${applicationId}`)
            if (response.data) {
                toast.success(response.data.message);
                router.push("/dashboard/applications");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
        setOpen(false)
    }

    if (initialLoad) return ApplicationSkeleton();
    if (!application) return notFound();

    return (
        <div className="my-4 relative">
            <div className="absolute top-2 right-2 text-xs text-gray-500">
                <span className="font-medium">{formattedDate(application.appliedAt)}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">
                <div>
                    <Image
                        src={"/images/avatar.png"}
                        width={100}
                        height={100}
                        alt="Candidate"
                        className="rounded-full"
                    />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                    <h6 className="text-lg font-bold">{application.name}</h6>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Mail size={18} />
                        <span className="text-sm text-gray-600">
                            <a href={`mailto:${application.email}`}>{application.email}</a>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <Phone size={18} />
                        <span className="text-sm text-gray-600">
                            <a href={`tel:${application.phone}`}>{application.phone}</a>
                        </span>
                    </div>
                </div>
            </div>
            {application.coverLetter && (
                <>
                    <Separator className="my-4" />
                    <div>
                        <h6 className="text-lg font-bold mb-2">Cover Letter</h6>
                        <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap">
                            {application.coverLetter}
                        </div>
                    </div>
                </>
            )}
            <Separator className="my-4" />
            <div>
                <h6 className="text-lg font-bold mb-2">Resume Preview</h6>
                <iframe
                    src={application.resume}
                    width="100%"
                    height="600px"
                ></iframe>
            </div>
            <div className="flex justify-between my-8">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button type="button" disabled={loading} variant={"destructive"} size={"sm"}>
                            {loading ? (
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
                            <DialogTitle>Delete Application</DialogTitle>
                            <DialogDescription>Are you sure you want to delete this application? This action cannot be undone.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:justify-end">
                            <Button size={"sm"} variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button size={"sm"} disabled={loading} onClick={handleDelete} variant="destructive">
                                {loading ? (
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
            </div>
        </div>
    );
}
