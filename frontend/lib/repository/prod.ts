import {
    ArticleSchema,
    ArticleCreateSchema,
    ClientReviewSchema,
    ClientReviewCreateSchema,
    ProjectSchema,
    ProjectCreateSchema,
    ServiceSchema,
    ServiceCreateSchema,
    ContactMessageSchema,
} from "../schema/schema";
import z from "zod";
import PortfolioRepository from "./base";

export default class PortfolioRepositoryProd extends PortfolioRepository {
    getProjects = async () => {
        const response = await this.fetch('/v1/projects', {
            method: 'GET',
        });
        const data = z.array(ProjectSchema).parse(await response.json());
        return data;
    };
    createProject = async (data: z.infer<typeof ProjectCreateSchema>) => {
        const response = await this.fetch('/v1/projects/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ProjectSchema.parse(await response.json());
    };
    updateProject = async (id: string, data: Partial<z.infer<typeof ProjectSchema>>) => {
        const response = await this.fetch(`/v1/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ProjectSchema.parse(await response.json());
    };
    deleteProject = async (id: string) => {
        await this.fetch(`/v1/projects/${id}`, { method: 'DELETE' });
    };
    getReviews = async () => {
        const response = await this.fetch('/v1/reviews', {
            method: 'GET',
        });
        const data = z.array(ClientReviewSchema).parse(await response.json());
        return data;
    }
    getReviewById = async (id: string) => {
        const response = await this.fetch(`/v1/reviews/${id}`, {
            method: 'GET',
        });
        const data = ClientReviewSchema.parse(await response.json());
        return data;
    }
    createReview = async (data: z.infer<typeof ClientReviewCreateSchema>) => {
        const response = await this.fetch('/v1/reviews/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ClientReviewSchema.parse(await response.json());
    };
    updateReview = async (id: string, data: Partial<z.infer<typeof ClientReviewSchema>>) => {
        const response = await this.fetch(`/v1/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ClientReviewSchema.parse(await response.json());
    };
    deleteReview = async (id: string) => {
        await this.fetch(`/v1/reviews/${id}`, { method: 'DELETE' });
    };
    getArticles = async () => {
        const response = await this.fetch('/v1/articles', {
            method: 'GET',
        });
        const data = z.array(ArticleSchema).parse(await response.json());
        return data;
    }
    createArticle = async (data: z.infer<typeof ArticleCreateSchema>) => {
        const response = await this.fetch('/v1/articles/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ArticleSchema.parse(await response.json());
    };
    updateArticle = async (id: string, data: Partial<z.infer<typeof ArticleSchema>>) => {
        const response = await this.fetch(`/v1/articles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ArticleSchema.parse(await response.json());
    };
    deleteArticle = async (id: string) => {
        await this.fetch(`/v1/articles/${id}`, { method: 'DELETE' });
    };
    getServices = async () => {
        const response = await this.fetch('/v1/services', {
            method: 'GET',
        });
        const data = z.array(ServiceSchema).parse(await response.json());
        return data;
    }
    createService = async (data: z.infer<typeof ServiceCreateSchema>) => {
        const response = await this.fetch('/v1/services/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ServiceSchema.parse(await response.json());
    };
    updateService = async (id: string, data: Partial<z.infer<typeof ServiceSchema>>) => {
        const response = await this.fetch(`/v1/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return ServiceSchema.parse(await response.json());
    };
    deleteService = async (id: string) => {
        await this.fetch(`/v1/services/${id}`, { method: 'DELETE' });
    };
    getArticleById = async (id: string) => {
        const response = await this.fetch(`/v1/articles/${id}`, {
            method: 'GET',
        });
        const data = ArticleSchema.parse(await response.json());
        return data;
    }
    getProjectById = async (id: string) => {
        const response = await this.fetch(`/v1/projects/${id}`, {
            method: 'GET',
        });
        const data = ProjectSchema.parse(await response.json());
        return data;
    }
    getServiceById = async (id: string) => {
        const response = await this.fetch(`/v1/services/${id}`, {
            method: 'GET',
        });
        const data = ServiceSchema.parse(await response.json());
        return data;
    }
    sendContactMessage = async (data: z.infer<typeof ContactMessageSchema>) => {
        await this.fetch('/v1/contacts/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    getMediaUploadUrl = async (directory: string, filename: string, contentType?: string) => {
        const response = await this.fetch('/v1/media/upload-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ directory, filename, content_type: contentType }),
        });
        if (!response.ok) {
            throw new Error(`Failed to get media upload URL: ${response.statusText}`);
        }
        return await response.json();
    };

    listMedia = async (directory: string, pageSize: number = 50) => {
        const response = await this.fetch(`/v1/media/list?directory=${directory}&page_size=${pageSize}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Failed to list media: ${response.statusText}`);
        }
        return (await response.json()) as { key: string; url: string }[];
    };

    uploadToS3 = async (url: string, body: Blob | string | File, contentType?: string) => {
        const headers: Record<string, string> = {};
        if (contentType) {
            headers['Content-Type'] = contentType;
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload to S3: ${response.statusText}`);
        }
    };

    fetchMarkdown = async (url: string) => {
        if (!url) return "";
        try {
            const res = await fetch(url);
            if (!res.ok) return "";
            return await res.text();
        } catch {
            return "";
        }
    };

    getMediaUrl = (key: string) => {
        return `${this.baseURL}/v1/media/${key}`;
    };

    uploadMarkdown = async (directory: string, filename: string, content: string): Promise<string> => {
        // const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;
        const contentType = "text/markdown";

        // 1. Get presigned upload URL via repository
        const { url, key } = await this.getMediaUploadUrl(directory, filename, contentType);

        // 2. PUT the markdown content to S3 via repository
        await this.uploadToS3(url, content, contentType);

        // Return the S3 key (directory/filename)
        return key;
    }
}