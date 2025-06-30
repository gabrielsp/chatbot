import React from 'react';
import GlassCard from '../ui/GlassCard';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Cadastre-se",
      description: "Crie sua conta e escolha o plano que melhor atende às necessidades do seu negócio."
    },
    {
      number: "2",
      title: "Personalize",
      description: "Configure o chatbot de acordo com sua marca e adicione as perguntas e respostas mais comuns."
    },
    {
      number: "3",
      title: "Integre",
      description: "Adicione o chatbot ao seu site ou aplicativo com apenas algumas linhas de código."
    }
  ];

  return (
    <section id="como-funciona" className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Funciona</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Implementar nosso chatbot é simples e rápido. Veja como você pode começar em apenas três passos.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <GlassCard 
              key={index}
              className="p-6 rounded-xl text-center"
              data-aos={index === 0 ? "fade-right" : index === 2 ? "fade-left" : "fade-up"}
              data-aos-duration="800"
              data-aos-delay={index * 200}
            >
              <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gray-700">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="600">
          <button className="btn-primary text-gray-700 px-8 py-3 rounded-lg font-medium shadow-sm pulse-effect">
            Começar Agora
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;