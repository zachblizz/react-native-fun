import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import TabNav from './components/containers/TabNav'
import Signup from './components/containers/Signup'
import Users from './components/containers/Users'
import Profile from './components/containers/Profile'
import Post from './components/containers/Post'
import Posts from './components/containers/Posts'

const Navigation = StackNavigator({
    Root: { screen: TabNav },
    Signup: { screen: Signup },
    Users: { screen: Users },
    Profile: { screen: Profile },
    Post: { screen: Post },
    Posts: { screen: Posts }
})

export default Navigation