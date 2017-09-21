import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import CommentItem from '../presentations/CommentItem'
import CommentModal from '../presentations/CommentModal'

class Post extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.post.title}`,
    })

    constructor(props) {
        super(props)
        this.state = {
            addComment: false,
            comment: {},
            comments: []
        }
    }

    componentDidMount() {
        let { params } = this.props.navigation.state
        let { comment } = this.state
        comment.userId = "58aa1b9c11bc62b85c514888"

        this.setState({
            comments: params.post._comments
        })
    }

    _renderComment(item) {
        return (
            <CommentItem comment={ item } />
        )
    }

    commentContent(text) {
        let comment = Object.assign({}, this.state.comment)
        comment.text = text
        this.setState({
            comment: comment
        })
    }

    commentModal(change) {
        this.setState({
            addComment: change ? change : !this.state.addComment
        })
    }

    createComment(postId) {
        let { comment, comments } = this.state

        fetch("http://localhost:3040/api/comment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postId: postId,
                text: comment.text,
                userId: comment.userId
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.success) {
                comments.push(resp.data)
                this.setState({
                    addComment: !this.state.addComment,
                    comments: comments
                })
            }
        })
    }

    render() {
        let { params, nav } = this.props.navigation.state

        return (
            <View style={ styles.container }>
                <View style={ styles.post }>
                    <Text style={ styles.content }>{ params.post.text }</Text>
                    <TouchableOpacity
                        onPress={ () => nav('Profile', { user: params.post._creator }) }>
                        <Text style={ styles.author }>{ params.post._creator.username }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.comments }>
                    { params.post._comments.length > 0 
                        ? <FlatList 
                            data={ params.post._comments } 
                            keyExtractor={ comment => comment._id }
                            renderItem={ ({item}) => this._renderComment(item) } /> 
                        : <View style={ styles.noComments }>
                            <Text>No Comments Yet...</Text>
                        </View>
                    }
                </View>
                <TouchableOpacity style={ styles.addCmt }
                    onPress={ () => this.commentModal() }>
                    <Text style={{ color: '#fff' }}>Add Comment</Text>
                </TouchableOpacity>
                { this.state.addComment 
                    ? <CommentModal 
                        post={ params.post } 
                        visible={ this.state.addComment }
                        setVisibility={ () => this.commentModal(false) }
                        commentText={ (text) => this.commentContent(text) }
                        comment={ () => this.createComment(params.post._id) } /> 
                    : null }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100+'%',
        height: 100+'%'
    },
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
        fontSize: 12
    },
    comments: {
        top: 0,
        width: 100+'%',
        height: 75+'%',
        marginLeft: 15
    },
    noComments: {
        alignItems: 'center',
        paddingTop: 100
    },
    addCmt: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#333',
        height: 10+'%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Post