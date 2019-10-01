import React, { Component } from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';
export default class SplashScreen extends Component {
    componentDidMount() {
        AsyncStorage.getItem('CNIC', (err, result) => {
            if (result !== null) {
                this.props.navigation.navigate('TabScreen');
                this.setState({
                    cnic: result,
                })
            }
            else{
                this.props.navigation.navigate('Options');
            }
        });
        
    }
    render() {
        
        return (
            
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
                <View style={styles.container}>
                    <Text style={styles.text}>MediBlock</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ff6666',
        height: 200,
        width: 350,
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center'

    },
    text:{
        color:'white',
        fontSize:40,
        fontWeight:'bold'
    }
});