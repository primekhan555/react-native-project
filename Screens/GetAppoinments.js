import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import FlatlistData from './FlatListD/FlatlistData';
import HScrollCStyle from '../ScrollComponent/HScrollCStyle';

class FlatListItem extends Component {

    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 9,
                marginTop: 1,
                height: 150,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 20,
                padding: 5,
                alignItems: 'center',
                backgroundColor: this.props.index % 2 == 0 ? '#9e8e8d' : '#ff6666'
            }}
            >
                <TouchableOpacity onPress={() => {
                    alert("hello : " + this.props.index);
                }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }}></TouchableOpacity>

                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, textAlign: 'center' }}>Appointment</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Doctor Name :</Text>
                        <Text style={{ paddingLeft: 5, color: 'white', fontSize: 15, fontWeight: 'bold' }}>{this.props.item.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Appointment Detail :</Text>
                        <Text style={{ width: '40%', height: 25, paddingLeft: 5, color: 'white', fontStyle: 'italic' }}>{this.props.item.description}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Appointment Date :</Text>
                        <Text style={{ paddingLeft: 5, color: 'white' }}>{this.props.item.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Age :</Text>
                            <Text style={{ paddingLeft: 5, color: 'white', fontWeight: 'bold' }}>{this.props.item.hardwareId}</Text>
                        </View>
                        <View style={{ marginLeft: 40, flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 10, color: 'white', fontSize: 15 }}>Weight :</Text>
                            <Text style={{ paddingLeft: 5, color: 'white', fontWeight: 'bold' }}>{this.props.item.type}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


export default class GetAppointments extends Component {

    state = {
        dataSource: [],
        isloading: true,

    };

    componentDidMount() {
        return fetch('https://16e920e5.ngrok.io/api/Hardware/')
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



        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size='large' animating />
                </View>
            )
        }
        else {
            return (
                <View>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item, index }) => {
                            const owners = item.owner;

                            var ownerId = owners.split('#');
                            if (ownerId[1] == 2) {

                                return (

                                    <FlatListItem item={item} index={index}
                                    />
                                    // </FlatListItem>
                                )
                            }
                        }}
                        keyExtractor={(item, index) => index} />
                    {/* </FlatList> */}
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