import markdownit from 'markdown-it'

export function markdownToHtml(content: string): string {
    const mediaBaseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL}/v1/`
    const md = markdownit({
        html: true,
        linkify: true,
        typographer: true
    })
    const result = md.render(content);

    // Prefix relative media paths with the media base URL
    return result.replace(/(src|href)=["'](media\/[^"']+)["']/g, (match, attr, path) => {
        return `${attr}="${mediaBaseUrl}${path}"`;
    });
}
