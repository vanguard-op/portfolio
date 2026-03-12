import Title, { BigTitle } from '@/components/title'
// import React, { useContext } from 'react'
import { GrOverview } from 'react-icons/gr'
import Link from 'next/link'
import MarkdownViewer from '@/components/markdown-viewer'
// import { ProjectProps } from '@/lib/types'
// import { backendFetch } from '@/lib/fetch'
import Image from 'next/image'
// import { useSearchParams } from 'next/navigation'
// import PortfolioRepository from '@/lib/repository/base'
// import { PortfolioRepositoryContext } from '@/lib/context/context'
// import usePromise from '@/lib/hooks/promise'
import PortfolioRepositoryProd from '@/lib/repository/prod'

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await (new PortfolioRepositoryProd()).getProjectById(id);
    return (
        <main className=''>
            <BigTitle className='sm:whitespace-break-spaces'>{project?.title}</BigTitle>
            <section className="flex sm:flex-row flex-col gap-10 mb-20 mx-4 sm:items-end items-start">
                <div className={`intro-2 flex-grow-[2] flex-shrink max-h-[400px] sm:w-auto w-full overflow-hidden`}>
                    <Image
                        src={project.image.url}
                        alt={project.image.alt_text}
                        width={500}
                        height={500}
                        className='w-full h-full object-cover object-center'
                    />
                </div>
                <div className='intro-3 flex-1'>
                    <ul className='list-disc pl-4 sm:text-3xl text-xl uppercase flex sm:flex-col flex-row flex-wrap gap-y-2 gap-x-12'>
                        {project?.stack.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className='px-4 sm:mb-20 mb-10'>
                <h3 id='overview' className='headline sm:text-3xl text-xl uppercase leading-tight sm:whitespace-nowrap flex flex-row gap-2 sm:mb-8 mb-4 [font-family:var(--font-anton)]'><Link href="#overview"><GrOverview /></Link>Overview</h3>
                <p className='sm:text-[24px] text-[18px] font-medium tracking-[-1px] leading-snug'>{project?.overview}</p>
            </section>
            <MarkdownViewer url={project?.content_url} className='px-4' />
        </main>
    )
}

export default Page