const templates = [
  "A futuristic city at sunset",
  "A cat walking on the moon",
  "A dragon flying over mountains",
  "A peaceful beach with waves",
  "A robot cooking in a kitchen"
];
import { useState } from "react";
import { generateVideo } from "../services/api";


function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("LTX-Video");
  const [duration, setDuration] = useState("5");
  const [quality, setQuality] = useState("720p");

  const handleGenerate = async () => {
    setLoading(true);

    try {
      await generateVideo(text);
      alert("Request sent successfully!");
    } catch (error) {
      alert("Something went wrong.");
    }

    setLoading(false);
  };
  const handleClear = () => {
    setText("");
  };
  const useTemplate = (prompt) => {
    setText(prompt);
  };
  return (
    <div className="card">
      <p>Welcome to our project!</p>

      <label>Select AI Model</label>

      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option>LTX-Video</option>
        <option>CogVideoX</option>
        <option>Stable Video Diffusion</option>
        <option>AnimateDiff</option>
      </select>

      <h3>Generation Settings</h3>

      <div className="settings">
        <div>
          <label>Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="5">5 seconds</option>
            <option value="10">10 seconds</option>
            <option value="15">15 seconds</option>
          </select>
        </div>

        <div>
          <label>Quality</label>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option>720p</option>
            <option>1080p</option>
          </select>
        </div>
      </div>

      <textarea
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <h3>Prompt Templates</h3>

      <div className="templates">
        {templates.map((template, index) => (
          <button
            key={index}
            onClick={() => useTemplate(template)}
          >
            {template}
          </button>
        ))}
      </div>

      <br />
      <br />

      <div className="button-group">
        <button
          onClick={handleGenerate}
          disabled={!text.trim() || loading}
        >
          {loading ? "Generating..." : "Generate Video"}
        </button>

        <button onClick={handleClear} disabled={!text}>
          Clear
        </button>
      </div>

      <div className="summary">
        <h3>Generation Summary</h3>

        <p><strong>Model:</strong> {model}</p>
        <p><strong>Duration:</strong> {duration} seconds</p>
        <p><strong>Quality:</strong> {quality}</p>
        <p><strong>Prompt Length:</strong> {text.length} characters</p>
      </div>

      <div className="video-preview">
        <h3>Generated Video</h3>
        <p>Your generated video will appear here.</p>
      </div>

      <div className="text-preview">
        <h3>Entered Text</h3>
        <p>{text || "No text entered yet."}</p>

        <p className="char-count">
          Characters: {text.length}
        </p>
      </div>

      

    </div>
  );
}

export default Home;