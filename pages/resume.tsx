import { Section } from '@components/Section'
import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { Worker } from '@react-pdf-viewer/core'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://github.com/vinayakakv/resume/releases/latest/download/resume.pdf'
  )
  const arrayBuffer = await res.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  return {
    props: {
      pdfBase64: base64,
    },
  }
}

const Resume = ({
  pdfBase64,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  return (
    <Section
      name="Résumé"
      description="A summary of the places I've been and the work I did"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          plugins={[defaultLayoutPluginInstance]}
          fileUrl={`data:application/pdf;base64,${pdfBase64}`}
          theme="dark"
          defaultScale={1.5}
        />
      </Worker>
    </Section>
  )
}

export default Resume
