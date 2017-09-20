import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

class PostItem extends Component {
    render() {
        let { post, showUsername, created } = this.props
        return (
            <View style={ styles.postItem }>
                { showUsername ? <Text>{ post._creator.username }</Text> : null }
                <Text style={ styles.postHeader }>{ post.title }</Text>
                <Text style={ styles.postSubHeader }>cmts: { post._comments.length }</Text>
                <Text style={ styles.postSubHeader }>{ created }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postItem: {
        padding: 10,

    },
    postHeader: {
        fontSize: 20
    },
    postSubHeader: {
        fontSize: 10
    }
})

export default PostItem