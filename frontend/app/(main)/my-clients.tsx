"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Title from "@/components/title";
import { useContext } from "react";
import usePromise from "@/lib/hooks/promise";
import PortfolioRepository from "@/lib/repository/base";
import { PortfolioRepositoryContext } from "@/lib/context/context";
import PortfolioRepositoryProd from "@/lib/repository/prod";
import { ClientReviewCard } from "@/components/card";


function MyClientReview() {
    const portfolioRepo = useContext<PortfolioRepository | null>(PortfolioRepositoryContext);
    const {
        data: reviews,
        isLoading: reviewsLoading,
        error: reviewsError,
    } = usePromise(portfolioRepo?.getReviews)
    // const reviews = await (new PortfolioRepositoryProd()).getReviews();
    return (
        <div>
            <Title id="reviews">My Client Reviews</Title>
            <Swiper
                spaceBetween={34}
                slidesPerView={1}
                breakpoints={{

                    640: {
                        slidesPerView: 1.5,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 2.5,
                    },
                    1280: {
                        slidesPerView: 3,
                    }
                }}
                className="px-4"
                autoplay={{ delay: 3000 }}
                modules={[Navigation]}
                allowTouchMove={false}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
            >
                {reviews?.map((item, index) => (
                    <ClientReviewCard {...item} key={index} />
                ))}
                <div className="flex flex-row gap-4 justify-center items-center py-10">
                    <div className="swiper-button-prev p-5 rounded-full dark:bg-[#15131a] bg-slate-200 hover:bg-blue-600 cursor-pointer">
                        <MdArrowBack size={28} />
                    </div>
                    <div className="swiper-button-next p-5 rounded-full dark:bg-[#15131a] bg-slate-200 hover:bg-blue-600 cursor-pointer">
                        <MdArrowForward size={28} />
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default MyClientReview

