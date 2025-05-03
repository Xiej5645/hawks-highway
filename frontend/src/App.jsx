import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Page from './pages/Page'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router> 
    <div className="App">
      <div className="header">
        <Link to="/"><button className="headerBtn"> Home </button></Link>
        {/* <Link to="/page"><button className="headerBtn"> Page</button></Link> */}

      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/page" element={<Page />} /> */}
      </Routes>
    </div>
  </Router>
  )
}

export default App
