import { useState, useEffect } from "react";

const datasets = [
  {
    title: "Input Patient's Clinical Data",
    fields: [
      { name: "age", label: "Age", placeholder: "e.g., 52", type: "number" },
      { name: "pulse_rate", label: "Pulse Rate", placeholder: "e.g., 78", type: "number" },
      { name: "systolic_bp", label: "Systolic BP", placeholder: "e.g., 130", type: "number" },
      { name: "diastolic_bp", label: "Diastolic BP", placeholder: "e.g., 85", type: "number" },
      { name: "glucose", label: "Glucose", placeholder: "e.g., 142", type: "number" },
      { name: "cholesterol", label: "Cholesterol", placeholder: "e.g., 200", type: "number" },
      { name: "hdl", label: "HDL", placeholder: "e.g., 55", type: "number" },
      { name: "weight", label: "Weight (kg)", placeholder: "e.g., 70", type: "number" },         // 🆕 added
      { name: "height", label: "Height (cm)", placeholder: "e.g., 175", type: "number" },        // 🆕 added
      { name: "bmi", label: "BMI", placeholder: "e.g., 27.5", type: "number" },
      { name: "family_diabetes", label: "Family Diabetes", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "hypertensive", label: "Hypertensive", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "family_hypertension", label: "Family Hypertension", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "cardiovascular_disease", label: "Cardiovascular Disease", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "stroke", label: "Stroke", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "gender", label: "Gender", placeholder: "0 = Female, 1 = Male", type: "number", min: 0, max: 1 },
    ],
  },
  {
    title: "Input Patient's Genetic Data",
    fields: [
      { name: "CHR_ID", label: "CHR_ID", placeholder: "e.g., 15", type: "number" },
      { name: "INTERGENIC", label: "Intergenic", placeholder: "0 = No, 1 = Yes", type: "number", min: 0, max: 1 },
      { name: "RISK_ALLELE_FREQUENCY", label: "Risk Allele Frequency", placeholder: "e.g., 0.58", type: "number", step: "any" },
      { name: "PVALUE_MLOG", label: "P-Value M-Log", placeholder: "e.g., 13.0458", type: "number", step: "any" },
      { name: "EFFECT_SIZE", label: "Effect Size", placeholder: "e.g., 1.11", type: "number", step: "any" },
      { name: "CI_LOWER_BOUND", label: "CI Lower Bound", placeholder: "e.g., 1.08", type: "number", step: "any" },
      { name: "CI_UPPER_BOUND", label: "CI Upper Bound", placeholder: "e.g., 1.14", type: "number", step: "any" },
    ],
  },
];

export default function SixStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = datasets[step];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleNext = async () => {
    if (step === datasets.length - 1) {
      setLoading(true);
      try {
        const response = await fetch("https://webapp-diabtrack-1.onrender.com/predict-t2d", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Failed to get prediction");
        const result = await response.json();
        setPredictionResult(result);
        setStep(step + 1);
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  useEffect(() => {
    if (predictionResult && !loading) {
      fetch("https://webapp-diabtrack-1.onrender.com/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          prediction: predictionResult.prediction,
          confidence: predictionResult.score,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Saved to DB:", data))
        .catch((err) => console.error("Failed to save prediction:", err));
    }
  }, [predictionResult, loading]);

  const copyReport = () => {
    const header = `Prediction: ${predictionResult.prediction} ${predictionResult.prediction.toLowerCase().includes("low") ? "✅" : "⚠️"}`;
    const confidence = `\n\nConfidence: ${(predictionResult.score * 100).toFixed(2)}%`;
    const entries = Object.entries(formData).map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`).join("\n");
    const finalLine = predictionResult.score * 100 < 50
      ? "\n\nGenerate Preventive Lifestyle Plan"
      : "\n\nGenerate Tailored Treatment Plan";
    const fullText = `${header}${confidence}\n\nEntered Clinical & Genetic Data:\n${entries}${finalLine}`;

    navigator.clipboard.writeText(fullText).then(() => {
      alert("Copied to clipboard.");
    });
  };

  if (step === datasets.length) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Prediction Result</h2>
          {loading && <p>Loading prediction...</p>}
          {!loading && predictionResult && (
            <>
              <p
                className={`mb-2 text-lg font-semibold ${
                  predictionResult.prediction.toLowerCase().includes("low")
                    ? "text-blue-600"
                    : predictionResult.prediction.toLowerCase().includes("high")
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Prediction:&nbsp;
                {predictionResult.prediction}&nbsp;
                {predictionResult.prediction.toLowerCase().includes("low") && "✅"}
                {predictionResult.prediction.toLowerCase().includes("high") && "⚠️"}
                {!["low", "high"].some((risk) => predictionResult.prediction.toLowerCase().includes(risk)) && "🤔"}
              </p>

              {predictionResult.score !== undefined && (
                <p
                  className={`mb-4 font-medium text-lg ${
                    predictionResult.score * 100 < 50 ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  Confidence: {(predictionResult.score * 100).toFixed(2)}%
                </p>
              )}

              <div className="text-left mt-8 bg-gray-50 p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-2">Entered Clinical & Genetic Data:</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {Object.entries(formData).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setStep(0);
                    setPredictionResult(null);
                    setFormData({});
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Start New Prediction
                </button>
                <button
                  onClick={copyReport}
                  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Copy Output
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="fusionInput" className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Input Patient's Data</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easily record and track all relevant health information to manage diabetes risk effectively.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">{`Step ${step + 1}: ${current.title}`}</h3>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
              Step {step + 1} of {datasets.length}
            </span>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap -mx-3">
              {current.fields.map(({ label, name, placeholder, type, min, max, step }, index) => (
                <div key={index} className="w-full md:w-1/3 px-3 mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    value={formData[name] !== undefined ? formData[name] : ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="px-5 py-2 text-gray-600 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition duration-300"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {step === datasets.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Your data is protected and secured with end-to-end encryption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
