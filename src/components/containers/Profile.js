import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.user.username}'s Profile`,
      });

    render() {
        let { params } = this.props.navigation.state
        return(
            <View style={ styles.profile }>
                <Text>Profile... { params.user._id }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        height: 100+'%',
        width: 100+'%',
        padding: 20
    }
})

export default Profile