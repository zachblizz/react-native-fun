import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, TextInput,
         TouchableHighlight, AlertIOS } from 'react-native'
import AddSubtract from '../presentations/AddSubtract'

class Home extends Component {
    static navigationOptions = {
        title: "Add Subtract",
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
            method: "PUT",
            body: friend
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
                <AddSubtract pressAddSub={ (num) => this.friendId(num) } 
                    count={ count }/>
                <Button onPress={ this.reset.bind(this) }
                    title="Reset" color="#FF5252" />
                <TextInput style={{ color: "#333" }} onChangeText={ (name) => this.createFriend(name) }
                    placeholder="friends name" />
                <Button title="Add Friend" 
                    onPress={ () => this.addUser(friend) } />
                <Button title="View Friends &rarr;" 
                    onPress={() => navigate("Second", {})} />
                <TouchableHighlight
                    onPress={ () => this.getUsers() }>
                    <Text>Test</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        paddingTop: 40,
        alignItems: 'center',
    },
})

export default Home