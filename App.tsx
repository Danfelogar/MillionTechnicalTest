import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import Config from 'react-native-config';

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          marginTop: 120,
          color: '#900',
          textAlign: 'center',
        }}>
        {Config.BASE_URL} ---- {Config.BASE_URL ? 'true' : 'false'}
      </Text>
      <FontAwesome6 iconStyle="solid" name="comments" size={30} color="#900" />
    </View>
  );
}

export default App;
