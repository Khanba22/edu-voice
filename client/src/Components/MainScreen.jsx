import React, { useState, useEffect } from 'react';
import data from "../tempData.json";
import ScriptReader from './ScriptReader';

const MainScreen = () => {
  return (
    <div className="h-full w-9/12">
      {/* Main display area */}
      <div className='bg-red-600 h-5/6 p-4'>
        <h2 className='text-xl font-bold'>Summary</h2>
        <ul className='list-disc ml-6'>
          {data.summary.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
      <ScriptReader script={data.script}/>
    </div>
  );
};

export default MainScreen;
