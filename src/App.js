//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text style={styles.sectionTitle}>Hello</Text>
          <Icon name="rocket" size={80} color="#900" />
        </SafeAreaView>
      </>
    );
  }

  // --------------------------------------------------- handlers
}

// Component specific style
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default App;
