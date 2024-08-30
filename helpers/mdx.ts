import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize as mdxSerialize } from 'next-mdx-remote/serialize'
import emoji from 'remark-emoji'
import smartypants from 'remark-smartypants'
import prism from 'remark-prism'
import { Post, postSchema } from '@schema/post'
import { Meta, metaSchema } from '@schema/meta'

const contentDirectory = path.join(process.cwd(), 'content')

type MdxType = 'posts' | 'meta'

type MdxFileContent<T extends MdxType> = T extends 'posts' ? Post : Meta

export async function readMdxFile<T extends MdxType>(
  type: T,
  fileName: string
) {
  const filePath = path.join(contentDirectory, type, fileName)
  const fileContents = await fs.promises.readFile(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = fileName.replace('.mdx', '')

  if (type === 'posts') {
    return postSchema.parse({
      ...data,
      slug,
      content,
    }) as MdxFileContent<T>
  } else {
    return metaSchema.parse({
      key: data.key,
      content,
    }) as MdxFileContent<T>
  }
}

export async function getMdxFiles<T extends MdxType>(type: T, limit?: number) {
  const files = await fs.promises.readdir(path.join(contentDirectory, type))
  const posts = await Promise.all(
    files.map((fileName) => readMdxFile(type, fileName))
  )
  return limit ? posts.slice(0, limit) : posts
}

export const serialize = async (mdx: string) =>
  mdxSerialize(mdx, {
    mdxOptions: {
      remarkPlugins: [emoji, smartypants, prism],
    },
  })
