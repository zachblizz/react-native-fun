import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import NavItem from '../presentations/NavItem'

class Nav extends Component {
    render() {
        return (
            <View style={ styles.nav }>
                <NavItem nav={ this.props.nav } dest="Users" icon="userIcon" />
                <NavItem nav={ this.props.nav } dest="Posts" icon="postsIcon" />                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        position: 'absolute',
        bottom: 0,
        width: 100+'%',
        height: 50,
        backgroundColor: '#333',
        alignItems: 'center',
        flexDirection: 'row'
    },
})

export default Nav