import actionType from '../constants/constant';
import firebase from 'react-native-firebase';
const db = firebase.database();
export default class QuizAction{
    static loadQuestion(name, navigate){
        return (dispatch)=>{
            dispatch(QuizAction.loadQuestionRequest());
            db.ref(`/${name}/The Scope Of Physics`).once('value', (datasnapshot)=>{
                let data = datasnapshot._value;
                data.map(data=>{
                    if(data){
                        dispatch(QuizAction.storeQuestion(data));
                    }
                })
                // navigate('Question', { name });
            });
        }
    }
    static loadQuestionRequest(){
        return{
            type: actionType.LOAD_QUESTION_REQUEST,
        }
    }
    static storeQuestion(data){
        return{
            type: actionType.STORE_QUESTION,
            data
        }
    }
    static storeResult(data){
        return{
            type: actionType.RESULT,
            data
        }
    }
}