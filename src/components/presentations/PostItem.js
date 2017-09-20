import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

class PostItem extends Component {
    render() {
        let { post, showUsername, created } = this.props

        return (
            <TouchableOpacity
                onPress={ () => this.props.nav('Post', { post: post, nav: this.props.nav }) }>
                <View style={ styles.postItem }>
                    { showUsername ? <Text>{ post._creator.username }</Text> : null }
                    <Text style={ styles.postHeader }>{ post.title }</Text>
                    <Text style={ styles.postSubHeader }>
                        { post._comments.length } { post._comments.length > 1 ? "comments" : "comment" }
                    </Text>
                    <Text style={ styles.postSubHeader }>{ created }</Text>
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
        fontSize: 10
    }
})

export default PostItem