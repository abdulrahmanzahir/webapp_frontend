import React from "react";

export default function ClinicalInputForm({ clinicalData, setClinicalData, onNext }) {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setClinicalData({ ...clinicalData, [name]: val });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2>Step 1: Clinical Input</h2>

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={clinicalData.age || ""}
        onChange={handleChange}
        required
      />
      <input
        name="pulse_rate"
        type="number"
        placeholder="Pulse Rate"
        value={clinicalData.pulse_rate || ""}
        onChange={handleChange}
        required
      />
      <input
        name="systolic_bp"
        type="number"
        placeholder="Systolic BP"
        value={clinicalData.systolic_bp || ""}
        onChange={handleChange}
        required
      />
      <input
        name="diastolic_bp"
        type="number"
        placeholder="Diastolic BP"
        value={clinicalData.diastolic_bp || ""}
        onChange={handleChange}
        required
      />
      <input
        name="glucose"
        type="number"
        placeholder="Glucose"
        value={clinicalData.glucose || ""}
        onChange={handleChange}
        required
      />
      <input
        name="bmi"
        type="number"
        placeholder="BMI"
        value={clinicalData.bmi || ""}
        onChange={handleChange}
        required
      />

      <select
        name="family_diabetes"
        value={clinicalData.family_diabetes !== undefined ? clinicalData.family_diabetes : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Family Diabetes?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <select
        name="hypertensive"
        value={clinicalData.hypertensive !== undefined ? clinicalData.hypertensive : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Hypertensive?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <select
        name="family_hypertension"
        value={clinicalData.family_hypertension !== undefined ? clinicalData.family_hypertension : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Family Hypertension?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <select
        name="cardiovascular_disease"
        value={clinicalData.cardiovascular_disease !== undefined ? clinicalData.cardiovascular_disease : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Cardiovascular Disease?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <select
        name="stroke"
        value={clinicalData.stroke !== undefined ? clinicalData.stroke : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Stroke?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>

      <select
        name="gender"
        value={clinicalData.gender !== undefined ? clinicalData.gender : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Gender
        </option>
        <option value={0}>Female</option>
        <option value={1}>Male</option>
      </select>

      <button type="submit">Next</button>
    </form>
  );
}