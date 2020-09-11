//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../Theme';

class FavoriteScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <View style={Theme.centerCenter}>
        <Text>FavoriteScreen</Text>
      </View>
    );
  }

  // --------------------------------------------------- handlers

}

// Component specific style
const styles = StyleSheet.create({
});

export default FavoriteScreen;
