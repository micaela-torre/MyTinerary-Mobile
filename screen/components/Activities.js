import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View } from 'react-native';

const BannerWidth =  500
const BannerHeight = 400;


const Activities =(props) => {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                {props.activities.map((act)=> 
                <View key={act._id}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{uri: act.pic }} />
                </View>
                )}
                </Carousel>
            </View>
        );
    
}
export default  Activities
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});