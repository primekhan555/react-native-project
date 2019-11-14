import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { AsyncStorage } from 'react-native';
import FlatlistData from './FlatListD/FlatlistData';
import HScrollCStyle from '../ScrollComponent/HScrollCStyle';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlatListItem1 from './FlatListD/FlatListComponentV';
import FlatListItem2 from './FlatListD/FlatListComponent';
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager';


export default class GetAppointments extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource1: [],
            isloading1: true,
            dataSource2: [],
            isloading2: true,
            CNIC: '',
            buttonColor: "green",
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('CNIC', (err, result) => {
            if (result !== null) {
                this.setState({
                    CNIC: result,
                })
                console.log("this is the get appointment " + result);
            }
        });
        fetch('https://a6885600.ngrok.io/api/VerifiedDisease/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource1: responseJson,
                    isloading1: false,
                })
            })
            .catch((error) => {
                this.setState({
                    isloading1: true,
                })
                console.log("catch is called")
            });

        fetch('https://a6885600.ngrok.io/api/UnVerifiedDisease/')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource2: responseJson,
                    isloading2: false,
                })
            })
            .catch((error) => {
                this.setState({
                    isloading2: true,
                })
                console.log("catch is called")
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

        if (this.state.isloading1) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <StatusBar backgroundColor='#ff6666' />
                    <IndicatorViewPager
                        style={{ flex: 1, backgroundColor: 'white', }}
                        indicator={this._renderTitleIndicator()}>
                        <View style={{ flex: 1, backgroundColor: '#e8ebea', justifyContent: 'center' }}>
                            <ActivityIndicator style={{ justifyContent: 'center' }} size='large' animating={true} />
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#e8ebea', justifyContent: 'center' }}>
                            <ActivityIndicator size='large' animating={true} />
                        </View>
                    </IndicatorViewPager>
                    <ActionButton
                        style={{
                            marginEnd: -20,
                            marginBottom: 10,
                        }}
                        degrees={310}
                        buttonColor={this.state.buttonColor}
                        onPress={() => {
                            if (this.state.buttonColor == "red") {
                                this.setState({
                                    buttonColor: "green",
                                    buttonState: false
                                })
                            }
                            else {
                                this.setState({
                                    buttonColor: "red",
                                    buttonState: true
                                })
                            }
                        }}>
                        <ActionButton.Item
                            size={56}
                            buttonColor='#9bff59'
                            title="Adding Appointment"
                            onPress={() => this.props.navigation.navigate('NewAppointment')}>
                            <Icon
                                name="calendar-plus-o"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>

                        <ActionButton.Item
                            size={56}
                            buttonColor='#fcba03'
                            title="Generate QR Code"
                            onPress={() => this.props.navigation.navigate('GeneratingQRCode')}>
                            <Icon
                                name="qrcode"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>

                        <ActionButton.Item
                            buttonColor='#03fc84'
                            title="Personal Information"
                            onPress={() => { this.props.navigation.navigate('PersonalInfo') }}>
                            <Icon
                                name="cog"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>

                        {/* <ActionButton.Item
            buttonColor='#1abc9c'
            title="Refresh"
            onPress={() => { }}>
            <Icon name="undo" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

                    </ActionButton>


                </View>
            )
        }
        
        return (
            <View style={{ flex: 1, backgroundColor: '#e8ebea' }}>
                <StatusBar backgroundColor='#ff6666' />

                <IndicatorViewPager
                    style={{ flex: 1, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}>

                    <View style={{ backgroundColor: '#e8ebea' }}>
                        <FlatList
                            data={this.state.dataSource1}
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
                                        <FlatListItem1 item={item} index={index} navigation={this.props.navigation} />
                                    );
                                }
                                else {
                                    console.log("if is not executing")
                                }
                            }}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    <View style={{ backgroundColor: '#e8ebea' }}>
                        <FlatList
                            data={this.state.dataSource2}
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
                                        <FlatListItem2 item={item} index={index} navigation={this.props.navigation} />
                                    );
                                }
                                else {
                                    console.log("if is not executing")
                                }
                            }}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </IndicatorViewPager>
                <ActionButton
                    style={{
                        marginEnd: -20,
                        marginBottom: 10,
                    }}
                    degrees={310}
                    buttonColor={this.state.buttonColor}
                    onPress={() => {
                        if (this.state.buttonColor == "red") {
                            this.setState({
                                buttonColor: "green",
                                buttonState: false
                            })
                        }
                        else {
                            this.setState({
                                buttonColor: "red",
                                buttonState: true
                            })
                        }
                    }}>
                    <ActionButton.Item
                        size={56}
                        buttonColor='#9bff59'
                        title="Adding Appointment"
                        onPress={() => this.props.navigation.navigate('NewAppointment')}>
                        <Icon
                            name="calendar-plus-o"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                        size={56}
                        buttonColor='#fcba03'
                        title="Generate QR Code"
                        onPress={() => this.props.navigation.navigate('GeneratingQRCode')}>
                        <Icon
                            name="qrcode"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                        buttonColor='#03fc84'
                        title="Personal Information"
                        onPress={() => { this.props.navigation.navigate('PersonalInfo') }}>
                        <Icon
                            name="cog"
                            style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    {/* <ActionButton.Item
            buttonColor='#1abc9c'
            title="Refresh"
            onPress={() => { }}>
            <Icon name="undo" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

                </ActionButton>

            </View >
        )
        // }
        {/* ) */ }
    }
    _renderTitleIndicator() {
        return <PagerTitleIndicator
            style={{
                width: "100%",
                height: 30
            }}
            titles={['               Verified          ', '                UN_Verified          ']} />;
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
    actionButtonIcon: {
        fontSize: 30,
        height: 30,
        color: 'black',
    },

});