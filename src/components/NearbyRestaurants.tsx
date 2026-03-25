import { MapPin, Star, Clock } from 'lucide-react';
import { useRef } from 'react';

export function NearbyRestaurants() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock API data for nearby restaurants
  const restaurants = [
    {
      id: 1,
      name: 'Green Garden Bistro',
      distance: '0.5 km',
      category: 'Healthy Bowls',
      rating: 4.8,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1621156970483-cc0960ec7f0b',
    },
    {
      id: 2,
      name: 'Fresh Salad Bar',
      distance: '0.8 km',
      category: 'Salads & Wraps',
      rating: 4.6,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1578679664605-80268ff31300',
    },
    {
      id: 3,
      name: 'Protein Palace',
      distance: '1.2 km',
      category: 'Grilled & Protein',
      rating: 4.9,
      deliveryTime: '30-40 min',
      image: 'https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8',
    },
    {
      id: 4,
      name: 'Smoothie Haven',
      distance: '0.3 km',
      category: 'Smoothies & Bowls',
      rating: 4.7,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1610450620997-6921021865da',
    },
    {
      id: 5,
      name: 'Wholesome Kitchen',
      distance: '1.5 km',
      category: 'Organic Meals',
      rating: 4.8,
      deliveryTime: '35-45 min',
      image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sky-900 mb-1">Nearby Restaurants</h2>
          <p className="text-sm text-sky-600">Healthy options near you</p>
        </div>
        <button className="text-sky-600 hover:text-sky-700 transition-colors">
          View All
        </button>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4" ref={scrollRef}>
        <div className="flex gap-4 pb-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex-shrink-0 w-80">
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Restaurant Image */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-100 to-mint-100 flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-sky-200" />
          </div>

          {/* Restaurant Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sky-900 mb-1 truncate">{restaurant.name}</h3>
            <p className="text-sm text-sky-600 mb-2">{restaurant.category}</p>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-4 h-4 fill-amber-600" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-sky-600">
                <MapPin className="w-4 h-4" />
                <span>{restaurant.distance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="mt-4 pt-4 border-t border-sky-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-sky-600">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-mint-500 text-white hover:from-sky-600 hover:to-mint-600 transition-all text-sm">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
