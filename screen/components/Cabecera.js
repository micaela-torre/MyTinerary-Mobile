import React from 'react'
import { View, Image, StyleSheet,Text, ImageBackground} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler'




const Cabecera = (props) =>{
    return (
        <View style={styles.cabecera}> 
        <Image source={{uri :'https://i.postimg.cc/GpQsXM81/Dise-o-sin-t-tulo-41-removebg-preview.png'}}  style={styles.logo}/>
            <Text style={styles.titulo}>MYTINERARY</Text>
                <TouchableOpacity>
                <View style={styles.nav} onPress={() => {
                        props.navigation.toggleDrawer()
                    }}>
                <ImageBackground source={{uri: 'https://i.postimg.cc/SsXjv3GH/menu.png'}} style={styles.navImage} >
                <Text style={styles.nav}  onPress={() => {
                        props.navigation.toggleDrawer()
                    }}></Text>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    </View>  
    )
}
export default Cabecera

const styles = StyleSheet.create({
    cabecera:{
        flexDirection:'row',
        height: 150,
        justifyContent:'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    logo:{
        width: 100,
        height: 100,
    },
    titulo : {
        fontSize: 45,
        textAlign:'center',
        color: 'black',
        opacity: 0.5,
        fontWeight: "bold"
    },
    nav: {
        width: 80,
        height: 80,
    },
    
    navImage:{
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menu:{
        width:150,
        height:180,
        backgroundColor: 'grey',
        position: 'absolute',
        top: 75,
        right: -30,
        padding:5,
        justifyContent:'space-evenly',
        alignItems:'center',
        opacity: 0.8
    },
    link:{
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})