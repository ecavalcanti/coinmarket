import React, { PureComponent } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import numbro from 'numbro'

export default class ListItem extends PureComponent {

  renderChange = (value) => (
    <Text style={{
        color: value.toFixed(1) < 0 ? 'red' : 'green',
        marginHorizontal: 10,
        width: 60,
        textAlign: 'right',
      }}> {value.toFixed(1) > 0 ? '+' : ''}{value.toFixed(1)}%</Text>
  )
  
  render() {
    const { item, onPress} = this.props
    return (
      <TouchableOpacity style={styles.row} onPress={() => onPress(item) }>
        <Text style={styles.rankText}>{item.rank}</Text>
        <Image
          style={styles.coinImage}
          source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/32x32/${item.id}.png` }}
        />
        <View>
          <Text>{item.name}</Text>
          <Text>({item.symbol})</Text>
        </View>
        <Text style={styles.priceText}>${numbro(item.quotes.USD.price).format({thousandSeparated: true, mantissa: 2})}</Text>
        {this.renderChange(item.quotes.USD.percent_change_24h)}
      </TouchableOpacity>
    )    
  }
} 


const styles = StyleSheet.create({
  row: { 
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  rankText: { 
    width: 30, 
    textAlign: 'right'
  },
  coinImage: { 
    height: 32, 
    width: 32, 
    marginHorizontal:10 
  },
  priceText: {
    flex: 1, 
    textAlign: 'right', 
    paddingRight: 10
  }
})