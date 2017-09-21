import React, { Component } from 'react'
import { View, Text } from 'react-native'
import UserProfile from '../presentations/UserProfile'
import CreatePostBtn from '../presentations/CreatePostBtn'

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
        
        let user = params.user
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
            this.setState({
                posts: data.posts
            })
        })

        this.setState({
            user: user
        })
    }

    render() {
        let { user, posts } = this.state
        let { navigate } = this.props.navigation

        return (
            <View style={{ height: 100+'%' }}>
                <UserProfile user={ user } posts={ posts } nav={ navigate } />
                <CreatePostBtn />
            </View>
        )
    }
}

export default Profile