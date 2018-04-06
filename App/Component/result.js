import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, StatusBar, Image, TouchableOpacity, PixelRatio, FlatList } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label, Button } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';


class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    static navigationOptions = {
        title: 'Result',
        headerStyle: {
            backgroundColor: '#212121',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: 'normal',
            fontFamily: '33535gillsansmt',
            // fontFamily: "Ionicons",
        },
    }

    navigate = () => {
        let { navigate } = this.props.navigation;
        navigate('Question', { name: 'physics' });
    }

    render() {
        let { params } = this.props.navigation.state;
        let { result } = this.props;
        // console.log(params.data);
        let score = params ? params.score : null;
        let time = params ? params.time : null;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <View>
                        <Text style={[styles.fontstyle]}>
                            Total Time
                        </Text>
                        <Text style={[styles.fontstyle]}>
                            {result.time}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View >
                            <Text style={[styles.fontstyle, { fontSize: 17 }]}>
                                Correct
                            </Text>
                            <Text style={[styles.fontstyle]}>
                                {result.score}
                            </Text>
                        </View>

                        <View >
                            <Text style={[styles.fontstyle, { fontSize: 17 }]}>
                                Attempted
                            </Text>
                            <Text style={[styles.fontstyle]}>
                                {result.attempt}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Button style={[styles.btnStyle, { justifyContent: 'center' }]} onPress={this.showResult}><Text style={[styles.fontstyle, { fontSize: 17 }]}> EndTest </Text></Button>
                        <Button style={[styles.btnStyle, { justifyContent: 'center' }]} onPress={this.showResult}><Text style={[styles.fontstyle, { fontSize: 17 }]}> Re-Take </Text></Button>
                        <Button style={[styles.btnStyle, {height: 100,}]} onPress={this.showResult}><Text style={[styles.fontstyle, { fontSize: 17,  textAlign: 'center' }]}> View Correct Answer </Text></Button>
                    </View>
                </View>
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
    fontstyle: {
        fontWeight: 'normal',
        fontFamily: '33535gillsansmt',
        fontSize: 35
    },
    btnStyle:{
        borderRadius: 10,
        backgroundColor: '#26c282',
        width: 150,
        marginTop: 10
    }
});

function mapStateToProps(state) {
    console.log(state)
    return {
        result: state.quizReducer
    }
}
function mapDispatchToProps(dispatch) {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Result);