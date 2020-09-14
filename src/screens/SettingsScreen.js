//import liraries
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import I18n from '../i18n/i18n';
import {Theme} from '../Theme';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // --------------------------------------------------- render methods
  render() {
    return (
      <View style={Theme.centerCenter}>
        <Title>{I18n.t('settings.selectLanguage')}</Title>
        <Button onPress={this.onSwitchTo('fr')}>Français</Button>
        <Button onPress={this.onSwitchTo('en')}>English</Button>
      </View>
    );
  }

  // --------------------------------------------------- handlers
  onSwitchTo = (newLocale) => () => {
    I18n.locale = newLocale;
    this.forceUpdate();
  };
}

// Component specific style
const styles = StyleSheet.create({});

export default SettingsScreen;
