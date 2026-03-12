import z from "zod";


export const ImageSchema = z.object({
    uri: z.string(),
    alt_text: z.string(),
    url: z.string(),
});

export const ProjectSchema = z.object({
    id: z.string(),
    image: ImageSchema,
    title: z.string(),
    overview: z.string(),
    content_uri: z.string(),
    content_url: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    stack: z.array(z.string()),
});

export const ProjectCreateSchema = z.object({
    image: ImageSchema,
    title: z.string(),
    overview: z.string(),
    content_uri: z.string(),
    stack: z.array(z.string()),
});

export const ServiceSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const ServiceCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
});


export const ClientReviewSchema = z.object({
    id: z.string(),
    client_name: z.string(),
    client_title: z.string(),
    message: z.string(),
    client_image: ImageSchema,
    company_image: ImageSchema,
    created_at: z.string(),
    updated_at: z.string(),
});

export const ClientReviewCreateSchema = z.object({
    client_name: z.string(),
    client_title: z.string(),
    message: z.string(),
    client_image: ImageSchema,
    company_image: ImageSchema,
});


export const ArticleSchema = z.object({
    id: z.string(),
    title: z.string(),
    content_uri: z.string(),
    content_url: z.string(),
    image: ImageSchema,
    created_at: z.string(),
    updated_at: z.string(),
});

export const ArticleCreateSchema = z.object({
    title: z.string(),
    content_uri: z.string(),
    image: ImageSchema,
});


export const ContactMessageSchema = z.object({
    name: z.string(),
    email: z.email(),
    phone_no: z.string().optional(),
    subject: z.string(),
    message: z.string(),
});
