import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, 
    Image, ScrollView, RefreshControl } from 'react-native'
import CommentModal from '../presentations/CommentModal'
import PostPres from '../presentations/PostPres'
import Comments from '../presentations/Comments'
import config from '../../config'
import Store from '../../store/Store'

class Post extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.post.title}`,
    })

    constructor(props) {
        super(props)
        this.state = {
            addComment: false,
            comment: {},
            comments: [],
            refreshing: false
        }
    }

    componentDidMount() {
        Store.subscribe(() => {})

        let { params } = this.props.navigation.state
        let { comment } = this.state
        comment.userId = Store.getState().userId

        this.setState({
            comments: params.post._comments
        })
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
                this._onRefresh(postId)
            }
        })
    }

    _onRefresh(postId) {
        this.setState({
            refreshing: true
        })
        let comments = Object.assign([], this.state.comments)

        fetch("http://" + config.constants.HOST_IP + ":3040/api/postById", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: postId
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.comments) {
                comments = resp.comments
                this.setState({
                    comments: comments,
                    refreshing: false
                })
            }
        })
    }

    updatePost() {

    }

    render() {
        let { params } = this.props.navigation.state
        let { navigate } = this.props.navigation

        return (
            <View style={ styles.container }>
                <PostPres post={ params.post } nav={ navigate }
                    update={ () => this.updatePost.bind(this) }/>
                <Comments comments={ this.state.comments }
                    refresh={ () => this._onRefresh(params.post._id) }
                    refreshing={ this.state.refreshing } />
                <TouchableOpacity style={ styles.addCmt }
                    onPress={ () => this.commentModal() }>
                    <Text style={{ color: "#fff" }}>Add Comment</Text>
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
        height: 100+'%',
        backgroundColor: config.constants.MAIN_COLOR
    },
    post: {
        top: 0,
        width: 100+'%',
        backgroundColor: config.constants.MAIN_COLOR,
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#313e4a',
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
        height: 70+'%',
        marginLeft: 15
    },
    noComments: {
        alignItems: 'center',
        paddingTop: 100
    },
    addCmt: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        padding: 10,
        backgroundColor: '#3A7CA5',
        height: 33,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: { 
        height: 15, 
        width: 15, 
        marginTop: 9, 
        marginRight: 5 
    }
})

export default Post