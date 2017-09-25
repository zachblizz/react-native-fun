import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, RefresControl, View, Text, Image, StyleSheet } from 'react-native'
import config from '../../config'

class PostPres extends Component {
    render() {
        let { post, update, nav } = this.props

        return (
            <View style={ styles.post }>
                <Text style={ styles.content }>{ post.text }</Text>
                { 
                    post.link !== "" 
                    ? 
                    <Text style={ styles.link }>
                        { post.link }
                    </Text> 
                    : null
                }
                <View style={{ flexDirection: 'row', width: 100+'%' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                        onPress={ () => nav('Profile', { user: post._creator }) }>
                            <Image style={ styles.icon }
                                source={ config.images.userProfileIcon } />
                            <Text style={ styles.author }>
                                { post._creator.username }
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 70+'%' }}
                        onPress={ () => update() }>
                        <Image style={styles.icon }
                            source={ config.images.editIcon } />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    post: {
        top: 0,
        width: 100+'%',
        backgroundColor: '#fafafa',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d6d7da',
    },
    content: {
        fontSize: 15
    },
    author: {
        marginTop: 10,
        fontSize: 12,
        color: '#3E7CB1'
    },
    link: {
        marginTop: 10,
        marginBottom: 10,
        color: 'blue',
        fontSize: 10
    },
    icon: { 
        height: 15, 
        width: 15, 
        marginTop: 9, 
        marginRight: 5 
    }
})

export default PostPres