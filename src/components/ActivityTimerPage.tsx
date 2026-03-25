import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Flame, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../utils/notifications';

interface WorkoutHistory {
  id: number;
  date: string;
  type: string;
  duration: number;
  calories: number;
  timestamp: number;
}

export function ActivityTimerPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [activityType, setActivityType] = useState('cardio');
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  
  // Load workout history from localStorage
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const activities = [
    { id: 'cardio', name: 'Cardio', caloriesPerMinute: 8, color: 'bg-orange-100', textColor: 'text-orange-600' },
    { id: 'strength', name: 'Strength Training', caloriesPerMinute: 6, color: 'bg-blue-100', textColor: 'text-blue-600' },
    { id: 'yoga', name: 'Yoga', caloriesPerMinute: 3, color: 'bg-purple-100', textColor: 'text-purple-600' },
    { id: 'walking', name: 'Walking', caloriesPerMinute: 4, color: 'bg-mint-100', textColor: 'text-mint-600' },
  ];

  const currentActivity = activities.find(a => a.id === activityType) || activities[0];

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        setCaloriesBurned((prev) => prev + (currentActivity.caloriesPerMinute / 60));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, currentActivity.caloriesPerMinute]);

  const handleStartPause = () => {
    const wasActive = isActive;
    setIsActive(!isActive);
    
    if (!wasActive) {
      // Starting the timer
      notifications.timerStarted(currentActivity.name);
    }
  };

  const handleReset = () => {
    // Save workout if timer has been running
    if (seconds > 0 && !isActive) {
      const minutes = Math.floor(seconds / 60);
      const newWorkout: WorkoutHistory = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        type: currentActivity.name,
        duration: minutes,
        calories: Math.round(caloriesBurned),
        timestamp: Date.now(),
      };
      
      const updatedHistory = [newWorkout, ...workoutHistory].slice(0, 10); // Keep last 10
      setWorkoutHistory(updatedHistory);
      localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
      
      notifications.workoutCompleted(currentActivity.name, minutes);
    }
    
    setSeconds(0);
    setIsActive(false);
    setCaloriesBurned(0);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const recentWorkouts = [
    { date: 'Today', type: 'Cardio', duration: '32 min', calories: 256 },
    { date: 'Yesterday', type: 'Strength', duration: '45 min', calories: 270 },
    { date: '2 days ago', type: 'Yoga', duration: '30 min', calories: 90 },
  ];

  // Calculate weekly totals
  const getWeeklyStats = () => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyWorkouts = workoutHistory.filter(w => w.timestamp >= oneWeekAgo);
    
    return {
      count: weeklyWorkouts.length,
      totalCalories: weeklyWorkouts.reduce((sum, w) => sum + w.calories, 0),
      totalMinutes: weeklyWorkouts.reduce((sum, w) => sum + w.duration, 0),
    };
  };
  
  const weeklyStats = getWeeklyStats();

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
        <h1 className="text-sky-900 mb-2">Activity Timer</h1>
        <p className="text-sky-600">Track your workout time and calories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
            {/* Activity Selection */}
            <div className="mb-8">
              <p className="text-sm text-sky-600 mb-3">Select Activity Type</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => {
                      setActivityType(activity.id);
                      handleReset();
                    }}
                    className={`p-3 rounded-2xl transition-all ${
                      activityType === activity.id
                        ? `${activity.color} ring-2 ring-offset-2 ring-sky-300`
                        : 'bg-sky-50 hover:bg-sky-100'
                    }`}
                    title={`Track ${activity.name}`}
                  >
                    <p className={`text-sm ${activityType === activity.id ? activity.textColor : 'text-sky-600'}`}>
                      {activity.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Display */}
            <div className="bg-sky-50 rounded-3xl p-12 mb-8 text-center">
              <div className="mb-2">
                <Clock className="w-8 h-8 text-sky-600 mx-auto mb-4" />
              </div>
              <div 
                className="text-7xl text-sky-900 mb-6 tabular-nums"
                title="Elapsed workout time"
              >
                {formatTime(seconds)}
              </div>
              <div className="flex items-center justify-center gap-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-3xl text-sky-900">{Math.round(caloriesBurned)}</p>
                  <p className="text-sm text-sky-600">calories burned</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartPause}
                className={`flex-1 px-8 py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-sky-900 hover:bg-sky-800'
                }`}
                title={isActive ? 'Pause timer' : 'Start timer'}
              >
                {isActive ? (
                  <>
                    <Pause className="w-6 h-6" />
                    <span className="text-lg">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    <span className="text-lg">Start</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-4 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 transition-all flex items-center gap-2"
                title="Reset to 00:00:00"
              >
                <RotateCcw className="w-6 h-6" />
                <span className="text-lg">Reset</span>
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-sky-100 to-mint-100 rounded-3xl p-6">
            <h3 className="text-sky-900 mb-3">💡 Activity Tips</h3>
            <ul className="space-y-2 text-sm text-sky-700">
              <li>• Select your activity type for accurate calorie tracking</li>
              <li>• Use the timer for any workout or active session</li>
              <li>• Calories are estimated based on moderate intensity</li>
              <li>• Don't forget to warm up before starting!</li>
            </ul>
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h2 className="text-sky-900 mb-6">Recent Workouts</h2>
            <div className="space-y-4">
              {workoutHistory.length > 0 ? (
                workoutHistory.slice(0, 5).map((workout) => (
                  <div key={workout.id} className="p-4 bg-sky-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-sky-600">{workout.date}</p>
                      <span className="px-2 py-1 bg-white rounded-lg text-xs text-sky-900">
                        {workout.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-sky-600">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-sky-600">
                        <Flame className="w-4 h-4" />
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center bg-sky-50 rounded-2xl">
                  <p className="text-sm text-sky-600">
                    No workouts yet. Start a timer to track your first workout!
                  </p>
                </div>
              )}
            </div>

            {/* Stats Summary */}
            <div className="mt-6 pt-6 border-t border-sky-100">
              <p className="text-sm text-sky-600 mb-3">This Week Total</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-sky-50 rounded-2xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                  <p className="text-2xl text-sky-900 mb-1">{weeklyStats.count}</p>
                  <p className="text-xs text-sky-600">Workouts</p>
                </div>
                <div className="bg-sky-50 rounded-2xl p-3 text-center">
                  <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                  <p className="text-2xl text-sky-900 mb-1">{weeklyStats.totalCalories}</p>
                  <p className="text-xs text-sky-600">kcal</p>
                </div>
              </div>
              {weeklyStats.totalMinutes > 0 && (
                <div className="mt-3 bg-mint-100 rounded-2xl p-3 text-center">
                  <p className="text-2xl text-mint-900 mb-1">{weeklyStats.totalMinutes}</p>
                  <p className="text-xs text-mint-600">Total Minutes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}