import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import dateformat from 'dateformat'
import config from '../../config'

class CommentItem extends Component {
    render() {
        let { comment } = this.props
        let cmtDate = dateformat(comment.createdAt, "mmm dS, yyyy")

        return (
            <View style={ styles.comment }>
                <Text style={ styles.text }>{ comment.text }</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={ styles.smaller }>
                        { comment._creator.username }  |  { cmtDate }
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    comment: {
        padding: 10,
        width: 85+'%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#313e4a'
    },
    text: {
        color: "#fff"
    },
    smaller: {
        fontSize: 10,
        color: '#aaa'
    }
})

export default CommentItem