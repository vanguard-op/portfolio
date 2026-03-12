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

export default class PortfolioRepositoryMock extends PortfolioRepository {
    private mockProjects: z.infer<typeof ProjectSchema>[] = [
        {
            id: "1",
            title: "E-Commerce Platform",
            overview: "A full-stack e-commerce platform built with Next.js and FastAPI",
            content_uri: "content-1",
            content_url: "content-1",
            image: {
                url: "/images/mobile.png",
                alt_text: "E-Commerce Platform",
                uri: "/images/mobile.png"
            },
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-01-15T10:00:00Z",
            stacks: [
                { name: "Next.js", description: "React Framework" },
                { name: "FastAPI", description: "Python Web Framework" },
                { name: "PostgreSQL", description: "Database" },
                { name: "Docker", description: "Containerization" },
            ],
        },
        {
            id: "2",
            title: "Task Management System",
            overview: "A collaborative task management application with real-time updates",
            content_uri: "content-2",
            content_url: "content-2",
            image: {
                url: "/images/mobile.png",
                alt_text: "Task Management System",
                uri: "/images/mobile.png"
            },
            created_at: "2024-02-20T14:30:00Z",
            updated_at: "2024-02-20T14:30:00Z",
            stacks: [
                { name: "React", description: "UI Library" },
                { name: "Node.js", description: "JavaScript Runtime" },
                { name: "MongoDB", description: "NoSQL Database" },
            ],
        },
        {
            id: "3",
            title: "AI Content Generator",
            overview: "An AI-powered content generation tool using GPT models",
            content_uri: "content-3",
            content_url: "content-3",
            image: {
                url: "/images/mobile.png",
                alt_text: "AI Content Generator",
                uri: "/images/mobile.png"
            },
            created_at: "2024-03-10T09:15:00Z",
            updated_at: "2024-03-10T09:15:00Z",
            stacks: [
                { name: "Python", description: "Programming Language" },
                { name: "OpenAI", description: "AI API" },
                { name: "TypeScript", description: "Typed JavaScript" },
            ],
        },
    ];

    private mockReviews: z.infer<typeof ClientReviewSchema>[] = [
        {
            id: "1",
            client_name: "Sarah Johnson",
            client_title: "CEO, TechStart Inc",
            client_image: {
                url: "/images/mobile.png",
                alt_text: "Sarah Johnson",
                uri: "/images/mobile.png"
            },
            company_image: {
                url: "/images/mobile.png",
                alt_text: "TechStart Inc",
                uri: "/images/mobile.png"
            },
            message: "Exceptional work! The portfolio website exceeded our expectations. The attention to detail and technical expertise made the entire process seamless.",
            created_at: "2024-01-20T12:00:00Z",
            updated_at: "2024-01-20T12:00:00Z",
        },
        {
            id: "2",
            client_name: "Michael Chen",
            client_title: "CTO, DevSolutions",
            client_image: {
                url: "/images/mobile.png",
                alt_text: "Michael Chen",
                uri: "/images/mobile.png"
            },
            company_image: {
                url: "/images/mobile.png",
                alt_text: "DevSolutions",
                uri: "/images/mobile.png"
            },
            message: "Outstanding developer who delivers quality code on time. The e-commerce platform they built has been running flawlessly for months.",
            created_at: "2024-02-15T15:30:00Z",
            updated_at: "2024-02-15T15:30:00Z",
        },
        {
            id: "3",
            client_name: "Emily Rodriguez",
            client_title: "Product Manager, InnovateCo",
            client_image: {
                url: "/images/mobile.png",
                alt_text: "Emily Rodriguez",
                uri: "/images/mobile.png"
            },
            company_image: {
                url: "/images/mobile.png",
                alt_text: "InnovateCo",
                uri: "/images/mobile.png"
            },
            message: "Great communication skills and technical prowess. They turned our complex requirements into an elegant solution.",
            created_at: "2024-03-05T10:45:00Z",
            updated_at: "2024-03-05T10:45:00Z",
        },
        {
            id: "4",
            client_name: "David Thompson",
            client_title: "Founder, StartupHub",
            client_image: {
                url: "/images/mobile.png",
                alt_text: "David Thompson",
                uri: "/images/mobile.png"
            },
            company_image: {
                url: "/images/mobile.png",
                alt_text: "StartupHub",
                uri: "/images/mobile.png"
            },
            message: "Highly recommended! Professional, efficient, and always willing to go the extra mile. Our project was completed ahead of schedule.",
            created_at: "2024-03-25T14:20:00Z",
            updated_at: "2024-03-25T14:20:00Z",
        },
    ];

