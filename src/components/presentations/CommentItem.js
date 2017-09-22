import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import dateformat from 'dateformat'

class CommentItem extends Component {
    render() {
        let { comment } = this.props
        let cmtDate = dateformat(comment.createdAt, "mmm dS, yyyy")

        return (
            <View style={ styles.comment }>
                <Text>{ comment.text }</Text>
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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
    },
    smaller: {
        fontSize: 10,
        color: '#555'
    }
})

export default CommentItem