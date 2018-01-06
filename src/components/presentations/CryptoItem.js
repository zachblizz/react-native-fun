import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import config from '../../config'
import dateformat from 'dateformat'
import DisplayInfo from './DisplayInfo'
import moment from 'moment'

class CryptoItem extends Component {
    render() {
        let { item } = this.props

        return (
            <View style={ styles.userContainer }>
                <View>
                    <Text style={ styles.username }>
                        { item.name } | { item.symbol }
                    </Text>
                    <Text style={{ color: "#aaa" }}>Curr Price: ${ item.price_usd }</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <DisplayInfo label="Last 1 Hr"
                        value={ item.percent_change_1h } />
                    <DisplayInfo label="Last 24 Hrs"
                        value={ item.percent_change_24h } />
                    <DisplayInfo label="Last 7 Days"
                        value={ item.percent_change_7d } />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userContainer: {
        padding: 20,
        backgroundColor: config.constants.ACCNT_COLOR_DARK
    },
    username: {
        fontSize: 25,
        color: "#fff",
        flexDirection: 'row',
        marginBottom: 4
    },
    joined: {
        fontSize: 10,
        color: '#fff'
    }
})

export default CryptoItem