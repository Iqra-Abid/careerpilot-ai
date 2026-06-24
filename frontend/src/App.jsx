import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadResume from "./components/UploadResume";
import Footer from "./components/Footer";
function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FFF5F7",
      }}
    >
      <Navbar />

      <Hero />

      <UploadResume />
      
      <Footer />
      
    </div>
  );
}

export default App;