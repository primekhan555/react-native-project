import React,{Component} from 'react';
import {View, Text, TextInput, StyleSheet,TouchableOpacity, ScrollView} from 'react-native';
import { voidTypeAnnotation } from '@babel/types';
import { sync } from 'realpath-native';

export default class SignIn extends Component{
    constructor(props){
        super(props)
    }

    state={
        nic:'',
        pass:'',
        isLoading:true,
        dataSource:'',
    }
    render(){
        return(
            <View style={styles.mainContainer}>
                <View style= {styles.firstContainer}>
                    <Text style={styles.firstContainerText}>Sign In</Text>
                </View>
                <View style={styles.secondContainer}>
                    <ScrollView>
                    <View style={styles.TextInputView}>
                        <TextInput
                        style={styles.TextInput}
                        placeholder=" CNIC"
                        keyboardType="default"
                        placeholderTextColor="#ff6666"
                        underlineColorAndroid="#ff6666"
                        onChangeText={(cnic)=>{
                            this.setState({
                                nic:cnic,
                            })
                        }}
                        />
                    </View>
                    <View style={styles.TextInputView}>
                        <TextInput
                        style={styles.TextInput}
                        placeholder=" Password"
                        keyboardType="default"
                        secureTextEntry={true}
                        borderTopStartRadius
                        placeholderTextColor="#ff6666"
                        underlineColorAndroid="#ff6666"
                        onChangeText={(password)=>{
                            this.setState({
                                pass:password,
                            })
                        }}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                        style={styles.opacity}
                         onPress={()=>{
                             const url='https://8064a35a.ngrok.io/api/Employee/';
                             const key=this.state.nic;
                             const join=url.concat(key);
                             console.log(join)
                            fetch(join)
                            .then ((response)=>response.status
                            ).then((statusCode)=>{
                                console.log(statusCode)
                                if(statusCode==404){
                                    console.log("please sign up first")
                                }
                                else if(statusCode==200){
                                    fetch(join)
                                    .then((response)=>response.json())
                                    .then((responseJson)=>{
                                        this.setState({
                                            isLoading:false,
                                            dataSource:responseJson.firstName,

                                        })
                                    })
                                    // .then(()=>{
                                    //     if(this.state.dataSource==this.state.pass){
                                    //         console.log("going to next screen")
                                    //         // this.props.navigation.navigate('GetAppointments')
                                    //     }
                                    //     else{
                                    //         console.log("password is incorrect")
                                    //     }

                                    // })
                                    .catch((error)=>{
                                        console.error(error)
                                    });
                                    // console.log(this.state.dataSource)
                                    
                                    
                                }
                            })
                            
                         }}>
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
    firstContainer:{
        flex:30,
        height:300,
        backgroundColor:'#ff6666',
    },
    secondContainer:{
        flex:70,
        backgroundColor:'white',
        borderTopStartRadius:40,
        borderTopEndRadius:40,
    },
    firstContainerText:{
        color:'white',
        fontWeight:'bold',
        fontSize:40,
        marginTop:50,
        marginStart:25
    },
    TextInput: {
        marginTop: 45,
        marginStart: 10,
        marginEnd:10,
        height: 40,
        fontSize: 16,
        color:'#ff6666'
      },
      TextInputView:{
          marginTop:20,
          height:70  
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
      },
      buttonView:{
        marginTop: 50,
        borderColor: 'black',
        alignItems: 'center'
      },
});
