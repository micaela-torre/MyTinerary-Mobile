import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Cities from '../screen/Cities'
import City from '../screen/City'
import Home from '../screen/Home'
import SignIn from '../screen/SignIn'
import SignUp from '../screen/SignUp'
import React, {useEffect} from 'react'
import usersActions from '../redux/actions/usersActions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
const Navigator = (props) =>{
    useEffect(() => {
            const storage = async ()=>{
                let token = await AsyncStorage.getItem("token")
                    if (token) {
                        props.logIn(token)
                } 
            }
                storage()
    }, [])
    return(
        <Stack.Navigator>
                <Stack.Screen name = "HomeStack" component={Home}  options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Cities" component={Cities} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="City" component={City} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Sign Up" component={SignUp} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Sign In" component={SignIn} options={{
                    headerShown: false
                }}/>                  
        </Stack.Navigator>
    )
}
const mapDispatchToProps = {
    logIn: usersActions.logInLS,
}

export default connect(null,mapDispatchToProps)(Navigator)