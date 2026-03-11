import {
    ArticleSchema,
    ArticleCreateSchema,
    ClientReviewSchema,
    ClientReviewCreateSchema,
    ProjectSchema,
    ProjectCreateSchema,
    ServiceSchema,
    ServiceCreateSchema,
    StackSchema,
    ContactMessageSchema,
} from "../schema/schema";
import z from "zod";

export default abstract class PortfolioRepository {
    protected fetch: (endpoint: string, init?: RequestInit) => Promise<Response>;
    protected accessToken: string | undefined;
    constructor(baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "") {
        this.fetch = async (endpoint: string, init?: RequestInit) => {
            const response = await fetch(
                `${baseURL}${endpoint}`,
                {
                    ...init,
                    headers: {
                        ...(init?.headers || {}),
                        Authorization: this.accessToken
                            ? `Bearer ${this.accessToken}`
                            : "",
                    },
                }
            );
            return response;
        };
    }
    set setAccessToken(token: string) {
        this.accessToken = token;
    }

    abstract getProjects: () => Promise<z.infer<typeof ProjectSchema>[]>;
    abstract getProjectById: (id: string) => Promise<z.infer<typeof ProjectSchema>>;
    abstract createProject: (data: z.infer<typeof ProjectCreateSchema>) => Promise<z.infer<typeof ProjectSchema>>;
    abstract updateProject: (id: string, data: z.infer<typeof ProjectSchema>) => Promise<z.infer<typeof ProjectSchema>>;
    abstract deleteProject: (id: string) => Promise<void>;

    abstract getReviews: () => Promise<z.infer<typeof ClientReviewSchema>[]>;
    abstract createReview: (data: z.infer<typeof ClientReviewCreateSchema>) => Promise<z.infer<typeof ClientReviewSchema>>;
    abstract updateReview: (id: string, data: z.infer<typeof ClientReviewSchema>) => Promise<z.infer<typeof ClientReviewSchema>>;
    abstract deleteReview: (id: string) => Promise<void>;

    abstract getArticles: () => Promise<z.infer<typeof ArticleSchema>[]>;
    abstract getArticleById: (id: string) => Promise<z.infer<typeof ArticleSchema>>;
    abstract createArticle: (data: z.infer<typeof ArticleCreateSchema>) => Promise<z.infer<typeof ArticleSchema>>;
    abstract updateArticle: (id: string, data: z.infer<typeof ArticleSchema>) => Promise<z.infer<typeof ArticleSchema>>;
    abstract deleteArticle: (id: string) => Promise<void>;

    abstract getServices: () => Promise<z.infer<typeof ServiceSchema>[]>;
    abstract getServiceById: (id: string) => Promise<z.infer<typeof ServiceSchema>>;
    abstract createService: (data: z.infer<typeof ServiceCreateSchema>) => Promise<z.infer<typeof ServiceSchema>>;
    abstract updateService: (id: string, data: z.infer<typeof ServiceSchema>) => Promise<z.infer<typeof ServiceSchema>>;
    abstract deleteService: (id: string) => Promise<void>;

    abstract sendContactMessage: (data: z.infer<typeof ContactMessageSchema>) => Promise<void>;
}