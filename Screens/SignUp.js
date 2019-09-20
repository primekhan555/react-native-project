
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';


export default class SignUp extends Component {
  constructor(props){
      super(props)
  }
  state={
    cnic:'',
    pass1:'',
    pass2:'',
  }
 
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container1}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
        
          <View style={styles.secondView}>
          <ScrollView>
            <View>
              <Text style={styles.cnicPassText}>CNIC and Password</Text>
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.cnicInput}
                placeholder=" CNIC"
                keyboardType="decimal-pad"
                placeholderTextColor="#ff6666"
                underlineColorAndroid="#ff6666"
                onChangeText={(value)=>{
                  this.setState({
                    cnic:value
                  })

                }}
              />
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.cnicInput}
                placeholder=" Write a Password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#ff6666"
                underlineColorAndroid="#ff6666"
                onChangeText={(password1)=>{
                  this.setState({
                    pass1:password1
                  })
                }}
              />
              
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={styles.cnicInput}
                placeholder=" Confirm Password"
                keyboardType="default"
                secureTextEntry={true}
                placeholderTextColor="#ff6666"
                underlineColorAndroid="#ff6666"
                onChangeText={(password2)=>{
                  this.setState({
                    pass2:password2
                    
                  })
                  
                }}
              />
            </View>
          
            <View style={styles.buttonView}>
              <TouchableOpacity 
              style={styles.opacity}
              onPress={()=>{
                if(this.state.cnic==''){
                  return;
                }
                if(this.state.pass1==''){
                  return;
                }
                if(this.state.pass2==''){
                  return;
                }
                
                var regex=/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
                var hello=regex.test(this.state.cnic);
                if(hello){
                  console.log("your cnic is matching")
                  if(this.state.pass1==this.state.pass2){
                    console.log("password confirmed")

                    fetch('https://00728f51.ngrok.io/api/Employee/2')
                  .then ((response)=>response.status
                  ).then((statusCode)=>{
                      if(statusCode==404){
                          this.props.navigation.navigate('Information1')
                      }
                  })
                  }
                  else{
                    console.log("password is not matching")
                  }
                }
                else{
                  console.log("your cnic is incorrect")                  
                  // this.props.navigation.navigate('Information1')
              }}  
                }>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            
            </View>
            </ScrollView>
          </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#ff6666'
  },
  container1: {
    flex:30,
    height: 300,
    backgroundColor: '#ff6666',
    
  },
  secondView:{
    backgroundColor:'white',
    flex:70,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  signUpText: {
    marginStart: 25,
    color: 'white',
    fontSize: 40,
    marginTop: 50,
    fontWeight:'bold'
  },
  TextInputView:{
    marginTop:20,
    height:50
  }, 
  cnicPassText: {
    marginTop: 30,
    marginStart: 28,
    fontSize:16,
    color: 'black',
    fontWeight: 'bold'
  },
  cnicInput: {
    marginTop: 30,
    marginStart: 10,
    marginEnd:10,
    height: 40,
    fontSize: 16,
    color:'#ff6666'
  },
  buttonView:{
    marginTop: 50,
    borderColor: 'black',
    alignItems: 'center'
  },
  button:{ 
    width:'100'
  },
  opacity:{
    backgroundColor:'#ff6666',
    width:230,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'bold'
  }

});




