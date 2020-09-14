import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors} from '../Theme';
import FavoriteButton from './FavoriteButton';

type Props = {
  item: any,
  onToggleFavorite: Function,
};

export default class PageCard extends React.Component<Props> {
  render() {
    let {item, onToggleFavorite} = this.props;

    return (
      item && (
        <View style={styles.card}>
          <Image
            source={{uri: item.thumbnail && item.thumbnail.source}}
            style={styles.cardThumb}
          />
          <View style={styles.cardLabels}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardSubtitle} numberOfLines={1}>
              {item.description}
            </Text>
          </View>
          <FavoriteButton
            isFavorite={item.isFavorite}
            onPress={onToggleFavorite}
            title={item.title}
          />
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  cardThumb: {
    height: 45,
    width: 45,
    backgroundColor: '#ddd',
  },
  cardLabels: {
    flex: 1,
    paddingHorizontal: 8,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardSubtitle: {
    color: Colors.gray,
  },
});
