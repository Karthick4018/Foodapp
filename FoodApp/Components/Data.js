import { ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Data = () => {
    const [data,setData] = useState([]);
    const getData = async()=>{
        try{
            await axios.get(`http://192.168.1.12:5000/items/getdata`).then((res)=>{
                let response = res.data;
                setData(response.data);
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data?.length>0?(
                data?.map((item,index)=>{
                    return(
                        <View key={index} style={styles.view1}>
                            <Image source={{uri:item?.image}} style={styles.image}></Image>
                            <Text style={styles.text1}>{item?.name}</Text>
                            <Text style={styles.text2}>{item?.description}</Text>
                        </View>
                    )
                })
            ):(
                <Text>loading</Text>
            )}
        </ScrollView>
    </View>
  )
}

export default Data

const styles = StyleSheet.create({
    image:{
        width:58,
        height:58
    },
    view1:{
        width:90,
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:1,
        borderRadius:5,
        borderColor:'#e0e0e0',
        marginLeft:10,
        marginVertical:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
        
    },
    text1:{
        fontSize:13,
        fontWeight:'500',
        marginTop:6
    },
    text2:{
        fontSize:12,
        color:'gray',
        marginTop:3
    }
})