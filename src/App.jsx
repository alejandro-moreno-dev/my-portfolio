import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CitySearch from "./pages/CitySearch";
//import Projects from "./pages/Projects";

export default function App() {
  return (
    <div id="app">
      <Navbar />
      <main className="max-w-4xl mx-auto">
        <Home />
      
        <CitySearch/>
      </main>
    </div>
  );
}
 