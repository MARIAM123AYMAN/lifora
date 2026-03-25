import { useState } from 'react';
import { Calendar, Settings } from 'lucide-react';
import { AISmartCoachPanel } from './AISmartCoachPanel';
import { WorkoutTimerCard } from './WorkoutTimerCard';
import { ServicesGrid } from './ServicesGrid';
import { ChatbotUI } from './ChatbotUI';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

export function SportsOverview() {
  const { language } = useApp();
  const [currentGoal, setCurrentGoal] = useState(() => {
    // Get goal from onboarding data
    const userGoal = localStorage.getItem('userFitnessGoal');
    if (userGoal) {
      if (language === 'en') {
        if (userGoal === 'weightLoss') return 'Weight Loss';
        if (userGoal === 'muscleGain') return 'Muscle Building';
        if (userGoal === 'stayFit') return 'Stay Healthy';
        if (userGoal === 'improveEndurance') return 'Improve Endurance';
      } else {
        if (userGoal === 'weightLoss') return 'فقدان الوزن';
        if (userGoal === 'muscleGain') return 'بناء العضلات';
        if (userGoal === 'stayFit') return 'الحفاظ على الصحة';
        if (userGoal === 'improveEndurance') return 'تحسين القدرة على التحمل';
      }
    }
    return localStorage.getItem('fitnessGoal') || (language === 'en' ? 'Stay Healthy' : 'الحفاظ على الصحة');
  });

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 md:pb-8 bg-background transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-sky-900 dark:text-sky-100 mb-2">{t('sportsDashboard', language)}</h1>
            <p className="text-sky-600 dark:text-sky-400">{t('yourFitness', language)}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              title={t('today', language)}
            >
              <Calendar className="w-5 h-5" />
              <span>{t('today', language)}</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              title={t('settings', language)}
            >
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">{t('settings', language)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Smart Coach Panel */}
      <AISmartCoachPanel currentGoal={currentGoal} />

      {/* Workout Timer Card */}
      <WorkoutTimerCard />

      {/* Services Grid - All Features */}
      <ServicesGrid />

      {/* Chatbot */}
      <ChatbotUI />
    </div>
  );
}