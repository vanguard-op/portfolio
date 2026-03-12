import markdownit from 'markdown-it'

export function markdownToHtml(content: string): string {
    const mediaBaseUrl = "http://localhost:3000/v1/"
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
