import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useScripts = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      once: true,
      offset: 100,
      duration: 800,
      easing: 'ease-in-out',
      disable: window.innerWidth < 640 // Desativar em dispositivos móveis se necessário
    });

    // Atualizar AOS quando a rota muda
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 500);

    
    // Configurar contadores
    const setupCounters = () => {
      const counters = document.querySelectorAll('.stat-counter');
      const speed = 200;
      
      const startCounters = () => {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target')!;
          const increment = target / speed;
          
          const updateCount = () => {
            const count = +counter.textContent!;
            if (count < target) {
              counter.textContent = Math.ceil(count + increment).toString();
              setTimeout(updateCount, 1);
            } else {
              counter.textContent = target.toString();
            }
          };
          
          updateCount();
        });
      };

      const statsSection = document.getElementById('stats');
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      }, { threshold: 0.5 });
      
      if (statsSection) {
        observer.observe(statsSection);
      }
    };

   // Configurar FAQ
   const setupFAQ = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.addEventListener('click', function(this: HTMLElement) {
        const answer = this.nextElementSibling as HTMLElement;
        const icon = this.querySelector('svg') as SVGElement;
        
        // Fechar todas as outras respostas
        document.querySelectorAll('.faq-answer').forEach(ans => {
          if (ans !== answer) {
            ans.classList.remove('active');
            const otherIcon = ans.previousElementSibling?.querySelector('svg');
            if (otherIcon) otherIcon.style.transform = 'rotate(0)';
          }
        });
        
        // Alternar a resposta atual
        answer.classList.toggle('active');
        icon.style.transform = answer.classList.contains('active') 
          ? 'rotate(180deg)' 
          : 'rotate(0)';
      });
    });
  };

  setupCounters();
  setupFAQ();

  // Limpeza ao desmontar
  return () => {
    clearTimeout(timer);
    // Remover event listeners
    document.querySelectorAll('.faq-question').forEach(question => {
      question.replaceWith(question.cloneNode(true));
    });
  };
}, [location.pathname]); // Executar sempre que a rota mudar
};