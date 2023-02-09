import React, { useEffect } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const App = () => {
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({
    continuous: true
  });

  useEffect(() => {

    if ((listening === false) && (transcript !== '')) {
      console.log('FINISHED LISTENING');
    
      fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({message: transcript}),
      }).then((response) => response.json()).catch((error) => console.log(error))

    } else {
      console.log('didnt hear');
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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

export default App;
