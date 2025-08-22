import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sendMessage, addMessage, toggleAI, clearConversation } from './aiSlice';
import { AIMessage } from './aiTypes';
import Button from './../../components/Button';
import LoadingSpinner from './../../components/LoadingSpinner';

const AiAssistant: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages, loading, active } = useAppSelector((state) => state.ai);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setInput('');
    await dispatch(sendMessage(input));
  };

  if (!active) return null;

  return (
    <div className="fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-xl flex flex-col z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Career Assistant</h3>
        <button onClick={() => dispatch(toggleAI())} className="text-white">
          ×
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto max-h-96">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Ask me anything about your career development
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {loading && <LoadingSpinner size="small" />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-l-none"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;