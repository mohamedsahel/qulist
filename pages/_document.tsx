import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='theme-color' content='#7D80F3' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
