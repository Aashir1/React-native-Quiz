import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Button, StatusBar, Image, PixelRatio } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import Menu from './menu';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            flag: true,
        }
    }
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        setTimeout(() => {
            this.reset('Menu');
        }, 500);
    }

    // replaceScreen = (route) => {
    //     // const { locations, position } = this.props.navigation.state.params;
    //     this.props.navigation.dispatch({
    //         type: 'ReplaceCurrentScreen',
    //         key: `${route}`,
    //         routeName: `${route}`,
    //         // params: { locations, position },
    //     });
    // };


    reset = (route) => {
        return this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: `${route}` })
                    ]
                }));
    }

    render() {
        // if (!this.state.flag) {
        //     return (
        //         <View style={styles.container}>
        //             <Menu />
        //         </View>
        //     );
        // }
        return (
            <View style={[styles.container]}>
                <StatusBar
                    // backgroundColor="transparent"
                    // barStyle="light-content"
                    hidden={true}
                />
                {
                    PixelRatio.get() === 1 ?
                        <Image style={styles.img} source={require('./images/mdpi/splash.png')} />
                        :
                        PixelRatio.get() === 1.5 ?
                            <Image style={styles.img} source={require('./images/hdpi/splash.png')} />
                            :
                            PixelRatio.get() === 2 ?
                                <Image style={styles.img} source={require('./images/xhdpi/splash.png')} />
                                :
                                PixelRatio.get() === 3 ?
                                    <Image style={styles.img} source={require('./images/xxhdpi/splash.png')} />
                                    :
                                    <Image style={styles.img} source={require('./images/xxxhdpi/splash.png')} />
                }
                {/* <Image style={{ width: '100%', height: '100%' }} source={require('./images/splash.png')} /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    img: {
        width: '100%',
        height: '100%'
    }
});
