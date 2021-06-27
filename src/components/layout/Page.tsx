import AppRoot from './AppRoot'

interface PageProps {
  title?: string
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  document.title = title || 'To do'

  return <AppRoot>{children}</AppRoot>
}

export default Page
