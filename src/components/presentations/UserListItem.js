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
                onPress={ () => viewUser() }>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={ styles.username }>
                            { item.username }
                        </Text>
                        <Text style={ styles.joined }>
                            { joinDate }
                        </Text>
                    </View>
                    <TouchableOpacity onPress={ () => deleteUser() }
                        style={ styles.delete }>
                        <Image style={ styles.deleteIcon }
                            source={ config.images.deleteIcon } />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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

export default UserListItem