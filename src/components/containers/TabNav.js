import React from "react"
import { Image, Text, StyleSheet } from "react-native"
import { TabNavigator, TabBarBottom } from "react-navigation"
import config from "../../config"
import Posts from "./Posts"
import NewPost from "./NewPost"
import Users from "./Users"
import CryptoTracker from "./CryptoTracker"
import Store from "../../store/Store"

export default TabNavigator({
    MainTab: {
        screen: Posts,
        path: "/",
        navigationOptions: {
            title: "Feed",
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.feedFocus : config.images.feedUnfocus } />
            )
        }
    },
    NewPost: {
        screen: NewPost,
        path: "/newPost",
        navigationOptions: {
            title: "Post",
            tabBarLabel: "",
            color: config.constants.ACCNT_COLOR,
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.newfocus : config.images.newUnfocus } />
            )
        }
    },
    UsersTab: {
        screen: Users,
        path: "/users",
        navigationOptions: {
            title: "Users",
            tabBarLabel: "",
            color: config.constants.ACCNT_COLOR,
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.usersFocus : config.images.usersUnfocus } />
            )
        }
    },
    CryptoTab: {
        screen: CryptoTracker,
        path: "/crypto",
        navigationOptions: {
            title: "Cypto",
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
                <Image style={ styles.icon }
                    source={ focused ? config.images.cryptoFocus : config.images.crypto } />
            )
        }
    },
}, {
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarOptions: {
        style: {
            height: 90,
            backgroundColor: config.constants.ACCNT_COLOR,
            paddingBottom: 25,
            color: "#49d3b4"
        }
    }
})

// blue color: #3A7CA5
const styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25,
    }
})