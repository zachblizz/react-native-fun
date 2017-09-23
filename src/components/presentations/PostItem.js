import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import config from '../../config'

class PostItem extends Component {
    render() {
        let { post, showUsername, created, nav } = this.props

        return (
            <TouchableOpacity style={ styles.postItem }
                onPress={ () => nav('Post', { post: post, nav: nav }) }>
                <View>
                    <Text style={ styles.postHeader }>{ post.title }</Text>
                    <Text style={ styles.text }>{ post.text.length < 140 ? post.text : post.text.substring(0, 140) + "..." }</Text>
                    <View style={ styles.commentContainer }>
                        <Image style={ styles.commentIcon }
                            source={ config.images.commentIcon } />
                        <Text style={[styles.postSubHeader, { marginLeft: 3 }] }>
                            { post._comments.length }  |  { created }
                        </Text>
                    </View>
                    { showUsername ? <Text style={[ styles.postSubHeader, { color: "#987b8e" } ]}>{ post._creator.username }</Text> : null }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    postItem: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 4,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
    },
    postHeader: {
        fontSize: 20,
        marginBottom: 3,
        color: '#542344'
    },
    text: {
        fontSize: 13,
        marginTop: 2,
        marginBottom: 4,
        color: '#542344'
    },
    postSubHeader: {
        fontSize: 10,
        marginBottom: 2,
        color: '#764e69',
    },
    commentContainer: {
        flexDirection: 'row', 
        marginTop: 3,
        marginBottom: 3
    },
    commentIcon: {
        height: 10,
        width: 10,
        marginTop: 1.2
    },
})

export default PostItem