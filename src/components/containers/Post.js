import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import CommentItem from '../presentations/CommentItem'
import CommentModal from '../presentations/CommentModal'
import config from '../../config'

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
        comment.userId = config.constants.USER_ID

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
        let { comment } = this.state
        let comments = Object.assign([], this.state.comments)

        fetch("http://" + config.constants.HOST_IP + ":3040/api/comment", {
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
        let { params } = this.props.navigation.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <View style={ styles.post }>
                    <Text style={ styles.content }>{ params.post.text }</Text>
                    { 
                        params.post.link !== "" 
                        ? 
                        <Text style={ styles.link }>
                            { params.post.link }
                        </Text> 
                        : null 
                    }
                    <TouchableOpacity
                        onPress={ () => navigate('Profile', { user: params.post._creator }) }>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={ styles.userProfileIcon }
                                source={ config.images.userProfileIcon } />
                            <Text style={ styles.author }>
                                { params.post._creator.username }
                            </Text>
                        </View>
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
    link: {
        marginTop: 10,
        marginBottom: 10,
        color: 'blue',
        fontSize: 10
    },
    author: {
        marginTop: 10,
        fontSize: 12,
        color: '#3E7CB1'
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
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userProfileIcon: { 
        height: 15, 
        width: 15, 
        marginTop: 9, 
        marginRight: 5 
    }
})

export default Post