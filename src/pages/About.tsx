import { RouteComponentProps } from '@reach/router'
import Content from '../components/layout/Content'
import Page from '../components/layout/Page'

const AboutPage: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Content>
        <p>about page</p>
      </Content>{' '}
    </Page>
  )
}

export default AboutPage
