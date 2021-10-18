import React, { useEffect} from "react";
import{ Text, StyleSheet, View, ImageBackground, TextInput, ScrollView } from "react-native";
import Cabecera from "./components/Cabecera";
import Footer from "./components/Footer";
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions"
import { Searchbar } from 'react-native-paper';


const Cities = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        async function getCities() {
        try {
            await props.getCities()
        } catch (error) {
            console.log(error)
        }
    }
        getCities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    var allCities = props.citiesFilter.map((city)=> <ImageBackground key={city._id} source={{uri : city.photo}} style={styles.card}>
        <Text onPress={() => {
                        props.navigation.navigate('City', {id : city._id})}} style={styles.textCard}>{city.name}</Text>
    </ImageBackground>)

    const cityNotFound = (
        <View>
            <ImageBackground source={{uri: 'https://i.postimg.cc/DwhkvyvX/ups.png'}} style={styles.card}>
            </ImageBackground>
        </View>
);
    
    var allCitiesFinally =
        props.citiesFilter.length !== 0 ? allCities : cityNotFound;
return (
<View style={styles.container}>
        <ScrollView>
        <View style={styles.container2}>
        <Cabecera {...props}/>
        <View style={styles.fondo}>
            <ImageBackground source={{uri: 'https://i.postimg.cc/DytXWQch/photo-1448518184296-a22facb4446f-ixid-Mnwx-Mj-A3f-DB8-MHxwa-G90by1w-YWdlf-Hx8f-GVuf-DB8f-Hx8-ixlib-rb-1-2.jpg'}} style={styles.fondoImg}>
        <Text style={styles.tituloCities}>Find Your Adventure!</Text>
        </ImageBackground>
        </View>

    <Searchbar style={styles.input} 
        placeholder="Search a City"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onChange={(e) => props.filterCity(e.nativeEvent.text.toLowerCase())}
    />

        <View style={styles.cities}>
            {allCitiesFinally}
        </View>
            <Footer/>
        </View>
        </ScrollView>
    </View>

)
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#E5E5F9',
    alignItems: "center",
    width: '100%'
},
container2:{
    minHeight: 1200,
    width: '100%',
    alignItems: 'center', 
},
tituloCities: {
    fontSize: 45,
    textAlign:'center',
    color: 'white',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
},
fondo: {
    width:' 100%',
    height: 300

},
fondoImg:{
    width:' 100%',
    height: 300,
    zIndex: -1
},
input: {
    width: '80%',
    height: 55,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 15,
    padding:15
},
cities:{
    width: '100%',
    minHeight: 600,
    alignItems:"center",
    justifyContent: "center",
    paddingHorizontal:15
},
card:{
    width: 550,
    height: 280 ,
    justifyContent: "center",
    marginVertical: 10
},
textCard:{
    textAlign: "center",
    textTransform:"uppercase",
    color: 'white',
    fontSize: 40,
    backgroundColor: '#1d1d1d65'
}

});

const mapStateToProps = (state) => {
    return {
        citiesFilter: state.cities.filterCities,
    };
};
const mapDispatchToProps = {
    getCities: citiesActions.getAllCities,
    filterCity: citiesActions.filterCity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);