    private mockArticles: z.infer<typeof ArticleSchema>[] = [
        {
            id: "1",
            title: "Building Scalable Web Applications with Next.js",
            content_uri: "content-1",
            content_url: "content-1",
            image: {
                url: "/images/mobile.png",
                alt_text: "Building Scalable Web Applications with Next.js",
                uri: "/images/mobile.png"
            },
            created_at: "2024-01-10T08:00:00Z",
            updated_at: "2024-01-10T08:00:00Z",
        },
        {
            id: "2",
            title: "FastAPI: Building High-Performance APIs",
            content_uri: "content-2",
            content_url: "content-2",
            image: {
                url: "/images/mobile.png",
                alt_text: "FastAPI: Building High-Performance APIs",
                uri: "/images/mobile.png"
            },
            created_at: "2024-02-05T11:30:00Z",
            updated_at: "2024-02-05T11:30:00Z",
        },
        {
            id: "3",
            title: "Docker Best Practices for Development",
            content_uri: "content-3",
            content_url: "content-3",
            image: {
                url: "/images/mobile.png",
                alt_text: "Docker Best Practices for Development",
                uri: "/images/mobile.png"
            },
            created_at: "2024-03-01T16:00:00Z",
            updated_at: "2024-03-01T16:00:00Z",
        },
    ];

    private mockServices: z.infer<typeof ServiceSchema>[] = [
        {
            name: "AI/ML Solutions",
            description: "I create intelligent systems that solve complex problems using machine learning and AI algorithms. Whether it's predictive modeling or natural language processing, I bring data-driven insights to life with precision and efficiency."
        },
        {
            name: "Full-Stack Development",
            description: "I build robust, scalable applications from front to back, ensuring seamless integration and optimal performance. My expertise spans both client-side and server-side technologies, allowing me to deliver complete, end-to-end solutions."
        },
        {
            name: "Front-End Development",
            description: "I craft responsive, user-friendly interfaces with modern tools like React, Next.js, and Vue. My focus is on creating engaging, intuitive designs that enhance user experiences and drive interaction."
        },
        {
            name: "Back-End Development",
            description: "I design and implement efficient back-end systems, ensuring high performance, security, and scalability. Using technologies like Node.js, Django, and Flask, I deliver solid back-end architectures that power seamless applications."
        },
        {
            name: "API Development",
            description: "I specialize in designing and building RESTful APIs and GraphQL services that are fast, scalable, and maintainable. My goal is to ensure your applications can communicate smoothly with external services and data sources, providing a solid interface for users and other systems."
        },
        {
            name: "Web Optimization",
            description: "I optimize websites for speed, performance, and SEO. By analyzing and fine-tuning every aspect, I ensure fast load times and improved user engagement, making your website work smarter, not harder."
        },
        {
            name: "Mobile Development",
            description: "I create powerful mobile applications for both Android and iOS, using tools like React Native and Flutter. I focus on delivering seamless, high-performance mobile experiences that align with your business goals."
        },
        {
            name: "System Architecture",
            description: "I design scalable, high-performance architectures that ensure systems are robust, maintainable, and future-proof. From cloud integration to microservices, I create architectures that grow with your business."
        }
    ];

