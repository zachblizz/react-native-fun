import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Signup from './components/containers/Signup'
import Users from './components/containers/Users'

const Navigation = StackNavigator({
    Signup: { screen: Signup },
    Users: { screen: Users },
})

export default Navigation