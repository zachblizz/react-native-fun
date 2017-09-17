import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
const util = require('util')

class Friends extends Component {
    static navigationOptions = {
        title: "Friends",
    }

    constructor(props) {
        super(props)
        this.state = {
            friends: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/users", { "method": "GET" })
        .then((resp) => resp.json())
        .then(responseData => {
            this.setState({
                friends: responseData.data
            })
        })
        .done()
    }

    _renderFriend(item) {
        return (
            <Text style={ styles.friend }>
                { item.age } { item.name }
            </Text>
        )
    }

    render() {
        let { friends } = this.state

        return (
            <View style={ styles.container }>
                <FlatList 
                    data={ friends }
                    keyExtractor={ (friend, i) => i }
                    renderItem={( {item} ) => this._renderFriend(item)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    friend: {
        fontSize: 20,
        color: "#333",
        marginBottom: 5,
    },
})

export default Friends