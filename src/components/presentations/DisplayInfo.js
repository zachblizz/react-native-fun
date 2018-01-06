import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import config from '../../config'

class DisplayInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { label, value } = this.props

        return (
            <View style={{ alignItems: "center", marginLeft: 30 }}>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center" }}>
                    <Image source={ value > 0 ? config.images.positive : config.images.negative } 
                        style={{ height: 12, width: 12, marginRight: 3 }} />
                    <Text style={{ color: "#ccc" }}>{ value }%</Text>
                </View>
                <Text style={{ color: '#777' }}>{ label }</Text>
            </View>
        )
    }
}

export default DisplayInfo