import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import { TabNavigator, TabBarBottom } from 'react-navigation'
import config from '../../config'
import Posts from './Posts'
import NewPost from './NewPost'
import Users from './Users'
import Store from '../../store/Store'

export default TabNavigator({
    MainTab: {
        screen: Posts,
        path: '/',
        navigationOptions: {
            title: 'Feed',
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.feedFocus : config.images.feedUnfocus } />
            )
        }
    },
    NewPost: {
        screen: NewPost,
        path: '/newPost',
        navigationOptions: {
            title: 'Post',
            tabBarLabel: '',
            color: config.constants.ACCNT_COLOR,
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.newfocus : config.images.newUnfocus } />
            )
        }
    },
    UsersTab: {
        screen: Users,
        path: '/users',
        navigationOptions: {
            title: 'Users',
            tabBarLabel: '',
            color: config.constants.ACCNT_COLOR,
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.usersFocus : config.images.usersUnfocus } />
            )
        }
    },
    ProfileTab: {
        screen: Users,
        path: '/profile',
        navigationOptions: {
            title: Store.getState().username || 'Profile',
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.userProfileIcon : config.images.userProfileUnfocus } />
            )
        }
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
        style: {
            height: 90,
            backgroundColor: config.constants.ACCNT_COLOR,
            color: "#49d3b4"
        }
    }
})

// blue color: #3A7CA5
const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
        marginBottom: 10,
        color: config.constants.ACCNT_COLOR,
    }
})