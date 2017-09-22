import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PostItem from '../presentations/PostItem'
import dateformat from 'dateformat'

class Posts extends Component {
    static navigationOptions = {
        title: "Posts",
    }

    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3040/api/posts", {
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

    render() {
        let { posts } = this.state

        return (
            <View style={ styles.postsContainer }>
                <FlatList 
                    data={ posts }
                    keyExtractor={ item => item._id }
                    renderItem={ ({item}) => this._renderPosts(item) }
                />
            </View>
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