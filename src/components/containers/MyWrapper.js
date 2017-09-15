import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, TextInput } from 'react-native'

class MyWrapper extends Component {
    static navigationOptions = {
        title: "Add Subtract",
    }

    constructor(props) {
        super(props)
        this. state = {
            count: 0,
            name: "",
        }
    }

    processPress(num) {
        let _count = this.state.count
        _count += num
        this.setState({
            count: _count
        })
    }

    reset(e) {
        this.setState({
            count: 0,
            name: ""
        })
    }

    render() {
        let { count, foo } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <View style={{ flexDirection: "row" }}>
                    <Button onPress={() => this.processPress(1) }
                        title="Add" color="#FF5252" />
                    <Button onPress={() => this.processPress(-1) }
                        title="Sub" color="#FF5252" />
                </View>
                <Text style={{ fontSize: 30, color: "#333" }}>{ count }</Text>
                <Button onPress={ this.reset.bind(this) }
                    title="Reset" color="#FF5252" />
                <TextInput onChangeText={ (name) => this.setState({ name }) }
                    placeholder="What is your name?" />
                <Button title="say hello! &rarr;" 
                    onPress={() => navigate("Second", { name: this.state.name }) } />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },
})

export default MyWrapper