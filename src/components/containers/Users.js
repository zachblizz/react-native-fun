import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import moment from 'moment'
import Nav from './Nav'
import UserListItem from '../presentations/UserListItem'

class Friends extends Component {
    static navigationOptions = {
        title: "Users",
    }

    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3040/api/getUsers", { 
            "method": "GET", 
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then(responseData => {
            this.setState({
                users: responseData.users
            })
        })
        .done()
    }

    viewUser(user) {
        alert(user)
    }

    deleteUser(id) {
        fetch("http://localhost:3040/api/deleteUser", {
            "method": "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then(resp => resp.json())
        .then(responseData => {
            if (responseData.err) {
                alert(responseData.err)
            } else {
                alert("user was deleted")
                let users = Object.assign([], this.state.users)
                this.setState({
                    users: users.filter(usr => { return usr._id !== id })
                })
            }
        })
    }

    _renderFriend(item) {
        return (
            <View style={ styles.friendLayout }>
                <UserListItem item={ item }
                    viewUser={ () => this.viewUser(item._id) }
                    deleteUser={ () => this.deleteUser(item._id) } />
            </View>
        )
    }

    render() {
        let { users } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <FlatList 
                    data={ users }
                    keyExtractor={ (friend, i) => i }
                    renderItem={({ item }) => this._renderFriend(item)}
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
    }
})

export default Friends