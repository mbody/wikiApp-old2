//import liraries
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  LayoutAnimation,
} from 'react-native';
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
import * as Animatable from 'react-native-animatable';
import FavoriteButton from '../components/FavoriteButton';

class HomeScreen extends Component {
  state = {
    searchQuery: 'nelson mandela',
    searchPending: false,
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState): void {
    const {searchResult, favoritePageIds} = nextProps;
    if (
      searchResult != prevState.searchResult ||
      favoritePageIds != prevState.favoritePageIds
    ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const resultWithFavorites =
        searchResult &&
        searchResult.map((page) => {
          page.isFavorite = favoritePageIds.indexOf(page.pageid) >= 0;
          return page;
        });
      return {searchResult, resultWithFavorites, favoritePageIds};
    }
    return null;
  }

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    if (this.state.searchResult && this.state.searchResult.length === 0) {
      this.shakeSearchBar();
    }
  }

  // --------------------------------------------------- render methods
  render() {
    const {searchQuery, resultWithFavorites} = this.state;
    const {searchPending, error} = this.props;

    return (
      <View style={styles.container}>
        <Animatable.View
          ref={(me) => (this.searchBar = me)}
          style={{alignSelf: 'stretch'}}>
          <Searchbar
            placeholder="Rechercher"
            onChangeText={this.onChangeText}
            onIconPress={this.onSearch}
            value={searchQuery}
          />
        </Animatable.View>

        <View style={styles.searchResultsContainer}>
          {error && <Text style={styles.errorMsg}>{error}</Text>}
          {resultWithFavorites &&
            (resultWithFavorites.length === 0 ? (
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
            <FavoriteButton
              isFavorite={item.isFavorite}
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
      this.shakeSearchBar();
      return;
    }

    this.props.searchAction(searchQuery.trim());
  };

  onLoadMore = async () => {
    let {searchQuery} = this.state;
    if (this.props.searchResult) {
      this.props.searchAction(
        searchQuery.trim(),
        this.props.searchResult.length,
      );
    }
  };

  onToggleFavorite = (page) => {
    if (page.isFavorite) {
      this.props.removeFavoriteAction(page);
    } else {
      this.props.addFavoriteAction(page);
    }
  };

  // --------------------------------------------------- privates
  shakeSearchBar() {
    this.searchBar.shake(1000);
  }

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
