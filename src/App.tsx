import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes'
import AOS from "aos"
import "aos/dist/aos.css"


function App() {

  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  
  return (
    <AppRoutes/>
  );
}

export default App;
