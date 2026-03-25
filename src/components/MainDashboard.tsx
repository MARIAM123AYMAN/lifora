import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Droplets, Dumbbell, Settings, Calendar, Clock, Brain, LogOut } from 'lucide-react';
import { notifications } from '../utils/notifications';
import { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import { PersonalizedWelcome } from './PersonalizedWelcome';

export function MainDashboard() {
  const navigate = useNavigate();
  const { language } = useApp();
  const userName = localStorage.getItem('userName') || 'User';
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
  // Check if onboarding is completed, redirect if not
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete !== 'true') {
      navigate('/onboarding');
    }
  }, [navigate]);
  
  // Welcome notification on first load
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      // Get personalized greeting based on fitness goal
      const fitnessGoal = localStorage.getItem('userFitnessGoal') || 'stayFit';
      let goalMessage = '';
      
      if (language === 'en') {
        if (fitnessGoal === 'weightLoss') goalMessage = " Let's crush those weight loss goals!";
        else if (fitnessGoal === 'muscleGain') goalMessage = " Ready to build some muscle!";
        else if (fitnessGoal === 'stayFit') goalMessage = " Let's maintain that healthy lifestyle!";
        else goalMessage = " Let's achieve your wellness goals!";
      } else {
        if (fitnessGoal === 'weightLoss') goalMessage = " دعنا نحقق أهداف إنقاص الوزن!";
        else if (fitnessGoal === 'muscleGain') goalMessage = " لنبني بعض العضلات!";
        else if (fitnessGoal === 'stayFit') goalMessage = " دعنا نحافظ على نمط حياة صحي!";
        else goalMessage = " دعنا نحقق أهدافك الصحية!";
      }
      
      setTimeout(() => {
        notifications.mealAdded(t('welcomeBack', language) + ', ' + userName + goalMessage, 0);
      }, 1000);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [language, userName]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };
  
  // Get data from localStorage - using personalized goals from onboarding
  const dailyCalories = parseInt(localStorage.getItem('dailyCalories') || '1250');
  const calorieGoal = parseInt(localStorage.getItem('dailyCalorieGoal') || '2000');
  const waterCups = parseInt(localStorage.getItem('waterCups') || '5');
  const waterGoal = Math.round(parseInt(localStorage.getItem('dailyWaterGoal') || '2000') / 250);
  const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
  const activeMinutes = workoutHistory.reduce((sum: number, w: any) => sum + (w.duration || 0), 0);
  const activityGoal = parseInt(localStorage.getItem('dailyCardioGoal') || '60');

  // Calculate progress percentages
  const caloriesProgress = Math.min((dailyCalories / calorieGoal) * 100, 100);
  const waterProgress = Math.min((waterCups / waterGoal) * 100, 100);
  const activityProgress = Math.min((activeMinutes / activityGoal) * 100, 100);

  // Timeline data
  const todayTimeline = [
    { time: '08:00', type: 'meal', title: t('breakfast', language), detail: '450 ' + t('kcal', language), icon: Utensils, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { time: '09:30', type: 'water', title: t('water', language), detail: '2 ' + t('cups', language), icon: Droplets, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/30' },
    { time: '13:00', type: 'meal', title: t('lunch', language), detail: '650 ' + t('kcal', language), icon: Utensils, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { time: '15:00', type: 'sports', title: t('workouts', language), detail: '30 ' + t('min', language) + ' ' + t('activity', language).toLowerCase(), icon: Dumbbell, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { time: '16:30', type: 'water', title: t('water', language), detail: '3 ' + t('cups', language), icon: Droplets, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/30' },
  ];

  // AI Summary - Personalized based on user data
  const getAISummary = () => {
    const insights = [];
    const healthConditions = JSON.parse(localStorage.getItem('userHealthConditions') || '[]');
    const fitnessGoal = localStorage.getItem('userFitnessGoal') || 'stayFit';
    
    if (waterCups < 4) {
      insights.push(language === 'en' ? 'drink more water' : 'اشرب المزيد من الماء');
    }
    
    // Personalized calorie advice based on goal
    if (fitnessGoal === 'weightLoss' && dailyCalories > calorieGoal) {
      insights.push(language === 'en' ? 'reduce calorie intake for weight loss' : 'قلل السعرات لفقدان الوزن');
    } else if (fitnessGoal === 'muscleGain' && dailyCalories < calorieGoal * 0.9) {
      insights.push(language === 'en' ? 'increase protein intake for muscle growth' : 'زد البروتين لبناء العضلات');
    }
    
    if (activeMinutes < activityGoal) {
      insights.push(language === 'en' ? `add ${activityGoal - activeMinutes} more minutes of activity` : `أضف ${activityGoal - activeMinutes} دقائق إضافية من النشاط`);
    }
    
    // Health condition reminders
    if (healthConditions.includes('diabetes')) {
      insights.push(language === 'en' ? 'monitor your blood sugar' : 'راقب سكر الدم');
    }
    
    if (insights.length === 0) {
      return language === 'en' ? "🎉 Great job today! You're on track with all your health goals." : "🎉 عمل رائع اليوم! أنت على المسار الصحيح لتحقيق جميع أهدافك الصحية.";
    }
    
    return language === 'en' ? `💡 To optimize your day, try to ${insights.join(', ')}.` : `💡 لتحسين يومك حاول أن ${insights.join('، ')}.`;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 md:pb-8 bg-background transition-colors duration-300">
      {/* Personalized Welcome Modal */}
      <PersonalizedWelcome />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-mint-400 flex items-center justify-center text-2xl text-white shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-sky-900 dark:text-sky-100">{t('hello', language)}, {userName}! 👋</h1>
              <p className="text-sky-600 dark:text-sky-400">
                {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-EG', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/settings"
              className="p-3 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              title={t('settings', language)}
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button 
              className="p-3 rounded-2xl bg-card border border-sky-200 dark:border-gray-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              title={t('todayTimeline', language)}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-card border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-sm"
              title={t('logout', language)}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Balance Rings Section */}
      <div className="mb-8">
        <h2 className="text-sky-900 dark:text-sky-100 mb-6">{t('balanceRings', language)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calories Ring */}
          <div className="bg-card rounded-3xl p-6 shadow-sm border border-sky-100/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sky-900 dark:text-sky-100">{t('calories', language)}</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400">{t('meals', language)}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-orange-100 dark:text-orange-900/30" strokeWidth="12" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  className="text-orange-600 dark:text-orange-500"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - caloriesProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl text-sky-900 dark:text-sky-100">{dailyCalories}</p>
                <p className="text-xs text-sky-600 dark:text-sky-400">{t('of', language)} {calorieGoal}</p>
              </div>
            </div>
            
            <Link 
              to="/meals"
              className="block w-full text-center px-4 py-2 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors text-sm"
            >
              {t('viewMeals', language)}
            </Link>
          </div>

          {/* Water Ring */}
          <div className="bg-card rounded-3xl p-6 shadow-sm border border-sky-100/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sky-900 dark:text-sky-100">{t('water', language)}</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400">{t('hydration', language)}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-sky-100 dark:text-sky-900/30" strokeWidth="12" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  className="text-sky-600 dark:text-sky-500"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - waterProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl text-sky-900 dark:text-sky-100">{waterCups}</p>
                <p className="text-xs text-sky-600 dark:text-sky-400">{t('of', language)} {waterGoal} {t('cups', language)}</p>
              </div>
            </div>
            
            <Link 
              to="/water"
              className="block w-full text-center px-4 py-2 rounded-2xl bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors text-sm"
            >
              {t('trackWater', language)}
            </Link>
          </div>

          {/* Activity Ring */}
          <div className="bg-card rounded-3xl p-6 shadow-sm border border-sky-100/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sky-900 dark:text-sky-100">{t('activity', language)}</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400">{t('sports', language)}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-purple-100 dark:text-purple-900/30" strokeWidth="12" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  className="text-purple-600 dark:text-purple-500"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - activityProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl text-sky-900 dark:text-sky-100">{activeMinutes}</p>
                <p className="text-xs text-sky-600 dark:text-sky-400">{t('of', language)} {activityGoal} {t('min', language)}</p>
              </div>
            </div>
            
            <Link 
              to="/sports"
              className="block w-full text-center px-4 py-2 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-sm"
            >
              {t('viewSports', language)}
            </Link>
          </div>
        </div>
      </div>

      {/* Smart Assistant Card */}
      <div className="bg-gradient-to-r from-sky-100 to-mint-100 dark:from-sky-900/40 dark:to-mint-900/40 rounded-3xl p-6 mb-8 border border-sky-200/50 dark:border-sky-800/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center flex-shrink-0 shadow-sm">
            <Brain className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sky-900 dark:text-sky-100 mb-2">{t('aiHealthAssistant', language)}</h3>
            <p className="text-sky-700 dark:text-sky-300">{getAISummary()}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="mb-8">
        <h2 className="text-sky-900 dark:text-sky-100 mb-6">{t('quickAccess', language)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/meals"
            className="bg-card rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group border border-sky-100/50 dark:border-gray-700/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Utensils className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-sky-900 dark:text-sky-100 mb-2">{t('mealsModule', language)}</h3>
            <p className="text-sm text-sky-600 dark:text-sky-400">{t('trackNutrition', language)}</p>
          </Link>

          <Link 
            to="/water"
            className="bg-card rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group border border-sky-100/50 dark:border-gray-700/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Droplets className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            </div>
            <h3 className="text-sky-900 dark:text-sky-100 mb-2">{t('waterTracker', language)}</h3>
            <p className="text-sm text-sky-600 dark:text-sky-400">{t('monitorHydration', language)}</p>
          </Link>

          <Link 
            to="/sports"
            className="bg-card rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group border border-sky-100/50 dark:border-gray-700/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Dumbbell className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sky-900 dark:text-sky-100 mb-2">{t('sportsDashboard', language)}</h3>
            <p className="text-sm text-sky-600 dark:text-sky-400">{t('accessWorkouts', language)}</p>
          </Link>
        </div>
      </div>

      {/* Today's Timeline */}
      <div className="bg-card rounded-3xl p-6 shadow-sm border border-sky-100/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          <h2 className="text-sky-900 dark:text-sky-100">{t('todayTimeline', language)}</h2>
        </div>
        
        <div className="space-y-4">
          {todayTimeline.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shadow-sm`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  {index < todayTimeline.length - 1 && (
                    <div className="w-0.5 h-8 bg-sky-100 dark:bg-gray-700" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-sky-400 dark:text-sky-500" />
                    <p className="text-sm text-sky-600 dark:text-sky-400">{item.time}</p>
                  </div>
                  <h4 className="text-sky-900 dark:text-sky-100 mb-1">{item.title}</h4>
                  <p className="text-sm text-sky-600 dark:text-sky-400">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}