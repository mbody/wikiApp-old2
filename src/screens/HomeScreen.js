//import liraries
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {Colors, Theme} from '../Theme';
import {
  ActivityIndicator,
  Searchbar,
  Card,
  IconButton,
} from 'react-native-paper';
import {wikiService} from '../services/WikiService';

import {connect} from 'react-redux';
import {addFavoriteAction, removeFavoriteAction} from '../redux/favorites';
import {searchAction, searchClearAction} from '../redux/wikipedia';

class HomeScreen extends Component {
  state = {
    searchQuery: 'nelson mandela',
    searchPending: false,
  };

  constructor(props) {
    super(props);
  }

  // --------------------------------------------------- render methods
  render() {
    const {searchQuery} = this.state;
    const {favoritePageIds, searchPending, searchResult, error} = this.props;
    const resultWithFavorites =
      searchResult &&
      searchResult.map((page) => {
        page.isFavorite = favoritePageIds.indexOf(page.pageid) >= 0;
        return page;
      });

    return (
      <View style={styles.container}>
        <Searchbar
          placeholder="Rechercher"
          onChangeText={this.onChangeText}
          onIconPress={this.onSearch}
          value={searchQuery}
        />

        <View style={styles.searchResultsContainer}>
          {error && <Text style={styles.errorMsg}>{error}</Text>}
          {searchResult &&
            (searchResult.length === 0 ? (
              <Text>Aucun résultat trouvé :-( </Text>
            ) : (
              <FlatList
                data={resultWithFavorites}
                renderItem={this.renderPageCard}
                keyExtractor={this._keyExtractor}
                onEndReached={this.onLoadMore}
              />
            ))}
          {searchPending && <ActivityIndicator />}
        </View>
      </View>
    );
  }

  // --------------------------------------------------- handlers

  renderPageCard = ({item, index}) => {
    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.title}
          subtitle={item.description}
          left={(props) => (
            <Image
              {...props}
              source={{uri: item.thumbnail && item.thumbnail.source}}
              style={{height: 45, width: 45, backgroundColor: '#ddd'}}
            />
          )}
          right={(props) => (
            <IconButton
              icon={item.isFavorite ? 'heart' : 'heart-outline'}
              color={Colors.gray}
              size={30}
              onPress={() => this.onToggleFavorite(item)}
            />
          )}
        />
      </Card>
    );
  };

  onChangeText = (query) => {
    if (!query || query.length === 0) {
      this.props.searchClearAction();
    }
    this.setState({searchQuery: query});
  };

  onSearch = () => {
    const {searchQuery} = this.state;
    if (!searchQuery || searchQuery.trim().length === 0) {
      this.props.searchClearAction();
      return;
    }

    this.props.searchAction(searchQuery.trim());
  };

  onLoadMore = async () => {
    let {searchQuery} = this.state;
    this.props.searchAction(searchQuery.trim(), this.props.searchResult.length);
  };

  onToggleFavorite = (page) => {
    if (page.isFavorite) {
      this.props.removeFavoriteAction(page);
    } else {
      this.props.addFavoriteAction(page);
    }
  };

  // --------------------------------------------------- privates

  /**
   * to make each component unique
   */
  _keyExtractor = (item, index) => item.pageid.toString() + '_' + index;
}

// Component specific style

const styles = StyleSheet.create({
  container: {
    ...Theme.centerCenter,
    padding: 10,
    paddingTop: 50,
  },
  searchResultsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  errorMsg: {
    color: Colors.error,
  },
  card: {
    margin: 5,
    backgroundColor: '#f9f9f9',
  },
});

// here we're mapping state to props
const mapStateToProps = (state) => {
  const {favorites, wikipedia} = state;
  return {
    favoritePageIds: favorites.pages.map((page) => page.pageid),
    searchPending: wikipedia.searchPending,
    searchResult: wikipedia.searchResult,
    error:
      wikipedia.error &&
      `Une erreur s'est produite lors de la recherche.\nMerci de bien vouloir réessayer ultérieurement !`,
  };
};

// here we're mapping actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteAction: (p) => dispatch(addFavoriteAction(p)),
    removeFavoriteAction: (p) => dispatch(removeFavoriteAction(p)),
    searchAction: (keyword, offset = 0) =>
      dispatch(searchAction(keyword, offset)),
    searchClearAction: () => dispatch(searchClearAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
