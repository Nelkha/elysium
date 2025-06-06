import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Clips from './components/Clips';
import Miembros from './components/Miembros';
import Recruitment from './components/Recruitment';
import PageWrapper from './components/PageWrapper';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/clips"
            element={
              <PageWrapper>
                <Clips />
              </PageWrapper>
            }
          />
          <Route
            path="/miembros"
            element={
              <PageWrapper>
                <Miembros />
              </PageWrapper>
            }
          />
          <Route
            path="/recruitment"
            element={
              <PageWrapper>
                <Recruitment />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;