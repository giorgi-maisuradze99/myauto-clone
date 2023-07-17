import React from "react";

interface StatusProps {
  value: number;
}

const Status: React.FC<StatusProps> = ({ value }) => {
  let statusText = "";

  switch (value) {
    case 0:
      statusText = "იყიდება";
      break;
    case 1:
      statusText = "ქირავდება";
      break;
    case 2:
      statusText = "";
      break;
    default:
      break;
  }

  let statusColor = "";

  if (value === 1 || value === 0) {
    statusColor = "#fd4100";
  }

  return <span style={{ color: statusColor }}>{statusText}</span>;
};

export default Status;
