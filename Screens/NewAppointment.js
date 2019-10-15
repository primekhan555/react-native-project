import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import AppointmentQR from './AppointmentQR';


export default class NewAppointment extends Component {
    state = {
        diseaseTypes:'',
        medicines:'',
        visitDate: '2019-10-13',
        LabTest: "Not_Taken",
    };
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
                    borderRadius: 20,
                    alignItems:'center'
                }}>
                    <ScrollView>
                        <View style={{
                            margin: 20
                        }}>
                            <View
                                style={{
                                    marginTop: 10
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >Disease Type</Text>
                                <TextInput
                                    placeholder='Enter Disease Type here'
                                    underlineColorAndroid='black'
                                    onChangeText={(value)=>{
                                        this.setState({
                                            diseaseTypes:value,
                                        })
                                    }}
                                />
                            </View>
                            <View style={{
                                marginTop: 25
                            }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >Medicines</Text>
                                <TextInput
                                    placeholder='Enter Medicines here'
                                    underlineColorAndroid='black'
                                    onChangeText={(value)=>{
                                        this.setState({
                                            medicines:value,
                                        })
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 25
                                }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}>Date Visited</Text>
                                <DatePicker
                                    style={{
                                        marginTop: 18,
                                        width: 310,
                                        marginStart: -8
                                    }}
                                    mode="date"
                                    date={this.state.visitDate}
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="1980-01-01"
                                    maxDate="2050-01-01"
                                    showIcon={false}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'relative',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 10
                                        }
                                    }}
                                    onDateChange={(newDate) => {
                                        var fullDate = newDate.concat("T00:00:00.000Z");
                                        this.setState({
                                            visitDate: fullDate
                                        })
                                    }}
                                />
                            </View>
                            <View style={{
                                marginTop: 25
                            }}>
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >Lab Tests </Text>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker style={styles.pickerStyle}
                                    selectedValue={this.state.LabTest}
                                    onValueChange={(itemValue, itemPosition) => {
                                        this.setState({
                                            LabTest: itemValue,
                                            choosenIndex: itemPosition
                                        })
                                    }}>
                                    <Picker.Item label="Not_Taken" value="Not_Taken" />
                                    <Picker.Item label="Taken" value="Taken" />
                                </Picker>
                            </View>
                            {/* <View>
                                <TextInput></TextInput>
                            </View> */}
                            <View
                            style={{
                                marginTop:25,
                                width:200,
                                height:40,
                                alignSelf:'center',
                                borderRadius:7,
                            }}>
                                <TouchableOpacity style={{
                                    height:40,
                                    backgroundColor:'#ff6666',
                                    borderRadius:7,
                                    justifyContent:'center',
                                }}
                                onPress={()=>{
                                    this.props.navigation.navigate('AppointmentQR',{
                                        diseaseTypes:this.state.diseaseTypes,
                                        medicines:this.state.medicines,
                                        visitDate:this.state.visitDate,
                                        LabTest:this.state.LabTest
                                    })
                                }}>
                                    <Text
                                    style={{
                                        alignSelf:'center',
                                        fontWeight:'bold',
                                        letterSpacing:0.4,
                                        fontSize:16,
                                        color:'white'
                                    }}
                                    >Generate</Text>

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
    pickerContainer: {
        marginTop: 18,
        borderWidth: 1,
        borderColor: 'gray'
    },
    pickerStyle: {
        height: 40,
        width: "100%",
        justifyContent: 'center',
    },
})