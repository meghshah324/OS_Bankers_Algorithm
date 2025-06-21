import React from 'react';
import { BookOpen, Shield, Users, Cpu, CheckCircle, ArrowRight } from 'lucide-react';

function Theory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Banker's Algorithm</h1>
                <p className="text-blue-100 text-lg">Deadlock Avoidance & Resource Management Theory</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Introduction Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 mb-8 shadow-xl border border-white/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                What is the Banker's Algorithm?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                The Banker's Algorithm is a sophisticated resource allocation and deadlock avoidance algorithm. 
                Named after banking systems, it ensures that resources (loans) can be allocated to processes (customers) 
                in a safe, deadlock-free manner by maintaining the system in a safe state at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Key Concepts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Key Data Structures
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: <Cpu className="w-5 h-5" />,
                  title: "Available",
                  desc: "Number of available instances of each resource type",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Max",
                  desc: "Maximum demand of each process for each resource",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Allocation",
                  desc: "Currently allocated resources to each process",
                  color: "from-purple-500 to-pink-600"
                },
                {
                  icon: <CheckCircle className="w-5 h-5" />,
                  title: "Need",
                  desc: "Remaining resource requirement (Max - Allocation)",
                  color: "from-orange-500 to-red-600"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-200/50 transition-all duration-200">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Steps */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Algorithm Steps
            </h2>
            <div className="space-y-4">
              {[
                "Calculate the Need matrix (Max - Allocation)",
                "Find a process whose needs ≤ Available resources",
                "Simulate completion: release allocated resources",
                "Mark process as finished and update Available",
                "Repeat until all processes complete or deadlock detected"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safe State Explanation */}
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 shadow-xl border border-green-200/50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800 mb-3">Safe State Guarantee</h2>
              <p className="text-green-700 leading-relaxed text-lg mb-4">
                When all processes can complete their execution without causing a deadlock, the system is considered 
                to be in a <strong>safe state</strong>. The algorithm returns a safe sequence of process execution 
                that guarantees deadlock-free operation.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <span>Safe Sequence Example</span>
                <ArrowRight className="w-4 h-4" />
                <span className="px-3 py-1 bg-green-100 rounded-full text-sm">P1 → P3 → P0 → P2 → P4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Understanding the Banker's Algorithm is crucial for operating system design and resource management
          </p>
        </div>
      </div>
    </div>
  );
}

export default Theory;