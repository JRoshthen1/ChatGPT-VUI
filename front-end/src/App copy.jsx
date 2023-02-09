import './App.css'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'


const App = () => {
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    continuous: true
  });
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


    if((listening == false) && (transcript != "")){
      console.log("FINISHED LISTENING")
    }else console.log("didnt hear")

  return (

    <div>
      <p>Microphone: {listening ? 'on' : 'off'} </p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

    </div>
  );
};

export default App
