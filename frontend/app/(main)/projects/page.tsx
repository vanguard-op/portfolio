export const dynamic = 'force-dynamic'

import { ProjectCard } from '@/components/card'
import Title, { BigTitle } from '@/components/title'
import PortfolioRepositoryProd from '@/lib/repository/prod'

async function Page() {
    const projects = await (new PortfolioRepositoryProd()).getProjects();
    return (
        <div>
            <BigTitle>My Projects</BigTitle>
            <div className="px-4 flex flex-col gap-[60px]">
                {projects?.map((item, index) => (
                    <ProjectCard key={index} project={item} index={index} />
                ))}
            </div>
        </div>
    )
}

export default Page