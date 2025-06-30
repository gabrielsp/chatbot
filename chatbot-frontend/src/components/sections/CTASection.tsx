import React from 'react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

const CTASection: React.FC = () => {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
      <div className="container mx-auto">
        <GlassCard className="p-8 md:p-12 rounded-xl text-center" data-aos="zoom-in" data-aos-duration="1000">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pronto para revolucionar seu atendimento?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">Junte-se a milhares de empresas que já estão usando nosso chatbot para melhorar a experiência dos clientes e aumentar as vendas.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" className="pulse-effect">
              Começar Gratuitamente
            </Button>
            <Button variant="secondary">
              Falar com um Consultor
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default CTASection;