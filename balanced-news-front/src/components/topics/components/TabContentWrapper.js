import React from "react";

function TabContentWrapper({ left, right }) {
  const wrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
  };

  const itemStyle = { flex: 1 };

  return (
    <div style={wrapperStyle}>
      <div style={itemStyle}>{left}</div>
      <div style={itemStyle}>{right}</div>
    </div>
  );
}

export default TabContentWrapper;
