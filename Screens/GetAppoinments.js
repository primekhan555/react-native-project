import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList,ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import FlatlistData from './FlatListD/FlatlistData';
import HScrollCStyle from '../ScrollComponent/HScrollCStyle';

class FlatListItem extends Component {
    state = {
        control: 'expand',
        viewHeight: 150,
        detail: '',
        height:'',
        textColor:'',
    };
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9,
                marginTop: 1,
                height: this.state.viewHeight,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                padding: 5,
                alignItems: 'center',
                backgroundColor: this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}
            >
                <TouchableOpacity onPress={() => {
                    // alert("hello : " + this.props.index);
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}></TouchableOpacity>

                <View style={{ marginTop: 5, flexDirection: "row", width:150 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, textAlign: 'auto' }}>Appointment</Text>
                    <Text style={{ marginStart: 50, color: 'white', textAlign:'right'}}
                        onPress={() => {
                            if (this.state.control == "expand") {
                                this.setState({
                                    control: 'condense',
                                    viewHeight: 280,
                                    detail: this.props.item.diseaseType,
                                    height:20,
                                  
                                })
                            }
                            else {
                                this.setState({
                                    control: 'expand',
                                    viewHeight: 150,
                                    detail:'',
                                })
                            }
                        }}
                    >{this.state.control}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Doctor Name :</Text>
                        <Text style={{ paddingLeft: 5, color: 'white', fontSize: 15, fontWeight: 'bold' }}>{this.props.item.doctorName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Appointment Detail :</Text>
                        <Text style={{ width: '40%', height: 25, paddingLeft: 5, color: 'white', fontStyle: 'italic' }}>{this.props.item.diseaseType}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Appointment Date :</Text>
                        <Text style={{ paddingLeft: 5, color: 'white' }}>{this.props.item.dateVisited}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Age :</Text>
                            <Text style={{ paddingLeft: 5, color: 'white', fontWeight: 'bold' }}>{this.props.item.testResult}</Text>
                        </View>
                        <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Weight :</Text>
                            <Text style={{ paddingLeft: 5, color: 'white', fontWeight: 'bold' }}>{this.props.item.type}</Text>
                        </View>

                    </View>
                    {/* <View style={{height:this.state.height,}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View>
                    <View style={{height:this.state.height}}><Text style={{color:'#ffffff'}}>{this.state.detail}</Text></View> */}
                </View>
            </View>
        );
    }
}


export default class GetAppointments extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        dataSource: [],
        isloading:true,
        CNIC: '',

    };

    componentDidMount() {
        AsyncStorage.getItem('CNIC', (err, result) => {
            if (result !== null) {
                this.setState({
                    CNIC: result,
                })
                console.log("this is the get appointment " + result);
            }
        });
        return fetch('https://7b2933c3.ngrok.io/api/Disease/')
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

    }
    render() {
        // return(
        // <View style={{flex:1}}>
        //     <View style={{ height:135, }}>
        //         <ScrollView horizontal={true}>
        //             <HScrollCStyle imageUri={require('../scrollImages/heart.png')}
        //             name='Heart' />
        //             <HScrollCStyle imageUri={require('../scrollImages/brain.png')}
        //             name='Brain' />
        //             <HScrollCStyle imageUri={require('../scrollImages/lungs.png')}
        //             name='Lungs' />
        //             <HScrollCStyle imageUri={require('../scrollImages/kidneys.png')}
        //             name='Kidneys' />
        //             <HScrollCStyle imageUri={require('../scrollImages/knee-joint.png')}
        //             name='Knee-Joint' />
        //             <HScrollCStyle imageUri={require('../scrollImages/stomach.png')}
        //             name='Stomach' />

        //         </ScrollView>
        //     </View>
        //     </View>

        if (this.state.isloading) {
            return (
                <View>
                    <ActivityIndicator size='large' animating={true} />
                </View>
            )
        }
        else {
            return (
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item, index }) => {
                            const owners = item.patient;
                            var ownerId = owners.split('#');
                            console.log(ownerId[1])
                            console.log(this.state.CNIC)
                            var CNICS = this.state.CNIC.replace(/['"]+/g, '')
                            console.log(CNICS)
                            if (ownerId[1] == CNICS) {
                                console.log("if is executing");
                                return (
                                    // <View></View>
                                    <FlatListItem item={item} index={index} />
                                );
                            }
                            else {
                                console.log("if is not executing")
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            )
        }
        {/* ) */ }
    }
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 106,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 2,
        marginRight: 3
    },

});