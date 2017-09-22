import React, { Component } from 'react'
import { View, FlatList, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import PostItem from '../presentations/PostItem'
import dateformat from 'dateformat'
import config from '../../config'

class Posts extends Component {
    static navigationOptions = {
        title: "Posts",
    }

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            refreshing: false
        }
    }

    componentDidMount() {
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
                posts: resp.data
            })
        })
    }

    _renderPosts(item) {
        let { navigate } = this.props.navigation
        let created = dateformat(item.createdAt, "mmm dS, yyyy")
        return (
            <View style={ styles.post }>
                <PostItem post={ item } 
                    showUsername={ true } 
                    created={ created }
                    nav={ navigate } />
            </View>
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
        let { posts } = this.state

        return (
            <ScrollView style={ styles.postsContainer }
                refreshControl={
                <RefreshControl
                    refreshing={ this.state.refreshing }
                    onRefresh={ this._onRefresh.bind(this) }
                />
            }>
                <FlatList 
                    data={ posts }
                    keyExtractor={ item => item._id }
                    renderItem={ ({item}) => this._renderPosts(item) }
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    postsContainer: {
        padding: 20,
        height: 100+'%'
    }
})

export default Posts