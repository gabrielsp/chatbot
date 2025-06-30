import React, { useEffect } from 'react';

const ChatBubbles: React.FC = () => {
  useEffect(() => {
    const bubblesContainer = document.getElementById('chatBubbles');
    if (!bubblesContainer) return;

    const chatIcons = [
      '<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>',
      '<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586A1.994 1.994 0 017 16V8a1.994 1.994 0 011.414-1.414A1.994 1.994 0 019 6h6a1.994 1.994 0 011.414.586A1.994 1.994 0 0117 8z"></path></svg>',
      '<svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>'
    ];
    
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${i % 2 === 0 ? 'right' : ''}`;
      bubble.style.top = `${Math.random() * 100}%`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubble.innerHTML = chatIcons[Math.floor(Math.random() * chatIcons.length)];
      bubblesContainer.appendChild(bubble);
    }
  }, []);

  return <div id="chatBubbles" className="fixed inset-0 pointer-events-none z-0"></div>;
};

export default ChatBubbles;