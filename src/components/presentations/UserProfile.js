import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import dateformat from 'dateformat'
import PostItem from './PostItem'
import config from '../../config'

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
            <View>
                <View style={ styles.header }>
                    <Image style={{ marginBottom: 10 }}
                        source={ config.images.userProfileIcon } />
                    <Text style={ styles.username }>{ user.username }</Text>
                    <Text style={{ color: '#aaa', marginTop: 10 }}>Posts: { posts.length }</Text>
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
    header: {
        width: 100+'%',
        height: 150,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    username: {
        fontSize: 25
    },
    postContainer: {
        padding: 10,
        height: 90+'%',
        marginBottom: 10
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