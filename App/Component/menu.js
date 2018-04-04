import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Button, StatusBar, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';
import QuizAction from '../store/action/quizAction';
import { connect } from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static navigationOptions = {
        title: 'Welcome In Menu',
        headerStyle: {
            backgroundColor: '#212121',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: 'Muli-Light',
            fontWeight: '200'
            // fontFamily: "Ionicons",
        },
    }

    loadQuestion = (name) =>{
        let { navigate } = this.props.navigation;
        console.log(this.props.navigation)
        this.props.loadQuestion(name, navigate);
        navigate('Topic');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, }}>
                    <Text style={{fontFamily: 'Muli-Ligth', fontWeight: 'normal'}}>Select An Option</Text>
                </View>

                <View style={styles.container}>
                    <StatusBar
                        // backgroundColor="transparent"
                        // barStyle="light-content"
                        hidden={true}
                    />
                    <View style={styles.row}>

                        <TouchableOpacity style={styles.btn} onPress={()=> {this.loadQuestion('physics')}}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/chem.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/chem.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/chem.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/chem.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/chem.png')} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/phy.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/phy.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/phy.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/phy.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/phy.png')} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.btn]}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/eng.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/eng.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/eng.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/eng.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/eng.png')} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/math.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/math.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/math.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/math.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/math.png')} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/iq.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/iq.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/iq.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/iq.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/iq.png')} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            {
                                PixelRatio.get() === 1 ?
                                    <Image style={styles.img} source={require('./images/mdpi/bio.png')} />
                                    :
                                    PixelRatio.get() === 1.5 ?
                                        <Image style={styles.img} source={require('./images/hdpi/bio.png')} />
                                        :
                                        PixelRatio.get() === 2 ?
                                            <Image style={styles.img} source={require('./images/xhdpi/bio.png')} />
                                            :
                                            PixelRatio.get() === 3 ?
                                                <Image style={styles.img} source={require('./images/xxhdpi/bio.png')} />
                                                :
                                                <Image style={styles.img} source={require('./images/xxxhdpi/bio.png')} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        paddingTop: 0,

        alignItems: 'center',
        marginTop: 20
    },
    img: {
        width: 120,
        height: 120
    },
    row: {
        flexDirection: 'row',
    },
    btn: {
        margin: 5,
        borderBottomWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    }
});

function mapStateToProps(state){
    console.log(state)
    return{
        // loader: state.authReducer.progressBar,
    }
}
function mapDispatchToProps(dispatch){
    return{
        loadQuestion: (name, navigator) => dispatch(QuizAction.loadQuestion(name, navigator))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);