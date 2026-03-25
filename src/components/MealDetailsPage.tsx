import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Coffee, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { AddMealModal } from './AddMealModal';
import { NutritionCharts } from './NutritionCharts';
import { notifications } from '../utils/notifications';

export function MealDetailsPage() {
  const { mealType } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meals, setMeals] = useState([
    { id: 1, name: 'Scrambled Eggs', quantity: '2 eggs', calories: 180, protein: 12, carbs: 2, fats: 12 },
    { id: 2, name: 'Whole Wheat Toast', quantity: '2 slices', calories: 160, protein: 8, carbs: 28, fats: 2 },
    { id: 3, name: 'Orange Juice', quantity: '250ml', calories: 80, protein: 1, carbs: 18, fats: 0 },
  ]);

  const getMealInfo = (type: string | undefined) => {
    switch (type) {
      case 'breakfast':
        return { name: 'Breakfast', icon: Coffee, color: 'from-amber-400 to-orange-400', target: 500 };
      case 'lunch':
        return { name: 'Lunch', icon: Sun, color: 'from-sky-400 to-blue-400', target: 700 };
      case 'dinner':
        return { name: 'Dinner', icon: Moon, color: 'from-purple-400 to-pink-400', target: 600 };
      default:
        return { name: 'Meal', icon: Coffee, color: 'from-sky-400 to-mint-400', target: 600 };
    }
  };

  const mealInfo = getMealInfo(mealType);
  const Icon = mealInfo.icon;

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

  const handleAddMeal = (newMeal: any) => {
    const updatedMeals = [...meals, { ...newMeal, id: meals.length + 1 }];
    setMeals(updatedMeals);
    setIsModalOpen(false);
    
    // Show notification
    notifications.mealAdded(newMeal.name, newMeal.calories);
    
    // Check if calorie goal is reached
    const totalCals = updatedMeals.reduce((sum, meal) => sum + meal.calories, 0);
    if (totalCals >= 2000 && totalCalories < 2000) {
      notifications.calorieGoalReached();
    } else if (totalCals > 2000) {
      notifications.calorieGoalExceeded();
    }
    
    // Update localStorage
    localStorage.setItem('dailyCalories', totalCals.toString());
  };

  const handleDeleteMeal = (mealId: number) => {
    const mealToDelete = meals.find(m => m.id === mealId);
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);
    
    if (mealToDelete) {
      notifications.mealDeleted(mealToDelete.name);
      
      // Update localStorage
      const totalCals = updatedMeals.reduce((sum, meal) => sum + meal.calories, 0);
      localStorage.setItem('dailyCalories', totalCals.toString());
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Meals</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${mealInfo.color} flex items-center justify-center shadow-sm`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-sky-900 mb-1">{mealInfo.name} Details</h1>
              <p className="text-sky-600">
                {totalCalories} / {mealInfo.target} kcal
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-mint-500 text-white hover:from-sky-600 hover:to-mint-600 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add Meal</span>
          </button>
        </div>

        {/* Progress Summary */}
        <div className="mt-6 bg-gradient-to-r from-sky-100 to-mint-100 rounded-3xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-sky-700 mb-2">Calories</p>
              <p className="text-2xl text-sky-900">{totalCalories}</p>
              <p className="text-xs text-sky-600">kcal</p>
            </div>
            <div>
              <p className="text-xs text-sky-700 mb-2">Protein</p>
              <p className="text-2xl text-sky-900">{totalProtein}</p>
              <p className="text-xs text-sky-600">grams</p>
            </div>
            <div>
              <p className="text-xs text-sky-700 mb-2">Carbs</p>
              <p className="text-2xl text-sky-900">{totalCarbs}</p>
              <p className="text-xs text-sky-600">grams</p>
            </div>
            <div>
              <p className="text-xs text-sky-700 mb-2">Fats</p>
              <p className="text-2xl text-sky-900">{totalFats}</p>
              <p className="text-xs text-sky-600">grams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Meals List + Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meals List */}
        <div>
          <h2 className="text-sky-900 mb-4">Eaten Meals</h2>
          <div className="space-y-3">
            {meals.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <p className="text-sky-600">No meals added yet. Click "Add Meal" to start tracking.</p>
              </div>
            ) : (
              meals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-sky-900 mb-1">{meal.name}</h3>
                      <p className="text-sm text-sky-600">{meal.quantity}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50">
                      <p className="text-xs text-orange-700 mb-1">Calories</p>
                      <p className="text-orange-900">{meal.calories}</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50">
                      <p className="text-xs text-sky-700 mb-1">Protein</p>
                      <p className="text-sky-900">{meal.protein}g</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                      <p className="text-xs text-green-700 mb-1">Carbs</p>
                      <p className="text-green-900">{meal.carbs}g</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
                      <p className="text-xs text-purple-700 mb-1">Fats</p>
                      <p className="text-purple-900">{meal.fats}g</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Nutrition Charts */}
        <NutritionCharts
          totalCalories={totalCalories}
          targetCalories={mealInfo.target}
          protein={totalProtein}
          carbs={totalCarbs}
          fats={totalFats}
        />
      </div>

      {/* Add Meal Modal */}
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMeal={handleAddMeal}
      />
    </div>
  );
}