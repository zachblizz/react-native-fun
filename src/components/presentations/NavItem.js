import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import config from '../../config'

class NavItem extends Component {
    render() {
        let { dest, icon } = this.props

        return (
            <View style={ styles.navItem }>
                <TouchableOpacity
                    onPress={() => this.props.nav(dest, {})}>
                    <Image style={ styles.icon } 
                        source={ config.images[icon] } />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navItem: {
        marginLeft: 50
    },
    icon: {
        height: 30,
        width: 30,
        left: 1
    },
    lbl: {
        fontSize: 12,
        color: '#fff'
    },
})

export default NavItem