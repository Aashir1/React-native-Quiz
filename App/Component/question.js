import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, StatusBar, Image, TouchableOpacity, TouchableHighlight, ToastAndroid, Modal, BackHandler } from 'react-native';
import { Container, Header, Content, Badge, Text, Form, Item, Input, Label, ListItem, CheckBox, Body, Button } from 'native-base';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import BackgroundTimer from 'react-native-background-timer';
import { NavigationActions } from 'react-navigation';
import QuizAction from '../store/action/quizAction';
import AwesomeAlert from 'react-native-awesome-alerts';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            userSelect: '',
            score: 0,
            tick: false,
            min: 0,
            sec: 0,
            userAnswers: [],
            correctAnswers: [],
            attemptCounter: 0,
            showAlert: false
        }
        this.question = [];
        this.clearTimer = {};
    }


    static navigationOptions = {

        headerLeft: null,
        title: 'Welcome In Quiz',
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
    };

    componentDidMount() {
        let { sec, min } = this.state;

        this.clearTimer = BackgroundTimer.runBackgroundTimer(() => {
            //code that will be called every 3 seconds 
            if (sec < 60) {
                sec = sec + 1;
            }
            if (sec === 60) {
                sec = 0;
                min = min + 1
            }
            this.setState({ sec, min });
        },
            1000);

        BackHandler.addEventListener('hardwareBackPress', function () {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.

            /* ############################################ this.setState not a function ############################## */

            this.setState({ showAlert: true });
            if (true) {
                return true;
            }
            return false;
        });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', function () {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.

            if (true) {
                console.log('back button pressed')
                return true;
            }
            return false;
        });
    }
    updateIndex = () => {
        let { userAnswers, correctAnswers, score } = this.state;
        if (this.state.index < 28)
            this.setState({ index: this.state.index + 1 });


        if (this.state.index === 28) {
            let min = this.state.min.toString().length < 2 ? `0${this.state.min}` : `:${this.state.min}`;
            let sec = this.state.sec.toString().length < 2 ? `0${this.state.sec}` : `:${this.state.sec}`;
            BackgroundTimer.clearInterval(this.clearTimer);
            this.reset('Result');

            this.props.result({ score: this.state.score, time: `${min}${sec}`, attempt: this.state.attemptCounter });

        }
        // if (this.props.questions[this.state.index].ans === this.state.userSelect) {
        //     this.setState({ score: this.state.score + 1 });
        // }
        // md-checkmark-circle
        let obj = {
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            userSelect: '',
            tick: false,
            userAnswers,
            correctAnswers
        }
        if (this.state.userSelect === this.question.ans) {
            // this.setState({ score: this.state.score + 1 });
            obj.score = score + 1;
        }
        if (this.state.userSelect) {
            obj.userAnswers.push(this.state.userSelect);
            obj.correctAnswers.push(this.question.ans);
        } else {
            obj.userAnswers.push('Not Selected');
            obj.correctAnswers.push(this.question.ans);
        }
        this.setState(obj, () => { console.log(this.state) });
    }

    toggle = (flag, userSelect) => {
        let { attemptCounter } = this.state;
        let obj = {
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            userSelect,
            attemptCounter
        }
        obj[flag] = true;
        obj.attemptCounter++;
        console.log(obj);
        this.setState(obj);//start from there
        // ToastAndroid.showWithGravityAndOffset(
        //     `You Select: ${userSelect}`,
        //     ToastAndroid.SHORT,
        //     ToastAndroid.BOTTOM,
        //     25,
        //     50
        // );
    }

    correctAns = (ans) => {
        alert(ans);
        this.setState({ tick: true });
    }

    showResult = () => {

    }

    reset = (route, data) => {
        return this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: `${route}` }, data)
                    ]
                }));
    }

    hideAlert = () => {
        this.setState({ showAlert: false });
    }
    hideAlertWithAction = () => {
        let obj = {
            index: 1,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            userSelect: '',
            score: 0,
            tick: false,
            min: 0,
            sec: 0,
            userAnswers: [],
            correctAnswers: [],
            attemptCounter: 0,
            showAlert: false
        }
        BackgroundTimer.clearInterval(this.clearTimer);
        this.question = [];
        this.clearTimer = {};
        this.setState(obj);
        this.props.navigation.goback();
    }

    render() {
        let { progressBar } = this.props;
        console.log(progressBar)
        let { params } = this.props.navigation.state;
        let name = params ? params.name : null;
        let quesObj = this.props.questions[this.state.index];
        this.question = quesObj;
        console.log(this.question);
        if (this.state.showAlert) {
            return (
                <View style={styles.container}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Quiz"
                        message="Exit Quiz ?"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={true}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No"
                        confirmText="Yes"
                        confirmButtonColor="#DD6B55"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlertWithAction();
                        }}
                    />
                </View>

            )
        }
        return (
            <View style={[styles.container]}>
                <StatusBar
                    hidden={true} />
                {
                    this.state.showAlert ?
                        <View style={styles.container}>
                            <AwesomeAlert
                                show={showAlert}
                                showProgress={false}
                                title="Quiz"
                                message="Exit Quiz ?"
                                closeOnTouchOutside={false}
                                closeOnHardwareBackPress={true}
                                showCancelButton={true}
                                showConfirmButton={true}
                                cancelText="No"
                                confirmText="Yes"
                                confirmButtonColor="#DD6B55"
                                onCancelPressed={() => {
                                    this.hideAlert();
                                }}
                                onConfirmPressed={() => {
                                    this.hideAlertWithAction();
                                }}
                            />
                        </View>
                        :
                        null
                }
                <View style={styles.screenWrapper}>
                    <View style={styles.heading}>
                        <View style={{ flex: 1.5 }}>
                            <Text style={[{ textAlign: 'right', marginRight: 5 }, styles.fontstyle]}>
                                {name}
                            </Text>
                        </View>
                        {/* ********************* NEXT BUTTON ********************** */}
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.updateIndex} style={{ alignSelf: 'flex-end' }}>
                                <Icon name="ios-arrow-dropright-circle" size={40} color="#f5ab35" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* ******************** QUESTIONS ********************* */}
                    <View >
                        <View>
                            <Text style={[{ textAlign: 'center' }, styles.fontstyle]}>
                                {`${this.state.index}/${this.props.questions.length}  `}
                            </Text>
                        </View>
                        <View>
                            <Text style={[{ textAlign: 'center', marginTop: 8, marginBottom: 8 }, styles.fontstyle]}>
                                {quesObj.ques}
                            </Text>
                        </View>
                        <TouchableHighlight
                            style={this.state.flag1 ? styles.optionWrapperSelect : styles.optionWrapper}
                            onPress={() => this.toggle('flag1', this.props.questions[this.state.index].optA)}
                            underlayColor='#f5ab35'>
                            <View>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center' }, styles.fontstyle]}>
                                    A
                                    <Text style={styles.fontstyle}>
                                        {`. ${quesObj.optA}`}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.flag2 ? styles.optionWrapperSelect : styles.optionWrapper}
                            onPress={() => this.toggle('flag2', this.props.questions[this.state.index].optB)}
                            underlayColor='#f5ab35'>
                            <View>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center' }, styles.fontstyle]}>
                                    B
                                    <Text style={styles.fontstyle}>
                                        {`. ${quesObj.optB}`}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.flag3 ? styles.optionWrapperSelect : styles.optionWrapper}
                            onPress={() => this.toggle('flag3', this.props.questions[this.state.index].optC)}
                            underlayColor='#f5ab35'>
                            <View>
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center' }, styles.fontstyle]}>
                                    C
                                    <Text style={styles.fontstyle}>
                                        {`. ${quesObj.optC}`}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={this.state.flag4 ? styles.optionWrapperSelect : styles.optionWrapper}
                            onPress={() => this.toggle('flag4', this.props.questions[this.state.index].optD)}
                            underlayColor='#f5ab35'
                        >
                            <View >
                                <Text style={[{ fontWeight: 'bold', textAlign: 'center' }, styles.fontstyle]}>
                                    D
                                    <Text style={styles.fontstyle}>
                                        {`. ${quesObj.optD}`}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => { this.correctAns(quesObj.ans) }}>
                                {
                                    this.state.tick ?
                                        <Icon name="md-checkmark-circle" size={60} color="#13e257" />
                                        :
                                        <Icon name="md-checkmark-circle" size={60} color="#c2ccd3" />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* ******************************** Timer and EndTest ***************************** */}
                    <View style={styles.timerWrapper}>
                        <View>
                            <Text style={styles.fontstyle}>
                                {
                                    this.state.min.toString().length < 2 ? `0${this.state.min}` : `:${this.state.min}`
                                }
                                <Text style={[{ borderRadius: 5 }, styles.fontstyle]}>
                                    {
                                        this.state.sec.toString().length < 2 ? `:0${this.state.sec}` : `:${this.state.sec}`
                                    }
                                </Text>
                            </Text>
                        </View>
                        <View>
                            <Button danger style={{ borderRadius: 5 }} onPress={this.showResult}><Text style={styles.fontstyle}> EndTest </Text></Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    optionWrapper: {
        backgroundColor: '#c2ccd3',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginTop: 5
    },
    optionWrapperSelect: {
        backgroundColor: '#f5ab35',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginTop: 5
    },
    tickStyle: {
        backgroundColor: '#26c281',
    },
    timerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    screenWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    fontstyle: {
        fontWeight: 'normal',
        fontFamily: '33535gillsansmt',
        fontSize: 20
    }
});

function mapStateToProps(state) {
    console.log(state)
    return {
        // loader: state.authReducer.progressBar,
        questions: state.quizReducer.questions,
        progressBar: state.quizReducer.progressBar,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        result: (obj) => dispatch(QuizAction.storeResult(obj)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Questions);