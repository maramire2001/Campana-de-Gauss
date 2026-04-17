"use client";

import React, { useState, useMemo, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import * as d3 from "d3";

interface Point {
  id: number;
  value: number;
}

export default function BellCurve() {
  const [mean, setMean] = useState(50);
  const [median, setMedian] = useState(50);
  const [deviation, setDeviation] = useState(15);
  
  const [activePoint, setActivePoint] = useState<'mean' | 'median' | 'deviation' | null>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 20, bottom: 60, left: 20 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Domain 0-100
  const xScale = useMemo(() => d3.scaleLinear().domain([0, 100]).range([0, innerWidth]), [innerWidth]);
  
  const curveData = useMemo(() => {
    const data = [];
    const safeDev = Math.max(deviation, 1.5);
    
    // Error function approximation for CDF
    const erf = (x: number) => {
      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x);
      const t = 1 / (1 + 0.3275911 * x);
      const a1 =  0.254829592;
      const a2 = -0.284496736;
      const a3 =  1.421413741;
      const a4 = -1.453152027;
      const a5 =  1.061405429;
      const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return sign * y;
    };
    
    const cdf = (x: number) => 0.5 * (1 + erf(x / Math.sqrt(2)));

    // Advanced Skew-Normal Math
    const alpha = (mean - median) * 0.5; // Skew strength
    
    // Notice the factor uses 2 / ... because skew normal formula is 2/omega * phi * Phi
    const factor = 2 / (safeDev * Math.sqrt(2 * Math.PI)); 

    for (let x = 0; x <= 100; x += 0.5) {
      const z = (x - mean) / safeDev;
      const phi = Math.exp(-0.5 * z * z); 
      const Phi = cdf(alpha * z);
      const y = factor * phi * Phi;
      data.push({ x, y });
    }
    
    return { data };
  }, [mean, median, deviation]);

  const yScale = useMemo(() => {
    // FIXED Y-AXIS to properly show Kurtosis (Leptokurtic = tall, Platykurtic = flat)
    return d3.scaleLinear()
      .domain([0, 0.08]) 
      .range([innerHeight, 0])
      .clamp(false);
  }, [innerHeight]);

  const lineGenerator = d3.line<{x: number, y: number}>()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveBasis);

  const pathD = lineGenerator(curveData.data) || "";

  // Interaction handlers
  const handlePointerDown = (type: 'mean' | 'median' | 'deviation') => {
    setActivePoint(type);
  };

  const handlePointerMove = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (!activePoint) return;
    
    let clientX = 0;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as ReactMouseEvent).clientX;
    }

    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      let newX = clientX - rect.left - margin.left;
      let val = xScale.invert(newX);
      
      // Constraint to 0-100
      if (val < 0) val = 0;
      if (val > 100) val = 100;
      
      if (activePoint === 'mean') {
         const diff = val - mean;
         setMean(val);
         // Move median along with mean to preserve skew, optional but intuitive
         setMedian(prev => Math.max(0, Math.min(100, prev + diff))); 
      }
      if (activePoint === 'median') {
         setMedian(val);
      }
      if (activePoint === 'deviation') {
         const newDev = Math.max(1.5, Math.abs(val - mean));
         setDeviation(newDev);
      }
    }
  };

  const handlePointerUp = () => {
    setActivePoint(null);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);
    return () => {
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  return (
    <div className="w-full flex justify-center flex-col items-center select-none"
         onMouseMove={handlePointerMove}
         onTouchMove={handlePointerMove}>
      
      <div className="flex gap-4 mb-4 bg-secondary p-4 rounded-xl shadow-lg border border-border w-full justify-between items-center text-sm md:text-base">
        <div className="flex flex-col items-center p-2 bg-green-900/40 rounded-lg border border-green-500/30 w-32">
          <span className="font-bold text-green-400">Media</span>
          <span className="text-2xl font-mono text-green-300">{mean.toFixed(1)}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-indigo-900/40 rounded-lg border border-indigo-500/30 w-32">
          <span className="font-bold text-indigo-400">Mediana</span>
          <span className="text-2xl font-mono text-indigo-300">{median.toFixed(1)}</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-blue-900/40 rounded-lg border border-blue-500/30 w-32">
          <span className="font-bold text-blue-400">Desviación (σ)</span>
          <span className="text-2xl font-mono text-blue-300">{deviation.toFixed(1)}</span>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height} className="bg-card rounded-2xl shadow-2xl border border-border overflow-visible">
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          
          {/* Axis Line */}
          <line x1={0} y1={innerHeight + 20} x2={innerWidth} y2={innerHeight + 20} stroke="#334155" strokeWidth={2} />
          
          {/* Axis Ticks */}
          {[0, 20, 40, 60, 80, 100].map(tick => (
             <g key={tick} transform={`translate(${xScale(tick)}, ${innerHeight + 20})`}>
                <line x1={0} y1={0} x2={0} y2={10} stroke="#64748b" strokeWidth={2}/>
                <text y={25} textAnchor="middle" fill="#94a3b8" className="text-sm font-semibold">{tick}</text>
             </g>
          ))}

          {/* Curve fill pattern */}
          <defs>
             <linearGradient id="curveGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0.1} />
             </linearGradient>
          </defs>

          {/* The Bell Curve Area */}
          <path 
            d={`${pathD} L ${xScale(100)} ${innerHeight} L ${xScale(0)} ${innerHeight} Z`} 
            fill="url(#curveGradient)" 
            className="transition-all duration-75 ease-out"
          />

          {/* The Bell Curve Line */}
          <path 
             d={pathD} 
             fill="none" 
             stroke="#a5b4fc" 
             strokeWidth={4} 
             strokeLinecap="round"
             className="transition-all duration-75 ease-out drop-shadow-[0_0_10px_rgba(165,180,252,0.8)]"
          />
          
          {/* HANDLE: Mean */}
          <line
             x1={xScale(mean)}
             y1={0}
             x2={xScale(mean)}
             y2={innerHeight + 20}
             stroke="#4ade80"
             strokeWidth={3}
             strokeDasharray="4 4"
             className="transition-all duration-75 ease-out pointer-events-none"
          />
          <circle
             cx={xScale(mean)}
             cy={innerHeight + 20}
             r={16}
             fill="#4ade80"
             stroke="#14532d"
             strokeWidth={4}
             className="cursor-pointer hover:fill-green-300 drop-shadow-[0_4px_8px_rgba(74,222,128,0.5)] transition-colors z-30"
             onMouseDown={(e) => { e.stopPropagation(); handlePointerDown('mean'); }}
             onTouchStart={(e) => { e.stopPropagation(); handlePointerDown('mean'); }}
          />

          {/* HANDLE: Median (Skewness) */}
          <line
             x1={xScale(median)}
             y1={30}
             x2={xScale(median)}
             y2={innerHeight + 20}
             stroke="#818cf8"
             strokeWidth={2}
             strokeLinecap="round"
             className="transition-all duration-75 ease-out pointer-events-none"
          />
          <polygon
             points={`${xScale(median)-12},${innerHeight + 40} ${xScale(median)+12},${innerHeight + 40} ${xScale(median)},${innerHeight + 15}`}
             fill="#818cf8"
             stroke="#312e81"
             strokeWidth={3}
             className="cursor-pointer hover:fill-indigo-300 drop-shadow-[0_4px_8px_rgba(129,140,248,0.5)] transition-colors z-20"
             onMouseDown={(e) => { e.stopPropagation(); handlePointerDown('median'); }}
             onTouchStart={(e) => { e.stopPropagation(); handlePointerDown('median'); }}
          />

          {/* HANDLE: Deviation (Width) */}
          <line
             x1={xScale(mean)}
             y1={innerHeight / 2}
             x2={xScale(mean + deviation)}
             y2={innerHeight / 2}
             stroke="#60a5fa"
             strokeWidth={3}
             strokeDasharray="6 4"
             className="transition-all duration-75 ease-out pointer-events-none"
          />
          <rect
             x={xScale(mean + deviation) - 10}
             y={(innerHeight / 2) - 10}
             width={20}
             height={20}
             rx={4}
             fill="#60a5fa"
             stroke="#1e3a8a"
             strokeWidth={3}
             className="cursor-pointer hover:fill-blue-300 drop-shadow-[0_4px_8px_rgba(96,165,250,0.5)] transition-colors z-20"
             onMouseDown={(e) => { e.stopPropagation(); handlePointerDown('deviation'); }}
             onTouchStart={(e) => { e.stopPropagation(); handlePointerDown('deviation'); }}
          />

        </g>
      </svg>
      <div className="mt-6 text-muted-foreground font-medium text-lg flex gap-6 text-sm">
        <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-400"></div> Mueve la Media</span>
        <span className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-400" style={{clipPath: 'polygon(50% 0, 100% 100%, 0 100%)'}}></div> Sesga con la Mediana</span>
        <span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-blue-400"></div> Ajusta Desviación (1σ)</span>
      </div>
    </div>
  );
}
