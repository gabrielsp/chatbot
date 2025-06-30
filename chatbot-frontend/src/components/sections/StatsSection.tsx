import React from 'react';
import GlassCard from '../ui/GlassCard';
import StatCounter from '../ui/StatCounter';

const StatsSection: React.FC = () => {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12" id="stats">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <GlassCard className="p-6 rounded-xl text-center" data-aos="zoom-in" data-aos-duration="800">
            <div className="text-gray-700 mb-2">Clientes Satisfeitos</div>
            <StatCounter target={5000} />
            <div className="text-gray-700 mt-2">e contando</div>
          </GlassCard>
          
          <GlassCard className="p-6 rounded-xl text-center" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100">
            <div className="text-gray-700 mb-2">Mensagens Trocadas</div>
            <StatCounter target={10} />
            <div className="text-gray-700 mt-2">milhões</div>
          </GlassCard>
          
          <GlassCard className="p-6 rounded-xl text-center" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="200">
            <div className="text-gray-700 mb-2">Taxa de Resolução</div>
            <StatCounter target={95} />
            <div className="text-gray-700 mt-2">porcento</div>
          </GlassCard>
          
          <GlassCard className="p-6 rounded-xl text-center" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="300">
            <div className="text-gray-700 mb-2">Tempo de Resposta</div>
            <StatCounter target={3} />
            <div className="text-gray-700 mt-2">segundos</div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;