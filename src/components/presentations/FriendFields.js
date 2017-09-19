import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

class FriendFields extends Component {
    render() {
        let { count, pressAddSub, resetAge } = this.props
        return (
            <View style={ styles.view }>
                <View style={ styles.addSub }>
                    <Button onPress={() => pressAddSub(1) }
                        title="Add" color="#FF5252" />
                    <Button onPress={() => pressAddSub(-1) }
                        title="Sub" color="#FF5252" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: { alignItems: 'center' },
    addSub: { flexDirection: "row" },
    age: { fontSize: 30, color: "#333" }
})

export default FriendFields