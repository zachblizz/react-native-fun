import React, { Component } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AlertIOS, Modal } from "react-native"
import FriendFields from "../presentations/FriendFields"
import config from "../../config"
import Store from "../../store/Store"

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
            userId: ""
        }
    }

    comonentDidMount() {
        Store.subscribe(() => {
            this.setState({
                userId: Store.getState().userId
            })
        })
    }

    createUser(username) {
        let _user = Object.assign({}, this.state.friend)
        _user.username = username
        this.setState({
            user: _user
        })
    }

    signup(user) {
        if (user.username !== "") {
            fetch(`http://${config.constants.HOST_IP}:3040/api/signup`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                if (resp) {
                    let _users = Object.assign([], this.state.users)
                    _users.push(user)
                    this.setState({
                        users: _users,
                        userId: resp.data._id
                    })
                    try {
                        Store.dispatch({ 
                            type: config.constants.UPDATE_USER_ID, 
                            payload: resp.data._id
                        })
                        Store.dispatch({
                            type: config.constants.UPDATE_USER_NAME,
                            payload: user.username
                        })
                    } catch (err) {
                        alert(err)
                    }
                }
            }).done()
        }
    }

    render() {
        let { user, userId } = this.state

        return (
            <Modal visible={ userId == "" }
                transparent={ false }>
                <View style={ styles.container }>
                    <Text style={{ marginBottom: 30, fontSize: 40, color: "#fff" }}>Post Stuff</Text>
                    <TextInput style={ styles.name } 
                        onChangeText={ (username) => this.createUser(username) }
                        placeholderTextColor="#48535e"
                        placeholder="username" />
                    <TouchableOpacity style={ styles.signup }
                        onPress={ () => this.signup(user) }>
                        <Text style={{ color: "#fff" }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 190,
        height: 100+"%",
        width: 100+"%",
        backgroundColor: config.constants.MAIN_COLOR
    },
    name: {
        color: "#fff",
        width: 80+"%",
        padding: 10,
        backgroundColor: config.constants.ACCNT_COLOR
    },
    signup: {
        marginTop: 10,
        padding: 10,
        height: 30,
        width: 130,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3A7CA5"
    }
})

export default Signup