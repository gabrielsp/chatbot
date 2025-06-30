import React, { useEffect, useState } from 'react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [plansVisible, setPlansVisible] = useState(false);
  const [followupVisible, setFollowupVisible] = useState(false);

  useEffect(() => {
    // Simulação do efeito de digitação
    const typingTimer = setTimeout(() => {
      setTypingComplete(true);
    }, 2000);

    return () => {
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (typingComplete) {
      const plansTimer = setTimeout(() => {
        setPlansVisible(true);
      }, 500);
      
      const followupTimer = setTimeout(() => {
        setFollowupVisible(true);
      }, 1500);

      return () => {
        clearTimeout(plansTimer);
        clearTimeout(followupTimer);
      };
    }
  }, [typingComplete]);

  return (
    <section id="main-content" className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Seu Assistente Virtual Inteligente</h1>
            <p className="text-lg text-gray-700 mb-8">Automatize atendimentos, responda dúvidas e aumente a satisfação dos seus clientes com nosso chatbot impulsionado por inteligência artificial.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button variant="primary" className="pulse-effect">
                Começar Agora
              </Button>
              <Button variant="secondary">
                Ver Demonstração
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <GlassCard className="p-4 rounded-2xl w-full max-w-md enhanced-card">
              <div className="bg-white/50 rounded-xl p-4 mb-4">
                <div className="flex items-start mb-3">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">ChatBot</p>
                    <p className="text-gray-600 text-sm">Olá! Como posso ajudar você hoje?</p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div>
                    <p className="text-gray-700 text-right text-sm">Preciso de informações sobre os planos disponíveis.</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-100 ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-start mb-3">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">ChatBot</p>
                    <p className="text-gray-600 text-sm">
                      {!typingComplete && <span className="typing-effect">Claro! Temos três planos disponíveis:</span>}
                      {typingComplete && 'Claro! Temos três planos disponíveis:'}
                    </p>
                    {plansVisible && (
                      <ul className="text-gray-600 text-sm mt-2 space-y-1">
                        <li>• Básico: R$49/mês</li>
                        <li>• Profissional: R$99/mês</li>
                        <li>• Empresarial: R$199/mês</li>
                      </ul>
                    )}
                    {followupVisible && (
                      <p className="text-gray-600 text-sm mt-2">
                        Gostaria de saber mais detalhes sobre algum plano específico?
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Digite sua mensagem..." 
                    className="w-full bg-white/50 border border-white/40 rounded-full px-4 py-2 pr-10 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;