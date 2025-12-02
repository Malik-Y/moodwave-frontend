import {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header.jsx";
import HomePage from './components/HomePage.jsx';
import Galaxy from "./components/Galaxy.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

function App() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
        const first = localStorage.getItem("firstLoginComplete");
        if (!first) setShowLoading(true);
    }, []);


  function finishLoading() {
    localStorage.setItem("firstLoginComplete", "true");
    setShowLoading(false);
  }


  if (showLoading) return <LoadingScreen onFinished={finishLoading} />;

  return (
    <div className="w-screen h-screen">
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.8}
        hueShift={181}
      />

      <div className="relative w-screen">
        <Header />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
