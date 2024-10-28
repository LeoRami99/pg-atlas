
import './App.css'
import Navbar from './components/Navbar'
import Map from './components/Map'
import FormRegisterProject from './components/FormRegisterProject'



function App() {

  return (
    <main>
      <div className="flex justify-center">
        <Navbar />
      </div>
      <FormRegisterProject />
      <Map />
    </main>
  )
}

export default App
