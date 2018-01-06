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
            refreshing: false,
        }
    }

    componentDidMount() {
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
                refreshing: false
			})
		}).catch(err => {
			console.log(err)
		})
    }

    render() {
        let { info, refreshing } = this.state

        return (
            <View style={ styles.container }>
                <ScrollView style={ styles.postsContainer }
                    refreshControl={
                        <RefreshControl
                            refreshing={ refreshing }
                            onRefresh={ this._onRefresh.bind(this) }
                        />
                    }>
                    <FlatList 
                        data={ info }
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
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 20
    }
})

export default CryptoTracker