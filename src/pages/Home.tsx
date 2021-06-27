import { useEffect } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { RouteComponentProps } from '@reach/router'

import Content from '../components/layout/Content'
import Page from '../components/layout/Page'
import { useActions, useStore } from 'src/store/hooks'
import firebase from 'src/lib/firebase'
import InputData from 'src/components/todo/InputData'
import TodoList from 'src/components/todo/TodoList'
import { User } from 'src/store/user'

const HomePage: React.FC<RouteComponentProps> = () => {
  const checkUserAuthenticate = useActions(actions => actions.user.checkUserAuthenticate)
  const getTodosByUserId = useActions(actions => actions.todo.getTodosByUserId)

  const isAuthenticated = useStore(state => state.user.isAuthenticated)

  useEffect(() => {
    checkUserAuthenticate()
    firebase.auth().onAuthStateChanged(() => {
      const user = firebase.auth().currentUser as unknown as User
      user && getTodosByUserId(user!.uid)
    })
  }, [])

  return (
    <Page>
      <Content>
        <Flex flexDir="column" justify="center" maxW={['2xl', 'lg']} mx="auto">
          <Heading mb={4}>My Todo</Heading>
          {!isAuthenticated && <p>Please login to proceed</p>}
          {isAuthenticated && (
            <>
              <InputData />
              <TodoList />
            </>
          )}
        </Flex>
      </Content>
    </Page>
  )
}

export default HomePage
