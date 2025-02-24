import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RootStackParamList } from './src/components/Routes';
import TimerScreen from './src/screens/TimerScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const App = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (

    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#232B5D" />

      <Stack.Navigator initialRouteName="TimerScreen">

        <Stack.Screen name="TimerScreen" component={TimerScreen} 
        options={{ title: 'Daily Goals',headerStyle: {
              backgroundColor: '#232B5D',
            },headerTitleStyle: {
              color: 'white',
            },headerTintColor: '#ffffff',  
            }}
            />

          <Stack.Screen name="HistoryScreen" component={HistoryScreen} 
          options={{ title: 'History',headerStyle: {
                backgroundColor: '#232B5D', 
              },headerTitleStyle: {
                color: 'white',
              },headerTintColor: '#ffffff',  
              }}
             />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;