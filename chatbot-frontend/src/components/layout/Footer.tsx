import React from 'react';
//import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 bg-white/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div data-aos="fade-up" data-aos-duration="800">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-full bg-white/30 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl logo-text">ChatBot</h3>
            </div>
            <p className="text-gray-700 mb-4">Transformando a maneira como as empresas se comunicam com seus clientes.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-transform hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-transform hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-transform hover:scale-110">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><a href="#recursos" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Recursos</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Preços</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Integrações</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Casos de Uso</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Atualizações</a></li>
            </ul>
          </div>
          
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Blog</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Carreiras</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Imprensa</a></li>
              <li><a href="#contato" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Contato</a></li>
            </ul>
          </div>
          
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Documentação</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Status</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">API</a></li>
              <li><a href="#" className="text-gray-700 hover:text-gray-900 hover:translate-x-1 inline-block transition-transform">Comunidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">&copy; {new Date().getFullYear()} ChatBot. Todos os direitos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Termos de Serviço</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Política de Privacidade</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;