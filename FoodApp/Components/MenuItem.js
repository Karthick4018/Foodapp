import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React from 'react'
import { FontAwesome } from "@expo/vector-icons";

const MenuItem = ({item}) => {
  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", width: 220 }}>
            {item?.itemname}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            ₹{item?.price}
          </Text>
          <Text
            style={{
              marginTop: 5,
              borderRadius: 4,
            }}
          >
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                // key={`${food.id}-${i}`}
                key={i}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </Text>
          <Text
            style={{ width: 200, marginTop: 8, color: "gray", fontSize: 16 }}
          >
            {item?.description.length > 40
              ? item?.description.substr(0, 37) + "..."
              : item?.description}
          </Text>
        </View>

        <Pressable style={{ marginRight: 10 }}>
          <Image style={{ width: 120, height: 120, borderRadius: 8 }} source={{ uri: item?.image }}/>
          <Pressable style={styles.addbtn}>
            <Text>ADD</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </View>
  )
}

export default MenuItem

const styles = StyleSheet.create({
  addbtn:{
    position:'absolute',
    top:95,
    left:20,
    borderColor:'e32636',
    borderWidth:1,
    flexDirection:'row',
    paddingHorizontal:25,
    paddingVertical:5,
    alignItems:'center',
    borderRadius:5
  }
})