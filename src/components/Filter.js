import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Filter({name,getCategory}) {
    const setCategory =(name)=>{
        getCategory(name);
    }
  return (
    <TouchableOpacity style={styles.container} onPress={()=>setCategory(name)}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        height:40,
        borderRadius:30,
        borderColor:'#000',
        borderWidth:2,
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:10,
        marginHorizontal:5,
       
    }
})