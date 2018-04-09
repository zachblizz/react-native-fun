import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, 
        Image, TextInput, ScrollView, RefreshControl } from 'react-native'
import CryptoItem from '../presentations/CryptoItem'
import config from '../../config'

class CryptoTracker extends Component {
    static navigationOptions = {
        title: "Crypto Tracker",
    }

    constructor(props) {
        super(props)
        this.state = {
            info: [],
            // filtered: [],
            refreshing: false,
            fiterString: ''
        }
    }

    componentDidMount() {
        // another URL: https://api.coinbase.com/v2/prices/USD/spot?
        // historic URL: https://api.coinbase.com/v2/prices/BTC-USD/historic?period=month
        // which gives more up-to-date information, but don't get as much information...
        fetch("https://api.coinmarketcap.com/v1/ticker", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(info => info.json())
        .then(info => {
			this.setState({
                info,
                filtered: info
			})
		}).catch(err => {
			console.log(err)
		})
    }
    
    _renderCrypto(item) {
        return (
            <View style={ styles.cryptoLayout }>
                <CryptoItem item={ item } />
            </View>
        )
    }

    _onRefresh() {
        let cryptos = Object.assign([], this.state.info)
        this.setState({
            refreshing: true
        })

        fetch("https://api.coinmarketcap.com/v1/ticker", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(info => info.json())
        .then(info => {
            cryptos = info
			this.setState({
                info: cryptos,
                filtered: cryptos,
                refreshing: false
			})
		}).catch(err => {
			console.log(err)
		})
    }

    filterCurrancy(curr) {
        let filtered = Object.assign([], this.state.info)
        filtered = filtered.filter(item => {
            return item.name.toLowerCase().includes(curr.toLowerCase())
                    || item.symbol.toLowerCase().includes(curr.toLowerCase()) 
        })

        this.setState({
            filtered
        })
    }

    render() {
        let { info, refreshing, filtered, filterString } = this.state

        return (
            <View style={ styles.container }>
                <TextInput style={ styles.search }
                    onChangeText={ filterString => this.filterCurrancy(filterString) }
                    placeholder="search currancies"
                    placeholderTextColor="#48535e"
                />
                <ScrollView style={ styles.postsContainer }
                    refreshControl={
                        <RefreshControl
                            refreshing={ refreshing }
                            onRefresh={ this._onRefresh.bind(this) }
                        />
                    }>
                    <FlatList 
                        data={ filtered }
                        keyExtractor={ (crypto, i) => i }
                        renderItem={({ item }) => this._renderCrypto(item)}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        width: 100+'%',
        backgroundColor: config.constants.MAIN_COLOR
    },
    cryptoLayout: {
        flexDirection: "column",
        marginBottom: 5,
    },
    search: {
        backgroundColor: config.constants.ACCNT_COLOR,
        color: "#fff",
        padding: 20,
        marginBottom: 20
    }
})

export default CryptoTracker