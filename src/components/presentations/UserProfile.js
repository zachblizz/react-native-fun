import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import dateformat from 'dateformat'
import PostItem from './PostItem'

class UserProfile extends Component {
    viewPost(id) {
        alert(id)
    }

    _renderPosts(item) {
        let created = dateformat(new Date(item.createdAt), "mmm dS, yyyy")
        let { nav } = this.props

        return (
            <PostItem post={ item } created={ created } 
                showUsername={ false } nav={ nav } />
        )
    }

    render() {
        let { user, posts } = this.props
        
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ styles.username }>{ user.username }</Text>
                    <Text>Posts: { posts.length }</Text>
                </View>
                <View style={ styles.postContainer }>
                    { posts.length > 0 
                        ? <View style={ styles.posts }>
                            <FlatList 
                            data={ posts }
                            keyExtractor={ post => post._id }
                            renderItem={({item}) => this._renderPosts(item)} />
                        </View>
                        : <View style={ styles.noPosts }>
                            <Text>{ user.username } has no posts...</Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100+'%',
        height: 100+'%'
    },
    header: {
        top: 0,
        width: 100+'%',
        height: 30+'%',
        padding: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 25
    },
    posts: {
        width: 100+'%',
        height: 70+'%',
        padding: 5,
    },
    noPosts: {
        width: 100+'%',
        alignItems: 'center',
        paddingTop: 50
    }
})

export default UserProfile