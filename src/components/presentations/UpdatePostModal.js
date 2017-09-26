import React, { Component } from 'react'
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native'

class UpdatePostModal extends Component {
    render() {
        let { post, visible, updatePostText, setVisibility } = this.props

        return (
            <Modal visible={ visible }
                animationType="fade"
                transparent={ true }>
                <View style={ styles.container }>
                    <View style={ styles.wrapper }>
                        <Text style={{ fontSize: 20, padding: 10 }}>Edit Post</Text>
                        <View style={ styles.close }>
                            <TouchableOpacity
                                onPress={ () => setVisibility() } >
                                <Text style={{ fontSize: 20 }}>&times;</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={ styles.update }
                            multiline={ true }
                            maxLength={ 140 } value={ post.text }
                            onChangeText={ (text) => updatePostText(text) } />
                        <TouchableOpacity style={ styles.updateBtn }>
                            <Text style={{ color: '#fff' }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100+'%',
        width: 100+'%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    wrapper: {
        backgroundColor: '#eee',
        width: 100+'%',
        padding: 10,
        alignItems: 'center'
    },
    update: {
        height: 150,
        width: 95+'%',
        padding: 10,
        fontSize: 15,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    updateBtn: {
        backgroundColor: '#3A7CA5',
        padding: 10,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UpdatePostModal