This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


App Description ::

# Multi-Timer React Native App

## Overview
This React Native app allows users to create, manage, and interact with multiple customizable timers. Users can assign categories, visualize progress, and perform bulk actions while maintaining a clean UI/UX. Timer data is persisted locally using AsyncStorage.

## Features
### Core Features
- **Add Timer**: Create timers with name, duration, and category.
- **Timer List with Grouping**: Timers are displayed in expandable/collapsible categories.
- **Timer Management**: Start, pause, reset timers individually.
- **Progress Visualization**: Show progress bar for each timer.
- **Bulk Actions**: Start, pause, reset all timers within a category.
- **User Feedback**: Show a modal when a timer completes.

### Enhanced Functionality
- **Timer History**: Maintain a log of completed timers.
- **Customizable Alerts**: On completion of timer alerts with notifications.

### Bonus Features (Optional)
- **Export Timer Data**: Export history as a JSON file.
- **Custom Themes**: Light and dark mode support.

## Technical Details
- **State Management**: `useState` for managing timers and categories.
- **Navigation**: React Navigation with two screens:
  - Home Screen: Timer list and grouping.
  - History Screen: Log of completed timers.
- **Persistence**: Uses AsyncStorage for storing timers and logs.
- **Styling**: Styled using `StyleSheet` for a responsive layout.
- **Timers**: Uses `setInterval` for countdown logic.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/multi-timer-app.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
3. Start the app:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## Assumptions Made
- The app supports only React Native 0.7x+.
- AsyncStorage is used for persistence, but cloud syncing is not implemented.

## Future Improvements
- Add animations for smoother UI transitions.
- Implement push notifications for alerts.
- Sync timers across devices using Firebase or a backend service.
