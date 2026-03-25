import { Droplet, Clock } from 'lucide-react';

interface WaterLog {
  id: number;
  amount: number;
  time: string;
  timestamp?: number;
  date?: string;
}

interface WaterTimelineProps {
  logs: WaterLog[];
  selectedDate: string;
}

export function WaterTimeline({ logs, selectedDate }: WaterTimelineProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = dateStr === today.toISOString().split('T')[0];
    
    if (isToday) return 'Today';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sky-900">Daily Water Timeline</h2>
        <span className="text-sm text-sky-600">{formatDate(selectedDate)}</span>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-8">
          <Droplet className="w-12 h-12 text-sky-300 mx-auto mb-3" />
          <p className="text-sky-600">No water intake logged yet. Start tracking!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                <Droplet className="w-5 h-5 text-sky-600" />
              </div>
              
              <div className="flex-1">
                <p className="text-sky-900">{log.amount}ml</p>
                <div className="flex items-center gap-1 text-sm text-sky-600 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{log.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}