import AppRoot from './AppRoot'
import TopNavigation from './TopNavigation'

interface PageProps {
  title?: string
}

const Page: React.FC<PageProps> = ({ children, title }) => {
  document.title = title || 'To do'

  return (
    <AppRoot>
      <TopNavigation />
      {children}
    </AppRoot>
  )
}

export default Page
