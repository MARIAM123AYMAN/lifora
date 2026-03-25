import { PredefinedMeals } from './PredefinedMeals';
import { MealCategoryCard } from './MealCategoryCard';
import { NearbyRestaurants } from './NearbyRestaurants';
import { Calendar, TrendingUp, Settings } from 'lucide-react';
import { useState } from 'react';
import { MealApiKeyModal } from './MealApiKeyModal';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

export function MealsOverview() {
  const { language } = useApp();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Get personalized calorie targets from onboarding
  const dailyCalorieGoal = parseInt(localStorage.getItem('dailyCalorieGoal') || '2000');
  const fitnessGoal = localStorage.getItem('userFitnessGoal') || 'stayFit';
  
  // Calculate meal distribution based on total calorie goal
  const breakfastTarget = Math.round(dailyCalorieGoal * 0.25); // 25% for breakfast
  const lunchTarget = Math.round(dailyCalorieGoal * 0.35); // 35% for lunch
  const dinnerTarget = Math.round(dailyCalorieGoal * 0.30); // 30% for dinner
  // 10% left for snacks
  
  const mealCategories = [
    {
      type: 'breakfast',
      name: t('breakfast', language),
      currentCalories: 420,
      targetCalories: breakfastTarget,
      macros: { protein: 25, carbs: 45, fats: 15 },
      color: 'from-amber-400 to-orange-400',
    },
    {
      type: 'lunch',
      name: t('lunch', language),
      currentCalories: 650,
      targetCalories: lunchTarget,
      macros: { protein: 40, carbs: 60, fats: 20 },
      color: 'from-sky-400 to-blue-400',
    },
    {
      type: 'dinner',
      name: t('dinner', language),
      currentCalories: 380,
      targetCalories: dinnerTarget,
      macros: { protein: 30, carbs: 40, fats: 18 },
      color: 'from-purple-400 to-pink-400',
    },
  ];

  const totalCalories = mealCategories.reduce((sum, meal) => sum + meal.currentCalories, 0);
  const targetCalories = dailyCalorieGoal;
  
  // Personalized message based on fitness goal
  const getGoalMessage = () => {
    if (language === 'en') {
      if (fitnessGoal === 'weightLoss') return 'Track calories to stay in deficit for weight loss';
      if (fitnessGoal === 'muscleGain') return 'Fuel your muscles with adequate protein and calories';
      if (fitnessGoal === 'stayFit') return 'Maintain balanced nutrition for optimal health';
      return 'Track your nutrition to achieve your goals';
    } else {
      if (fitnessGoal === 'weightLoss') return 'تتبع السعرات للبقاء في عجز لفقدان الوزن';
      if (fitnessGoal === 'muscleGain') return 'زود عضلاتك بالبروتين والسعرات الكافية';
      if (fitnessGoal === 'stayFit') return 'حافظ على تغذية متوازنة للصحة المثلى';
      return 'تتبع تغذيتك لتحقيق أهدافك';
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background transition-colors duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-sky-900 dark:text-sky-100 mb-2">{t('yourMeals', language)}</h1>
            <p className="text-sky-600 dark:text-sky-400">{getGoalMessage()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <Calendar className="w-5 h-5" />
              <span>{t('today', language)}</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              onClick={() => setIsApiKeyModalOpen(true)}
            >
              <Settings className="w-5 h-5" />
              <span>API Key</span>
            </button>
          </div>
        </div>

        {/* Daily Summary Card - Personalized */}
        <div className="bg-gradient-to-r from-sky-100 to-mint-100 dark:from-sky-900/40 dark:to-mint-900/40 rounded-3xl p-6 shadow-sm border border-sky-200/50 dark:border-sky-800/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sky-700 dark:text-sky-300 mb-1">{language === 'en' ? 'Total Calories Today' : 'إجمالي السعرات اليوم'}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-sky-900 dark:text-sky-100 font-bold">{totalCalories}</span>
                <span className="text-sky-600 dark:text-sky-400">/ {targetCalories} {t('kcal', language)}</span>
              </div>
              <p className="text-xs text-sky-600 dark:text-sky-400 mt-1">
                {language === 'en' ? `${targetCalories - totalCalories} calories remaining` : `${targetCalories - totalCalories} سعرة متبقية`}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/60 dark:bg-gray-800/60 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            </div>
          </div>
          <div className="w-full bg-white/40 dark:bg-gray-700/40 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-sky-500 to-mint-500 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Predefined Meals Section */}
      <PredefinedMeals />

      {/* Main Meal Categories Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sky-900 dark:text-sky-100">{t('mealCategories', language)}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealCategories.map((meal) => (
            <MealCategoryCard key={meal.type} meal={meal} />
          ))}
        </div>
      </div>

      {/* Nearby Restaurants Section */}
      <NearbyRestaurants />

      {/* API Key Modal */}
      <MealApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
    </div>
  );
}