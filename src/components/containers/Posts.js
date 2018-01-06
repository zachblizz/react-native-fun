import React, { Component } from 'react'
import { View, FlatList, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import PostItem from '../presentations/PostItem'
import dateformat from 'dateformat'
import Signup from './Signup'
import config from '../../config'
import Store from '../../store/Store'

class Posts extends Component {
    static navigationOptions = {
        title: "Posts",
    }

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            refreshing: false,
            user: {}
        }
    }

    componentDidMount() {
        Store.subscribe(() => {
            let user = Object.assign({}, this.state.user)
            user = Store.getState()
            this.setState({
                user
            })
        })

        fetch("http://" + config.constants.HOST_IP + ":3040/api/posts", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                posts: resp.data,
                user: Store.getState()
            })
        })
    }

    _renderPosts(item) {
        let { navigate } = this.props.navigation
        let created = dateformat(item.createdAt, "mmm dS, yyyy")

        return (
            <PostItem post={ item } 
                showUsername={ true } 
                created={ created }
                nav={ navigate } />
        )
    }

    _onRefresh() {
        let posts = Object.assign([], this.state.posts)
        this.setState({
            refreshing: true
        })
        fetch("http://" + config.constants.HOST_IP + ":3040/api/posts", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            posts = resp.data
            this.setState({
                posts,
                refreshing: false
            })
        })
    }

    render() {
        let { posts, user } = this.state
        return (
            <ScrollView style={ styles.postsContainer }
                refreshControl={
                    <RefreshControl
                        refreshing={ this.state.refreshing }
                        onRefresh={ this._onRefresh.bind(this) }
                    />
                }>
                { 
                    user.userId == '' || !user.userId 
                    ? <Signup /> 
                    : null
                }
                <FlatList data={ posts } 
                        keyExtractor={ item => item._id }
                        renderItem={ ({item}) => this._renderPosts(item) } /> 
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    postsContainer: {
        paddingTop: 10,
        height: 10,
        backgroundColor: config.constants.MAIN_COLOR
    }
})

export default Posts