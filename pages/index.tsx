import type { InferGetStaticPropsType, NextPage } from 'next'
import { BlogCard } from '../components/BlogCard'
import { Hero } from '../components/Hero'
import { Link } from '../components/Link'
import { Section } from '../components/Section'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <Hero />
      <Section
        name="Blog"
        description="I write about the projects I've worked on, experience and learnings along the way"
      >
        <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              title={post.name}
              description={post.description}
              date={post.date}
              slug={post.slug}
              key={post.slug}
              tags={post.tags.map((tag) => ({
                name: tag,
                slug: tag.toLocaleLowerCase(),
              }))}
            />
          ))}
        </div>
        <Link href="/blog">See more! {'->'}</Link>
      </Section>
    </>
  )
}

export default Home

export const getStaticProps = async () => {
  const posts = [
    {
      name: 'From No-Code to Code',
      description:
        'Experience of migrating a E-Commerce website from No-Code SaaS to NextJS',
      slug: 'no-code',
      date: '2022-Dec-20',
      tags: ['NextJS', 'React', 'TypeScript'],
    },
    {
      name: 'Pulumifying Mainteny',
      description: 'What to took to bring entire infra of Mainteny to IaC',
      slug: 'pulumify',
      date: '2022-Dec-20',
      tags: ['Pulumi', 'IaC', 'TypeScript'],
    },
    {
      name: 'State-based Programming',
      description: 'Wild ideas on how State-based programming can be used',
      slug: 'state-programming',
      date: '2022-Dec-20',
      tags: ['Pulumi', 'Programming'],
    },
    {
      name: 'I built my website',
      description: 'How I built my website using Gatsby',
      slug: 'i-built-website',
      date: '2022-Dec-20',
      tags: ['Gatsby', 'React'],
    },
  ]
  return {
    props: { posts },
  }
}
