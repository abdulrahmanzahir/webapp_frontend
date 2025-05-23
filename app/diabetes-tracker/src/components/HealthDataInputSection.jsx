// src/components/HealthDataInputSection.jsx

export default function HealthDataInputSection() {
    return (
      <section id="dataInput" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Data Input</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Easily record and track all relevant health information to manage your diabetes effectively.
            </p>
          </div>
  
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-blue-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Health Information</h3>
                <div className="flex items-center">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-white">
                    Step 1 of 4
                  </span>
                </div>
              </div>
            </div>
  
            <div className="p-6">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your age"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
  
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your weight"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Height (cm)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your height"
                  />
                </div>
              </div>
  
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Family History of Diabetes
                </label>
                <div className="flex items-center">
                  <div className="mr-6">
                    <input type="radio" id="yes" name="familyHistory" className="mr-2" />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div>
                    <input type="radio" id="no" name="familyHistory" className="mr-2" />
                    <label htmlFor="no">No</label>
                  </div>
                </div>
              </div>
  
              <div className="flex justify-between">
                <button className="px-5 py-2 text-gray-600 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition duration-300">
                  Back
                </button>
                <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
                  Next
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600">
                    Your data is protected and secured with end-to-end encryption
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16a1 1 0 01-1-1V6a1 1 0 012 0v9a1 1 0 01-1 1zM5 9a1 1 0 01.293-.707l3-3a1 1 0 111.414 1.414L7.414 9H17a1 1 0 110 2H7.414l2.293 2.293a1 1 0 01-1.414 1.414l-3-3A1 1 0 015 9z" />
                  </svg>
                  Upload medical records
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }