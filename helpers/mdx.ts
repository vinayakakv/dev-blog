import { serialize as mdxSeralize } from 'next-mdx-remote/serialize'

export const serialize = async (mdx: string) => mdxSeralize(mdx)
