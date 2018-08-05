import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Cell = ({title, value, percentual}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    { !percentual ?
        <Text>{value}</Text>
      :
        <Text style={{color: value < 0 ? 'red' : 'green'}}>{value > 0 ? '+' : ''}{value.toFixed(1)}%</Text>
    }
  </View>  
)

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: {
    color: 'gray'
  }
})

export default Cell