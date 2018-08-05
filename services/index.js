import moment from 'moment'

export const getCoins = async (page = 0) => {
  const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/?structure=array&convert=BTC&limit=20&start=${(page * 20) + 1}`)
  return response.json()
}

export const getLast7Days = async (symbol) => {
  const result = {
    labels: [],
    values: []
  }

  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, 'days')
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${symbol}&tsyms=USD&ts=${date.unix()}`)
    const data = await response.json()
    result.labels.push(date.format('D. MMM'))
    result.values.push(data[symbol].USD)
  }  

  return result

}