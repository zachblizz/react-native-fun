import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, AlertIOS } from 'react-native'
import config from '../../config'

class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                title: '',
                text: '',
                link: '',
                userId: config.constants.USER_ID
            }
        }
    }

    updatePost(content, key) {
        let post = Object.assign({}, this.state.post)
        post[key] = content
        this.setState({
            post
        })
    }

    post() {
        let { post } = this.state
        if (post.title !== '' && (post.text !== '' || post.link !== '')) {
            fetch("http://" + config.constants.HOST_IP + ":3040/api/post", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.success) {
                    AlertIOS.alert("Nice", "Message Posted!")
                }
            })
        } else {
            AlertIOS.alert('DOH!!', "Please provie the Title and the Text, or Link for your post!")
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput placeholder="title" style={ styles.input }
                    onChangeText={ (title) => this.updatePost(title, "title") } />
                <TextInput placeholder="type your post here" multiline={ true }
                    style={[ styles.input, styles.large ]} maxLength={ 140 }
                    onChangeText={ (text) => this.updatePost(text, "text") } />
                <TextInput placeholder="link" style={ styles.input }
                    onChangeText={ (link) => this.updatePost(link, "link") } />
                <TouchableOpacity style={ styles.create }
                    onPress={ () => this.post() }>
                    <Text style={{ color: '#fff' }}>Add Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: 100+'%',
    },
    create: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#3A7CA5'
    },
    input: {
        backgroundColor: '#fff',
        color: '#333',
        marginBottom: 10,
        padding: 10
    },
    large: {
        height: 150
    }
})

export default NewPost