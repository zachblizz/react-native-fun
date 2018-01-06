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
                    { showUsername ? <Text style={[ styles.postSubHeader, { color: "#888" } ]}>{ post._creator.username }</Text> : null }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    postItem: {
        padding: 20,
        backgroundColor: config.constants.MAIN_COLOR,
        marginBottom: 4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#313e4a',
        justifyContent: 'center'
    },
    postHeader: {
        fontSize: 25,
        marginBottom: 3,
        color: "#fff"
    },
    text: {
        marginTop: 3,
        marginBottom: 3,
        fontSize: 15,
        color: '#ccc'
    },
    postSubHeader: {
        fontSize: 10,
        marginBottom: 2,
        color: '#aaa',
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