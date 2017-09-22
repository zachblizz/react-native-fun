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
                userId: '58aa1b9c11bc62b85c514888'
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
        fetch("http://localhost:3040/api/post", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.post)
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.success) {
                AlertIOS.alert("Nice", "Message Posted!")
            }
        })
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
                <TouchableOpacity
                    onPress={ () => this.post() }>
                    <Text>Create Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 100+'%',
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