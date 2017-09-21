import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class CreatePostBtn extends Component {
    render() {
        return (
            <TouchableOpacity style={ styles.container }>
                <Text style={{ fontSize: 25, color: "#fff" }}>+</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        height: 50,
        width: 50,
        backgroundColor: "rgb(60,189,113)",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    }
})

export default CreatePostBtn