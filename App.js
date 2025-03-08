import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryNavigator from './screens/GalleryScreen';
import ImageViewScreen from './screens/ImageViewScreen';
import Welcome from './screens/Welcome';
import VideoViewScreen from './screens/VideoViewScreen';
import TopBar from './screens/TopBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Gallery" component={GalleryNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ImageView" component={ImageViewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="VideoView" component={VideoViewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="TopBar" component={TopBar} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
