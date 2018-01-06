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
                </View>
                <View style={{ flexDirection: "row" }}>
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
        // flexDirection: 'row', 
        // alignItems: 'center',
        backgroundColor: config.constants.ACCNT_COLOR_DARK
    },
    username: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 4
    },
    joined: {
        fontSize: 10,
        color: '#fff'
    }
})

export default CryptoItem