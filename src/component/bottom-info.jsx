import React from "react";

const BottomInfo = () => {
  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          fontSize: "10px",
          marginTop: "8px",
          display: "flex",
          textAlign:'left',
          gap: 8,
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "rgba(0,128,0,0.3)",
            border: "1px solid green",
          }}
        ></div>
        <span className="bottom-text">*Dua posisi teratas lolos upper bracket</span>
      </div>

      <div
        style={{
          fontWeight: "bold",
          fontSize: "10px",
          marginTop: "8px",
          display: "flex",
          textAlign:'left',
          gap: 8,
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: "rgba(254,0,0,0.2)",
            border: "1px solid red",
          }}
        ></div>
        <span  className="bottom-text">*Tiga posisi terbawah tidak lolos ke babak playoffs</span>
      </div>
    </>
  );
};

export default BottomInfo;
