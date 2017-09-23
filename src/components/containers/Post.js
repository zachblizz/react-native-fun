import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, RefreshControl } from 'react-native'
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
            comments: [],
            refreshing: false
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
                    comments,
                    refreshing: false
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
                    <View style={{ flexDirection: 'row', width: 100+'%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={ () => navigate('Profile', { user: params.post._creator }) }>
                                <Image style={ styles.icon }
                                    source={ config.images.userProfileIcon } />
                                <Text style={ styles.author }>
                                    { params.post._creator.username }
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 70+'%' }}>
                            <Image style={styles.icon }
                                source={ config.images.editIcon } />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ styles.comments }>
                    { params.post._comments.length > 0 
                        ? <ScrollView refreshControl={
                                <RefreshControl
                                    refreshing={ this.state.refreshing }
                                    onRefresh={ () => this._onRefresh(params.post._id) }
                                />
                            }>
                            <FlatList 
                                data={ params.post._comments } 
                                keyExtractor={ comment => comment._id }
                                renderItem={ ({item}) => this._renderComment(item) } /> 
                        </ScrollView>
                        : <ScrollView style={ styles.noComments }
                            refreshControl={
                                <RefreshControl
                                    refreshing={ this.state.refreshing }
                                    onRefresh={ () => this._onRefresh(params.post._id) }
                                />
                            }>
                            <Text>No Comments Yet...</Text>
                        </ScrollView>
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
        height: 70+'%',
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