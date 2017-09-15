import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class AddSubtract extends Component {
    render() {
        let { count, pressAddSub } = this.props
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: "row" }}>
                    <Button onPress={() => pressAddSub(1) }
                        title="Add" color="#FF5252" />
                    <Button onPress={() => pressAddSub(-1) }
                        title="Sub" color="#FF5252" />
                </View>
                <Text style={{ fontSize: 30, color: "#333" }}>{ count }</Text>
            </View>
        )
    }
}

export default AddSubtract