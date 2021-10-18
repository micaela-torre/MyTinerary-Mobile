import React,{useEffect} from "react";
import { Text, View, StyleSheet, ImageBackground, ScrollView, TextInput } from "react-native";
import Cabecera from "./components/Cabecera";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import citiesActions from "../redux/actions/citiesActions";
import Itinerary from "./components/Itinerary";
import { ActivityIndicator, Colors } from 'react-native-paper';
import usersActions from "../redux/actions/usersActions";



const City = (props) => {
    useEffect(() => {

        async function getItineraries() {
        try {
            await props.getItineraries(props.route.params.id)
            await props.logIn(props.token)
        }catch (error) {
            console.log(error)
        }}
        getItineraries()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userId])
    if (!props.infoCities.length) {
        return <ActivityIndicator animating={true} color={Colors.red800} />
    }
    var city = props.infoCities.find(
        (city2) => city2._id == props.route.params.id
    );

    var filterItinerary = props.itineraries.map((itinerary) => (
        <Itinerary itinerary={itinerary} key={itinerary._id} likes={itinerary.likes} userId={props.userId}/>
    )) 
    
    const itineraryNotFound = (
    <View>
        <ImageBackground source={{uri: 'https://i.postimg.cc/FzX4PyGq/GRACIAS-POR-LA-CENA.png'}} resizeMode="cover" style={styles.imgNot}>

        </ImageBackground>
    </View>
    )
    var itineraryFinally = !filterItinerary.length
        ? itineraryNotFound
        : filterItinerary;

return(
    <View style= {styles.container}>
        <View style= {styles.container2}>
            <ScrollView>
            <Cabecera {...props}/>
            <View style= {styles.city}>
                <ImageBackground source={{uri: city.photo}} resizeMode="cover" style={styles.imgCity}>
                    <Text style={styles.textCity}>Welcome to {city.name}!</Text>
                </ImageBackground>
            </View>
                <Text style={styles.text2}>Find the best Itinerary for your next trip!</Text>
                <View style={styles.itineraries}>
                    {itineraryFinally}
            </View>
            <Footer/>
            </ScrollView>
        </View>
    </View>
)
}
const mapStateToProps = (state) => {
    return {
    infoCities: state.cities.cities,
    itineraries: state.itineraries.itineraries,
    userId : state.users._id,
    token: state.users.token
    };
};
const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries,
    getCities: citiesActions.getAllCities,
    getActivitiesByItinerary: itinerariesActions.getActivitiesByItinerary,
    logIn: usersActions.logInLS
}

export default connect(mapStateToProps, mapDispatchToProps)(City);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5F9',
        alignItems: "center",
        width: '100%',
    },
    container2:{
        minHeight: 1000,
        width: '100%',
        alignItems: 'center', 
        zIndex: -1
    },
    city:{
        width: '100%',
        height: 400 ,
    },
    imgCity:{
        width: '100%',
        height: 400 ,
        justifyContent: "center",
        alignItems:"center",
        zIndex: -1
    },
    imgNot:{
        width: 400,
        height: 400 ,
        marginHorizontal: 100
    },
    textCity: {
        fontSize: 40,
        color: 'white',
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
    },
    text2:{
        fontSize: 35,
        textAlign:'center',
        color: 'black',
        opacity: 0.5,
        fontWeight: "bold",
        padding: 15
    },
    itineraries:{
        width: '100%' ,
        minHeight: 500,
        justifyContent: "space-around",
    
    },
})


