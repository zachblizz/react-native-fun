import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Signup from './components/containers/Signup'
import Users from './components/containers/Users'
import Profile from './components/containers/Profile'

const Navigation = StackNavigator({
    Signup: { screen: Signup },
    Users: { screen: Users },
    Profile: { screen: Profile },
})

export default Navigation