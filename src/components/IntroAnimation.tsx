import { useEffect, useState } from 'react';
import introImg from '../assets/intro-logo.png';
import './IntroAnimation.css';

const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro2');
    
    if (!hasSeenIntro) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenIntro2', 'true');
      
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="intro-overlay">
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
