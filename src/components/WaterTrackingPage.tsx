import { WaterProgressRing } from './WaterProgressRing';
import { WaterActionButtons } from './WaterActionButtons';
import { WaterTimeline } from './WaterTimeline';
import { WaterChartContainer } from './WaterChartContainer';
import { WaterStreakCard } from './WaterStreakCard';
import { NearbyWaterSources } from './NearbyWaterSources';
import { WaterDayNavigator } from './WaterDayNavigator';
import { WaterInsightsCard } from './WaterInsightsCard';
import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { WaterApiKeyModal } from './WaterApiKeyModal';
import { notifications } from '../utils/notifications';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';

interface WaterLog {
  id: number;
  amount: number;
  time: string;
  timestamp: number;
  date: string; // YYYY-MM-DD format
}

interface DailyWaterData {
  [date: string]: WaterLog[];
}

export function WaterTrackingPage() {
  const { language } = useApp();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [waterData, setWaterData] = useState<DailyWaterData>(() => {
    const saved = localStorage.getItem('waterTrackingData');
    return saved ? JSON.parse(saved) : {};
  });

  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('geminiApiKey') || '';
  });

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const targetWater = parseInt(localStorage.getItem('dailyWaterGoal') || '2000');

  // Get logs for selected date
  const currentDayLogs = waterData[selectedDate] || [];
  const currentDayTotal = currentDayLogs.reduce((sum, log) => sum + log.amount, 0);

  // Save to localStorage whenever waterData changes
  useEffect(() => {
    localStorage.setItem('waterTrackingData', JSON.stringify(waterData));
  }, [waterData]);

  // Calculate streak
  const calculateStreak = () => {
    const dates = Object.keys(waterData).sort().reverse();
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < dates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const dayTotal = (waterData[dateStr] || []).reduce((sum, log) => sum + log.amount, 0);
      
      if (dayTotal >= targetWater) {
        streak++;
      } else {
        if (i === 0) continue; // Skip today if not reached yet
        break;
      }
    }
    
    return streak;
  };

  const handleAddWater = (amount: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-EG', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const newLog: WaterLog = {
      id: Date.now(),
      amount,
      time: timeString,
      timestamp: now.getTime(),
      date: selectedDate,
    };

    setWaterData(prev => {
      const updated = {
        ...prev,
        [selectedDate]: [newLog, ...(prev[selectedDate] || [])],
      };
      
      // Calculate new total
      const newTotal = (updated[selectedDate] || []).reduce((sum, log) => sum + log.amount, 0);
      
      // Show notifications based on progress
      const cups = Math.floor(amount / 250);
      notifications.waterAdded(cups);
      
      if (newTotal >= targetWater && (currentDayTotal < targetWater)) {
        notifications.waterGoalReached();
      } else if (newTotal >= targetWater / 2 && currentDayTotal < targetWater / 2) {
        notifications.waterGoalHalfway();
      }
      
      // Update global storage for dashboard
      localStorage.setItem('waterCups', Math.floor(newTotal / 250).toString());
      
      return updated;
    });
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('geminiApiKey', key);
    setIsApiKeyModalOpen(false);
    notifications.success(language === 'en' ? 'API Key saved successfully!' : 'تم حفظ مفتاح API بنجاح!');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sky-900 dark:text-sky-100">{t('waterTracking', language)}</h1>
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="p-2 rounded-xl bg-card shadow-md text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors border border-sky-100 dark:border-gray-700"
            title="API Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sky-600 dark:text-sky-400">{t('monitorHydration', language)}</p>
      </div>

      {/* Date Navigator */}
      <WaterDayNavigator
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        waterData={waterData}
        targetWater={targetWater}
      />

      {/* Main Content: 2-column on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Main Stats Card */}
          <WaterProgressRing
            current={currentDayTotal}
            target={targetWater}
            selectedDate={selectedDate}
          />

          {/* Quick Add Water Section */}
          <WaterActionButtons onAddWater={handleAddWater} />

          {/* Water Streak Banner */}
          <WaterStreakCard streak={calculateStreak()} />

          {/* AI Insights */}
          {apiKey && (
            <WaterInsightsCard
              apiKey={apiKey}
              currentIntake={currentDayTotal}
              targetIntake={targetWater}
              logs={currentDayLogs}
              selectedDate={selectedDate}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Daily Water Timeline */}
          <WaterTimeline logs={currentDayLogs} selectedDate={selectedDate} />

          {/* Weekly Hydration Chart */}
          <WaterChartContainer waterData={waterData} targetWater={targetWater} />

          {/* Nearby Water Sources */}
          <NearbyWaterSources />
        </div>
      </div>

      {/* API Key Modal */}
      <WaterApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
}