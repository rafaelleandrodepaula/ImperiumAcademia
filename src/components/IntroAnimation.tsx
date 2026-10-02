import { useEffect, useState } from 'react';
import introImg from '../assets/intro-logo.png';
import './IntroAnimation.css';

const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<'entering' | 'visible' | 'exiting'>('entering');

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro2');

    if (!hasSeenIntro) {
      sessionStorage.setItem('hasSeenIntro2', 'true');
      setIsVisible(true);

      // Fase 1: entrada (pequeno delay para o CSS pegar a transição)
      const enterTimer = setTimeout(() => setPhase('visible'), 50);

      // Fase 2: início da saída
      const exitTimer = setTimeout(() => setPhase('exiting'), 2500);

      // Fase 3: remove do DOM
      const removeTimer = setTimeout(() => setIsVisible(false), 3300);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`intro-overlay intro-overlay--${phase}`}>
      <div className="intro-content">
        <div className="intro-icon-wrapper">
          <img src={introImg} alt="Imperium Logo" className="intro-gen-img" />
        </div>
        <h2 className="intro-phrase">A MUDANÇA COMEÇA AQUI !</h2>
      </div>
    </div>
  );
};

export default IntroAnimation;
