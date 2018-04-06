import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Button, StatusBar, Image, TouchableOpacity, PixelRatio, FlatList, Modal, ToastAndroid, BackHandler } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';
import QuizAction from '../store/action/quizAction';
import { connect } from 'react-redux';
import Ripple from 'react-native-material-ripple';
import ElevatedView from 'react-native-elevated-view';

class Topics extends Component {
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

    loadQuestion = (name) => {
        let { navigate } = this.props.navigation;
        console.log(this.props.navigation)
    }

    navigate = (name) => {
        let { navigate } = this.props.navigation;
        this.props.loadQuestion(name, navigate);
        ToastAndroid.showWithGravityAndOffset(
            `Loading...`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        // navigate('Question', { name: 'physics' });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ElevatedView
                    elevation={3}
                    style={styles.stayElevated}
                />
                <FlatList
                    data={[
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 1' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 2' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 3' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 4' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 5' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 6' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 7' },
                        { chapterName: 'Modeling And Simulation', chapNo: 'Chapter 8' },
                    ]}
                    //
                    renderItem={({ item }) =>
                        <ElevatedView
                            elevation={3}
                            style={styles.stayElevated}
                        >
                            <Ripple rippleDuration={900} onPress={() => this.navigate('physics')} style={{ flex: 1 }} >
                                <View style={styles.buttonContainer}>
                                    <Text style={styles.heading}>{item.chapNo}</Text>
                                    <Text style={styles.heading}>{item.chapterName}</Text>
                                </View>
                            </Ripple>
                        </ElevatedView>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
        alignItems: 'center',
        marginTop: 20
    },
    buttonContainer: {
        padding: 10
    },
    stayElevated: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    heading: {
        fontWeight: 'normal',
        fontFamily: '33535gillsansmt',
        fontSize: 20,
    }
});

function mapStateToProps(state) {
    console.log(state)
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        loadQuestion: (name, navigator) => dispatch(QuizAction.loadQuestion(name, navigator))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topics);