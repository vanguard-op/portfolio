export const dynamic = 'force-dynamic'


import { BigTitle } from '@/components/title'
// import React, { useContext } from 'react'
import RecentArticle from './recent-article'
import { ArticleCard } from '@/components/card'
import PortfolioRepositoryProd from '@/lib/repository/prod'

async function Page() {
  const articles = await (new PortfolioRepositoryProd()).getArticles();
  return (
    <div>
      <BigTitle>My Articles</BigTitle>
      <RecentArticle articles={articles} />
      <BigTitle className='mt-20 sm:mt-36'>More Articles</BigTitle>
      <div className='px-4 grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {articles?.map((item, index) => (
          <ArticleCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default Page