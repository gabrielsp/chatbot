import { useEffect } from 'react';
import { useAOS } from '../contexts/AOSContext';

export const useAOSRefresh = () => {
  const { refresh } = useAOS();

  useEffect(() => {
    // Atualizar AOS quando o componente é montado
    refresh();
    
    // Atualizar periodicamente para capturar novos elementos
    const interval = setInterval(refresh, 1000);
    
    return () => clearInterval(interval);
  }, [refresh]);

  return refresh;
};