import React, { useState, useEffect } from 'react';
import { Play, Calculator, Target, Users, Cpu, CheckCircle, AlertTriangle, RotateCcw, Settings } from 'lucide-react';

function Visualization() {
  const [numProcess, setNumProcess] = useState(0);
  const [numResource, setNumResource] = useState(0);
  const [allocation, setAllocation] = useState([]);
  const [maximum, setMaximum] = useState([]);
  const [need, setNeed] = useState([]);
  const [available, setAvailable] = useState([]);
  const [safeSequence, setSafeSequence] = useState([]);
  const [animatedStep, setAnimatedStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [workResources, setWorkResources] = useState([]);
  const [showWorkMatrix, setShowWorkMatrix] = useState(false);

  const handleTableInit = () => {
    const alloc = Array.from({ length: numProcess }, () => Array(numResource).fill(0));
    const max = Array.from({ length: numProcess }, () => Array(numResource).fill(0));
    const avail = Array(numResource).fill(0);

    setAllocation(alloc);
    setMaximum(max);
    setAvailable(avail);
    setNeed([]);
    setSafeSequence([]);
    setAnimatedStep(-1);
    setIsAnimating(false);
    setWorkResources([]);
    setShowWorkMatrix(false);
  };

  const updateMatrix = (matrix, i, j, val) => {
    const updated = [...matrix];
    updated[i][j] = parseInt(val) || 0;
    return updated;
  };

  const updateAvailable = (i, val) => {
    const updated = [...available];
    updated[i] = parseInt(val) || 0;
    setAvailable(updated);
  };

  const calculateNeed = () => {
    const newNeed = allocation.map((row, i) =>
      row.map((val, j) => maximum[i][j] - val)
    );
    setNeed(newNeed);
  };

  const findSafeSequence = () => {
    let work = [...available];
    const finish = Array(numProcess).fill(false);
    const seq = [];
    const workHistory = [[...work]];
    let count = 0;

    while (count < numProcess) {
      let found = false;

      for (let i = 0; i < numProcess; i++) {
        if (!finish[i]) {
          const canRun = need[i].every((n, j) => n <= work[j]);
          if (canRun) {
            for (let j = 0; j < numResource; j++) {
              work[j] += allocation[i][j];
            }
            finish[i] = true;
            seq.push(`P${i}`);
            workHistory.push([...work]);
            count++;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        alert('System is not in a safe state!');
        return;
      }
    }

    setSafeSequence(seq);
    setWorkResources(workHistory);
    setAnimatedStep(0);
    setShowWorkMatrix(true);
  };

  const animateStep = () => {
    if (animatedStep < safeSequence.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setAnimatedStep(prev => prev + 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const resetAnimation = () => {
    setAnimatedStep(0);
    setIsAnimating(false);
  };

  const runFullAnimation = () => {
    setAnimatedStep(0);
    setIsAnimating(true);
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < safeSequence.length - 1) {
        step++;
        setAnimatedStep(step);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 1000);
  };

  const MatrixTable = ({ title, data, onChange, disabled = false, icon, color, highlightRow = -1 }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-sm font-semibold text-gray-600 border-b border-gray-200">Process</th>
              {Array.from({ length: numResource }, (_, i) => (
                <th key={i} className="p-2 text-sm font-semibold text-gray-600 border-b border-gray-200">
                  R{i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={`
                transition-all duration-500 hover:bg-gray-50
                ${highlightRow === i 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 shadow-md scale-[1.02]' 
                  : ''
                }
              `}>
                <td className="p-2 font-semibold text-gray-700 border-b border-gray-100">P{i}</td>
                {row.map((val, j) => (
                  <td key={j} className="p-2 border-b border-gray-100">
                    <input
                      type="number"
                      className={`
                        w-16 h-10 text-center rounded-lg border-2 transition-all duration-200
                        ${disabled 
                          ? 'bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed' 
                          : 'bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
                        }
                      `}
                      value={val}
                      onChange={disabled ? undefined : (e) => onChange(i, j, e.target.value)}
                      disabled={disabled}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Banker's Algorithm</h1>
              <p className="text-blue-100 text-lg">Deadlock Avoidance System Visualization</p>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">System Configuration</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Number of Processes</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={numProcess || ''}
                  onChange={e => setNumProcess(Number(e.target.value))}
                  placeholder="Enter processes"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Number of Resources</label>
              <div className="relative">
                <Cpu className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  value={numResource || ''}
                  onChange={e => setNumResource(Number(e.target.value))}
                  placeholder="Enter resources"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg
                  ${!numProcess || !numResource ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleTableInit}
                disabled={!numProcess || !numResource}
              >
                Create Tables
              </button>
            </div>
          </div>
        </div>

        {allocation.length > 0 && (
          <div className="space-y-8">
            {/* Data Tables */}
            <div className="grid lg:grid-cols-2 gap-8">
              <MatrixTable
                title="Allocation Matrix"
                data={allocation}
                onChange={(i, j, val) => setAllocation(updateMatrix(allocation, i, j, val))}
                icon={<Target className="w-5 h-5 text-white" />}
                color="from-blue-500 to-cyan-600"
                highlightRow={animatedStep >= 0 ? parseInt(safeSequence[animatedStep]?.substring(1)) : -1}
              />

              <MatrixTable
                title="Maximum Matrix"
                data={maximum}
                onChange={(i, j, val) => setMaximum(updateMatrix(maximum, i, j, val))}
                icon={<Users className="w-5 h-5 text-white" />}
                color="from-purple-500 to-pink-600"
                highlightRow={animatedStep >= 0 ? parseInt(safeSequence[animatedStep]?.substring(1)) : -1}
              />
            </div>

            {/* Available Resources */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Available Resources</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {available.map((val, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <label className="text-sm font-semibold text-gray-600 mb-2">R{i}</label>
                    <input
                      type="number"
                      className="w-20 h-12 text-center rounded-lg border-2 border-gray-300 hover:border-green-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200"
                      value={val}
                      onChange={e => updateAvailable(i, e.target.value)}
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                onClick={calculateNeed}
              >
                <Calculator className="w-5 h-5" />
                Calculate Need Matrix
              </button>
            </div>

            {/* Need Matrix */}
            {need.length > 0 && (
              <div className="space-y-6">
                <MatrixTable
                  title="Need Matrix (Max - Allocation)"
                  data={need}
                  disabled={true}
                  icon={<CheckCircle className="w-5 h-5 text-white" />}
                  color="from-orange-500 to-red-600"
                  highlightRow={animatedStep >= 0 ? parseInt(safeSequence[animatedStep]?.substring(1)) : -1}
                />

                <button
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                  onClick={findSafeSequence}
                >
                  <Target className="w-5 h-5" />
                  Find Safe Sequence
                </button>
              </div>
            )}

            {/* Safe Sequence Results */}
            {safeSequence.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-green-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">Safe Sequence Found!</h3>
                </div>
                
                {/* Process Sequence Visualization */}
                <div className="bg-white/70 rounded-xl p-6 mb-6">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {safeSequence.map((process, index) => (
                      <React.Fragment key={index}>
                        <div className={`
                          relative px-6 py-3 rounded-lg font-bold text-lg transition-all duration-500
                          ${animatedStep >= index 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-110' 
                            : 'bg-gray-200 text-gray-600'
                          }
                        `}>
                          {process}
                          {animatedStep === index && (
                            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-ping">
                              !
                            </div>
                          )}
                        </div>
                        {index < safeSequence.length - 1 && (
                          <div className={`
                            text-2xl font-bold transition-all duration-300
                            ${animatedStep > index ? 'text-green-600' : 'text-gray-400'}
                          `}>
                            →
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Work Resources Visualization */}
                {showWorkMatrix && workResources.length > 0 && (
                  <div className="bg-white/70 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Work Resources After Each Step:</h4>
                    <div className="overflow-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 text-sm font-semibold text-gray-600 border-b border-gray-200">Step</th>
                            {Array.from({ length: numResource }, (_, i) => (
                              <th key={i} className="p-2 text-sm font-semibold text-gray-600 border-b border-gray-200">
                                R{i}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {workResources.map((row, i) => (
                            <tr key={i} className={`
                              transition-all duration-300
                              ${i === animatedStep + 1 ? 'bg-green-100' : ''}
                            `}>
                              <td className="p-2 font-semibold text-gray-700 border-b border-gray-100">
                                {i === 0 ? 'Initial' : `After ${safeSequence[i-1]}`}
                              </td>
                              {row.map((val, j) => (
                                <td key={j} className="p-2 text-center border-b border-gray-100">
                                  <div className={`
                                    inline-block px-3 py-1 rounded-md
                                    ${i === animatedStep + 1 ? 'bg-green-200 font-bold' : ''}
                                  `}>
                                    {val}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Animation Controls */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    className={`
                      py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg flex items-center gap-2
                      ${animatedStep >= safeSequence.length - 1
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105'
                      }
                    `}
                    onClick={animateStep}
                    disabled={animatedStep >= safeSequence.length - 1}
                  >
                    <Play className="w-5 h-5" />
                    Next Step
                  </button>
                  
                  <button
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                    onClick={runFullAnimation}
                  >
                    <Play className="w-5 h-5" />
                    Run Full Animation
                  </button>
                  
                  <button
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
                    onClick={resetAnimation}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset Animation
                  </button>
                </div>

                {animatedStep >= 0 && (
                  <div className="mt-6 text-center">
                    <div className={`
                      inline-block px-6 py-3 rounded-lg font-bold text-lg transition-all duration-500
                      ${isAnimating ? 'bg-yellow-200 scale-110' : 'bg-blue-100'}
                    `}>
                      {animatedStep < safeSequence.length ? (
                        <>
                          Executing: <span className="text-blue-700">{safeSequence[animatedStep]}</span>
                          {workResources[animatedStep + 1] && (
                            <span className="ml-4">
                              New Work: [
                              {workResources[animatedStep + 1].map((val, i) => (
                                <span key={i} className="mx-1 font-mono">{val}</span>
                              ))}
                              ]
                            </span>
                          )}
                        </>
                      ) : (
                        "All processes completed!"
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Visualization;