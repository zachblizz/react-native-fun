import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import config from '../../config'

class PostItem extends Component {
    render() {
        let { post, showUsername, created, nav } = this.props

        return (
            <TouchableOpacity
                onPress={ () => nav('Post', { post: post, nav: nav }) }>
                <View style={ styles.postItem }>
                    <Text style={ styles.postHeader }>{ post.title }</Text>
                    <Text style={ styles.text }>{ post.text }</Text>
                    <View style={ styles.commentContainer }>
                        <Image style={ styles.commentIcon }
                            source={ config.images.commentIcon } />
                        <Text style={[styles.postSubHeader, { marginLeft: 3 }] }>
                            { post._comments.length }  |  { created }
                        </Text>
                    </View>
                    { showUsername ? <Text style={[ styles.postSubHeader, { color: "#666" } ]}>{ post._creator.username }</Text> : null }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    postItem: {
        padding: 20,
        height: 150,
        backgroundColor: '#fff',
        marginBottom: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
        justifyContent: 'center'
    },
    postHeader: {
        fontSize: 20,
        marginBottom: 3,
        color: '#EA9010'
    },
    text: {
        marginTop: 3,
        marginBottom: 3,
        fontSize: 12
    },
    postSubHeader: {
        fontSize: 10,
        color: '#888',
        marginBottom: 2
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