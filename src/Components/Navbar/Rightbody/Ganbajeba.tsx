import React from "react";
import './Rightbody.css'
import './items.css'




interface GanbajebaProps {
  int: number;
}

const Ganbajeba: React.FC<GanbajebaProps> = ({ int }) => {
  const gel = 5;
  let spanElement;

  if (int === 1) {
    spanElement = 
    <span id="ganbajebulitxt"> 
    <span className="done-mark">&#x2713;</span>განბაჯებული</span>;
    
  } else {
    spanElement = <span id="gasanbajebelitxt">განბაჟება {gel} ₾</span>;
  }

  return <>
  {spanElement}
  </>;
};

export default Ganbajeba;
