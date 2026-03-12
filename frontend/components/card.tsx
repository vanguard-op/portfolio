"use client";

import React, { useRef } from 'react'
import { ArrowFilledLink } from './link'
import { ArticleSchema, ProjectSchema } from '@/lib/schema/schema'
import Image from 'next/image'
import { BiCalendar } from 'react-icons/bi'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import z from "zod";
import { Swiper, SwiperSlide } from "swiper/react"
import { ClientReviewSchema } from "@/lib/schema/schema";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const ProjectCard: React.FC<{ project: z.infer<typeof ProjectSchema>, index: number }> = ({ project, index }) => {
    const projectImage = useRef<HTMLDivElement>(null);
    const projectInfo = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        gsap.fromTo(projectImage.current,
            {
                opacity: 0,
                // rotate: -25,
                scaleY: 0.8,
                scaleX: 0.8,
                transformOrigin: "bottom left",
            },
            {
                opacity: 1,
                rotate: 0,
                scaleY: 1,
                scaleX: 1,
                transformOrigin: "bottom left",
                duration: 0.7,
                scrollTrigger: {
                    trigger: projectImage.current,
                    start: "top 70%",
                    end: "top 70%",
                    toggleActions: "play play reverse reverse",
                    // scrub: true
                },
            }
        );
        gsap.fromTo(projectInfo.current,
            {
                opacity: 0,
                // rotate: 25,
                scaleY: 0.8,
                scaleX: 0.8,
                transformOrigin: "bottom right",
            },
            {
                opacity: 1,
                rotate: 0,
                scaleY: 1,
                scaleX: 1,
                transformOrigin: "bottom right",
                duration: 0.7,
                scrollTrigger: {
                    trigger: projectInfo.current,
                    start: "top 70%",
                    end: "top 70%",
                    toggleActions: "play play reverse reverse",
                    // scrub: true
                },
            }
        );
    }, [projectImage, projectInfo]);
    console.log("Image url", project.image.url)
    return (
        <article className="flex lg:flex-row flex-col gap-[50px] pb-[60px] border-b border-b-[#403e44]">
            <div ref={projectImage} className={`flex-1 h-auto`}>
                <Image
                    src={project.image.url}
                    alt={project.image.alt_text}
                    width={500}
                    height={500}
                    className='w-full h-[300px] lg:h-full object-cover object-center'
                />
            </div>
            <div ref={projectInfo} className="flex-1">
                <h3>
                    <div className={`text-[#403e44] text-[120px] leading-tight tracking-[2.4px] lg:mb-[70px] mb-[8px]`}>{index < 9 ? "0" : ""}{index + 1}</div>
                    <div className={`mb-6 uppercase text-[38px] tracking-[-1px] font-bold leading-tight`}>{project.title}</div>
                </h3>
                <p className={`font-light text-base leading-tight mb-9`}>{project.overview}</p>
                <ul className="flex flex-row flex-wrap gap-4 mb-10" aria-label="stack">
                    {project.stack.map((citem, cindex) => (
                        <li key={cindex} className={`text-sm border border-[#403e44] rounded-full px-3.5 py-2.5 capitalize`}>{citem}</li>
                    ))}
                </ul>
                <section>
                    <ArrowFilledLink href={`/projects/${project.id}`}>View Details</ArrowFilledLink>
                </section>
            </div>
        </article>
    )
}


export const RecentArticleCard = (props: z.infer<typeof ArticleSchema>) => {
    return (
        <article className="w-full h-[500px] flex flex-col sm:flex-row dark:bg-[#15131a] bg-slate-200 overflow-hidden">
            <div className={`flex-1 overflow-hidden bg-slate-400 dark:bg-[#201d28]`}>
                <Image
                    src={props.image.url}
                    alt={props.image.alt_text}
                    width={500}
                    height={500}
                    className='w-full h-full object-cover object-center'
                />
            </div>
            <div className={`flex-1 flex flex-col overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:px-10 px-4 sm:py-16 py-4`}>
                <p className='mb-2 flex flex-row items-center gap-2'><BiCalendar size={24} /> {props?.updated_at.split("T").at(0)}</p>
                <h2 className={`flex-1 mb-3 sm:mb-6 uppercase text-lg sm:text-[38px] tracking-[-1px] font-bold leading-tight`}>{props.title}</h2>
                {/* <p className={`font-light text-base leading-tight flex-1 mb-4 sm:mb-9`}>{props.content_url}</p> */}
                <div className="z-10 relative">
                    <ArrowFilledLink href={`/articles/${props.id}`}>View Details</ArrowFilledLink>
                </div>
            </div>
        </article>
    )
}

export const ArticleCard = (props: z.infer<typeof ArticleSchema>) => {
    return (
        <article className="w-full flex flex-col dark:bg-[#15131a] bg-slate-200 overflow-hidden">
            <div className={`flex-1 overflow-hidden bg-slate-400 dark:bg-[#201d28]`}>
                <Image
                    src={props.image.url}
                    alt={props.image.alt_text}
                    width={500}
                    height={500}
                    className='w-full h-[250px] sm:h-[500px] object-cover object-center hover:scale-105 transition-transform duration-300'
                />
            </div>
            <div className={`flex-1 flex flex-col overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:px-10 px-4 sm:py-16 py-4`}>
                <p className='mb-2 flex flex-row items-center gap-2'><BiCalendar size={24} /> {props?.updated_at.split("T").at(0)}</p>
                <h2 className={`flex-1 mb-3 sm:mb-6 uppercase text-lg sm:text-[38px] tracking-[-1px] font-bold leading-tight`}>{props.title}</h2>
                {/* <p className={`font-light text-base leading-tight flex-1 mb-4 sm:mb-9`}>{props.content_url}</p> */}
                <div className="z-10 relative">
                    <ArrowFilledLink href={`/articles/${props.id}`}>View Details</ArrowFilledLink>
                </div>
            </div>
        </article>
    )
}

export const ClientReviewCard = (props: z.infer<typeof ClientReviewSchema>) => {
    return (
        <SwiperSlide key={props.id}>
            <article className="w-full h-[375px] flex flex-col dark:bg-[#15131a] bg-slate-200 sm:py-9 py-6 sm:px-7 px-4">
                <div className="flex flex-row sm:pb-6 pb-3 border-b border-b-[#2c2839]">
                    <div className="flex-1">
                        <Image
                            src={props.client_image.url}
                            alt={props.client_image.alt_text}
                            width={56}
                            height={56}
                            className="w-14 h-14 object-cover object-top rounded-full mb-4"
                        />
                        <h3 className={`text-left sm:mb-2.5 mb-0 uppercase text-xl font-bold tracking-tight`}>{props.client_name}</h3>
                        <h4 className={`text-left text-base font-light tracking-tight text-[#9b9b9b]`}>{props.client_title}</h4>
                    </div>
                    <Image
                        src={props.company_image.url}
                        alt={props.company_image.alt_text}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-cover object-top rounded-full"
                    />
                </div>
                <p className={`flex-1 sm:text-xl text-lg overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] font-semibold leading-tight sm:mt-6 mt-3`}>{props.message}</p>
            </article>
        </SwiperSlide>
    )
}