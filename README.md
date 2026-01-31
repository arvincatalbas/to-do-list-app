# TodoFlow - Modern Task Management App

A beautifully designed, feature-rich todo application built with React Native and Expo. TodoFlow helps you manage your tasks efficiently with a clean, modern interface and powerful features.

## ✨ Features

### 📝 Task Management
- **Create, Edit & Delete Tasks** - Simple and intuitive task management
- **Mark as Complete** - Track your progress with visual feedback
- **Archive Tasks** - Keep your workspace clean by archiving completed tasks
- **Task Statistics** - Visual overview of your productivity

### 🎨 Modern UI/UX
- **Dark & Light Themes** - Seamless theme switching with system preference support
- **Beautiful Animations** - Smooth transitions and micro-interactions
- **Responsive Design** - Optimized for all screen sizes
- **Modern Card-Based Layout** - Clean, organized interface

### 🔐 Authentication
- **Secure Sign Up/Sign In** - User authentication with email and password
- **Profile Management** - Edit your profile information and avatar
- **Persistent Sessions** - Stay logged in across app restarts

### 📱 Cross-Platform
- **iOS & Android Support** - Native performance on both platforms
- **Expo Router** - File-based routing for seamless navigation
- **Safe Area Handling** - Proper layout for devices with notches and rounded corners

## 🛠 Tech Stack

- **Framework**: React Native with Expo (SDK 50+)
- **Routing**: Expo Router (File-based navigation)
- **Language**: TypeScript
- **State Management**: Zustand
- **Storage**: AsyncStorage for local persistence
- **Styling**: React Native StyleSheet with theme support
- **Icons**: Expo Vector Icons (FontAwesome)
- **Authentication**: Custom Auth Context

## 📁 Project Structure

```
my-todo-app/
├── app/                  # Expo Router Entry
│   ├── (tabs)/           # Route Group for Tab navigation
│   │   ├── _layout.tsx   # Bottom Tabs Layout
│   │   ├── index.tsx     # Main Todo List (Active Tasks)
│   │   ├── settings.tsx  # Completed Tasks screen
│   │   ├── archive.tsx   # Archived Tasks screen
│   │   └── profile.tsx   # User Profile screen
│   ├── _layout.tsx       # Root Layout (Providers, Stack)
│   ├── sign-in.tsx       # Sign In screen
│   ├── sign-up.tsx       # Sign Up screen
│   ├── +not-found.tsx    # 404 Error page
│   └── +html.tsx         # HTML template
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── TodoItem.tsx  # Task item component
│   │   ├── ThemeToggle.tsx # Theme switcher
│   │   ├── AuthGuard.tsx # Authentication guard
│   │   └── ExternalLink.tsx # External link component
│   ├── contexts/         # React Context providers
│   │   ├── ThemeContext.tsx # Theme management
│   │   └── AuthContext.tsx # Authentication context
│   ├── hooks/            # Custom logic hooks
│   │   └── useClientOnlyValue.ts
│   ├── store/            # State management
│   │   └── useTodoStore.ts # Todo state (Zustand)
│   └── constants/        # App constants and configs
├── assets/               # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # Images and icons
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Physical iOS/Android device or emulator/simulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or run on simulator:
     ```bash
     npm run ios     # For iOS
     npm run android # For Android
     ```

## 📱 App Screens

### 🏠 Home Screen
- View all active tasks
- Add new tasks with the input field
- Quick access to profile via avatar button
- Beautiful card-based task layout

### ✅ Completed Tasks
- View all completed tasks
- Clear all completed tasks at once
- Archive individual tasks

### 📦 Archive
- View archived tasks
- Restore tasks to active/completed
- Delete tasks permanently

### 👤 Profile
- User information and statistics
- Task overview (Active, Completed, Archived)
- Theme toggle (Dark/Light mode)
- Settings and preferences

### 🔐 Authentication
- Sign Up with email, password, and name
- Sign In with existing credentials
- Password visibility toggle
- Secure session management

## 🎨 Theme System

The app features a comprehensive theming system:

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes for night usage
- **System Preference**: Automatically follows device settings
- **Smooth Transitions**: Animated theme switching

## 📊 State Management

Using Zustand for efficient state management:

- **Todo Store**: Task CRUD operations, filtering, statistics
- **Auth Store**: User authentication, session management
- **Theme Store**: Theme preferences and system integration

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm run build      # Build for production
```

### Code Style

- **TypeScript**: Full type safety throughout the app
- **Functional Components**: Modern React patterns with hooks
- **ESLint**: Code linting for consistency
- **Prettier**: Code formatting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - For the amazing React Native framework
- **React Native Community** - For the excellent libraries and tools
- **Zustand** - For the simple yet powerful state management
- **FontAwesome** - For the beautiful icon set

## 📞 Support

If you have any questions or need support, please:

- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**TodoFlow** - Making task management beautiful and efficient. 🚀
