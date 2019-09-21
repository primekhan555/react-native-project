import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

export default class HScrollCStyle extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 80,
                    height: 110,
                    width: 100,
                    borderColor: '#c4bbbb',
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 3,
                    marginLeft: 3
                }}>
                    <Image style={styles.imageStyle}
                        resizeMode='center'
                        source={this.props.imageUri}
                    />
                </View>
                <View style={{ flex: 20, height: 25, width: 100 }}>
                    <Text style={{
                        marginTop: 3, textAlign: 'center', color: '#a89d9d',
                        fontWeight: 'bold'
                    }}>{this.props.name}</Text>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginTop: 2,
        marginBottom: 2,
        marginRight: 3
    },

});