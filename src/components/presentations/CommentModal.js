import React, { Component } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import config from '../../config'

class CommentModal extends Component {
    render() {
        let { post, visible, comment, commentText, setVisibility } = this.props

        return (
            <Modal
                animationType="fade"
                visible={ visible }
                transparent={ true } >
                <View style={ styles.modal }>
                    <View style={ styles.container }>
                        <View style={ styles.close }>
                            <TouchableOpacity
                                onPress={ () => setVisibility() } >
                                <Text style={{ fontSize: 30, color: "#fff" }}>&times;</Text>
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
                                onPress={ () => { comment(); setVisibility() } }>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        position: 'absolute',
        top: 5 ,
        right: 5,
        color: "#fff"
    },
    container: {
        padding: 20,
        height: 30+'%',
        width: 99+'%',
        backgroundColor: config.constants.ACCNT_COLOR
    },
    commentInfo: {
        position: 'absolute',
        padding: 5,
        bottom: 0,
        left: 20,
        alignItems: 'center',
        flexDirection: 'row',
        width: 100+'%',
        justifyContent: 'center'
    },
    textInput: {
        width: 100+'%',
        fontSize: 15,
        padding: 20,
        backgroundColor: config.constants.ACCNT_COLOR,
        color: "#fff"
    },
    addBtn: {
        backgroundColor: '#3A7CA5',
        color: "#fff",
        padding: 10,
        paddingTop: 13,
        height: 43
    }
})

export default CommentModal