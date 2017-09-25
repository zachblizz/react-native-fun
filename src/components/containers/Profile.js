import React, { Component } from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import UserProfile from '../presentations/UserProfile'
import config from '../../config'

class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.user.username}'s Profile`,
    });

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user: {},
            refreshing: false
        }
    }

    componentDidMount() {
        let { params } = this.props.navigation.state
        let user = params.user
        fetch("http://" + config.constants.HOST_IP + ":3040/api/postsByUser", {
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

    _onRefresh() {
        let posts = Object.assign([], this.state.posts)
        this.setState({ refreshing: true })
        fetch("http://" + config.constants.HOST_IP + ":3040/api/postsByUser", {
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
            posts = data.posts
            this.setState({
                posts,
                refreshing: false
            })
        })
    }

    render() {
        let { user, posts, refreshing } = this.state
        let { navigate } = this.props.navigation

        return (
            <UserProfile user={ user } 
                posts={ posts } 
                nav={ navigate }
                refresh={ () => this._onRefresh.bind(this) }
                refreshing={ refreshing } />
        )
    }
}

export default Profile