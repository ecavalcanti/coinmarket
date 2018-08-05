import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { HomeScreen, CoinScreen } from './screens/'


const App = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Coin: {
    screen: CoinScreen
  }
})

export default App