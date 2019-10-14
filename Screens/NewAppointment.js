import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';

export default class NewAppointment extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ff6666'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    marginStart: 8,
                    marginEnd: 8,
                    marginTop: 8,
                    marginBottom: 8,
                    borderRadius: 20
                }}>
                    <ScrollView>
                        <View style={{
                            margin: 20
                        }}>
                            <View
                            style={{
                                marginTop:10
                            }}
                            >
                                <Text
                                style={{
                                    fontWeight:'bold'
                                }}
                                >Disease Type</Text>
                                <TextInput
                                placeholder='Enter Disease Type here' 
                                underlineColorAndroid='black'
                                />
                            </View>
                            <View style={{
                                marginTop:25
                            }}>
                                <Text
                                style={{
                                    fontWeight:'bold'
                                }}
                                >Medicines</Text>
                                <TextInput
                                placeholder='Enter Medicines here' 
                                underlineColorAndroid='black'
                                />
                            </View>


                        </View>
                    </ScrollView>

                </View>

            </View>
        );
    }
}