import React from "react";

export default function GeneticInputForm({ geneticData, setGeneticData, onNext, onBack }) {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setGeneticData({ ...geneticData, [name]: val });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <h2>Step 2: Genetic Input</h2>

      <input
        name="CHR_ID"
        type="number"
        placeholder="CHR_ID"
        value={geneticData.CHR_ID || ""}
        onChange={handleChange}
        required
      />
      <input
        name="CHR_POS"
        type="number"
        placeholder="CHR_POS"
        value={geneticData.CHR_POS || ""}
        onChange={handleChange}
        required
      />
      <select
        name="INTERGENIC"
        value={geneticData.INTERGENIC !== undefined ? geneticData.INTERGENIC : ""}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Intergenic?
        </option>
        <option value={0}>No</option>
        <option value={1}>Yes</option>
      </select>
      <input
        name="RISK_ALLELE_FREQUENCY"
        type="number"
        step="any"
        placeholder="Risk Allele Frequency"
        value={geneticData.RISK_ALLELE_FREQUENCY || ""}
        onChange={handleChange}
        required
      />
      <input
        name="PVALUE"
        type="number"
        step="any"
        placeholder="P-Value"
        value={geneticData.PVALUE || ""}
        onChange={handleChange}
        required
      />
      <input
        name="PVALUE_MLOG"
        type="number"
        step="any"
        placeholder="P-Value M-Log"
        value={geneticData.PVALUE_MLOG || ""}
        onChange={handleChange}
        required
      />
      <input
        name="EFFECT_SIZE"
        type="number"
        step="any"
        placeholder="Effect Size"
        value={geneticData.EFFECT_SIZE || ""}
        onChange={handleChange}
        required
      />
      <input
        name="CI_LOWER_BOUND"
        type="number"
        step="any"
        placeholder="CI Lower Bound"
        value={geneticData.CI_LOWER_BOUND || ""}
        onChange={handleChange}
        required
      />
      <input
        name="CI_UPPER_BOUND"
        type="number"
        step="any"
        placeholder="CI Upper Bound"
        value={geneticData.CI_UPPER_BOUND || ""}
        onChange={handleChange}
        required
      />

      <button type="button" onClick={onBack}>
        Back
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}