import React, { Component } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'

class CommentModal extends Component {
    render() {
        let { post, visible, updateVisibility } = this.props

        return (
            <Modal
                animationType="slide"
                visible={ visible }
                transparent={ true }>
                <View style={ styles.modal }>
                    <View style={ styles.container }>
                        <Text>{ post.text }</Text>
                        <View style={ styles.commentInfo }>
                            <TextInput
                                style={ styles.textInput }
                                maxLength={ 120 }
                                placeholder={"Type comment here"}
                                multiline={ true }
                            />
                            <TouchableOpacity
                                onPress={ () => { updateVisibility() } }>
                                <Text style={ styles.addBtn }>add</Text>
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
    container: {
        padding: 20,
        height: 30+'%',
        width: 95+'%',
        backgroundColor: '#ddd'
    },
    commentInfo: {
        // position: 'absolute',
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 5,
        width: 100+'%',
        justifyContent: 'center',
        backgroundColor: '#ff5252'
    },
    textInput: {
        width: 90+'%'
    },
    addBtn: {
        marginTop: 4,
        backgroundColor: '#0A8754',
        color: '#fff',
        padding: 5
    }
})

export default CommentModal