import actionType from '../constants/constant';
let initialState = {
    progressBar: false,
    currentUser: '',
    questions: [],
    score: 0,
    time: 0
}

function quizReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOAD_QUESTION_REQUEST:
            console.log('login request');
            return Object.assign({}, state, { progressBar: true , questions:[]});

        case actionType.STORE_QUESTION:
            console.log('data storing')
            return Object.assign({}, state, {questions: [...state.questions, action.data], progressBar: false});

        case actionType.RESULT:
            console.log(action);
            return Object.assign({}, state, {score: action.data.score, time: action.data.time, attempt: action.data.attempt});

        default:
            return state;
    }
}

export default quizReducer;