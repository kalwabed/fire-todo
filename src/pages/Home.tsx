import { RouteComponentProps } from '@reach/router'

import Content from '../components/layout/Content'
import Page from '../components/layout/Page'

const HomePage: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Content>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae eligendi quod inventore consectetur
          veritatis? Quia labore repudiandae illum sunt porro! Recusandae odit reiciendis consequatur maiores, tempore
          explicabo ipsam! Et, fugit.
        </p>
      </Content>
    </Page>
  )
}

export default HomePage
