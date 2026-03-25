# Balance Life - Complete Health Wellness App

## 🌿 Overview
A comprehensive wellness application with AI-powered features for tracking meals, water intake, and sports activities. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features Implemented

### 🔐 Authentication System
- **Login Page** - Email/password authentication with social login options (Google, Apple)
- **Register Page** - User registration with validation
- **Protected Routes** - Automatic redirection based on auth status

### 📊 Main Dashboard
- **Balance Rings** - Visual progress tracking for:
  - Calories (Meals Module)
  - Water Intake
  - Activity Minutes (Sports Module)
- **AI Health Assistant** - Smart recommendations based on user data
- **Quick Access Cards** - Direct navigation to all modules
- **Today's Timeline** - Chronological view of daily activities

### 🍽️ Meals Module
- Meal categories with calorie/macro tracking
- Nearby restaurants
- Detailed meal pages with nutrition charts
- Add Meal modal
- Camera food recognition with Gemini Vision API

### 💧 Water Tracking Module
- Dynamic daily water tracking
- Gemini API integration for hydration insights
- Circular progress rings
- Timeline views
- Weekly charts

### 🏃 Sports Module (Complete Redesign)

#### Main Dashboard Components:
1. **AI Smart Coach Panel** - Personalized workout recommendations
2. **Workout Timer Card** - Track active time with calorie counter
3. **Services Grid** - 8 service cards with tooltips
4. **Floating Chatbot** - AI coach with quick questions
5. **Global Notifications** - Smart tips across all modules

#### Service Pages:
- **Workouts Page** - Categorized workout plans (Cardio, Strength, Flexibility, Home)
- **Steps Counter** - Daily step tracking with weekly charts
- **Activity Timer** - Dedicated timer with activity type selection
- **Nearby Gyms** - Gym locations with ratings and amenities
- **Workout Videos** - Video library filtered by fitness goals
- **Breathing Exercises** - Interactive breathing techniques (Box, 4-7-8, Deep)
- **Caffeine Tips** - Education on caffeine and performance
- **Goal Selection** - 8 different fitness goals to choose from

### 🔔 Global Notification System
AI-powered notifications that track:
- Water intake reminders
- Calorie tracking alerts
- Workout reminders
- Time-based wellness tips

Appears across all modules with smart timing logic.

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0ea5e9)
- **Secondary**: Mint (#5eead4)
- **Accent**: White with soft shadows
- **Module Colors**:
  - Meals: Orange
  - Water: Sky Blue
  - Sports: Purple

### Components
- White cards with `rounded-3xl` corners
- Soft shadows (`shadow-sm`, `shadow-md`)
- Consistent spacing (Tailwind spacing scale)
- Responsive design:
  - Desktop/Tablet: Sidebar navigation
  - Mobile: Bottom navigation bar

### Typography
- Clean, readable fonts
- Consistent heading hierarchy
- Tooltips on all interactive elements

## 📱 Responsive Design

### Desktop/Tablet
- Fixed sidebar navigation on left
- Centered content area
- Multi-column layouts

### Mobile
- Bottom navigation bar
- Single-column stacked layouts
- Touch-optimized buttons and cards

## 🧠 AI Integration

### Features:
1. **Smart Coach** - Goal-based workout recommendations
2. **Health Assistant** - Daily summary with actionable insights
3. **Notification System** - Context-aware tips and reminders
4. **Chatbot** - Quick question interface for fitness guidance

### Data Sources:
- User goals and preferences (localStorage)
- Activity tracking data
- Time-based logic
- Module cross-referencing

## 🗂️ Project Structure

```
/components
  ├── Authentication
  │   ├── LoginPage.tsx
  │   └── RegisterPage.tsx
  ├── Dashboard
  │   └── MainDashboard.tsx
  ├── Navigation
  │   ├── Sidebar.tsx
  │   └── BottomNav.tsx
  ├── Meals Module
  │   ├── MealsOverview.tsx
  │   └── MealDetailsPage.tsx
  ├── Water Module
  │   └── WaterTrackingPage.tsx
  ├── Sports Module
  │   ├── SportsOverview.tsx (Hub Dashboard)
  │   ├── AISmartCoachPanel.tsx
  │   ├── WorkoutTimerCard.tsx
  │   ├── ServicesGrid.tsx
  │   ├── ChatbotUI.tsx
  │   ├── WorkoutsPage.tsx
  │   ├── StepsCounterPage.tsx
  │   ├── ActivityTimerPage.tsx
  │   ├── GymsPage.tsx
  │   ├── VideosPage.tsx
  │   ├── BreathingPage.tsx
  │   ├── CaffeinePage.tsx
  │   └── GoalSelectionPage.tsx
  └── Global
      ├── GlobalNotificationSystem.tsx
      └── ToastNotification.tsx
```

## 🚀 Key Technical Features

- **React Router** - Multi-page navigation
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling
- **LocalStorage** - State persistence
- **Responsive Design** - Mobile-first approach
- **Component Modularity** - Reusable, maintainable code

## 📋 User Flow

1. User lands on login page
2. After authentication → Main Dashboard
3. Dashboard shows balance rings for all modules
4. AI assistant provides daily recommendations
5. Quick access to any module (Meals, Water, Sports)
6. Each module has comprehensive sub-features
7. Global notifications guide user throughout the day

## 🎯 Design Principles

1. **Simple & Clean** - No complex layouts
2. **User-Friendly** - For general users, not just athletes
3. **Consistent** - Same design patterns throughout
4. **Accessible** - Tooltips and clear labels everywhere
5. **Responsive** - Works on all screen sizes
6. **AI-Powered** - Smart recommendations, not just data display

## 🔄 Future Enhancements

- Backend integration with Supabase
- Real-time data synchronization
- Social features (friends, challenges)
- Advanced analytics and insights
- Wearable device integration
- Meal planning and recipes
- Workout video streaming

---

**Built with ❤️ for healthy living**
