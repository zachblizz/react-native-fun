import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Ionicons } from 'react-native-vector-icons'
import Posts from './Posts'
import Users from './Users'

export default TabNavigator(
    {
        MainTab: {
            screen: Posts,
            path: '/',
            navigationOptions: {
                title: 'Posts',
                tabBarLabel: 'Posts'
            }
        },
        NewPost: {
            screen: Posts,
            path: '/',
            navigationOptions: {
                title: 'New Post',
                tabBarLabel: 'New Post'
            }
        },
        UsersTab: {
            screen: Users,
            path: '/users',
            navigationOptions: {
                title: 'Users',
                tabBarLabel: 'Users'
            }
        }
    },
    {
        tabBarPostition: 'bottom',
        animationEnabled: false,
        swipeEnabled: true
    }
)