    getProjects = async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return this.mockProjects;
    };

    getReviews = async () => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.mockReviews;
    };

    getReviewById = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const review = this.mockReviews.find(r => String(r.id) === String(id));
        if (!review) throw new Error(`Review with id ${id} not found`);
        return review as z.infer<typeof ClientReviewSchema>;
    };

    getArticles = async () => {
        await new Promise(resolve => setTimeout(resolve, 250));
        return this.mockArticles;
    };

    getServices = async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
        return this.mockServices;
    };

    getArticleById = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const article = this.mockArticles.find(a => String(a.id) === String(id));
        if (!article) throw new Error(`Article with id ${id} not found`);
        return article as z.infer<typeof ArticleSchema>;
    };

    createArticle = async (data: z.infer<typeof ArticleCreateSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newArticle: z.infer<typeof ArticleSchema> = { ...data, id: String(Date.now()), content_url: data.content_uri, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        this.mockArticles.push(newArticle);
        return newArticle;
    };

    updateArticle = async (id: string, data: Partial<z.infer<typeof ArticleSchema>>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = this.mockArticles.findIndex(a => String(a.id) === String(id));
        if (index === -1) throw new Error("Not found");
        this.mockArticles[index] = { ...this.mockArticles[index], ...data };
        return this.mockArticles[index];
    };

    deleteArticle = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        this.mockArticles = this.mockArticles.filter(a => String(a.id) !== String(id));
    };

    getProjectById = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const project = this.mockProjects.find(p => String(p.id) === String(id));
        if (!project) throw new Error(`Project with id ${id} not found`);
        return project as z.infer<typeof ProjectSchema>;
    };

    createProject = async (data: z.infer<typeof ProjectCreateSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newProject: z.infer<typeof ProjectSchema> = { ...data, id: String(Date.now()), content_url: data.content_uri, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        this.mockProjects.push(newProject);
        return newProject;
    };

    updateProject = async (id: string, data: Partial<z.infer<typeof ProjectSchema>>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = this.mockProjects.findIndex(p => String(p.id) === String(id));
        if (index === -1) throw new Error("Not found");
        this.mockProjects[index] = { ...this.mockProjects[index], ...data };
        return this.mockProjects[index];
    };

    deleteProject = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        this.mockProjects = this.mockProjects.filter(p => String(p.id) !== String(id));
    };

    getServiceById = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const service = this.mockServices[Number(id) - 1];
        if (!service) throw new Error(`Service with id ${id} not found`);
        return service;
    };

    createService = async (data: z.infer<typeof ServiceCreateSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newService: z.infer<typeof ServiceSchema> = { ...data, id: String(Date.now()), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        this.mockServices.push(newService);
        return newService;
    };

    updateService = async (id: string, data: Partial<z.infer<typeof ServiceSchema>>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = Number(id) - 1;
        if (!this.mockServices[index]) throw new Error("Not found");
        this.mockServices[index] = { ...this.mockServices[index], ...data };
        return this.mockServices[index];
    };

    deleteService = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        this.mockServices.splice(Number(id) - 1, 1);
    };

    createReview = async (data: z.infer<typeof ClientReviewCreateSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const newReview: z.infer<typeof ClientReviewSchema> = { ...data, id: String(Date.now()), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        this.mockReviews.push(newReview);
        return newReview;
    };

    updateReview = async (id: string, data: Partial<z.infer<typeof ClientReviewSchema>>) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const index = this.mockReviews.findIndex(r => String(r.id) === String(id));
        if (index === -1) throw new Error("Not found");
        this.mockReviews[index] = { ...this.mockReviews[index], ...data };
        return this.mockReviews[index];
    };

    deleteReview = async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        this.mockReviews = this.mockReviews.filter(r => String(r.id) !== String(id));
    };

    sendContactMessage = async (data: z.infer<typeof ContactMessageSchema>) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log('Mock contact message sent:', data);
    };

    getMediaUploadUrl = async (directory: string, filename: string, contentType?: string) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return {
            url: `https://mock-s3-presigned-url.com/${directory}/${filename}?contentType=${contentType}`,
            key: `${directory}/${filename}`
        };
    };

    listMedia = async (directory: string, pageSize: number = 50) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return [
            { key: `${directory}/mock1.jpg`, url: "/images/mobile.png" },
            { key: `${directory}/mock2.jpg`, url: "/images/mobile.png" },
        ];
    };

    uploadToS3 = async (url: string, body: Blob | string | File, contentType?: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Mock S3 upload to ${url} with content type ${contentType}`);
    };

    fetchMarkdown = async (url: string) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return "# Mock Markdown Content\n\nThis is fetched from a mock repository.";
    };

    getMediaUrl = (key: string) => {
        return "/images/mobile.png";
    };

    uploadMarkdown = async (directory: string, filename: string, content: string): Promise<string> => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;
        console.log(`Mock S3 upload for ${directory}/${safeFilename}`);
        return `${directory}/${safeFilename}`;
    };
}
