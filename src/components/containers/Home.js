import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, TextInput, TouchableHighlight, AlertIOS } from 'react-native'
import FriendFields from '../presentations/FriendFields'
import Nav from './Nav'

class Home extends Component {
    static navigationOptions = {
        title: "Add Friend",
    }

    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            friend: {},
            friends: [],
        }
    }

    friendId(num) {
        let { count, friend } = this.state
        let _friend = Object.assign({}, friend)
        count += num
        _friend.age = count
        this.setState({
            count,
            friend: _friend
        })
    }

    reset(e) {
        this.setState({
            count: 0
        })
    }

    createFriend(name) {
        let _friend = Object.assign({}, this.state.friend)
        _friend.name = name
        this.setState({
            friend: _friend
        })
    }

    addUser(friend) {
        fetch("http://localhost:3001/api/addUser", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(friend)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.status === 200) {
                AlertIOS.alert("Added", data.msg)
                let _friends = Object.assign([], this.state.friends)
                _friends.push(friend)
                this.setState({
                    friends: _friends
                })
            } else {
                AlertIOS.alert("OOPS!", "User was not added...")
            }
        }).done()
    }

    getUsers() {
        fetch("http://localhost:3001/api/users", { "method": "GET" })
        .then((resp) => resp.json())
        .then(responseData => {
            this.setState({
                friends: responseData.data
            })
        })
        .done()
    }

    render() {
        let { friend, count, foo } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <FriendFields pressAddSub={ (num) => this.friendId(num) } 
                    count={ count } resetAge={ this.reset.bind(this) } />
                <TextInput style={ styles.name } onChangeText={ (name) => this.createFriend(name) }
                    placeholder="friend name" />
                <Button title="Add Friend" 
                    onPress={ () => this.addUser(friend) } />
                <Nav nav={ navigate } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 100+'%'
    },
    name: {
        color: "#333",
    }
})

export default Home