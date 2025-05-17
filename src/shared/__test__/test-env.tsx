import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import {FC, ReactElement, ReactNode} from 'react';

type Options = Parameters<typeof render>[1];

//custom wrapper to mapping all global providers for example redux, react-navigation, etc
const AllProviders: FC<{children: ReactNode}> = ({children}) => (
  <NavigationContainer>{children}</NavigationContainer>
);

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, {wrapper: AllProviders, ...options});

//calling all the thins from testing-library/react-native when use customRender
export * from '@testing-library/react-native';

export {customRender as render};
