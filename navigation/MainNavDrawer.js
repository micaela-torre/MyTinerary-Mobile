import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import Cities from '../screen/Cities'
import SignIn from '../screen/SignIn'
import SignUp from '../screen/SignUp'
import React from 'react'
import NavStack from '../navigation/MainNavStack'
import Menu from './Menu'

const Drawer = createDrawerNavigator()
const Navigator = (props) =>{
    return(
        <Drawer.Navigator drawerContent={(props)=> <Menu {...props}/>}>
                <Drawer.Screen name = "Home" component={NavStack} options={{
                    headerShown: false,
                    
                }}/>
                <Drawer.Screen name="Cities" component={Cities} options={{
                    headerShown: false
                }}/>
                <Drawer.Screen name="Sign Up" component={SignUp} options={{
                    headerShown: false
                }}/>
                <Drawer.Screen name="Sign In" component={SignIn} options={{
                    headerShown: false
                }}/> 
        </Drawer.Navigator>
    )
}
export default Navigator

