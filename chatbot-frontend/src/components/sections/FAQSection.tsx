import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqItems: FAQItem[] = [
    {
      question: "Quanto tempo leva para implementar o chatbot?",
      answer: "A implementação básica pode ser feita em minutos. Para uma personalização mais avançada, pode levar algumas horas. Nossa equipe de suporte está disponível para ajudar durante todo o processo."
    },
    {
      question: "O chatbot funciona em dispositivos móveis?",
      answer: "Sim, nosso chatbot é totalmente responsivo e funciona perfeitamente em dispositivos móveis, tablets e desktops."
    },
    {
      question: "Posso integrar o chatbot com outros sistemas?",
      answer: "Sim, oferecemos integrações com diversos sistemas, como CRM, e-commerce, sistemas de pagamento e muito mais. Também disponibilizamos uma API para integrações personalizadas."
    },
    {
      question: "O chatbot suporta múltiplos idiomas?",
      answer: "Sim, nosso chatbot suporta mais de 20 idiomas, incluindo português, inglês, espanhol, francês, alemão, italiano, entre outros."
    },
    {
      question: "Posso testar o chatbot antes de comprar?",
      answer: "Sim, oferecemos um período de teste gratuito de 14 dias com acesso a todos os recursos do plano Profissional. Não é necessário cartão de crédito para começar."
    },
    {
      question: "Como o chatbot lida com perguntas complexas?",
      answer: "Nosso chatbot utiliza IA avançada que pode entender contexto e intenção. Para perguntas muito complexas, ele pode transferir para um atendente humano ou coletar informações para retorno posterior."
    },
    {
      question: "Posso treinar o chatbot com meus próprios dados?",
      answer: "Sim, você pode treinar o chatbot com documentos específicos do seu negócio, como manuais, FAQs internas, catálogos de produtos e políticas da empresa."
    },
    {
      question: "Qual é o tempo de resposta do chatbot?",
      answer: "O chatbot responde em menos de 3 segundos na maioria dos casos, garantindo uma experiência fluida para seus clientes."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 bg-white/20">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">Encontre respostas para as dúvidas mais comuns sobre nosso chatbot.</p>
        </div>
        
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl" data-aos="fade-up" data-aos-duration="1000">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item border-b border-white/30 last:border-b-0">
              <div 
                className="faq-question cursor-pointer py-4 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-600 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div 
                className={`faq-answer overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;