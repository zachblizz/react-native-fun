import React, { Component } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'

class CommentModal extends Component {
    render() {
        let { post, visible, comment, commentText, setVisibility } = this.props

        return (
            <Modal
                animationType="slide"
                visible={ visible }
                transparent={ true }>
                <View style={ styles.modal }>
                    <View style={ styles.container }>
                        <View style={ styles.close }>
                            <TouchableOpacity
                                onPress={ () => setVisibility() }
                            >
                                <Text style={{ fontSize: 15 }}>x</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>{ post.text }</Text>
                        <View style={ styles.commentInfo }>
                            <TextInput
                                style={ styles.textInput }
                                maxLength={ 120 }
                                placeholder={"Type comment here"}
                                multiline={ true }
                                onChangeText={(text) => commentText(text)}
                            />
                            <TouchableOpacity
                                onPress={ () => { comment() } }>
                                <Text style={ styles.addBtn }>post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        height: 100+'%',
        width: 100+'%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    container: {
        padding: 20,
        height: 30+'%',
        width: 95+'%',
        backgroundColor: '#ddd'
    },
    commentInfo: {
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 100,
        width: 100+'%',
        justifyContent: 'center',
    },
    textInput: {
        width: 90+'%',
        fontSize: 15
    },
    addBtn: {
        marginTop: 4,
        right: -10,
        backgroundColor: '#0A8754',
        color: '#fff',
        padding: 5
    }
})

export default CommentModal