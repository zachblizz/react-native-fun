import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, Text, Image, StyleSheet, FlatList } from 'react-native'
import CommentItem from '../presentations/CommentItem'
import config from '../../config'


class Comments extends Component {
    _renderComment(item) {
        return (
            <CommentItem comment={ item } />
        )
    }
    
    render() {
        let { comments, refreshing, refresh } = this.props

        return (
            <View style={ styles.comments }>
                { comments.length > 0 
                    ? <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={ refreshing }
                                onRefresh={ () => refresh() }
                            />
                        }>
                        <FlatList 
                            data={ comments } 
                            keyExtractor={ comment => comment._id }
                            renderItem={ ({item}) => this._renderComment(item) } /> 
                    </ScrollView>
                    : <View style={ styles.noComments }>
                        <Text>No Comments Yet...</Text>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    comments: {
        top: 0,
        width: 100+'%',
        height: 70+'%',
        marginLeft: 15,
        color: "#fff"
    },
    noComments: {
        alignItems: 'center',
        paddingTop: 100
    },
})

export default Comments