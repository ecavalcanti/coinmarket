import React, { Component } from 'react'
import { FlatList, View, RefreshControl } from 'react-native'
import { ListItem } from '../components'
import { getCoins } from '../services'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Coins'
  }

  state = {
    coins: [],
    isLoading: false,
    page: 0,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = async () => {
    const { page, coins } = this.state
    this.setState({isLoading: true})
    const response = await getCoins(page)
    this.setState({coins: page === 0 ? response.data : [...coins, ...response.data], isLoading: false})
  }

  onRefresh = () => {
    this.setState({page: 0}, () => this.loadData())
  }

  onLoadMoreData = () => {
    this.setState({page: this.state.page + 1}, () => this.loadData())
  }

  onItemPress = (coin) => {
    this.props.navigation.navigate('Coin', {coin})
  }

  renderItem = ({item}) => (
    <ListItem item={item} onPress={this.onItemPress} />
  )

  render() {
    return (
      <FlatList style={{flex:1}}
        data={this.state.coins}
        renderItem={this.renderItem}
        refreshing={this.state.isLoading}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={this.onRefresh}
          />
        }
        removeClippedSubviews
        onEndReached={this.onLoadMoreData}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={()=><View style={{height: 2, backgroundColor:'#fff'}} />}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  }
}