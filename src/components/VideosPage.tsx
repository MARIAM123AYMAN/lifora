import { ArrowLeft, Play, Clock, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function VideosPage() {
  const navigate = useNavigate();
  const currentGoal = localStorage.getItem('fitnessGoal') || 'Stay Healthy';

  const videoPlaylists = [
    {
      title: 'Fat Burning HIIT',
      duration: '25 min',
      difficulty: 'Intermediate',
      calories: 320,
      thumbnail: '🔥',
      category: 'Lose Weight',
      instructor: 'Sarah Johnson',
    },
    {
      title: 'Full Body Strength',
      duration: '40 min',
      difficulty: 'Advanced',
      calories: 280,
      thumbnail: '💪',
      category: 'Gain Muscle',
      instructor: 'Mike Ross',
    },
    {
      title: 'Walking Workout',
      duration: '30 min',
      difficulty: 'Beginner',
      calories: 150,
      thumbnail: '🚶',
      category: 'Walk & Stay Active',
      instructor: 'Emma Davis',
    },
    {
      title: 'Yoga Flow',
      duration: '20 min',
      difficulty: 'Beginner',
      calories: 100,
      thumbnail: '🧘',
      category: 'Reduce Stress',
      instructor: 'Anna Chen',
    },
    {
      title: 'Core & Abs Blaster',
      duration: '15 min',
      difficulty: 'Intermediate',
      calories: 180,
      thumbnail: '🎯',
      category: 'Improve Fitness',
      instructor: 'Tom Wilson',
    },
    {
      title: 'Cardio Dance Party',
      duration: '35 min',
      difficulty: 'Beginner',
      calories: 250,
      thumbnail: '💃',
      category: 'Lose Weight',
      instructor: 'Lisa Park',
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
        <h1 className="text-sky-900 mb-2">Workout Videos</h1>
        <p className="text-sky-600">
          Recommended for your goal: <strong>{currentGoal}</strong>
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoPlaylists.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            {/* Video Thumbnail */}
            <div className="relative w-full h-48 bg-sky-50 flex items-center justify-center text-6xl">
              {video.thumbnail}
              <div className="absolute inset-0 bg-sky-900/10 group-hover:bg-sky-900/20 transition-all flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform"
                  title="Play video"
                >
                  <Play className="w-8 h-8 text-sky-600 ml-1" />
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span 
                  className={`px-3 py-1 rounded-xl text-xs ${getDifficultyColor(video.difficulty)}`}
                  title={`Difficulty level: ${video.difficulty}`}
                >
                  {video.difficulty}
                </span>
              </div>

              <h3 className="text-sky-900 mb-2">{video.title}</h3>
              <p className="text-sm text-sky-600 mb-4">with {video.instructor}</p>

              <div className="flex items-center justify-between text-sm text-sky-600">
                <div className="flex items-center gap-1" title="Video duration">
                  <Clock className="w-4 h-4" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center gap-1" title="Estimated calories burned">
                  <Flame className="w-4 h-4" />
                  <span>{video.calories} kcal</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
