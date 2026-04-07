"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      setResult(data.result);

      // Save to history
      setHistory((prev) => [prompt, ...prev]);

    } catch (error) {
      setResult("Something went wrong");
    }

    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI SaaS Dashboard 🚀</h1>

        <textarea
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={styles.textarea}
        />

        <button onClick={handleGenerate} style={styles.button}>
          {loading ? "Generating..." : "Generate"}
        </button>

        {loading && <div style={styles.loader}></div>}

        {result && (
          <div style={styles.resultBox}>
            <div style={styles.resultHeader}>
              <h3>Result</h3>
              <button onClick={handleCopy} style={styles.copyBtn}>
                Copy
              </button>
            </div>
            <p>{result}</p>
          </div>
        )}

        {history.length > 0 && (
          <div style={styles.historyBox}>
            <h3>History</h3>
            {history.map((item, index) => (
              <p key={index} style={styles.historyItem}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "white",
    fontFamily: "sans-serif",
  },
  card: {
    width: "500px",
    background: "#0f172a",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 0 40px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    background: "#2563eb",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  loader: {
    marginTop: "15px",
    height: "5px",
    width: "100%",
    background: "linear-gradient(90deg, #2563eb, transparent)",
    animation: "loading 1s infinite",
  },
  resultBox: {
    marginTop: "20px",
    background: "#020617",
    padding: "15px",
    borderRadius: "10px",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  copyBtn: {
    padding: "5px 10px",
    background: "#334155",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },
  historyBox: {
    marginTop: "20px",
  },
  historyItem: {
    background: "#020617",
    padding: "8px",
    borderRadius: "6px",
    marginTop: "5px",
    fontSize: "14px",
    opacity: 0.8,
  },
};