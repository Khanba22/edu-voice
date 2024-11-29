import React, { useEffect, useState } from "react";

const ScriptReader = ({ script }) => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sentences, setSentences] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [canSwitch,setCanSwitch] = useState(false)

  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Default to the first available voice
      }
    };

    // Some browsers may not have voices ready immediately, so we listen for the voiceschanged event
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    populateVoices(); // Call it immediately in case the voices are already loaded
  }, []);

  useEffect(() => {
    stopSpeech()

    if (!canSwitch) {
      return;
    }
    handleSpeech()
  },[script,canSwitch])

  const handleSpeech = () => {
    setCanSwitch(false);
    if (!isSpeaking && selectedVoice) {
      const sentenceArray = script.match(/[^.!?]+[.!?]+/g) || [script];
      setSentences(sentenceArray);

      let sentenceIndex = 0;
      const utterance = new SpeechSynthesisUtterance(
        sentenceArray[sentenceIndex]
      );

      // Set the selected voice and parameters
      utterance.voice = selectedVoice;
      utterance.pitch = 1; // Adjust pitch (1.0 is default)
      utterance.rate = 1; // Adjust speed (1.0 is normal speed)

      // Log every spoken word or boundary hit (e.g., words, sentences, etc.)
      utterance.onboundary = (event) => {
        console.log(event.currentTarget.text.substring(event.charIndex, event.charIndex + event.charLength));
      };

      utterance.onend = () => {
        sentenceIndex++;
        if (sentenceIndex < sentenceArray.length) {
          setCurrentSentence(sentenceArray[sentenceIndex]);
          utterance.text = sentenceArray[sentenceIndex];
          speechSynthesis.speak(utterance);
        } else {
          setIsSpeaking(false);
          setCurrentSentence("");
        }
      };

      setCurrentSentence(sentenceArray[sentenceIndex]);
      setIsSpeaking(true);
      speechSynthesis.speak(utterance);
    }
    setCanSwitch(true)
  };

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentSentence("");
  };

  // Handle voice selection
  const handleVoiceChange = (e) => {
    const selectedVoiceIndex = e.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  return (
    <>
      {/* Script Reader */}
      <div className="bg-neutral-800 border-y-2 text-white border-neutral-700 h-1/6 p-2">
        <h3 className="text-lg font-semibold">Script Reader</h3>
        <p>{currentSentence || "Click the button to read the script"}</p>

        {/* Voice selection dropdown */}
        <select
          id="voiceSelect"
          onChange={handleVoiceChange}
          className="mb-4 p-2 border rounded text-black"
          disabled={isSpeaking} // Disable the dropdown while speaking
        >
          {voices.map((voice, index) => (
            <option className="text-black" key={index} value={index}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>

        {/* Buttons to start and stop speech */}
        <button
          onClick={handleSpeech}
          disabled={isSpeaking || voices.length === 0} // Disable if no voices available or speaking
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
        >
          {isSpeaking ? "Reading..." : "Start Reading Script"}
        </button>
        <button
          onClick={stopSpeech}
          disabled={!isSpeaking}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Stop
        </button>
      </div>
    </>
  );
};

export default ScriptReader;
