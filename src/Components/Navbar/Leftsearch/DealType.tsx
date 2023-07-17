import './Leftsearch'

import React, {useState, useRef, useEffect} from 'react'

interface DealProps{
  handledeal: (deal: number) => void;
  deal: number;
}

const DealType: React.FC<DealProps> = ({handledeal, deal}) => {
  const [dropdownActive, setDropdownActive] = useState(false)
  let dropdownRef = React.useRef<HTMLInputElement>(null)
  const [isForSaleChecked, setIsForSaleChecked] = useState(false);
  const [isForRentChecked, setIsForRentChecked] = useState(false);
  const [placeholder, setPlaceholder] = useState("გარიგების ტიპი");

  useEffect(() => {
    if(deal===2){
      setIsForRentChecked(false);
      setIsForSaleChecked(false);
      setPlaceholder("გარიგების ტიპი")
    }
  },[deal])

  const handleForSaleChange = () => {
    setIsForSaleChecked(!isForSaleChecked);
    setIsForRentChecked(false);
  };

  const handleForRentChange = () => {
    setIsForRentChecked(!isForRentChecked);
    setIsForSaleChecked(false);
  };

  useEffect(() => {
    let handler = (e : any) =>{
      if(!dropdownRef.current?.contains(e.target)){
        setDropdownActive(false)
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  })


  

  return (
    <div ref={dropdownRef}>
        <label>გარიგების ტიპი</label>
          
          <div className="dropdown-button" onClick={()=>setDropdownActive(!dropdownActive)}>
              <div>
              <span className="dropdown-button-text">{placeholder}</span>
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 11-3 3-3-3" stroke="#6F7383" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              </div>
          </div>
          <div className={dropdownActive ? 'dropdown-div-style' : 'none'}>
              <ul>
                  <li><input type="checkbox" checked={isForSaleChecked} onChange={() => {if(isForSaleChecked){handledeal(2); setPlaceholder("გარიგების ტიპი")}else{handledeal(0); setPlaceholder("იყიდება")} handleForSaleChange()}}/>იყიდება</li>
                  <li><input type="checkbox" checked={isForRentChecked} onChange={() => {if(isForRentChecked){handledeal(2); setPlaceholder("გარიგების ტიპი")}else{handledeal(1); setPlaceholder("ქირავდება")} handleForRentChange()}}/>ქირავდება</li>
              </ul>
          </div>
    </div>
  )
}

export default DealType