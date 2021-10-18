import React from "react"
import { View,Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux";
import usersActions from '../redux/actions/usersActions'

const DrawerMenu =(props) =>{
    return(
        <TouchableOpacity onPress={props.navigation}>
            <View style={styles.containerNav}>
                <Image source={{uri: props.icon}} style={styles.icon} />
                <Text style={styles.text}>{props.titleName}</Text>
            </View>
        </TouchableOpacity>
    )
}
const Menu = (props) =>{
    const logOut = async()=>{
        await props.logOut() 
        setTimeout(()=>{
            props.navigation.navigate('HomeStack')
        },30)
    }
    return(
        <View style={styles.container1}>
            <View style={styles.container}>
            {props.token &&   
                <Image source={{uri: props.url}} style={styles.img}/>}
            {props.token && <Text style={styles.text}>
                Welcome {props.name} !
                </Text>}
                {!props.token && <Text style={styles.hi}>Hi stranger !</Text>}
            </View>
            <DrawerMenu icon='https://i.postimg.cc/1XZWStQ7/house.png' titleName = 'Home' navigation={()=>props.navigation.navigate('HomeStack')}/>
            <DrawerMenu  icon='https://i.postimg.cc/VLM8X74X/architecture-and-city.png'  titleName = 'Cities' navigation={()=>props.navigation.navigate('Cities')}/>
            {props.token && <DrawerMenu  icon='https://i.postimg.cc/x8CgQTTL/exit.png'  titleName = 'Log Out' navigation={()=>logOut() }/> }
            {!props.token &&  <DrawerMenu  icon='https://i.postimg.cc/6pyCHv2V/sign-up.png'  titleName = 'Sign Up' navigation={()=>props.navigation.navigate('Sign Up')}/>}
            {!props.token && <DrawerMenu  icon='https://i.postimg.cc/q7GnqX9T/user.png'  titleName = 'Sign In' navigation={()=>props.navigation.navigate('Sign In')}/>}
            <View  style={styles.container}>
                <Image source={{uri: 'https://i.postimg.cc/GpQsXM81/Dise-o-sin-t-tulo-41-removebg-preview.png'}} style={styles.img2} />
            </View>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
    token: state.users.token,
    name: state.users.name,
    url: state.users.url
    };
};
const mapDispatchToProps = {
    logOut: usersActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
    container1:{
        flex:1,
        backgroundColor: '#E5E5F9'
    },
    container:{
        width: '100%',
        height: 300,
        padding: 20,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1.5,
        borderColor: '#1d1d1d65',
        
    },
    img:{
        width: 150,
        height: 150,
        borderRadius: 100
    },
    img2:{
        width: 150,
        height: 150,
    },
    text:{
        color: 'black',
        opacity: 0.6,
        fontSize: 25,
        marginVertical:10
    },
    containerNav:{
        width: '100%',
        height: 70 ,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    icon:{
        width: 35,
        height: 35,
        marginRight:10
    },
    hi:{
        fontSize: 40,
        color: 'black',
        opacity: 0.6,
    }
})
