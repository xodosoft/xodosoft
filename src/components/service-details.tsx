import axios from "axios";
import Image from "next/image";

export default async function ServiceDetails({ serviceId }: { serviceId: string }) {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services?id=${serviceId}`);
    const service = response.data;

    return (
        <div className="grid lg:grid-cols-2 gap-8 px-4 md:px-6 lg:px-8 py-16">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
                <div
                    className="text-md text-gray-600 leading-8 grid gap-4"
                    dangerouslySetInnerHTML={{ __html: service.serviceDetails }}
                />
            </div>
            <div className="relative h-auto lg:h-[500px] aspect-video lg:aspect-auto">
                <Image
                    className="rounded-xl object-cover w-full h-full"
                    src={service.image}
                    alt={service.title}
                    fill
                />
            </div>
        </div>
    );
}
