import React from "react";

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  return (
    <div>
      <h2>Step 3: Prediction Result</h2>

      <p>
        <strong>Prediction:</strong> {prediction.prediction}
      </p>

      {prediction.confidence !== undefined && (
        <p>
          <strong>Confidence Score:</strong> {(prediction.confidence * 100).toFixed(2)}%
        </p>
      )}

      {prediction.insights && (
        <>
          <h3>Insights:</h3>
          <p>{prediction.insights}</p>
        </>
      )}

      {prediction.recommendations && prediction.recommendations.length > 0 && (
        <>
          <h3>Recommendations:</h3>
          <ul>
            {prediction.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}