import { serialize as mdxSeralize } from 'next-mdx-remote/serialize'
import emoji from 'remark-emoji'
import smartypants from 'remark-smartypants'
import prism from 'remark-prism'

export const serialize = async (mdx: string) =>
  mdxSeralize(mdx, {
    mdxOptions: {
      remarkPlugins: [emoji, smartypants, prism],
    },
  })
