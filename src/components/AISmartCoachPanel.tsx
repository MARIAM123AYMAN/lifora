import { Brain, Target, Clock, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface AISmartCoachPanelProps {
  currentGoal: string;
}

export function AISmartCoachPanel({ currentGoal }: AISmartCoachPanelProps) {
  const { language } = useApp();
  
  // Get personalized data from onboarding
  const activityLevel = localStorage.getItem('userActivityLevel') || 'moderate';
  const fitnessGoal = localStorage.getItem('userFitnessGoal') || 'stayFit';
  const healthConditions = JSON.parse(localStorage.getItem('userHealthConditions') || '[]');
  
  // AI-generated recommendation based on goal and activity level
  const recommendations = {
    'en': {
      'weightLoss': {
        beginner: { workout: 'Light Cardio & Walking', duration: 20, calories: 180, message: 'Start with low-impact cardio to build endurance and burn calories gradually.' },
        moderate: { workout: 'HIIT Cardio', duration: 30, calories: 320, message: 'High-intensity intervals will maximize calorie burn and boost metabolism.' },
        active: { workout: 'Advanced HIIT + Running', duration: 40, calories: 450, message: 'Combine high-intensity training with running for optimal fat loss.' },
      },
      'muscleGain': {
        beginner: { workout: 'Bodyweight Strength', duration: 25, calories: 200, message: 'Build foundation with push-ups, squats, and bodyweight exercises.' },
        moderate: { workout: 'Weight Training', duration: 45, calories: 280, message: 'Focus on compound movements with progressive overload for muscle growth.' },
        active: { workout: 'Heavy Lifting Program', duration: 60, calories: 350, message: 'Advanced strength training with heavier weights to maximize hypertrophy.' },
      },
      'stayFit': {
        beginner: { workout: 'Light Exercise', duration: 20, calories: 150, message: 'Gentle exercises to maintain mobility and overall health.' },
        moderate: { workout: 'Mixed Cardio & Strength', duration: 30, calories: 200, message: 'Balance cardio and strength training for overall wellness.' },
        active: { workout: 'Full Body Workout', duration: 45, calories: 280, message: 'Comprehensive routine to maintain peak fitness levels.' },
      },
      'improveEndurance': {
        beginner: { workout: 'Walking & Light Cardio', duration: 25, calories: 170, message: 'Build cardiovascular base with consistent low-impact activity.' },
        moderate: { workout: 'Steady-State Cardio', duration: 35, calories: 250, message: 'Maintain steady pace to build endurance capacity.' },
        active: { workout: 'Long Distance Training', duration: 50, calories: 400, message: 'Extended cardio sessions to push endurance limits.' },
      },
    },
    'ar': {
      'weightLoss': {
        beginner: { workout: 'كارديو خفيف والمشي', duration: 20, calories: 180, message: 'ابدأ بكارديو منخفض التأثير لبناء القدرة على التحمل وحرق السعرات تدريجياً.' },
        moderate: { workout: 'كارديو عالي الكثافة', duration: 30, calories: 320, message: 'الفترات عالية الكثافة ستزيد من حرق السعرات وتعزز عملية الأيض.' },
        active: { workout: 'HIIT متقدم + جري', duration: 40, calories: 450, message: 'دمج التدريب عالي الكثافة مع الجري لفقدان الدهون الأمثل.' },
      },
      'muscleGain': {
        beginner: { workout: 'تمارين قوة بوزن الجسم', duration: 25, calories: 200, message: 'بناء الأساس بتمارين الضغط والقرفصاء وتمارين وزن الجسم.' },
        moderate: { workout: 'تدريب الأوزان', duration: 45, calories: 280, message: 'ركز على الحركات المركبة مع الزيادة التدريجية لنمو العضلات.' },
        active: { workout: 'برنامج رفع أثقال', duration: 60, calories: 350, message: 'تدريب قوة متقدم بأوزان أثقل لتعظيم التضخم العضلي.' },
      },
      'stayFit': {
        beginner: { workout: 'تمارين خفيفة', duration: 20, calories: 150, message: 'تمارين لطيفة للحفاظ على الحركة والصحة العامة.' },
        moderate: { workout: 'كارديو وقوة مختلط', duration: 30, calories: 200, message: 'وازن بين الكارديو وتدريبات القوة من أجل العافية العامة.' },
        active: { workout: 'تمرين كامل الجسم', duration: 45, calories: 280, message: 'روتين شامل للحفاظ على مستويات اللياقة القصوى.' },
      },
      'improveEndurance': {
        beginner: { workout: 'المشي وكارديو خفيف', duration: 25, calories: 170, message: 'بناء القاعدة القلبية بنشاط منخفض التأثير مستمر.' },
        moderate: { workout: 'كارديو مستقر', duration: 35, calories: 250, message: 'حافظ على وتيرة ثابتة لبناء قدرة التحمل.' },
        active: { workout: 'تدريب مسافات طويلة', duration: 50, calories: 400, message: 'جلسات كارديو ممتدة لدفع حدود التحمل.' },
      },
    }
  };

  // Select recommendation based on user's fitness goal and activity level
  const goalData = recommendations[language][fitnessGoal as keyof typeof recommendations['en']] || recommendations[language]['stayFit'];
  const todayPlan = goalData[activityLevel as keyof typeof goalData] || goalData['moderate'];
  
  // Add health condition adjustments
  let adjustedMessage = todayPlan.message;
  if (healthConditions.includes('heartDisease')) {
    adjustedMessage += (language === 'en' 
      ? ' Remember to warm up properly and monitor your heart rate.' 
      : ' تذكر أن تقوم بالإحماء بشكل صحيح ومراقبة معدل ضربات القلب.');
  }
  if (healthConditions.includes('diabetes')) {
    adjustedMessage += (language === 'en' 
      ? ' Check blood sugar before and after exercise.' 
      : ' افحص سكر الدم قبل وبعد التمرين.');
  }

  return (
    <div className="bg-card rounded-3xl p-6 shadow-sm mb-8 border border-sky-100/50 dark:border-gray-700/50 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
          <Brain className="w-7 h-7 text-sky-600 dark:text-sky-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-sky-900 dark:text-sky-100">{t('aiCoach', language)}</h2>
          <p className="text-sm text-sky-600 dark:text-sky-400">{language === 'en' ? 'AI-powered workout recommendations' : 'توصيات تمارين مدعومة بالذكاء الاصطناعي'}</p>
        </div>
        <Link
          to="/sports/goal"
          className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-900 dark:hover:text-sky-300 transition-colors"
          title={language === 'en' ? 'Change your fitness goal' : 'تغيير هدف لياقتك'}
        >
          {language === 'en' ? 'Change Goal' : 'تغيير الهدف'}
        </Link>
      </div>

      {/* Current Goal Display */}
      <div className="bg-sky-50 dark:bg-gray-800 rounded-2xl p-4 mb-6 border border-sky-100/30 dark:border-gray-700/30">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <p className="text-sm text-sky-600 dark:text-sky-400">{language === 'en' ? 'Your Current Goal' : 'هدفك الحالي'}</p>
        </div>
        <p className="text-xl text-sky-900 dark:text-sky-100 font-bold">{currentGoal}</p>
      </div>

      {/* Today's Recommendation */}
      <div className="border-t border-sky-100 dark:border-gray-700 pt-6">
        <p className="text-sm text-sky-600 dark:text-sky-400 mb-4">{language === 'en' ? 'Recommended for Today' : 'موصى به لليوم'}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Workout Type */}
          <div className="bg-sky-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-sky-100/20 dark:border-gray-700/20">
            <p className="text-xs text-sky-600 dark:text-sky-400 mb-2">{language === 'en' ? 'Workout Type' : 'نوع التمرين'}</p>
            <p className="text-sky-900 dark:text-sky-100 font-medium">{todayPlan.workout}</p>
          </div>

          {/* Duration */}
          <div className="bg-sky-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-sky-100/20 dark:border-gray-700/20" title="Recommended workout duration">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <p className="text-xs text-sky-600 dark:text-sky-400">{t('duration', language)}</p>
            </div>
            <p className="text-sky-900 dark:text-sky-100 font-medium">{todayPlan.duration} {t('min', language)}</p>
          </div>

          {/* Expected Calories */}
          <div className="bg-sky-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-sky-100/20 dark:border-gray-700/20" title="Estimated calories you'll burn">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <p className="text-xs text-sky-600 dark:text-sky-400">{language === 'en' ? 'Expected Burn' : 'الحرق المتوقع'}</p>
            </div>
            <p className="text-sky-900 dark:text-sky-100 font-medium">{todayPlan.calories} {t('kcal', language)}</p>
          </div>
        </div>

        {/* AI Message */}
        <div className="bg-gradient-to-r from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-gray-800/30 rounded-2xl p-4 mb-4 border border-sky-100/50 dark:border-sky-800/50">
          <p className="text-sky-900 dark:text-sky-100">💡 {adjustedMessage}</p>
        </div>

        {/* Start Button */}
        <button 
          className="w-full md:w-auto px-6 py-3 rounded-2xl bg-sky-900 dark:bg-sky-700 text-white hover:bg-sky-800 dark:hover:bg-sky-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform active:scale-95"
          title={language === 'en' ? "Start your recommended workout" : "ابدأ تمرينك الموصى به"}
        >
          <span>{language === 'en' ? "Start Today's Workout" : "ابدأ تمرين اليوم"}</span>
          <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}