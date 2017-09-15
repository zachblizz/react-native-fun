import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
// import { StackNavigator } from 'react-navigation'

class MyWrapper extends Component {
    constructor(props) {
        super(props)
        this. state = {
            count: 0
        }
    }

    processPress(which) {
        let _count = this.state.count
        switch (which) {
            case "add": _count++; break;
            case "sub": _count--; break;
        }

        this.setState({
            count: _count
        })
    }

    resetCount(e) {
        this.setState({
            count: 0
        })
    }

    render() {
        let { count, foo } = this.state
        return (
            <View style={ styles.container }>
                <View style={{ flexDirection: "row" }}>
                    <Button
                        onPress={ () => {
                            this.processPress("add")
                        }}
                        title="Add"
                        color="#FF5252"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={ () => {
                            this.processPress("sub")
                        }}
                        title="Sub"
                        color="#FF5252"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Text style={{ fontSize: 30, color: "#fff" }}>{ count }</Text>
                <Button
                    onPress={ this.resetCount.bind(this) }
                    title="Reset"
                    color="#FF5252"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    btn: {
        backgroundColor: "#ff5252",
        color: "#fff"
    },
});

export default MyWrapper