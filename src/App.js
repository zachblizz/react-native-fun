import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import MyWrapper from './components/containers/MyWrapper'
import MyPres from './components/containers/MyPres'

const Navigation = StackNavigator({
    First: { screen: MyWrapper },
    Second: { screen: MyPres },
})

export default Navigation