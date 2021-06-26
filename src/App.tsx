import { Router } from '@reach/router'

import HomePage from './pages/Home'
import AboutPage from './pages/About'

function App() {
  return (
    <Router>
      <HomePage path="/" />
      <AboutPage path="/todo" />
    </Router>
  )
}

export default App
