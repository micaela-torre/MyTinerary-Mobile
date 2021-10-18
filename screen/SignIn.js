import React, { useState} from "react";
import { View , StyleSheet, TextInput, Text, ImageBackground, Alert, ToastAndroid} from "react-native";
import Cabecera from "./components/Cabecera";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const  SignIn =(props) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const formSubmit = () => {
        if (Object.keys(user).some((property) => user[property] === "")) {
            ToastAndroid.showWithGravityAndOffset(
                "Oops! Fields cannot be empty!",
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                50,
                50
            )
            return false;
        }
        async function signIn() {
            try {
            let res = await props.signIn(user);
            if (!res.data.success) {
                if (res.data.response[0].message) {
                ToastAndroid.showWithGravityAndOffset(
                        res.data.response[0].message,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        50,
                        50
                    )
                } else {
                ToastAndroid.showWithGravityAndOffset(
                        res.data.response,
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        50,
                        50
                    )
                }
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'Welcome back!',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    50,
                    50
                )
                    setTimeout(()=>{
                        props.navigation.navigate('HomeStack')
                    },2000)
                }
            } catch (e) {
                console.log(e)
            }
        }
        signIn()
    }
        
    return(
        <View style={styles.container}>
            <View style={styles.container2}>
                <Cabecera {...props}/>
                <View style={styles.formu} >
                <ScrollView>
                <ImageBackground source={{uri: 'https://i.postimg.cc/vZQhYcXw/pexels-photo-2531237.jpg'}} style={styles.fondoInputs}>
                <Text style={styles.titulo}>Welcome back!</Text>
                <Text style={styles.subtitulo}>Log in to discover and connect with MYtinerary's global community ✨</Text>
                <View style={styles.fields}>
                <TextInput style={styles.input}  
                placeholder='Email'
                placeholderTextColor="#252425"
                onChange={(e) => setUser({...user, email: e.nativeEvent.text})}
                />
                <TextInput style={styles.input}  
                placeholder='Password'
                placeholderTextColor="#252425"
                secureTextEntry={true}
                onChange={(e) => setUser({...user, password: e.nativeEvent.text})}
                />
                <TouchableOpacity onPress={formSubmit}
                >
                    <View style={styles.button}>
                    <Text style={styles.textButton}>Sign In</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.account}>
                <Text style={styles.link}>Don't have an account?</Text><Text style={styles.link2}  onPress={()=>props.navigation.navigate('Sign Up')}>Sign up here!</Text>
                </View>
                </View>
                </ImageBackground>
                </ScrollView>
            </View>
                <Footer/>
            </View>
        </View>
    )
}
const mapDispatchToProps = {
    signIn: usersActions.signIn,
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5F9',
        alignItems: "center",
        width: '100%'
    },
    container2:{
        minHeight: 1000,
        width: '100%',
        alignItems: 'center', 
    },  
    formu:{
        width: '100%',
        minHeight: 600, 
    },
    fondoInputs:{
        width: '100%',
        minHeight: 800, 
        justifyContent:"space-evenly",
        zIndex: -1
    },
    fields:{
        width: '100%',
        alignItems: "center"
    },
    input: {
        width: '70%',
        height: 48,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 10,
        fontSize: 20,
        opacity: 0.8,
    },
    titulo : {
        fontSize: 45,
        textAlign:'center',
        color: 'white',
        opacity: 0.7,
        fontWeight: "bold"
    },
    subtitulo : {
        fontSize: 30,
        textAlign:'center',
        color: 'white',
        opacity: 0.7,
        fontWeight: "bold"
    },
    link:{
        fontSize: 23,
        color: 'white',
        opacity: 0.7,
    },
    link2:{
        fontSize: 23,
        color: 'white',
        opacity: 0.7,
        borderBottomWidth: 1,
        borderColor: 'white',
        marginHorizontal:10
    },
    account:{
        flexDirection: "row",
        alignItems: "center"
    },
    button:{
        width: 180,
        height: 55,
        backgroundColor: 'black',
        borderRadius: 10,
        marginVertical:20,
        justifyContent: "center",
        alignItems: 'center'
    },
    textButton:{
        color: 'white',
        fontSize: 23
    }
})