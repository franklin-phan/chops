import React from 'react';
import './VaporWaveLogo.css'

function VaporWaveLogo() {
  return (
    <div className="scene">
      <div className="vaporwave-container">
        <div className="sun" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/record-color.svg)" }}></div>
        <div className="band" style={{ animationDelay: "0s" }}></div>
        <div className="band" style={{ animationDelay: "-1s" }}></div>
        <div className="band" style={{ animationDelay: "-2s" }}></div>
        <div className="band" style={{ animationDelay: "-3s" }}></div>
        <div className="band" style={{ animationDelay: "-4s" }}></div>
        <div className="band" style={{ animationDelay: "-5s" }}></div>
        <div className="band" style={{ animationDelay: "-6s" }}></div>
        <div className="band" style={{ animationDelay: "-7s" }}></div>
        <div className="band" style={{ animationDelay: "-8s" }}></div>
        <div className="band" style={{ animationDelay: "-9s" }}></div>
        <div className="band" style={{ animationDelay: "-10s" }}></div>
        <div className="band" style={{ animationDelay: "-11s" }}></div>
        <div className="band" style={{ animationDelay: "-12s" }}></div>
        <div className="band" style={{ animationDelay: "-13s" }}></div>
      </div>
    </div>
  )
}

export default VaporWaveLogo