import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.user.username}'s Profile`,
    });

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user: {}
        }
    }

    componentDidMount() {
        let { params } = this.props.navigation.state
        this.setState({
            user: params.user
        })

        fetch("http://localhost:3040/api/postsByUser", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": params.user.username
            })
        })
        .then(resp => resp.json())
        .then(data => {
            alert(JSON.stringify(data))
        })
    }

    render() {
        let { user } = this.state
        return(
            <View style={ styles.profile }>
                <Text>Profile... { user._id }</Text>
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