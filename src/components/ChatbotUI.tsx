import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    {
      text: "Hi! I'm your AI fitness coach. How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    'What workout should I do?',
    'What should I eat?',
    'How many times should I train?',
    'How to stay motivated?',
  ];

  const handleQuickQuestion = (question: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: question, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'What workout should I do?':
          'Based on your goal, I recommend starting with 30 minutes of cardio. Check the Smart Coach panel for your personalized plan!',
        'What should I eat?':
          'For your fitness goal, focus on lean proteins, whole grains, and plenty of vegetables. Check the Meals section for detailed nutrition tracking.',
        'How many times should I train?':
          'For best results, aim for 3-5 workouts per week with rest days in between. Listen to your body and avoid overtraining.',
        'How to stay motivated?':
          'Set small, achievable goals and track your progress. Celebrate every milestone, no matter how small!',
      };

      setMessages((prev) => [
        ...prev,
        {
          text: responses[question as keyof typeof responses] || 'Great question! Let me help you with that.',
          isUser: false,
        },
      ]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm here to help! Based on your message, I recommend checking your personalized workout plan in the Smart Coach panel.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 rounded-full bg-sky-900 text-white shadow-lg hover:shadow-xl hover:bg-sky-800 transition-all flex items-center justify-center z-40 group"
        title="Chat with AI Coach"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-44 md:bottom-24 right-8 w-96 max-w-[calc(100vw-4rem)] bg-white rounded-3xl shadow-2xl z-40 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="p-4 border-b border-sky-100 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h3 className="text-sky-900">AI Coach</h3>
                <p className="text-xs text-sky-600">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-sky-900 text-white'
                      : 'bg-sky-50 text-sky-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-sky-100">
              <p className="text-xs text-sky-600 mb-3">Quick Questions:</p>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-sm transition-colors"
                    title={`Ask: ${question}`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-sky-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-2xl bg-sky-50 border border-sky-100 text-sky-900 placeholder:text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-full bg-sky-900 hover:bg-sky-800 text-white flex items-center justify-center transition-colors"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
