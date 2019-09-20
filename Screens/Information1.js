import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput,ScrollView, TouchableOpacity, Picker} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { white, black } from 'ansi-colors';

export default class Information1 extends Component{
    state={
        choosenIndex:1,
        date:"2015-01-01"
    };
    
    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles.firstContainer}>
                    <Text style={styles.textFirstContainer}>Information</Text>
                </View>
                <View style={styles.mainSecondContainer}>
                    <ScrollView>
                <View style={styles.secondContainer}>
                    <View style={styles.TextInputContainer}>
                        <Text style={{marginBottom:5, fontWeight:'bold'}}>Your Full Name</Text>
                        <TextInput 
                        placeholder='Full Name'
                        textContentType="name"
                        keyboardType="name-phone-pad"
                        placeholderTextColor='#ff6666'
                        underlineColorAndroid='#ff6666'
                        />
                    </View>
                    <View style={styles.TextInputContainer}>
                        <Text style={{marginBottom:5, fontWeight:'bold'}}>Email Address</Text>
                        <TextInput 
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder='Email'
                        placeholderTextColor='#ff6666'
                        underlineColorAndroid='#ff6666'
                        />
                    </View>
                    <View><Text style={{marginLeft:10, marginBottom:5,fontWeight:'bold'}}>Gender</Text></View>
                    
                    <View style={styles.pickerContainer}>
                    <Picker style={styles.pickerStyle}  
                        selectedValue={this.state.gender}  
                        onValueChange={(itemValue, itemPosition) =>  
                            this.setState({gender: itemValue, choosenIndex: itemPosition})}  
                    >  
                        <Picker.Item label="Male" value="Male" />  
                        <Picker.Item label="Female" value="Female" />  
                    </Picker>
                    </View>
                    <View><Text style={{marginLeft:10, marginBottom:5,fontWeight:'bold'}}>Date of Birth</Text></View>
                    <View style={{margin:10}}>
                        <DatePicker 
                        style={{width:210}}
                        mode="date"
                        date={this.state.date}
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1990-01-01"
                        maxDate="2019-01-01"
                        showIcon={true}
                        customStyles={{
                            dateIcon:{
                                position:'relative',
                                left:0,
                                top:4,
                                marginLeft:0
                            },
                            dateInput:{
                                marginLeft:10
                            }
                        }}
                        onDateChange={(newDate)=>{
                            this.setState({date:newDate})
                        }}
                        />
                    </View>
                    
                    <View style={styles.nextOpacityView}> 
                    <TouchableOpacity style={styles.nextOpacity}
                    onPress={()=>{
                        this.props.navigation.navigate('GetAppointments')
                    }}>
                        <Text style={styles.textnextOpacity}>Next</Text>
                    </TouchableOpacity>
                    </View>
                    
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
        flex:25,
        backgroundColor:'#ff6666',
        
    },
    textFirstContainer:{
        color:'white',
        fontSize:40,
        marginLeft:25,
        marginTop:35

    },
    mainSecondContainer:{
        flex:75,
        backgroundColor:'white',
        borderTopStartRadius:40,
        borderTopEndRadius:40,
    },
    secondContainer:{
        flex:1,
        height:410,        
        backgroundColor:'white',
        margin:30,
        borderRadius:20,
        borderColor:'#ff6666',
        borderWidth:1
    },
    TextInputContainer:{
        margin:10
    },
    nextOpacityView:{
        width:100,
        height:35,
        backgroundColor:'white',
        borderRadius:10,
        marginStart:180,
        marginEnd:20,
        marginBottom:20,    
        
    },
    nextOpacity:{
        width:100,
        height:35,
        backgroundColor:'#ff6666',
        borderRadius:10,
        justifyContent:"center"
    },
    textnextOpacity:{
        color:'white',
        textAlign:'center'
        
    },
    pickerContainer: {   
        alignItems: 'flex-start',  
        justifyContent: 'flex-start',
        marginLeft:20, 
        marginBottom:10 
    }, 
    pickerStyle:{  
        height: 60,  
        width: "60%",  
        color: '#ff6666',  
        justifyContent: 'center',  
    }, 
});