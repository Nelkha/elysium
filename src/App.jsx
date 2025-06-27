import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Clips from './components/Clips';
import Miembros from './components/Miembros';
import Recruitment from './components/Recruitment';
import PageWrapper from './components/PageWrapper';
import Footer from './components/Footer';
import AdminSolicitudes from './pages/AdminSolicitudes';

import Wishlist from './components/Wishlist';
import ModificarWish from './pages/ModificarWish';
import SubirVideo from './pages/SubirVideo.jsx';
import ModificarPerfil from './pages/ModificarPerfil.jsx';
import JuegosComunidad from './pages/JuegosComunidad';
import HistoriaSinFin from './pages/HistoriaSinFin';


function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
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
            <Route
              path="/admin-solicitudes"
              element={
                <PageWrapper>
                  <AdminSolicitudes />
                </PageWrapper>
              }
            />
            <Route
              path="/modificarWish"
              element={
                <PageWrapper>
                  <ModificarWish />
                </PageWrapper>
              }
            />
            <Route
              path="/wishlist"
              element={
                <PageWrapper>
                  <Wishlist />
                </PageWrapper>
              }
            />
            <Route
              path="/subir-video"
              element={
                <PageWrapper>
                  <SubirVideo />
                </PageWrapper>
              }
            />
            <Route
              path="/modificar-perfil"
              element={
                <PageWrapper>
                  <ModificarPerfil />
                </PageWrapper>
              }
            />
            <Route
              path="/juegos"
              element={
                <PageWrapper>
                  <JuegosComunidad />
                </PageWrapper>
              }
            />
            <Route
              path="/juegos/historia-sin-fin"
              element={
                <PageWrapper>
                  <HistoriaSinFin />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App;