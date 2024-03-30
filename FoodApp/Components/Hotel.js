import { Image, ImageComponent, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
const Hotel = () => {
    const [data,setData] = useState([])
    const getHoteldata = async()=>{
        try{
            await axios.get(`http://192.168.1.12:5000/items/gethotel`)
            .then((res)=>{
                let response = res.data
                setData(response.data)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getHoteldata()
    },[])
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.length>0?(
            data.map((item,index)=>{
                return(
                    <View key={index} style={styles.imageView}>
                    <View>
                        <Image style={styles.image} source={{uri:item?.image}}></Image>
                    </View>
                    <View style={styles.view2}>
                        <Text style={{fontSize:15,fontWeight:'500'}}>{item?.foodName}</Text>
                        <Text>{item?.hotelName}</Text>
                        <Text style={{flex:1,color:'gray'}}>{item?.type}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                        <Ionicons name="time" size={22} color="black" />
                        <Text>{item?.time} mins</Text>
                        </View>
                    </View>
                    </View>
                )
            })
        ):(
            <Text>Loading</Text>
        )}
    </ScrollView>

  )
}

export default Hotel

const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        resizeMode:'cover',
        borderTopLeftRadius:0,
        borderBottomLeftRadius:7,
    },
    imageView:{
        backgroundColor:'white',
        flexDirection:'row',
        margin:10,
        borderRadius:8,
        alignItems:'center',
    },
    view2:{
        padding:10,
        flexDirection:'column'
    }
})