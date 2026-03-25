import { Plus, Flame } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef } from 'react';

export function PredefinedMeals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock API data for predefined meals
  const predefinedMeals = [
    {
      id: 1,
      name: 'Greek Yogurt Bowl',
      image: 'https://images.unsplash.com/photo-1610450620997-6921021865da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2wlMjBiZXJyaWVzfGVufDF8fHx8MTc2NDQ2NjYxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 320,
      protein: 18,
      carbs: 42,
      fats: 8,
    },
    {
      id: 2,
      name: 'Avocado Toast',
      image: 'https://images.unsplash.com/photo-1708725741805-390cb4f3319f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzY0NDQyMzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 280,
      protein: 12,
      carbs: 30,
      fats: 16,
    },
    {
      id: 3,
      name: 'Quinoa Power Bowl',
      image: 'https://images.unsplash.com/photo-1621156970483-cc0960ec7f0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzY0NDUzMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 420,
      protein: 22,
      carbs: 55,
      fats: 12,
    },
    {
      id: 4,
      name: 'Fresh Garden Salad',
      image: 'https://images.unsplash.com/photo-1578679664605-80268ff31300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGx1bmNoJTIwaGVhbHRoeXxlbnwxfHx8fDE3NjQ1MDUzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 180,
      protein: 8,
      carbs: 20,
      fats: 9,
    },
    {
      id: 5,
      name: 'Grilled Chicken',
      image: 'https://images.unsplash.com/photo-1496074620649-6b1b02e5c1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMGRpbm5lcnxlbnwxfHx8fDE3NjQ0NTA1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 350,
      protein: 45,
      carbs: 15,
      fats: 12,
    },
    {
      id: 6,
      name: 'Healthy Pasta',
      image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGhlYWx0aHklMjBtZWFsfGVufDF8fHx8MTc2NDUwNDIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      calories: 480,
      protein: 28,
      carbs: 62,
      fats: 14,
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sky-900">Recommended Meals</h2>
        <button className="text-sky-600 hover:text-sky-700 transition-colors">
          View All
        </button>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {predefinedMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto -mx-4 px-4" ref={scrollRef}>
        <div className="flex gap-4 pb-4">
          {predefinedMeals.map((meal) => (
            <div key={meal.id} className="flex-shrink-0 w-72">
              <MealCard meal={meal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MealCard({ meal }: { meal: any }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm">
            <Plus className="w-5 h-5 text-sky-600" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-sky-900 mb-3">{meal.name}</h3>
        
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-sky-100">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-50 to-red-50">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-orange-700">{meal.calories} kcal</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs text-sky-600 mb-1">Protein</p>
            <p className="text-sky-900">{meal.protein}g</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-sky-600 mb-1">Carbs</p>
            <p className="text-sky-900">{meal.carbs}g</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-sky-600 mb-1">Fats</p>
            <p className="text-sky-900">{meal.fats}g</p>
          </div>
        </div>
      </div>
    </div>
  );
}
