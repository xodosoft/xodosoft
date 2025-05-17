"use client";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPinHouse, PhoneOutgoing, } from "lucide-react"
import Link from "next/link"

export default function Contact() {
    return (
        <motion.div
            className="grid lg:grid-cols-2 gap-8 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            }}
        >
            {/* Left Column */}
            <motion.div className="space-y-8" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <motion.h2
                    className="mt-3 text-3xl font-bold sm:text-4xl"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                    Get in touch
                </motion.h2>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <span className="inline-block p-4 bg-white rounded-full shadow-lg">
                                <Mail className="text-blue-500 filter drop-shadow-lg" />
                            </span>
                            <Link className="transition hover:text-blue-500" href="mailto:xodosoft@gmailcom">
                                xodosoft@gmail.com
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <span className="inline-block p-4 bg-white rounded-full shadow-lg">
                                <PhoneOutgoing className="text-blue-500 filter drop-shadow-lg" />
                            </span>
                            <Link className="transition hover:text-blue-500" href="tel:02135305947">
                                021-35305947
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <span className="inline-block p-4 bg-white rounded-full shadow-lg">
                                <MapPinHouse className="text-blue-500 filter drop-shadow-lg" />
                            </span>
                            <p className="max-w-lg">Suite # 09, Mezzaine Floor,
                                Marine Galleria Apartments, Plot # G-19 Kehkashan
                                Clifton Block 9 Karachi</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 ms-2">
                    <h3 className="text-xl font-bold mt-12">Follow Us</h3>
                    <div className="flex space-x-4 items-center">
                        <div className="group relative mb-1">
                            <Link href={"https://www.linkedin.com/company/xodosoft/"} target='_blank'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0,0,256,256"
                                    width="30px"
                                    height="30px"
                                    fillRule="nonzero"
                                >
                                    <g transform="translate(-64,-64) scale(1.5,1.5)">
                                        <g
                                            fill="#ffffff"
                                            fillRule="nonzero"
                                            stroke="none"
                                            strokeWidth={1}
                                            strokeLinecap="butt"
                                            strokeLinejoin="miter"
                                            strokeMiterlimit={10}
                                            strokeDasharray=""
                                            strokeDashoffset={0}
                                            fontFamily="none"
                                            fontWeight="none"
                                            fontSize="none"
                                            textAnchor="none"
                                            style={{ mixBlendMode: "normal" }}
                                        >
                                            <path
                                                d="M42.66667,213.33333v-170.66667h170.66667v170.66667z"
                                                id="bgRectangle"
                                            />
                                        </g>
                                        <g
                                            fill="none"
                                            fillRule="nonzero"
                                            stroke="none"
                                            strokeWidth={1}
                                            strokeLinecap="butt"
                                            strokeLinejoin="miter"
                                            strokeMiterlimit={10}
                                            strokeDasharray=""
                                            strokeDashoffset={0}
                                            fontFamily="none"
                                            fontWeight="none"
                                            fontSize="none"
                                            textAnchor="none"
                                            style={{ mixBlendMode: "normal" }}
                                        >
                                            <g transform="scale(5.33333,5.33333)">
                                                <path
                                                    d="M42,37c0,2.762 -2.238,5 -5,5h-26c-2.761,0 -5,-2.238 -5,-5v-26c0,-2.762 2.239,-5 5,-5h26c2.762,0 5,2.238 5,5z"
                                                    fill="#0078d4"
                                                />
                                                <path
                                                    d="M30,37v-10.099c0,-1.689 -0.819,-2.698 -2.192,-2.698c-0.815,0 -1.414,0.459 -1.779,1.364c-0.017,0.064 -0.041,0.325 -0.031,1.114l0.002,10.319h-7v-19h7v1.061c1.022,-0.705 2.275,-1.061 3.738,-1.061c4.547,0 7.261,3.093 7.261,8.274l0.001,10.726zM11,37v-19h3.457c-2.003,0 -3.457,-1.472 -3.457,-3.501c0,-2.027 1.478,-3.499 3.514,-3.499c2.012,0 3.445,1.431 3.486,3.479c0,2.044 -1.479,3.521 -3.515,3.521h3.515v19z"
                                                    fill="#000000"
                                                    opacity="0.05"
                                                />
                                                <path
                                                    d="M30.5,36.5v-9.599c0,-1.973 -1.031,-3.198 -2.692,-3.198c-1.295,0 -1.935,0.912 -2.243,1.677c-0.082,0.199 -0.071,0.989 -0.067,1.326l0.002,9.794h-6v-18h6v1.638c0.795,-0.823 2.075,-1.638 4.238,-1.638c4.233,0 6.761,2.906 6.761,7.774l0.001,10.226zM11.5,36.5v-18h6v18zM14.457,17.5c-1.713,0 -2.957,-1.262 -2.957,-3.001c0,-1.738 1.268,-2.999 3.014,-2.999c1.724,0 2.951,1.229 2.986,2.989c0,1.749 -1.268,3.011 -3.015,3.011z"
                                                    fill="#000000"
                                                    opacity="0.07"
                                                />
                                                <path
                                                    d="M12,19h5v17h-5zM14.485,17h-0.028c-1.492,0 -2.457,-1.112 -2.457,-2.501c0,-1.419 0.995,-2.499 2.514,-2.499c1.521,0 2.458,1.08 2.486,2.499c0,1.388 -0.965,2.501 -2.515,2.501zM36,36h-5v-9.099c0,-2.198 -1.225,-3.698 -3.192,-3.698c-1.501,0 -2.313,1.012 -2.707,1.99c-0.144,0.35 -0.101,1.318 -0.101,1.807v9h-5v-17h5v2.616c0.721,-1.116 1.85,-2.616 4.738,-2.616c3.578,0 6.261,2.25 6.261,7.274l0.001,9.726z"
                                                    fill="#ffffff"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
z-20 origin-left scale-0 px-3 rounded-lg border 
border-gray-300 bg-white text-black py-2 text-sm font-bold
shadow-md transition-all duration-300 ease-in-out 
group-hover:scale-100">LinkedIn<span>
                                </span></span>
                        </div>
                        <div className="group relative">
                            <Link href={"https://www.facebook.com/people/Xodosoft-SMC-Private-Limited/61576297983139/"} target='_blank'>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="40px"
                                        height="40px"
                                    >
                                        <linearGradient
                                            id="Ld6sqrtcxMyckEl6xeDdMa"
                                            x1="9.993"
                                            x2="40.615"
                                            y1="9.993"
                                            y2="40.615"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset={0} stopColor="#2aa4f4" />
                                            <stop offset={1} stopColor="#007ad9" />
                                        </linearGradient>
                                        <path
                                            fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                                            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                                        />
                                        <path
                                            fill="#fff"
                                            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                                        />
                                    </svg>
                                </button>
                            </Link>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
z-20 origin-left scale-0 px-3 rounded-lg border 
border-gray-300 bg-white text-black py-2 text-sm font-bold
shadow-md transition-all duration-300 ease-in-out 
group-hover:scale-100">Facebook<span>
                                </span></span>
                        </div>
                        <div className="group relative">
                            <Link href={"https://x.com/xodosoft"} target='_blank'>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 50 50"
                                        width="35px"
                                        height="35px"
                                    >
                                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
                                    </svg>
                                </button>
                            </Link>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
z-20 origin-left scale-0 px-3 rounded-lg border 
border-gray-300 bg-white text-black py-2 text-sm font-bold
shadow-md transition-all duration-300 ease-in-out 
group-hover:scale-100">X<span>
                                </span></span>
                        </div>
                        <div className="group relative">
                            <Link href={"https://www.instagram.com/xodosoft/"} target='_blank'>
                                <button>
                                    <svg width="35px" height="35px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)" />
                                        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)" />
                                        <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)" />
                                        <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white" />
                                        <defs>
                                            <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                                                <stop stopColor="#B13589" />
                                                <stop offset="0.79309" stopColor="#C62F94" />
                                                <stop offset="1" stopColor="#8A3AC8" />
                                            </radialGradient>
                                            <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                                                <stop stopColor="#E0E8B7" />
                                                <stop offset="0.444662" stopColor="#FB8A2E" />
                                                <stop offset="0.71474" stopColor="#E2425C" />
                                                <stop offset="1" stopColor="#E2425C" stopOpacity="0" />
                                            </radialGradient>
                                            <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                                                <stop offset="0.156701" stopColor="#406ADC" />
                                                <stop offset="0.467799" stopColor="#6A45BE" />
                                                <stop offset="1" stopColor="#6A45BE" stopOpacity="0" />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </button>
                            </Link>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
z-20 origin-left scale-0 px-3 rounded-lg border 
border-gray-300 bg-white text-black py-2 text-sm font-bold
shadow-md transition-all duration-300 ease-in-out 
group-hover:scale-100">Instagram<span>
                                </span></span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
                className="space-y-8 px-4 md:px-8 py-8 rounded-xl bg-white text-black"
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            >
                <ContactForm />
            </motion.div>
        </motion.div>
    )
}