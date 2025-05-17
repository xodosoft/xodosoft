import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Briefcase, ArrowRight } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import axios from "axios"
import Link from "next/link"

export interface Jobs {
    createdAt: string
    id: string
    title: string
    description: string
    jobDetails: string
    status: "ACTIVE" | "INACTIVE"
    salaryMin: number
    salaryMax: number
    location: string
    jobType: "REMOTE" | "PART_TIME" | "FULL_TIME"
}

export async function generateMetadata({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const job = await getJobDetails(id);

    return {
        title: `${job.title} - Xodosoft Careers`,
    }
}

async function getJobDetails(id: string): Promise<Jobs> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?id=${id}`
    const response = await axios.get(url)
    return response.data
}

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;
    const job = await getJobDetails(id);

    const formatJobType = (type: string) => {
        const typeMap: Record<string, string> = {
            REMOTE: "Remote",
            PART_TIME: "Part Time",
            FULL_TIME: "Full Time",
        }
        return typeMap[type] || type
    }

    const formatDate = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true })
        } catch (error) {
            console.log("Error formatting date:", error);

            return dateString
        }
    }

    const formatSalary = (min: number, max: number) => {
        return `${min.toLocaleString()}k - ${max.toLocaleString()}k`
    }

    return (
        <section className="bg-white px-4 md:px-6 lg:px-8 py-16 mt-[65px]">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                    <p className="text-gray-500 mt-2">{formatDate(job.createdAt)}</p>
                </div>
                <Badge
                    className={`${job.status === "ACTIVE"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 w-fit"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                        } text-sm font-medium px-3 py-1`}
                >
                    {job.status}
                </Badge>
            </div>

            <Separator />

            <div className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#475C7B] p-2 rounded-full">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Salary Range</p>
                            <p className="font-medium">{formatSalary(job.salaryMin, job.salaryMax)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-[#475C7B] p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{job.location}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="bg-[#475C7B] p-2 rounded-full">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Job Type</p>
                            <p className="font-medium">{formatJobType(job.jobType)}</p>
                        </div>
                    </div>
                </div>

                {job.description && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Overview</h2>
                        <div className="prose max-w-none text-gray-700">
                            <p className="text-sm/7">{job.description}</p>
                        </div>
                    </div>
                )}

                {job.jobDetails && (
                    <div className="prose max-w-none text-gray-700 text-sm/7 prose-li:leading-tight" dangerouslySetInnerHTML={{ __html: job.jobDetails }} />
                )}
            </div>
            <Link href={`/career/apply?id=${job.id}`}>
                <div className="relative inline-flex items-center justify-center gap-4 group w-full sm:w-auto" style={{ marginTop: "40px" }}>
                    <div className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <Button size="default" className="z-10 flex items-center gap-2 w-full sm:w-auto rounded-md">
                        Apply Now
                        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                </div>
            </Link>
        </section>
    )
}

