import React, { useState, useRef, useEffect } from "react";
import "./Leftsearch";

interface ModelItem {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: number;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
}

interface MansAndModels {
  man_id: string;
  man_name: string;
  models: ModelItem[];
}

interface ForModels {
  modelid: string;
  modelname: string;
}

interface Models {
  man_id: string;
  man_name: string;
  model_id: Array<ForModels>;
}

interface ModelProps {
  manmodels: MansAndModels[];
  models: Models[];
  handleremovemanfrommodels: (id: string) => void;
  handlemodelcheckboxchange: (
    manId: string,
    modelId: string,
    modelName: string
  ) => void;
  getmodelslist: (id: string, name: string) => void;
}

function Model(props: ModelProps) {
  const [dropdownActive, setDropdownActive] = useState(false);
  let dropdownRef = React.useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState<string[]>([]);

  useEffect(() => {
    console.log(props.models);
    const modelNames = props.models.flatMap((model) =>
      model.model_id.map((forModel) => forModel.modelname)
    );

    setPlaceholder(modelNames);
  }, [props.models]);


  useEffect(() => {
    let handler = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) ||
        props.manmodels.length === 0
      ) {
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
      <label>მოდელი</label>
      <div
        className="dropdown-button"
        onClick={() => {
          setDropdownActive(!dropdownActive);
        }}
      >
        <div>
          <span className="dropdown-button-text">
            {placeholder.length === 0
              ? "მოდელი"
              : truncateNames(placeholder)}
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
            {props.manmodels.map((manModel) => (
              <li key={manModel.man_id}>
                <input
                  type="checkbox"
                  checked={true}
                  onClick={(e) => {
                    props.handleremovemanfrommodels(manModel.man_id);
                    if (props.manmodels.length !== 1) {
                      e.stopPropagation();
                    }
                  }}
                />
                <a className="parModel">{manModel.man_name}</a>
                {manModel.models.map((model) => (
                  <li key={model.model_id}>
                    <input
                      type="checkbox"
                      onClick={() =>
                        props.handlemodelcheckboxchange(
                          manModel.man_id,
                          String(model.model_id),
                          model.model_name
                        )
                      }
                    />
                    {convertToCamelCase(model.model_name)}
                  </li>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Model;
