import React, { useState } from "react";
import ClinicalInputForm from "./ClinicalInputForm";
import GeneticInputForm from "./GeneticInputForm";
import PredictionResult from "./PredictionResult";

export default function T2DPrediction() {
  const [step, setStep] = useState(1);
  const [clinicalData, setClinicalData] = useState({});
  const [geneticData, setGeneticData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitPrediction = async () => {
    setLoading(true);
    try {
      const combinedData = { ...clinicalData, ...geneticData };

      const response = await fetch("https://webapp-diabtrack-1-dpxw.onrender.com/predict-t2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result = await response.json();
      setPrediction(result);
      setStep(3);
    } catch (error) {
      alert("Error fetching prediction: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <ClinicalInputForm clinicalData={clinicalData} setClinicalData={setClinicalData} onNext={nextStep} />
      )}

      {step === 2 && (
        <GeneticInputForm
          geneticData={geneticData}
          setGeneticData={setGeneticData}
          onNext={submitPrediction}
          onBack={prevStep}
        />
      )}

      {step === 3 && <PredictionResult prediction={prediction} />}

      {loading && <p>Loading...</p>}
    </div>
  );
}
