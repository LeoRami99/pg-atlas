import "./App.css";
import Navbar from "./components/Navbar";
import Map from "./components/MapContainer";
import Iframe from "react-iframe";
import { useViewApi } from "./hooks/useModalApi";
import Button from "./components/Button";

function App() {
  const { viewApi, setViewApi } = useViewApi();
  const closeApiView = () => {
    setViewApi(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full md:w-auto flex justify-center">
        <Navbar />
      </div>

      <dialog id="dialog-1" className="z-10 mt-[100px] p-4 w-full md:w-3/4 lg:w-1/2 max-w-3xl rounded-md shadow-lg" open={viewApi}>
        <Button className="btn btn-primary rounded-badge text-white btn-sm top-0 right-0 mb-2" onClick={closeApiView}>
          Close API
        </Button>
        <Iframe
          url="https://pg-atlas-back-production.up.railway.app/api"
          width="100%"
          height="500px"
          id=""
          className="z-10 w-full rounded-md"
          display="block"
          position="relative"
          styles={{
            maxWidth: "100%",
            border: "none",
          }}
        />
      </dialog>

      <div className="w-full h-full flex-grow">
        <Map />
      </div>
    </main>
  );
}

export default App;
