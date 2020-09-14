import {StyleSheet} from 'react-native';
import {yellow} from 'color-name';

export const Colors = {
  primary: '#0073de',
  accent: '#ffda1e',
  white: '#fff',
  gray: '#666',
  background: '#fff',
  error: '#fc0000',
  red: '#ff0000',
};

export const Theme = StyleSheet.create({
  fullSize: {
    flex: 1,
    alignSelf: 'stretch',
  },
  centerCenter: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
