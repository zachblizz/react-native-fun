import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import config from '../../config'

class PostItem extends Component {
    render() {
        let { post, showUsername, created } = this.props

        return (
            <TouchableOpacity
                onPress={ () => this.props.nav('Post', { post: post, nav: this.props.nav }) }>
                <View style={ styles.postItem }>
                    { showUsername ? <Text>{ post._creator.username }</Text> : null }
                    <Text style={ styles.postHeader }>{ post.title }</Text>
                    <View style={ styles.commentContainer }>
                        <Image style={ styles.commentIcon }
                            source={ config.images.commentIcon } />
                        <Text style={[styles.postSubHeader, { marginLeft: 3 }] }>
                            { post._comments.length }  |  { created }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    postItem: {
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
    },
    postHeader: {
        fontSize: 20
    },
    postSubHeader: {
        fontSize: 10,
    },
    commentContainer: {
        flexDirection: 'row', 
        marginTop: 3
    },
    commentIcon: {
        height: 10,
        width: 10,
        marginTop: 1.2
    },
})

export default PostItem