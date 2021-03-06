import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    Picker,
    AsyncStorage,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class NewAppointment extends Component {
    state = {
        diseaseTypes: '',
        medicines: '',
        visitDate: '2019-10-13',
        LabTest: "Not_Taken",
        status: true,
        transType: 'doctor',
        CNIC: '',
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
                    alignItems: 'center'
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
                                    onChangeText={(value) => {
                                        this.setState({
                                            diseaseTypes: value,
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
                                    onChangeText={(value) => {
                                        this.setState({
                                            medicines: value,
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
                                    }} />
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
                            <View>
                                {
                                    this.state.LabTest == 'Taken' ?
                                        <Text
                                            style={{
                                                marginTop: 20,
                                                fontWeight: 'bold'
                                            }}>Enter Lab Tests below</Text> : null
                                }
                            </View>
                            <View>
                                {
                                    this.state.LabTest == 'Taken' ?
                                        <TextInput
                                            placeholder='Enter Lab Test here'
                                            underlineColorAndroid='black'
                                            keyboardType="default"
                                        /> : null
                                }
                            </View>
                        </View>
                        <View style={styles.pickerContainer2}>
                            <Picker style={styles.pickerStyle}
                                selectedValue={this.state.transType}
                                onValueChange={(itemValue, itemPosition) => {
                                    this.setState({
                                        transType: itemValue,
                                        choosenIndex1: itemPosition
                                    })
                                }}>
                                <Picker.Item label="Are you with doctor" value="doctor" />
                                <Picker.Item label="Are you on yourself" value="self" />
                            </Picker>
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            marginTop: 5,
                            marginBottom: 10,
                            width: 200,
                            height: 40,
                            alignSelf: 'center',
                            borderRadius: 7,
                        }}>
                        <TouchableOpacity style={{
                            height: 40,
                            backgroundColor: '#ff6666',
                            borderRadius: 7,
                            justifyContent: 'center',
                        }}
                            onPress={() => {
                                if (this.state.transType == 'doctor') {
                                    this.props.navigation.navigate('AppointmentQR', {
                                        diseaseTypes: this.state.diseaseTypes,
                                        medicines: this.state.medicines,
                                        visitDate: this.state.visitDate,
                                        LabTest: this.state.LabTest
                                    })
                                }
                                else if (this.state.transType == 'self') {
                                    AsyncStorage.getItem('CNIC', (err, result) => {
                                        if (result !== null) {
                                            this.setState({
                                                CNIC: result
                                            })
                                        }
                                    }).then(() => {
                                        let patient = "org.com.mediblockinge1.Patient#";
                                        let nicNum = this.state.CNIC.replace(/['"]+/g, '');
                                        console.log(nicNum);
                                        let total = patient.concat(nicNum);
                                        let date = this.state.visitDate.concat("T08:03:02.764Z")
                                        console.log(total)
                                        let block = {
                                            "$class": "org.com.mediblockinge1.UnVerifiedDisease",
                                            "diseaseId": "008",
                                            "nicNum": nicNum,
                                            "diseaseType": this.state.diseaseTypes,
                                            "medicines": this.state.medicines,
                                            "dateVisited": date,
                                            "testTaken": this.state.LabTest,
                                            "testResult": "Null",
                                            "patient": total
                                        }
                                        fetch('https://a6885600.ngrok.io/api/UnVerifiedDisease/', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(block),
                                        })
                                    })
                                }
                            }}>
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    letterSpacing: 0.4,
                                    fontSize: 16,
                                    color: 'white'
                                }}>Submit</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View >
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
    pickerContainer2: {
        marginTop: 18,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: 'gray'
    },
})