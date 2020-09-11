import {StyleSheet} from 'react-native';
import {yellow} from 'color-name';

export const Colors = {
  primary: '#0073de',
  accent: '#ffda1e',
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

