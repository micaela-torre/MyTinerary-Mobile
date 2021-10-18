import React from "react"
import { View, Text, StyleSheet } from "react-native"
const Footer = () => {
    return(
        <View style={styles.footer}>
            <Text style={styles.footerText} >MyTinerary 2021© - All Rights Reserved</Text>
        </View>
    )
}
export default Footer

const styles = StyleSheet.create({
    footer:{
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#E5E5F9',
        width: '100%'
    },
    footerText:{
        color: 'black',
        opacity: 0.5,
        textAlign: 'center',
        fontSize: 22
    },
})