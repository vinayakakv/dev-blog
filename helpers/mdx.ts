import { serialize as mdxSeralize } from 'next-mdx-remote/serialize'
import emoji from 'remark-emoji'

export const serialize = async (mdx: string) =>
  mdxSeralize(mdx, {
    mdxOptions: {
      remarkPlugins: [emoji],
    },
  })
