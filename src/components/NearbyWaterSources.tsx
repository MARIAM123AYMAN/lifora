import { MapPin, Navigation } from 'lucide-react';

export function NearbyWaterSources() {
  // Mock API data for nearby water sources
  const waterSources = [
    {
      id: 1,
      name: 'City Drinking Fountain',
      type: 'Public Fountain',
      distance: '0.2 km',
    },
    {
      id: 2,
      name: 'Wellness Café',
      type: 'Café & Refill Station',
      distance: '0.4 km',
    },
    {
      id: 3,
      name: 'Fitness Center Water Bar',
      type: 'Filtered Water',
      distance: '0.6 km',
    },
    {
      id: 4,
      name: 'Community Park Fountain',
      type: 'Public Fountain',
      distance: '0.8 km',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sky-900">Nearby Water Sources</h2>
        <button className="text-sm text-sky-600 hover:text-sky-700 transition-colors">
          View Map
        </button>
      </div>

      <div className="space-y-3">
        {waterSources.map((source) => (
          <div
            key={source.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
              <Navigation className="w-5 h-5 text-sky-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sky-900 truncate">{source.name}</h3>
              <p className="text-sm text-sky-600">{source.type}</p>
            </div>

            <div className="flex items-center gap-1 text-sm text-sky-700 flex-shrink-0">
              <MapPin className="w-4 h-4" />
              <span>{source.distance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
