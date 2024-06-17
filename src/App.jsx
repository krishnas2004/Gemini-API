import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    setLoading(true);
    setAnswer("Loading...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBiUOq4Jm__pQWz1i2ICHrfCTPs4koO9GI",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(generatedText || "No answer generated. Please try again.");
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="bg-blue-300 p-3 rounded">Chat AI</h1>
      <textarea
        className="border rounded w-full my-2 p-3"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask anything"
      ></textarea>
      <button
        onClick={generateAnswer}
        className="bg-blue-300 p-3 rounded hover:bg-blue-400 transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Answer"}
      </button>
      <pre className="answer-display">{answer}</pre>
    </div>
  );
}

export default App;
