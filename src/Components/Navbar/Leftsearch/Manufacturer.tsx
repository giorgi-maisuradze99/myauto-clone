import React, { useState, useRef, useEffect } from "react";
import "./Leftsearch";

interface Models {
  man_id: string;
  man_name: string;
  model_id: Array<ForModels>;
}

interface ForModels {
  modelid: string;
  modelname: string;
}

interface MansItem {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface ManufacturerProps {
  vehicletype: MansItem[];
  selectedmans: Models[];
  handlemancheckboxchange: (id: string) => void;
}

function Manufacturer(props: ManufacturerProps) {
  const [dropdownActive, setDropdownActive] = useState(false);
  let dropdownRef = React.useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState<string[]>([]);

  const isManChecked = (id: string) => {
    return props.selectedmans.some((manmodel) => manmodel.man_id === id);
  };



useEffect(() => {
  setPlaceholder([]);
  if (props.selectedmans.length !== 0) {
    const sortedNames = props.selectedmans
      .map((element) =>  convertToCamelCase(element.man_name))
      .sort();
    setPlaceholder(sortedNames);
  }
}, [props.selectedmans]);

  useEffect(() => {
    let handler = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setDropdownActive(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  function convertToCamelCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
      .replace(/(^|\s)(\w)/g, (_, __, c) => c.toUpperCase());
  }

  function truncateNames(names: string[]): string {
    const maxLength = 20;
    const truncatedNames = names.join(", ").slice(0, maxLength);

    if (names.join(", ").length > maxLength) {
      return `${truncatedNames}...`;
    } else {
      return truncatedNames;
    }
  }

  return (
    <div ref={dropdownRef}>
      <label>მწარმოებელი</label>
      <div
        className="dropdown-button"
        onClick={() => setDropdownActive(!dropdownActive)}
      >
        <div>
          <span className="dropdown-button-text">
            {placeholder.length === 0 ? "მწარმოებელი" : truncateNames(placeholder)}
          </span>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m15 11-3 3-3-3"
                stroke="#6F7383"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="dropdown-wrapper">
        <div className={dropdownActive ? "dropdown-div-style" : "none"}>
          <ul>
            {props.vehicletype.map((car) => (
              <li key={car.man_id}>
                <input
                  type="checkbox"
                  checked={isManChecked(car.man_id)}
                  onClick={() => {
                    props.handlemancheckboxchange(car.man_id);
                  }}
                />
                {convertToCamelCase(car.man_name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Manufacturer;
