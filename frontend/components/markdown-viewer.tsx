import PortfolioRepositoryProd from "@/lib/repository/prod";
import { markdownToHtml } from '@/lib/utilities/markdown';


async function MarkdownViewer({ url, source, className }: { url?: string | undefined, source?: string | undefined, className?: string }) {
  let md: string | undefined = source;
  if (!source && url) {
    const repo = new PortfolioRepositoryProd();
    md = markdownToHtml(await repo.fetchMarkdown(url));
  }

  return (
    <div className={`markdown-content ${className}`} dangerouslySetInnerHTML={{ __html: md ?? "" }} />
  )
}

export default MarkdownViewer