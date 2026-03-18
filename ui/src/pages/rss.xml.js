import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = (await getCollection('blog')).filter(p => !p.data.draft);
  return rss({
    title: 'Morax',
    description: 'Some tech stuff',
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/post/${post.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
