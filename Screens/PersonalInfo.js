import React,{Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage, StyleSheet} from 'react-native';

export default class PersonalInfo extends Component{
    constructor(props){
        super(props)        
    }
    state={
        cnic:'',
        dataSource:[],
        isloading:true,
    };

    
    componentDidMount(){
        AsyncStorage.getItem('CNIC', (err, result) => {
            if (result !== null) {
                this.setState({
                    cnic: result,
                })
            }
            
        }).then((result)=>{
        const url='https://f8f3f569.ngrok.io/api/Patient/';
        var nic=result;
        var CNICS = nic.replace(/['"]+/g, '')
        var join=url.concat(CNICS);
        return fetch(join)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isloading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });
        });

    }
    render(){
        return(
            <View style={{flex:1, marginStart:20,marginEnd:20, marginTop:30}}>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>personal info</Text>
                <Text style={styles.textStyle1}>{this.state.dataSource.firstName}</Text>
                </View>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>address</Text>
                <Text style={styles.textStyle1}>{this.state.dataSource.address}</Text>
                </View>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>phone Number</Text>
                <Text style={styles.textStyle1}>{this.state.dataSource.phoneNum}</Text>
                </View>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Age</Text>
                <Text style={styles.textStyle1}>{this.state.dataSource.age}</Text>
                </View>
                <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Gender</Text>
                <Text style={styles.textStyle1}>{this.state.dataSource.gender}</Text>
                </View>
                <View style={{marginTop:30,width:100, height:30,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    onPress={()=>{
                        AsyncStorage.removeItem('CNIC');
                        this.props.navigation.navigate('Options');
                    }}
                    style={{shadowOpacity:.1,borderRadius:10,color:'red',width:100, height:30, backgroundColor:'#ff6666', justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'#fff'}}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    textStyle:{
        color:'#9ba3b0',
        fontSize:14
    },
    textStyle1:{
        color:'#000000',
        fontWeight:'bold',

    },
    viewStyle:{
        borderBottomColor:'black',
        borderBottomWidth:1,
        marginTop:30
    }

});