import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import moment from 'moment'
import Nav from './Nav'
import UserListItem from '../presentations/UserListItem'
import config from '../../config'

class Users extends Component {
    static navigationOptions = {
        title: "Users",
    }

    constructor(props) {
        super(props)
        this.state = {
            origUsers: [],
            users: []
        }
    }

    componentDidMount() {
        fetch("http://" + config.constants.HOST_IP + ":3040/api/getUsers", { 
            "method": "GET", 
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then(responseData => {
            this.setState({
                origUsers: responseData.users,
                users: responseData.users
            })
        })
        .done()
    }

    deleteUser(id) {
        fetch("http://" + config.constants.HOST_IP + ":3040/api/deleteUser", {
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
        let { navigate } = this.props.navigation
        return (
            <View style={ styles.friendLayout }>
                <UserListItem item={ item }
                    nav={ navigate }
                    deleteUser={ () => this.deleteUser(item._id) } />
            </View>
        )
    }

    filterUsers(username) {
        let users = Object.assign([], this.state.origUsers)
        let filtered = []
        
        if (username.length > 0) {
            filtered = users.filter(usr => usr.username.toLowerCase().indexOf(username.toLowerCase()) !== -1)
        } else {
            filtered = users
        }

        this.setState({
            users: filtered
        })
    }

    render() {
        let { users } = this.state

        return (
            <View style={ styles.container }>
                <TextInput style={ styles.search }
                    onChangeText={ (username) => this.filterUsers(username) }
                    placeholder="search users"
                />
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
        paddingTop: 20,
        width: 100+'%'
    },
    friendLayout: {
        flexDirection: "column",
        marginBottom: 5,
    },
    search: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20
    }
})

export default Users