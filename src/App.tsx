import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Capabilities } from './components/Capabilities';
import { HowItWorks } from './components/HowItWorks';
import { Impact } from './components/Impact';
import { Trust } from './components/Trust';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { GetStartedModal } from './components/GetStartedModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSeeHowClick = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onCTAClick={handleModalOpen} />
      <Hero onSeeHowClick={handleSeeHowClick} onGetStartedClick={handleModalOpen} />
      <ProblemSolution />
      <Capabilities />
      <HowItWorks />
      <Impact />
      <Trust />
      <FinalCTA onGetStartedClick={handleModalOpen} />
      <Footer />
      <GetStartedModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}

export default App;
