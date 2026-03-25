import { Award, Flame } from 'lucide-react';

interface WaterStreakCardProps {
  streak: number;
}

export function WaterStreakCard({ streak }: WaterStreakCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-2 border-sky-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
          <Award className="w-6 h-6 text-sky-600" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sky-900">Great Job!</h3>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-sky-700">
            You've completed <span className="text-sky-900">{streak} hydration days</span> in a row!
          </p>
          <p className="text-sm text-sky-600 mt-2">
            Keep it up to maintain your streak and stay healthy.
          </p>
        </div>
      </div>
    </div>
  );
}
