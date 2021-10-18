import { Card,Button, Image } from 'react-native-elements'
import { Text, View, StyleSheet, ScrollView, TextInput, ToastAndroid } from "react-native";
import Activities from "./Activities";
import { connect } from "react-redux";
import itinerariesActions from "../../redux/actions/itinerariesActions";
import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Itinerary = (props) =>{
    const {
        author,
        hashtag,
        description,
        duration,
        price,
        likes,
        comments,
        _id
    } = props.itinerary;
    const [view, setView] = useState(false)
    const [comment, setComment]= useState('')
    const [arrayComments, setArrayComments]= useState(comments)
    const clickHandler = () => {
        setView(!view);
    };
    let priceDollars = []
    for (let i = 0; i < price; i++) {
        priceDollars.push( <Image key={`box-${i}`} source={{uri: 'https://i.postimg.cc/brXD3Qsj/iconos-de-dinero.png'}} style={styles.icon}/> );
    }
    const [allLikes, setAllLikes] = useState(likes)
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        async function getActivitiesByItinerary() {
        try {
            let res = await props.getActivitiesByItinerary(_id);
            setActivities(res.data.response)
        } catch (error) {
            console.log(error);
        }
    }
        getActivitiesByItinerary();
    }, [view])


    var clickLike = async () => {
    
    if(!props.token) {
        ToastAndroid.showWithGravityAndOffset(
            "Please, Login to like!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            50,
            50
        )
    }else {
        try{
        let res = await  props.putLike(_id,{userId:props.user_Id},props.token)
            setAllLikes(res.data.response, ...likes)
           //  if(res.data.success) {
        //  }
    
    }catch(e) {
        console.log(e)
    }
    }
}

    const hart = allLikes.includes(props.user_Id) 
    ? 'https://i.postimg.cc/Hkvc8G0K/love.png'
    : 'https://i.postimg.cc/13Xt0n45/like.png'

    const createComment = async() =>{
        if(comment === ""){
            ToastAndroid.showWithGravityAndOffset(
                "comment cannot be empty!",
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                50,
                50
            )
            return false
        }
        try{
            let res = await props.createComment(_id , {comments: {comment : comment , name: props.name, lastname: props.lastname , url: props.url}}, props.token)
        if(res.success){
            let newComment= {userId: props.user_Id, comment , name: props.name, lastname: props.lastname , url: props.url}
            setArrayComments([...arrayComments , newComment])
        }
        }catch(e){
            console.log(e)
        }
    }

    return(
        <Card key={_id}> 
        <Card.Title style={{textTransform: 'uppercase' , fontSize: 25}}>{description}</Card.Title>
        <Card.Divider/>
            <View style={styles.cardIti}>
                    <View>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={{ uri: author.photo}}
                        />
                            <Text style={styles.by}>by {author.nombre}</Text>
                    </View>
                <View style={styles.cajita}>
                <View>
                <View style={styles.row}>
                <TouchableOpacity onPress={clickLike}>
                    <Image source={{uri:hart}} style={styles.like}/> 
                    </TouchableOpacity>
                    <Text style={styles.textProp}>{props.token && allLikes.length ||  likes.length}</Text>
                </View>
                </View>
                <View style={styles.row}>
                { hashtag.map((hast)=><Text key={hast} style={styles.hastash} >#{hast}</Text>)}
                </View>
                    <View style={styles.cardIti} >
                        <View style={styles.row}>
                        <Text style={styles.textProp}>{duration} hours</Text>
                    <Image source={{uri: 'https://i.postimg.cc/nzhn4MHG/reloj.png'}}  style={styles.icon}></Image>
                        </View>
                        <View  style={styles.row} >
                            <Text style={styles.textProp}>
                                Price:
                            </Text>
                            {priceDollars}
                        </View>
                    </View>
                </View>
            </View>
            {view && (<View  style={styles.sectionActivity} >
            <View style={styles.activity}>
                <Activities activities={activities}/>
            </View>
            <View style={styles.comments}>
                <ScrollView>
                <Text style={styles.text2}>Comments</Text>
                {
                arrayComments.map((comment, index)=> (<View key={index} style={styles.caja}>
                    <View style={styles.userCaja}  >
                        <Image style={styles.user} source={{uri: comment.url}}/>
                        <Text style={styles.commentText}>{comment.name} {comment.lastname}</Text>
                    </View>
                    <View style={styles.comment}>
                    <Text style={styles.commentText}>{comment.comment.text}</Text>
                    </View>
                </View>))}
                </ScrollView>
            </View>
            <TextInput style={styles.input}  placeholder={props.token ? ' Write a comment .... ' : 'You must be logged in to comment..' }
            editable= {props.token ? true : false} 
            onChange={(e)=> setComment(e.nativeEvent) }
            /> 
            <Button title= 'Enviar' color='red' onPress={createComment}/>
        </View>)}
        <Button
                title={!view ? "See More" : "See Less"}
                onPress= {clickHandler}
                type="outline"
            />
    </Card>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.users.token,
        name: state.users.name,
        lastname: state.users.lastname,
        url: state.users.url,
        user_Id: state.users._id
    }
}
const mapDispatchToProps = {
    getActivitiesByItinerary: itinerariesActions.getActivitiesByItinerary,
    putLike: itinerariesActions.putLike,
    createComment: itinerariesActions.createComment
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);

const styles = StyleSheet.create({
    image: {
        width:150,
        height: 150,
        borderRadius: 100,
        marginLeft: 25
    },
    cardIti:{
        width: '100%',
        flexDirection:'row',
        alignItems:"center",
        justifyContent: "space-evenly",
    },
    hastash:{
        fontSize: 25,
        color: '#4630EB'
    },
    cajita:{
        width: '60%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 5
    },
    like: {
        width: 50 ,
        height: 50,
        margin: 5
    },
    icon: {
        width: 25 ,
        height: 25,
        margin: 5
    },
    by:{
        fontSize: 23,
        textAlign: 'center'
    },
    comments:{
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
    },
        elevation: 2,
        minHeight: 300,
        marginVertical: 20,
        borderRadius: 5,
        padding: 15
    },
    text2:{
        fontSize: 35,
        textAlign:'center',
        color: 'black',
        opacity: 0.5,
        fontWeight: "bold",
        padding: 15
    },
    activity:{
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: 300,
        marginVertical: 20
    },
    input: {
        width: '100%',
        height: 48,
        backgroundColor: 'white',
        borderRadius: 1,
        marginVertical: 15,
        paddingHorizontal: 10,
        fontSize: 20,
        borderColor: 'black',
        borderWidth:1
    },
    row:{
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textProp:{
        fontSize:22
    },
    caja:{
        width: '100%',
        height: 150,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    userCaja:{
        minWidth:'40%',
        alignItems:'center',
        marginTop: 40
    },
    user: {
        width: 90,
        height: 90,
        borderRadius: 100
    },
    commentText:{
        fontSize: 20,
        textAlign: 'center'
    },
    comment:{
        backgroundColor: 'rgb(239,172,122)',
        width: '60%',
        minHeight: 100,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
    },
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})