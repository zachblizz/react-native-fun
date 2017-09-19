import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, TextInput, TouchableHighlight, AlertIOS } from 'react-native'
import FriendFields from '../presentations/FriendFields'
import Nav from './Nav'

class Signup extends Component {
    static navigationOptions = {
        title: "Signup",
    }

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            user: {},
            users: [],
        }
    }

    createUser(username) {
        let _user = Object.assign({}, this.state.friend)
        _user.username = username
        this.setState({
            user: _user
        })
    }

    addUser(user) {
        fetch("http://localhost:3040/api/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                AlertIOS.alert("Added", "User added")
                let _users = Object.assign([], this.state.users)
                _users.push(user)
                this.setState({
                    users: _users
                })
            } else {
                AlertIOS.alert("OOPS!", "User was not added...")
            }
        }).done()
    }

    render() {
        let { user } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <TextInput style={ styles.name } 
                    onChangeText={ (username) => this.createUser(username) }
                    placeholder="username" />
                <Button title="Signup" 
                    onPress={ () => this.addUser(user) } />
                <Nav nav={ navigate } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 180,
        height: 100+'%'
    },
    name: {
        color: "#333"
    }
})

export default Signup