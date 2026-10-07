import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './routes/Home';
import Modalidades from './routes/Modalidades';
import SejaAluno from './routes/SejaAluno';
import AulaExperimental from './routes/AulaExperimental';
import Sobre from './routes/Sobre';
import Contato from './routes/Contato';
import Loja from './routes/Loja';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modalidades" element={<Modalidades />} />
          <Route path="/seja-aluno" element={<SejaAluno />} />
          <Route path="/aula-experimental" element={<AulaExperimental />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/loja" element={<Loja />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
