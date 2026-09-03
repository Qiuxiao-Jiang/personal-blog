import { getCollection } from 'astro:content';

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const asset = (path: string) => /^(https?:\/\/|data:)/.test(path) ? path : url(path);
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
}).format(date).replaceAll('/', '.');
export const readingTime = (body = '') => Math.max(1, Math.ceil(body.length / 400));
export const publishedPosts = async () => (await getCollection('posts', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
