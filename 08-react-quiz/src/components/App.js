import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Error from "./Error"
import {useEffect, useReducer} from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = { questions:[], status:"loading", index:0, answer:null, points:0}

function reducer(state, action){
    switch(action.type){
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case "dataFailed":
            return {
                ...state,
                status:"error"
            }
        case "start":
            return {
                ...state,
                status:"active"
            }
        case "newAnswer":
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer:action.payload,
                points:action.payload === question.correctOption ? state.points+ question.points : state.points

            }
        default:
            throw new Error("Action unknown");
    }

}

export default function App(){

    const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;

    useEffect(()=>{
        async function fetchQuestions() {

            try{
                const res = await fetch("http://localhost:8000/questions");
            const data = await res.json();
            dispatch({type:"dataReceived", payload: data })
            }catch(err){
                dispatch({type:"dataFailed"})

            }
            
            
        }
        fetchQuestions();
    },[]);

    return <div className="app">
        <Header />
        <Main>
            {status==='loading' && <Loader />}
            {status==='error' && <Error />}
            {status==='ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
            {status==='active' && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
        </Main>
        
    </div>
}