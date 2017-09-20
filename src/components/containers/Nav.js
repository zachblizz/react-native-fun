import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import NavItem from '../presentations/NavItem'

class Nav extends Component {
    render() {
        return (
            <View style={ styles.nav }>
                <NavItem nav={ this.props.nav } dest="Users" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        position: 'absolute',
        bottom: 0,
        width: 100+'%',
        height: 65,
        backgroundColor: '#333',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
})

export default Nav