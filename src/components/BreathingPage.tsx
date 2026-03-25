import { useState, useEffect } from 'react';
import { ArrowLeft, Wind, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../utils/notifications';

export function BreathingPage() {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState('box');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState('Inhale');

  const exercises = [
    {
      id: 'box',
      name: 'Box Breathing',
      pattern: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s',
      duration: '5 min',
      benefits: 'Reduces stress and improves focus',
      phases: [
        { name: 'Inhale', duration: 4 },
        { name: 'Hold', duration: 4 },
        { name: 'Exhale', duration: 4 },
        { name: 'Hold', duration: 4 },
      ],
    },
    {
      id: '4-7-8',
      name: '4-7-8 Breathing',
      pattern: 'Inhale 4s → Hold 7s → Exhale 8s',
      duration: '3 min',
      benefits: 'Promotes relaxation and better sleep',
      phases: [
        { name: 'Inhale', duration: 4 },
        { name: 'Hold', duration: 7 },
        { name: 'Exhale', duration: 8 },
      ],
    },
    {
      id: 'deep',
      name: 'Deep Breathing',
      pattern: 'Slow deep breaths for 5 minutes',
      duration: '5 min',
      benefits: 'Calms the nervous system',
      phases: [
        { name: 'Inhale', duration: 5 },
        { name: 'Exhale', duration: 5 },
      ],
    },
  ];

  const currentExercise = exercises.find((ex) => ex.id === selectedExercise) || exercises[0];

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  // Calculate current phase
  useEffect(() => {
    if (isActive) {
      const totalCycleDuration = currentExercise.phases.reduce((sum, p) => sum + p.duration, 0);
      const cyclePosition = seconds % totalCycleDuration;
      
      let accumulated = 0;
      for (const phase of currentExercise.phases) {
        if (cyclePosition < accumulated + phase.duration) {
          setPhase(phase.name);
          break;
        }
        accumulated += phase.duration;
      }
    }
  }, [seconds, isActive, currentExercise]);

  const handleReset = () => {
    if (isActive && seconds > 0) {
      notifications.breathingCompleted();
    }
    setIsActive(false);
    setSeconds(0);
    setPhase('Inhale');
  };

  const handleToggleActive = () => {
    const wasActive = isActive;
    setIsActive(!wasActive);
    
    if (!wasActive) {
      notifications.breathingStarted();
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
        <h1 className="text-sky-900 mb-2">Breathing Exercises</h1>
        <p className="text-sky-600">Practice breathing techniques for stress relief</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercise Selection */}
        <div className="lg:col-span-1">
          <h3 className="text-sky-900 mb-4">Choose Exercise</h3>
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => {
                  setSelectedExercise(exercise.id);
                  handleReset();
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  selectedExercise === exercise.id
                    ? 'bg-sky-100 border-2 border-sky-300'
                    : 'bg-white shadow-sm hover:shadow-md'
                }`}
                title={exercise.benefits}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sky-900">{exercise.name}</h4>
                  <span className="text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                    {exercise.duration}
                  </span>
                </div>
                <p className="text-sm text-sky-600 mb-1">{exercise.pattern}</p>
                <p className="text-xs text-sky-500">{exercise.benefits}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center">
                <Wind className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <h2 className="text-sky-900">{currentExercise.name}</h2>
                <p className="text-sm text-sky-600">{currentExercise.pattern}</p>
              </div>
            </div>

            {/* Breathing Animation */}
            <div className="bg-sky-50 rounded-3xl p-12 mb-8 text-center">
              <div 
                className={`w-32 h-32 mx-auto rounded-full bg-sky-200 flex items-center justify-center transition-all duration-1000 ${
                  isActive && phase === 'Inhale' ? 'scale-150' : 'scale-100'
                }`}
                title="Follow the circle - inhale as it grows, exhale as it shrinks"
              >
                <div className="w-20 h-20 rounded-full bg-sky-400"></div>
              </div>
              <p className="text-4xl text-sky-900 mt-8 mb-4">{phase}</p>
              <p className="text-sky-600">
                {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleActive}
                className={`flex-1 px-6 py-4 rounded-2xl text-white transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 hover:bg-amber-600'
                    : 'bg-sky-900 hover:bg-sky-800'
                }`}
                title={isActive ? 'Pause breathing exercise' : 'Start breathing exercise'}
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Start</span>
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-4 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 transition-all flex items-center gap-2"
                title="Reset the breathing timer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Info */}
            <div className="mt-6 p-4 bg-sky-50 rounded-2xl">
              <p className="text-sm text-sky-900">
                💡 <strong>Tip:</strong> {currentExercise.benefits}. Practice daily for best results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}