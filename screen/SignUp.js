import React from "react"
import { View, StyleSheet, ScrollView, Text, ImageBackground, ToastAndroid} from "react-native"
import { TextInput } from 'react-native-paper';
import Cabecera from "./components/Cabecera"
import Footer from "./components/Footer"
import SelectDropdown from 'react-native-select-dropdown'
import usersActions from '../redux/actions/usersActions'
import { connect } from "react-redux";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUp = (props)=> {
    const countries = ['Argentina','Brasil' ,"Egypt", "Canada", "Australia", "Ireland"]
    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        url: "",
        country: "",
    });
    const formSubmit = async () => {
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
        if (!user.email.includes("@")) {
        ToastAndroid.showWithGravityAndOffset(
            "Oops! email format entered is incorrect!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            50,
            50
        )
            return false;
        }
        try {
            let res = await props.signUp(user);
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
                    "Account Created successfully!",
                    ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    50,
                    50
                )
                setTimeout(()=>{
                    props.navigation.navigate('Home')
                },2000)
        }
        } catch (e) {
            console.log(e);
        }
    };

    return(
        < View style={styles.container}>
        <ScrollView>
        <View style={styles.container2}>
        <Cabecera {...props}/>
            <View style={styles.formu} >
                <ImageBackground source={{uri: 'https://i.postimg.cc/3rLbbQVt/photo-1474925558543-e7a5f06e733e-ixid-Mnwx-Mj-A3f-DB8-MHxwa-G90by1w-YWdlf-Hx8f-GVuf-DB8f-Hx8-ixlib-rb-1-2.jpg'}} style={styles.fondoInputs}>
                <Text style={styles.titulo}>Create Account!</Text>
                <Text style={styles.subtitulo}>Please fill the details to Sign Up!</Text>
                <View style={styles.fields}>
                <TextInput style={styles.input}  
                label='First Name'  
                onChange={(e) => setUser({...user, name: e.nativeEvent.text})}
                />
                <TextInput style={styles.input}
                    label='Last Name' 
                    onChange={(e) => setUser({...user, lastname: e.nativeEvent.text})}
                />
                <TextInput style={styles.input}  
                label='Email' 
                onChange={(e) => setUser({...user, email: e.nativeEvent.text})}
                />
                <TextInput style={styles.input}  
                    label="Password"
                    secureTextEntry
                    onChange={(e) => setUser({...user, password: e.nativeEvent.text})}
                right={<TextInput.Icon name="eye" />}
            />
            
                <TextInput style={styles.input}  
                label='URL of your picture' 
                onChange={(e) => setUser({...user, url: e.nativeEvent.text})}
                /> 
                <View style={styles.input} >

    <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
        return  setUser({...user, country: selectedItem})
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
        
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>
                </View>
                <TouchableOpacity onPress={formSubmit}
                >
                    <View style={styles.button}>
                    <Text style={styles.textButton}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.account}>
                <Text style={styles.link}>Already have an account?</Text><Text style={styles.link2}  onPress={()=>props.navigation.navigate('Sign In')}>Log In here!</Text>
                </View>
                </View>
                </ImageBackground>
            </View>
            <Footer/>
        </View>
        </ScrollView>
    </View>
    )
}
const mapDispatchToProps = {
    signUp: usersActions.signUp,
};

export default connect(null, mapDispatchToProps)(SignUp);

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
        minHeight: 800, 
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
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 10,
        fontSize: 20,
        opacity: 0.8,
        justifyContent:"center"
    },
    titulo : {
        fontSize: 40,
        textAlign:'center',
        color: 'black',
        opacity: 0.5,
        fontWeight: "bold"
    },
    subtitulo : {
        fontSize: 30,
        textAlign:'center',
        color: 'black',
        opacity: 0.5,
        fontWeight: "bold"
    },
    link:{
        fontSize: 23,
        color: 'black',
        opacity: 0.7,
    },
    link2:{
        fontSize: 23,
        color: 'black',
        opacity: 0.7,
        borderBottomWidth: 1,
        borderColor: 'black',
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