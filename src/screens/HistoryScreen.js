//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../Theme';

class HistoryScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <View style={Theme.centerCenter}>
        <Text>HistoryScreen</Text>
      </View>
    );
  }

  // --------------------------------------------------- handlers

}

// Component specific style
const styles = StyleSheet.create({
});

export default HistoryScreen;
