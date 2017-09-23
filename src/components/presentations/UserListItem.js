import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native'
import config from '../../config'
import dateformat from 'dateformat'

class UserListItem extends Component {
    render() {
        let { item, viewUser, deleteUser } = this.props
        let joinDate = dateformat(new Date(item.createdAt), "mmm dS, yyyy")

        return (
            <TouchableOpacity
                onPress={ () => this.props.nav('Profile', { user: item }) }>
                <View style={ styles.userContainer }>
                    <Image style={{ marginRight: 30, marginLeft: 15 }}
                        source={ config.images.userProfileIcon } />
                    <View>
                        <Text style={ styles.username }>
                            { item.username }
                        </Text>
                        <Text style={ styles.joined }>
                            { joinDate }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    userContainer: {
        padding: 20,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    username: {
        fontSize: 20,
        color: "#333",
        marginBottom: 4
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

export default UserListItem