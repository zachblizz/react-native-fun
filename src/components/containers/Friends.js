import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Nav from './Nav'

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

    viewFriend(name) {
        alert(name + " viewed")
    }

    _renderFriend(item) {
        return (
            <View style={ styles.friendLayout }>
                <TouchableOpacity
                    onPress={ () => this.viewFriend(item.name) }>
                    <Text style={ styles.friendTitle }>
                        { item.age } { item.name }
                    </Text>
                    <Text style={{ fontSize: 10 }}>{ item.created }</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let { friends } = this.state
        let { navigate } = this.props.navigation

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
        width: 100+'%'
    },
    friendLayout: {
        flexDirection: "column",
        marginBottom: 10,
    },
    friendTitle: {
        fontSize: 20,
        color: "#333",
    },
})

export default Friends