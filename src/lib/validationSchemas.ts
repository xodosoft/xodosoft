import { z } from "zod";
import validator from "validator";

export const ContactSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty({ message: "Name is required." })
        .min(2, { message: "Name must be at least 2 characters." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain letters and spaces." }),

    email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please enter a valid email address." }),

    subject: z
        .string()
        .trim()
        .nonempty({ message: "Subject is required." })
        .min(3, { message: "Subject must be at least 3 characters." })
        .max(100, { message: "Subject cannot exceed 100 characters." }),

    message: z
        .string()
        .trim()
        .nonempty({ message: "Message is required." })
        .min(80, { message: "Message must be at least 80 characters long." })
        .max(300, { message: "Message cannot exceed 300 characters." }),
});

export const QuoteSchema = z.object({
    firstName: z
        .string()
        .trim()
        .nonempty({ message: "First name is required." })
        .min(2, { message: "First name must be at least 2 characters." })
        .max(50, { message: "First name cannot exceed 50 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "First name can only contain letters and spaces." }),

    lastName: z
        .string()
        .trim()
        .nonempty({ message: "Last name is required." })
        .min(2, { message: "Last name must be at least 2 characters." })
        .max(50, { message: "Last name cannot exceed 50 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "Last name can only contain letters and spaces." }),

    email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please enter a valid email address." }),

    phone: z.string().refine((value) => validator.isMobilePhone(value, "any", { strictMode: false }), {
        message: "Invalid phone number.",
    }),

    service: z.string().min(1, {
        message: "Please select a service.",
    }),

    date: z.date({
        required_error: "Date is required.",
    }),

    subject: z
        .string()
        .trim()
        .nonempty({ message: "Subject is required." })
        .min(3, { message: "Subject must be at least 3 characters." })
        .max(100, { message: "Subject cannot exceed 100 characters." }),

    message: z
        .string()
        .trim()
        .nonempty({ message: "Message is required." })
        .min(80, { message: "Message must be at least 80 characters long." })
        .max(300, { message: "Message cannot exceed 500 characters." }),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = ["application/pdf"]

export const ApplicationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .nonempty({ message: "First name is required." })
        .min(2, { message: "First name must be at least 2 characters." })
        .max(50, { message: "First name cannot exceed 50 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "First name can only contain letters and spaces." }),

    lastName: z
        .string()
        .trim()
        .nonempty({ message: "Last name is required." })
        .min(2, { message: "Last name must be at least 2 characters." })
        .max(50, { message: "Last name cannot exceed 50 characters." })
        .regex(/^[A-Za-z\s]+$/, { message: "Last name can only contain letters and spaces." }),

    email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please enter a valid email address." }),

    phone: z.string().refine((value) => validator.isMobilePhone(value, "any", { strictMode: false }), {
        message: "Invalid phone number.",
    }),

    resume: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 5MB.",
        })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
            message: "Only PDF files are accepted.",
        }),

    coverLetter: z.string().optional(),
})

export const JobType = {
    PART_TIME: "PART_TIME",
    FULL_TIME: "FULL_TIME",
    REMOTE: "REMOTE",
} as const

export const JobStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const

export const JobSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters." })
        .max(50, { message: "Title cannot exceed 50 characters." }),

    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters." })
        .max(300, { message: "Description cannot exceed 300 characters." }),

    jobDetails: z
        .string()
        .trim()
        .refine((val) => val.replace(/<[^>]*>/g, "").trim().length > 0, {
            message: "Job details is required.",
        }),

    location: z.string().min(1, { message: "Location is required." }),

    salaryMin: z.number().positive({ message: "Salary must be greater than zero." }),

    salaryMax: z.number().positive({ message: "Salary must be greater than zero." }),

    jobType: z.enum([JobType.PART_TIME, JobType.FULL_TIME, JobType.REMOTE], {
        required_error: "Job type is required.",
    }),

    status: z.enum([JobStatus.ACTIVE, JobStatus.INACTIVE], {
        required_error: "Status is required.",
    }),
}).refine((data) => data.salaryMax > data.salaryMin, {
    message: "Maximum salary must be greater than minimum salary.",
    path: ["salaryMax"],
})

const MAX_IMG_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMG_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

export const ServiceSchema = z.object({
    title:
        z.string()
            .trim()
            .nonempty({ message: "Title is required." })
            .min(3, { message: "Title must be at least 3 characters." })
            .max(50, { message: "Title name cannot exceed 50 characters." })
            .regex(/^[A-Za-z\s]+$/, { message: "Title can only contain letters and spaces." }),

    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters." })
        .max(300, { message: "Description cannot exceed 300 characters." }),

    serviceDetails: z
        .string()
        .trim()
        .refine((val) => val.replace(/<[^>]*>/g, "").trim().length > 0, {
            message: "Service details are required.",
        }),

    image: z
        .string()
        .url({ message: "Image URL is required." })
        .nonempty({ message: "Image is required." }),

})

export const loginFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
})

export const CategorySchema = z.object({
    name: z.string()
        .trim()
        .nonempty({ message: "Category name is required." }),
});

export const ProjectSchema = z.object({
    title: z
        .string()
        .min(2, { message: "Title must be at least 2 characters." })
        .max(50, { message: "Title cannot exceed 50 characters." }),

    categoryId: z
        .string()
        .nonempty({ message: "Category ID is required." }),

    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters." })
        .max(500, { message: "Description cannot exceed 300 characters." }),

    image: z
        .string()
        .url({ message: "Image URL is required." })
        .nonempty({ message: "Image is required." }),

    headerImage: z
        .string()
        .url({ message: "Header image must be a valid URL." })
        .nonempty({ message: "Header image is required." }),

    images: z
        .array(z.string().url({ message: "All images must be valid URLs." }))
        .min(1, { message: "At least one image is required." }),

    projectDetails: z
        .string()
        .trim()
        .refine((val) => val.replace(/<[^>]*>/g, "").trim().length > 0, {
            message: "Project details is required.",
        }),

    optionalImagesOne: z
        .array(z.string().url({ message: "All diagram images must be valid URLs." }))
        .optional(),

    optionalDescriptionOne: z
        .string()
        .optional(),

    optionalImagesTwo: z
        .array(z.string().url({ message: "All diagram images must be valid URLs." }))
        .optional(),

    optionalDescriptionTwo: z
        .string()
        .optional(),

    optionalImagesThree: z
        .array(z.string().url({ message: "All diagram images must be valid URLs." }))
        .optional(),

    optionalDescriptionThree: z
        .string()
        .optional(),

});

export const UploadSchema = z.object({
    images: z
        .array(
            z
                .instanceof(File, { message: "Required" })
                .refine((file) => ACCEPTED_IMG_TYPES.includes(file.type), {
                    message: "Only PNG, JPG, JPEG, WEBP and GIF formats are allowed.",
                })
                .refine((file) => file.size <= MAX_IMG_SIZE, {
                    message: `Each file must be less than ${MAX_IMG_SIZE / (1024 * 1024)}MB.`,
                })
        )
        .min(1, { message: "At least one image is required." }),
});