import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Page not found - Xodosoft'
}

export default function NotFound() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-transparent flex items-center justify-center">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-400/30 blur-[128px]" />
                <div className="absolute top-[20%] right-[20%] h-[400px] w-[400px] rounded-full bg-purple-400/20 blur-[128px]" />
                <div className="absolute -bottom-[40%] left-[50%] h-[600px] w-[600px] rounded-full bg-cyan-400/30 blur-[128px]" />
            </div>

            <div className="flex flex-col text-center gap-y-8 justify-center items-center">
                <h5 className='font-bold'>Oop! 404 Error!</h5>
                <h1 className="bg-clip-text text-5xl font-semibold sm:text-6xl tracking-wide leading-[1.3]">
                    Page Not
                    <br />
                    Found
                </h1>
                <Link href="/">
                    <button
                        className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
                        type="button"
                    >
                        <div
                            className="bg-[#49C9F2] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
                        >
                            <ArrowLeft className='text-white' />
                        </div>
                        <p className="translate-x-2">Go Back</p>
                    </button>
                </Link>
            </div>
        </section>
    )
}