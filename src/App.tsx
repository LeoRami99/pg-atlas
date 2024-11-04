
import './App.css'
import Navbar from './components/Navbar'
import Map from './components/MapContainer'




function App() {

  return (
    <main>
      <div className="flex justify-center">
        <Navbar />
      </div>
      <Map />
    </main>
  )
}

export default App
