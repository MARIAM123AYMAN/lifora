import { ArrowLeft, MapPin, Star, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function GymsPage() {
  const navigate = useNavigate();

  const gyms = [
    {
      name: 'FitZone Gym',
      distance: '0.5 km',
      rating: 4.8,
      reviews: 234,
      status: 'Open',
      openUntil: '10 PM',
      address: '123 Main Street',
      amenities: ['Cardio', 'Weights', 'Pool', 'Sauna'],
    },
    {
      name: 'PowerHouse Fitness',
      distance: '1.2 km',
      rating: 4.6,
      reviews: 189,
      status: 'Open',
      openUntil: '11 PM',
      address: '456 Oak Avenue',
      amenities: ['Cardio', 'Weights', 'Classes'],
    },
    {
      name: 'Yoga & Wellness Center',
      distance: '0.8 km',
      rating: 4.9,
      reviews: 312,
      status: 'Open',
      openUntil: '9 PM',
      address: '789 Wellness Blvd',
      amenities: ['Yoga', 'Meditation', 'Massage'],
    },
    {
      name: 'CrossFit Arena',
      distance: '2.1 km',
      rating: 4.7,
      reviews: 156,
      status: 'Closed',
      openUntil: 'Opens at 6 AM',
      address: '321 Fitness Lane',
      amenities: ['CrossFit', 'Olympic Lifting'],
    },
  ];

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
        <h1 className="text-sky-900 mb-2">Nearby Gyms</h1>
        <p className="text-sky-600">Find gyms and fitness centers near you</p>
      </div>

      {/* Gyms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gyms.map((gym, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Gym Header */}
            <div className="mb-4">
              <h2 className="text-sky-900 mb-2">{gym.name}</h2>
              <p className="text-sm text-sky-600">{gym.address}</p>
            </div>

            {/* Gym Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-sky-50 rounded-2xl" title="Distance from your location">
                <div className="flex items-center gap-2 text-sky-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs">Distance</p>
                </div>
                <p className="text-sky-900">{gym.distance}</p>
              </div>

              <div className="p-3 bg-sky-50 rounded-2xl" title="User rating and reviews">
                <div className="flex items-center gap-2 text-sky-600 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <p className="text-xs">Rating</p>
                </div>
                <p className="text-sky-900">
                  {gym.rating} ({gym.reviews})
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mb-4 p-3 bg-sky-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-sky-600" />
                <p className="text-xs text-sky-600">Hours</p>
              </div>
              <p className={gym.status === 'Open' ? 'text-teal-600' : 'text-sky-900'}>
                {gym.status} • {gym.openUntil}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <p className="text-xs text-sky-600 mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {gym.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-sky-100 text-sky-900 rounded-xl text-xs"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full px-4 py-3 rounded-2xl bg-sky-900 text-white hover:bg-sky-800 transition-all flex items-center justify-center gap-2"
              title="Get directions to this gym"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
