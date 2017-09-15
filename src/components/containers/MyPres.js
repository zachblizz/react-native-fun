import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
const util = require('util')

class MyPres extends Component {
    static navigationOptions = {
        title: "Say Hello",
    }

    render() {
        let { params } = this.props.navigation.state

        return (
            <View style={ styles.container }>
                <Text style={ styles.title }>Hello, { params.name }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
    },
})

export default MyPres