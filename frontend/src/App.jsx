import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { PrivateRoute } from './utils/PrivateRoute'
import { AuthContextProvider } from './context/AuthContextProvider'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </AuthContextProvider>
        
      </Router>
    </div>
  )
}

export default App
