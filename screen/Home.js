import React, {useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground , ScrollView,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Cabecera  from '../screen/components/Cabecera';
import Carousel from 'react-native-banner-carousel';
import Footer from './components/Footer'
import { connect } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions'
import { ActivityIndicator, Colors } from 'react-native-paper';


const Home = (props) => { 
  useEffect(()=>{
      try{
      setTimeout(()=>{
        props.getCities()
      },1500)
      }catch(e){
        console.log(e)
      }
  }, [])
  const BannerWidth =  550
  const BannerHeight = 600

    return(
      <View style={styles.container}>
          <ScrollView>
        <View style={styles.container2}>
            <View>
                <Cabecera {...props}/>
      <View style={styles.hero}>
      <ImageBackground source={{uri: 'https://i.postimg.cc/pT8hRRQp/Dise-o-sin-t-tulo-42.png'}} resizeMode="cover" resizeMethod={'auto'} style={styles.image}>  
          <Text style={styles.subtitulo}>Find your perfect trip, designed by insiders who know and love their cities! Choose your destination </Text>
            <TouchableOpacity onPress={() => {
                        props.navigation.navigate('Cities')
                    }}>
            
                <Image source={{uri:'https://i.postimg.cc/tgxsy9y8/CLICKHERE.png'}} style={styles.buttonImg}/>
            
            </TouchableOpacity>
          </ImageBackground> 
      </View>
            </View>
            <View style= {styles.carousel}>
              <Text style= {styles.carouselText}>Popular MYtineraries</Text>
                  { !props.cities.length && <ActivityIndicator animating={true} type ="large" color='rgb(147,79,243)' />}
              <View style={styles.container3}>
                <Carousel
                    autoplay
                    autoplayTimeout={2500}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                {props.cities.map((act)=> 
                <View key={act._id}>
                <ImageBackground style={{ width: BannerWidth, height: BannerHeight }} source={{uri: act.photo }} resizeMode="cover" >
                  <Text style={styles.textCard}>{act.country}</Text>
                  </ImageBackground>
                </View>
                )}
                </Carousel>
            </View>
            </View>
          <Footer/>
      </View>
        </ScrollView>
  </View>
    

    )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities.cities,
  }
}
const mapDispatchToProps ={
  getCities: citiesActions.getAllCities
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'yellow',
    },
    container2:{
      minHeight: 1200,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',     
      backgroundColor: '#E5E5F9'
    },
    image: {
      justifyContent:'center',
      height: 600,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      
    },
    container3: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center'
  },

    hero:{
      width: '100%',
      height: 550,
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    subtitulo: {
      fontSize: 30,
      color: 'white',
      fontWeight: "bold",
      textAlign: "center",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },

    button: {
      width: 180,
      height:180 ,
      borderRadius: 280,
      backgroundColor: '#3A3535',
    },
    buttonImg:{
    width:180,
    height:180,
    },
    carousel:{
      width: '100%',
      justifyContent: 'center',
      alignItems:'center',
    },
    carouselText:{
      fontSize: 45,
      textAlign:'center',
      color: 'black',
      opacity: 0.5,
      fontWeight: "bold",
      padding:25
    },
    textCard:{
      color: 'white',
      fontSize: 30,
      textTransform: 'uppercase',
      backgroundColor: '#1d1d1d65',
      width : '50%',
      height:100,
      textAlign:'center',
      padding: 15
    }
  })
  