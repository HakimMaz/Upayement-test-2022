import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React ,{useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ErrorMessage, Formik} from 'formik';
import Filter from '../components/Filter'
import axios from 'axios';
import { URL_PRODUCT } from '../constants/api-urls';
import SweetAlert from 'react-native-sweet-alert';
import * as Yup from 'yup';

export default function AddProduct({navigation, route}) {
    const [selectedCategory,setSelectedCategory] =useState('');
  const {categories} = route.params;

  const backToHome = () => {
    navigation.navigate('Home');
  };

  const getCategory =(selectedCategory)=>{
    setSelectedCategory(selectedCategory);
}

const addProduct = async(product)=>{
     const result =await axios.post(URL_PRODUCT,product);
     console.log({result})
}
const showToastSuccess = () => {
    SweetAlert.showAlertWithOptions({
        title: 'Succes',
        subTitle: 'Product added succesfuly',
        confirmButtonTitle: 'OK',
        //confirmButtonColor: '#'
        style: 'success',
        cancellable: true
      })
  }
const showToastError =() =>{

}
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={backToHome}>
        <Ionicons name="arrow-back-outline" size={25} />
      </TouchableOpacity>

      <Formik
        initialValues={{
          name: '',
          price: null,
          description: '',
          avatar: '',
          category: '',
        }}
        validationSchema ={ 
            Yup.object().shape({
                name: Yup.string().required('Title is required!'),
                price: Yup.number().min(0).max(1000000).required('Price is required!'),
                image :Yup.string().required('Image is required')
        })}
        onSubmit={(values) =>{        
           values.category=selectedCategory;
           console.log({values});
           try{
            addProduct(values);
            //showToastSuccess();
            setTimeout(() => {
                navigation.navigate('Home')
            }, 2000);
           }catch(e){
            //showToastError();
           }
        }
           
        }>
        {({handleChange, handleBlur, handleSubmit, values,errors}) => (
          <View style={styles.formProdcut}>
            <View style={styles.inputArea}>
              <Text style={styles.label}>Product Title </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
             {errors.name ? (
             <Text style={styles.error}>{errors.name}</Text>
           ) : null}
            </View>
            <View style={styles.inputArea}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType='numeric'
              />
                 {errors.price ? (
                  <Text style={styles.error}>{errors.price}</Text>
           ) : null}
            </View>
            <View style={styles.inputArea}>
              <Text style={styles.label}> Description</Text>
              <TextInput
                style={styles.areatext}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('desription')}
                value={values.description}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputArea}>
              <Text style={styles.label}> Image URL</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('avatar')}
                onBlur={handleBlur('avatar')}
                value={values.avatar}
              />
              {errors.image ? (
                  <Text style={styles.error}>{errors.image}</Text>
           ) : null}
              </View>
              <Text> Selected category: {selectedCategory}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.listCategories}>
                  {categories.map(item => (
                    <Filter
                      key={item.id}
                      name={item.name}
                      getCategory={getCategory}
                    />
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.titleButton}>Add Product</Text>
              </TouchableOpacity>
            
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
  },
  icon: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 25,
    top: 60,
    left: 15,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formProdcut: {
    marginTop: 70,
    padding: 20,
  },
  inputArea: {
    flexDirection: 'column',
    marginBottom:20
  },
  areatext:{
    width: '100%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
    paddingHorizontal: 10,
    
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  listCategories:{
    flexDirection:'row',
    marginTop:20,
    marginBottom:10
},
  addButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 20,
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  error:{
      color:'red'
  }
});
