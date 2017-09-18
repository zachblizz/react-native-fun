import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import config from '../../config'

class NavItem extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.nav(this.props.dest, {})}>
                    <Image style={ styles.friendIcon } 
                        source={ config.images.friendIcon } />
                    <Text style={ styles.lbl }>Friends</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    friendIcon: {
        height: 30,
        width: 30,
        left: 5
    },
    lbl: {
        fontSize: 12,
        color: '#fff'
    },
})

export default NavItem