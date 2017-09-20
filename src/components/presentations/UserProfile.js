import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import dateformat from 'dateformat'
import PostItem from './PostItem'

class UserProfile extends Component {
    _renderPost(item) {
        let created = dateformat(new Date(item.createdAt), "mmm dS, yyyy")
        return (
            <PostItem post={ item } created={ created } showUsername={ false } />
        )
    }

    render() {
        let { user, posts } = this.props
        return (
            <View style={ styles.profile }>
                <View style={ styles.header }>
                    <Text>{ user.username }</Text>
                    <Text>Posts: { posts.length }</Text>
                </View>
                <View style={ styles.posts }>
                    <FlatList 
                        data={ posts }
                        keyExtractor={ post => post._id }
                        renderItem={({item}) => this._renderPost(item)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    profile: {
        width: 100+'%',
        height: 100+'%'
    },
    header: {
        width: 100+'%',
        height: 30+'%',
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    posts: {
        width: 100+'%',
        height: 70+'%',
        padding: 5
    }
})

export default UserProfile