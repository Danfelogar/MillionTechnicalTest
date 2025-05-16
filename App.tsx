import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationMain} from './src/app/navigation/MainNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <NavigationMain />
    </NavigationContainer>
  );
}

export default App;
