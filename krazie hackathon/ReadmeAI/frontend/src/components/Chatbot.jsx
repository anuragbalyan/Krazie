import { useState, useRef, useEffect } from 'react';
import { processMessage } from '../utils/chatbotLogic';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot({ readme, setReadme }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '👋 Hi! I can help improve your README. Try asking me to add badges, installation instructions, or make it more professional!' }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Process message
    const { reply, newReadme } = processMessage(input, readme);

    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
      setReadme(newReadme);
      setTyping(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-purple to-pink shadow-lg hover:scale-110 transition-all duration-300 ${
          open ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle size={24} className="text-white" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl flex flex-col border border-sky/30 backdrop-blur-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-white">README Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-white/10 rounded transition"
            >
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-purple to-pink text-white rounded-br-none'
                      : 'bg-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-slate-800 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-800 text-white placeholder-slate-500 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className="bg-gradient-to-r from-purple to-pink p-2 rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Try: "add badges", "professional tone", "installation"</p>
          </div>
        </div>
      )}
    </>
  );
}
