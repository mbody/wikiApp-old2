//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Theme} from '../Theme';
import HelloNative from 'react-native-hello-native';
import {Button} from 'react-native-paper';

class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <View style={Theme.centerCenter}>
        <Button mode="" onPress={this.onPress}>
          Say Hello !
        </Button>
      </View>
    );
  }

  // --------------------------------------------------- handlers
  onPress = async () => {
    const msg = await HelloNative.sayHello('Me');
    Alert.alert('Message from Hello-Native', '***' + msg + '***');
  };
}

// Component specific style
const styles = StyleSheet.create({});

export default HistoryScreen;
