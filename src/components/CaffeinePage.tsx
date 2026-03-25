import { ArrowLeft, Coffee, Clock, Moon, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CaffeinePage() {
  const navigate = useNavigate();

  const caffeineTips = [
    {
      icon: Coffee,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Avoid caffeine after 6 PM',
      description: 'Late caffeine disrupts sleep quality and recovery',
      detail: 'Your body needs quality sleep to recover from workouts. Caffeine consumed after 6 PM can significantly impact your sleep cycle.',
    },
    {
      icon: Clock,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Caffeine stays 6-8 hours in body',
      description: 'Half-life affects you longer than you think',
      detail: 'Caffeine has a half-life of 5-6 hours, meaning half of it is still in your system hours after consumption.',
    },
    {
      icon: Moon,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Try herbal tea instead',
      description: 'Chamomile or peppermint for evening relaxation',
      detail: 'Herbal teas provide warmth and comfort without the stimulating effects of caffeine, perfect for evening wind-down.',
    },
    {
      icon: Zap,
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-600',
      title: 'Hydrate more, caffeinate less',
      description: 'Water boosts energy naturally',
      detail: 'Often, fatigue is caused by dehydration. Try drinking water first before reaching for coffee.',
    },
  ];

  const dosageGuide = [
    {
      amount: '0-200mg',
      effect: 'Mild boost',
      examples: '1-2 cups coffee',
      color: 'bg-teal-50',
    },
    {
      amount: '200-400mg',
      effect: 'Moderate energy',
      examples: '2-4 cups coffee',
      color: 'bg-amber-50',
    },
    {
      amount: '400mg+',
      effect: 'Too much',
      examples: 'May cause jitters',
      color: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/sports')}
          className="flex items-center gap-2 text-sky-600 hover:text-sky-900 mb-4 transition-colors"
          title="Back to Sports Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-sky-900 mb-2">Caffeine Tips</h1>
        <p className="text-sky-600">Manage your energy and optimize performance</p>
      </div>

      {/* Main Tips */}
      <div className="mb-8">
        <h2 className="text-sky-900 mb-6">Essential Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caffeineTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${tip.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${tip.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sky-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-sky-600 mb-3">{tip.description}</p>
                    <p className="text-sm text-sky-700">{tip.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dosage Guide */}
      <div className="mb-8">
        <h2 className="text-sky-900 mb-6">Daily Caffeine Guide</h2>
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <p className="text-sky-600 mb-6">
            Recommended daily limit for adults: <strong className="text-sky-900">400mg</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dosageGuide.map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-2xl p-4`}
                title={`${item.amount} of caffeine`}
              >
                <p className="text-sky-900 mb-1">{item.amount}</p>
                <p className="text-sm text-sky-600 mb-2">{item.effect}</p>
                <p className="text-xs text-sky-500">{item.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-Workout Caffeine */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
        <h2 className="text-sky-900 mb-4">Pre-Workout Caffeine</h2>
        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-2xl">
            <p className="text-sky-900 mb-2">✅ <strong>Good:</strong> Morning/Early Afternoon</p>
            <p className="text-sm text-sky-600">
              Consume 30-60 minutes before workout for peak performance. Best for morning or early afternoon sessions.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-2xl">
            <p className="text-sky-900 mb-2">⚠️ <strong>Caution:</strong> Evening Workouts</p>
            <p className="text-sm text-sky-600">
              If you exercise in the evening, avoid pre-workout caffeine to ensure better sleep quality.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gradient-to-r from-sky-100 to-sky-50 rounded-3xl p-6">
        <h3 className="text-sky-900 mb-4">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-2xl">☕</span>
            <div>
              <p className="text-sm text-sky-900">Regular Coffee</p>
              <p className="text-xs text-sky-600">~95mg per cup</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🍵</span>
            <div>
              <p className="text-sm text-sky-900">Green Tea</p>
              <p className="text-xs text-sky-600">~25mg per cup</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🥤</span>
            <div>
              <p className="text-sm text-sky-900">Energy Drink</p>
              <p className="text-xs text-sky-600">~80-150mg per can</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-2xl">🍫</span>
            <div>
              <p className="text-sm text-sky-900">Dark Chocolate</p>
              <p className="text-xs text-sky-600">~12mg per oz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
