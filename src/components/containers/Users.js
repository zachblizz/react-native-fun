import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import moment from 'moment'
import config from '../../config'
import Nav from './Nav'
import dateformat from 'dateformat'

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
        alert(user._id)
    }

    deleteUser(id) {
        alert(id + " Deleted...")
    }

    _renderFriend(item) {
        let joinDate = dateformat(new Date(item.createdAt), "mmm dS, yyyy")

        return (
            <View style={ styles.friendLayout }>
                <TouchableOpacity
                    onPress={ () => this.viewUser(item) }>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={ styles.username }>
                                { item.username }
                            </Text>
                            <Text style={ styles.joined }>
                                { joinDate }
                            </Text>
                        </View>
                        <TouchableOpacity onpress={ () => this.deleteUser(item._id) }
                            style={ styles.delete }>
                            <Image style={ styles.deleteIcon }
                                source={ config.images.deleteIcon } />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
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
    },
    username: {
        fontSize: 20,
        color: "#333",
    },
    joined: {
        fontSize: 10,
        color: '#888'
    },
    delete: {
        position: 'absolute', 
        right: 10,
        top: 10
    },
    deleteIcon: {
        height: 20,
        width: 20
    }
})

export default Friends