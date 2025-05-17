import { JobApplicationForm } from '@/components/job-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Apply - Xodosoft'
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const id = (await searchParams).id
    const jobId = typeof id === "string" ? id : undefined;

    return (
        <section className="px-4 md:px-6 lg:px-8 py-16 mt-[65px]">
            <div className="mb-8">
                <h1 className="text-4xl mb-3 font-extrabold text-gray-900 leading-tight">
                    Apply for a Job
                </h1>
            </div>
            <JobApplicationForm jobId={jobId} />
        </section >
    )
}