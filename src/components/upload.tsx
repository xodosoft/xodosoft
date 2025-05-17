"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import axios from "axios"
import { Loader2, UploadCloud } from "lucide-react"
import { UploadSchema } from "@/lib/validationSchemas"
import { useImagesStore } from "@/store/useImages"

export default function Upload() {

    const { setImages } = useImagesStore();

    const [loading, setLoading] = useState<boolean>(false)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleUpload = async (files: File[]) => {
        try {
            const result = UploadSchema.safeParse({ images: files })

            if (!result.success) {
                toast.error("Invalid files. Please check file types and sizes.")
                return
            }

            setLoading(true)
            const formData = new FormData()

            for (const file of files) {
                formData.append("images", file)
            }

            const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            if (response.data) {
                setImages(response.data.images);
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error(error)
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Failed to upload images")
            }
        } finally {
            setLoading(false)
        }
    }

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(Array.from(e.dataTransfer.files))
        }
    }, [])

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleUpload(Array.from(e.target.files))
        }
    }

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-lg p-12 transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700 hover:border-primary"
                    }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={onFileInputChange}
                    disabled={loading}
                />

                <div className="flex flex-col items-center justify-center text-center">
                    {loading ? (
                        <>
                            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Uploading images...</p>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-4" />
                            <p className="text-sm font-medium mb-1">Drag and drop images here or click to browse</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Supports: PNG, JPEG, JPG, WEBP, GIF</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}