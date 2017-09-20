import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Signup from './components/containers/Signup'
import Users from './components/containers/Users'
import Profile from './components/containers/Profile'
import Post from './components/containers/Post'

const Navigation = StackNavigator({
    Signup: { screen: Signup },
    Users: { screen: Users },
    Profile: { screen: Profile },
    Post: { screen: Post }
})

export default Navigation