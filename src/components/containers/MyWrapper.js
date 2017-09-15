import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, TextInput } from 'react-native'
import AddSubtract from '../presentations/AddSubtract'

class MyWrapper extends Component {
    static navigationOptions = {
        title: "Add Subtract",
    }

    constructor(props) {
        super(props)
        this. state = {
            count: 0,
            user: {},
            users: [],
        }
    }

    processPress(num) {
        let { count, user } = this.state
        let usr = Object.assign({}, user)
        count += num
        usr.id = count
        this.setState({
            count,
            user: usr
        })
        console.log(usr)
    }

    reset(e) {
        this.setState({
            count: 0
        })
    }

    addUser(name) {
        let user = Object.assign({}, this.state.user)
        user.name = name
        this.setState({
            user
        })
    }

    render() {
        let { user, count, foo } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <AddSubtract pressAddSub={ (num) => this.processPress(num) } 
                    count={ count }/>
                <Button onPress={ this.reset.bind(this) }
                    title="Reset" color="#FF5252" />
                <TextInput onChangeText={ (name) => this.addUser(name) }
                    placeholder="What is your name?" />
                <Button title="add user" 
                    onPress={() => {
                        let users = Object.assign([], this.state.users)
                        users.push(user)
                        this.setState({
                            users
                        })
                        console.log(this.state.users)
                    }} />
                <Button title="say hello! &rarr;" 
                    onPress={() => navigate("Second", { users: this.state.users }) } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
})

export default MyWrapper