import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, X, MessageCircle, Minimize2 } from 'lucide-react';

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      isAi: true,
      value: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { 
      isAi: false, 
      value: prompt, 
      timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    const uniqueId = `id-${Date.now()}-${Math.random().toString(16)}`;
    const botMessage = { 
      isAi: true, 
      value: '', 
      uniqueId,
      timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, botMessage]);

    try {
      const response = await fetch( `${import.meta.env.VITE_API_URL}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage.value }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();
        
        setMessages(prev =>
          prev.map(msg =>
            msg.uniqueId === uniqueId ? { ...msg, value: parsedData } : msg
          )
        );
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      setMessages(prev =>
        prev.map(msg =>
          msg.uniqueId === uniqueId 
            ? { ...msg, value: 'I apologize, but I encountered an error. Please try again.' }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const MessageBubble = ({ message, index }) => {
    return (
      <div className={`flex ${message.isAi ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`flex items-start max-w-[85%] ${message.isAi ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
            message.isAi
              ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white mr-2'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white ml-2'
          }`}>
            {message.isAi ? <Bot size={14} /> : <User size={14} />}
          </div>
          
          <div className={`px-3 py-2 rounded-2xl shadow-sm ${
            message.isAi
              ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm'
          }`}>
            <p className="text-sm leading-relaxed">{message.value}</p>
            {message.isAi && loading && !message.value && (
              <div className="flex space-x-1 mt-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse delay-200"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative p-4 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 ${
            isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <Sparkles size={12} className="text-white animate-pulse" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Ask AI Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      </div>

      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-80">Online now</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, idx) => (
                  <MessageBubble key={idx} message={message} index={idx} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className=" text-black flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Type your message..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    disabled={loading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !prompt.trim()}
                    className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-3">
                  {['Help', 'FAQ', 'Contact'].map((action) => (
                    <button
                      key={action}
                      onClick={() => setPrompt(`${action} me`)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors duration-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingAI;