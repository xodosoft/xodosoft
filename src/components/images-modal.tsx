"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs"
import { Separator } from "./ui/separator"
import Image from "next/image"
import { Checkbox } from "./ui/checkbox"
import { ImageIcon, Loader2 } from "lucide-react"
import Upload from "./upload"
import { Images, useImagesStore } from "@/store/useImages"
import { ScrollArea } from "./ui/scroll-area"

type ImagesModalProps = {
    text: string
    multiple?: boolean
    onSelect: (selectedImages: Images[]) => void
}

export default function ImagesModal({
    text,
    multiple = false,
    onSelect,
}: ImagesModalProps) {
    const { images, fetchImages, loading, loadMoreImages, nextCursor } = useImagesStore()
    const [selectedImages, setSelectedImages] = useState<Images[]>([])

    useEffect(() => {
        fetchImages()
    }, [])

    const handleImageSelect = (url: string, id: string) => {
        const image = { secure_url: url, public_id: id }

        if (multiple) {
            const alreadySelected = selectedImages.some((img) => img.public_id === id)
            if (alreadySelected) {
                setSelectedImages((prev) => prev.filter((img) => img.public_id !== id))
            } else {
                setSelectedImages((prev) => [...prev, image])
            }
        } else {
            setSelectedImages([image])
        }
    }

    const handleDone = () => {
        onSelect(selectedImages)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-black border-gray-300 hover:bg-gray-100"
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {text}
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95%] sm:w-5/6 max-w-2xl bg-white border border-gray-200 p-0 max-h-[90vh] flex flex-col">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle className="text-xl font-semibold text-black">
                        Images
                    </DialogTitle>
                </DialogHeader>
                <Separator className="bg-gray-200" />

                <Tabs defaultValue="select" className="w-full flex-1 flex flex-col">
                    <div className="px-6 pt-4">
                        <TabsList className="bg-gray-100 p-1 w-full">
                            <TabsTrigger
                                value="upload"
                                className="w-full data-[state=active]:bg-white data-[state=active]:text-black"
                            >
                                Upload New
                            </TabsTrigger>
                            <TabsTrigger
                                value="select"
                                className="w-full data-[state=active]:bg-white data-[state=active]:text-black"
                            >
                                Select Existing
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="upload" className="p-6 flex-1 overflow-auto">
                        <Upload />
                    </TabsContent>

                    <TabsContent value="select" className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-y-auto p-6 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            {loading && images.length === 0 ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                </div>
                            ) : (
                                <ScrollArea className="h-72 px-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {images.map(({ secure_url, public_id }) => {
                                            const isSelected = selectedImages.some((img) => img.public_id === public_id)
                                            return (
                                                <div
                                                    key={public_id}
                                                    className="group cursor-pointer relative aspect-square rounded-md overflow-hidden border border-gray-200"
                                                    onClick={() => handleImageSelect(secure_url, public_id)}
                                                >
                                                    <div className="absolute top-2 right-2 z-20">
                                                        <div className="bg-white rounded-md shadow-sm p-1 flex items-center justify-center">
                                                            <Checkbox
                                                                className="h-4 w-4"
                                                                checked={isSelected}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* overlay shown on hover */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                    <Image
                                                        loading="lazy"
                                                        src={secure_url || "/placeholder.svg"}
                                                        alt="Image"
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </ScrollArea>
                            )}
                        </div>

                        <div className="p-6 pt-2">
                            {nextCursor && (
                                <div className="flex justify-center">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={loadMoreImages}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            "Load More"
                                        )}
                                    </Button>
                                </div>
                            )}

                            <Separator className="my-4 bg-gray-200" />
                            <Button
                                size="sm"
                                className="ml-auto block bg-black text-white hover:bg-gray-800"
                                onClick={handleDone}
                            >
                                Done
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
