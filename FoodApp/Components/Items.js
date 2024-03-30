import { StyleSheet, Text, View ,ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'axios';
const Items = () => {
    const [data,setData] = useState([])
  useEffect(()=>{
    getItems()
  },[])
  const getItems = async()=>{
    await axios.get('http://192.168.1.12:5000/items/getitems')
    .then((res)=>{
        let response = res.data;
        setData(response.data);
    }).catch((err)=>{
        console.log(err.message)
    })
}
const resdata =({item})=>{
    return(
        <TouchableOpacity activeOpacity={0.8} style={{marginTop:5}}>
        <View style={styles.view}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
        </TouchableOpacity>
    )
}
  return (
    <View>
        {data?.length>0?(
            <FlatList data={data} horizontal showsHorizontalScrollIndicator={false} renderItem={resdata}></FlatList>
        ):(
            <View>
                <Text>loading</Text>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )}
    </View>
  )
}

export default Items

const styles = StyleSheet.create({
    view:{
        marginHorizontal:8,
        marginVertical:5,
        padding:5,
        backgroundColor:'#db7893',
        borderRadius:4

    },
    text:{
        paddingHorizontal:4,
        color:'white',
        fontWeight:'500'
    }
})