import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const normalizeDate = (raw) => {
  const [year, month = '01', day = '01'] = raw.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export async function GET({ site }) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) =>
      normalizeDate(b.data.date).localeCompare(normalizeDate(a.data.date)),
    );
  return rss({
    title: 'Morax',
    description:
      "A personal stash of tech notes, security experiments, and things I don't want to forget.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(normalizeDate(post.data.date)),
      description: post.data.description,
      link: `/post/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
