import { View,StyleSheet,Text,ScrollView, TouchableOpacity,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { URL_GET_CATEGORIES, URL_PRODUCT } from '../constants/api-urls';
import ListProducts from '../components/ListProducts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather'
import Filter from '../components/Filter';
export default function Home({navigation}) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsCat,setProductsCat]=useState([]);
    const [selectedCategory,setSelectedCategory] =useState('');
    const[isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        //get all categories 
        getCategories();
        //get all products
        getProducts();
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        
    },[]);

    useEffect(()=>{
        getProductByCategory(selectedCategory)
    },[selectedCategory])

    const getCategories = async()=>{
        const categorieList= await axios.get(URL_GET_CATEGORIES);
        setCategories(categorieList.data);
    }
    
    const getProducts = async()=>{
        try{
            const productList = await axios.get(URL_PRODUCT);
            setProducts(productList.data);
            setProductsCat(productList.data);
        }catch(e){
            setProducts([])
        }
        
    }
    
    const getProductByCategory= (selectedCategory)=>{
        if(selectedCategory!=='all'){
            const filtredproduct= products.filter(item=>item.category===selectedCategory )
            setProductsCat(filtredproduct);
        }else{
            getProducts();
      }   
    }
 
    const getCategory =(selectedCategory)=>{
         setSelectedCategory(selectedCategory);
    }

    const navigateToAddProduct = () =>{
        navigation.navigate('AddProduct',{categories})
    }

  return (
     
       isLoading ? (
           <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                 <ActivityIndicator size="small" color="#000" />
                 <Text>Welcome</Text>
           </SafeAreaView>
       )

       :
       (
        <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}> UPayement Store</Text>
            <Feather name="search" size={20} />
          </View>
  
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.listCategories}>
              <Filter name="all" key={0} 
              getCategory={getCategory}/>
              {categories.map(item => (
                <Filter
                  key={item.id}
                  name={item.name}
                  getCategory={getCategory}
                />
              ))}
            </View>
          </ScrollView>
  
          <ListProducts items={productsCat} navigation={navigation} />
        </View>
        <TouchableOpacity style={styles.addProduct}>
            <Feather name='plus' size={30} color='#fff' onPress={navigateToAddProduct}/>
        </TouchableOpacity>
      </SafeAreaView>
       )
              
     
    
  );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EEEEEE',
       
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    headerTitle:{
        fontStyle:'italic',
        fontSize:18,
        fontWeight:'700'
    },
    listCategories:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:10
    },
    addProduct:{
        position:'absolute',
        bottom:130,
        zIndex:1,
        right:10,
        backgroundColor:'#000',
        height:50,
        width:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    }

})