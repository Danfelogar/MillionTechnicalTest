import {createStackNavigator} from '@react-navigation/stack';
import {RootStackMainParams} from '../../shared';
import {DetailsScreen, HomeScreen} from '../../features';
import {View} from 'react-native';

const Stack = createStackNavigator<RootStackMainParams>();

export const NavigationMain = () => {
  return (
    <View testID="main-navigator-wrapper" style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </View>
  );
};
