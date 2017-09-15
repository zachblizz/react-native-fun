import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
const util = require('util')

class MyPres extends Component {
    static navigationOptions = {
        title: "Say Hello",
    }

    render() {
        let { params } = this.props.navigation.state
        console.log(params)
        return (
            <View style={ styles.container }>
            {
                params.users.map((obj, i) => {
                    return <Text key={ i } style={ styles.title }>
                                { obj.id } { obj.name }
                           </Text>
                })
            }
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