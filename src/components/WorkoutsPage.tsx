import { ArrowLeft, Dumbbell, Clock, Flame, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WorkoutsPage() {
  const navigate = useNavigate();
  const currentGoal = localStorage.getItem('fitnessGoal') || 'Stay Healthy';

  const workoutCategories = [
    {
      category: 'Cardio',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      workouts: [
        { name: 'HIIT Training', duration: 25, calories: 320, difficulty: 'Advanced' },
        { name: 'Running', duration: 30, calories: 300, difficulty: 'Intermediate' },
        { name: 'Jump Rope', duration: 15, calories: 200, difficulty: 'Beginner' },
      ],
    },
    {
      category: 'Strength',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      workouts: [
        { name: 'Full Body Workout', duration: 45, calories: 280, difficulty: 'Intermediate' },
        { name: 'Upper Body', duration: 30, calories: 200, difficulty: 'Beginner' },
        { name: 'Lower Body', duration: 35, calories: 240, difficulty: 'Intermediate' },
      ],
    },
    {
      category: 'Flexibility',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      workouts: [
        { name: 'Yoga Flow', duration: 30, calories: 100, difficulty: 'Beginner' },
        { name: 'Stretching Routine', duration: 20, calories: 60, difficulty: 'Beginner' },
        { name: 'Pilates', duration: 40, calories: 150, difficulty: 'Intermediate' },
      ],
    },
    {
      category: 'Home Workouts',
      color: 'bg-mint-100',
      iconColor: 'text-mint-600',
      workouts: [
        { name: 'Bodyweight Circuit', duration: 20, calories: 180, difficulty: 'Beginner' },
        { name: 'Core Blast', duration: 15, calories: 120, difficulty: 'Intermediate' },
        { name: 'No Equipment Full Body', duration: 30, calories: 220, difficulty: 'Beginner' },
      ],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-teal-100 text-teal-600';
      case 'Intermediate':
        return 'bg-sky-100 text-sky-600';
      case 'Advanced':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-sky-100 text-sky-600';
    }
  };

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
        <h1 className="text-sky-900 mb-2">Workout Plans</h1>
        <p className="text-sky-600">
          Customized for your goal: <strong>{currentGoal}</strong>
        </p>
      </div>

      {/* Current Goal Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center">
            <Target className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <h2 className="text-sky-900">Your Goal</h2>
            <p className="text-sky-600">{currentGoal}</p>
          </div>
        </div>
        <p className="text-sm text-sky-600">
          💡 Workouts are recommended based on your selected fitness goal. Change your goal anytime from the Sports Dashboard.
        </p>
      </div>

      {/* Workout Categories */}
      {workoutCategories.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-sky-900 mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.workouts.map((workout, wIndex) => (
              <div
                key={wIndex}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Workout Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Dumbbell className={`w-6 h-6 ${category.iconColor}`} />
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-xl text-xs ${getDifficultyColor(workout.difficulty)}`}
                    title={`Difficulty: ${workout.difficulty}`}
                  >
                    {workout.difficulty}
                  </span>
                </div>

                {/* Workout Info */}
                <h3 className="text-sky-900 mb-4">{workout.name}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-sky-600" title="Workout duration">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sky-600" title="Estimated calories">
                      <Flame className="w-4 h-4" />
                      <span>{workout.calories} kcal</span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button 
                  className="w-full px-4 py-3 rounded-2xl bg-sky-900 text-white hover:bg-sky-800 transition-all"
                  title={`Start ${workout.name}`}
                >
                  Start Workout
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
