import React, { useState, useEffect } from "react";
import "./Rightbody.css";
import "./items.css";
import urn from "../../../Images/urn.png";

interface ForModels {
  modelid: string;
  modelname: string;
}

interface Models {
  man_id: string;
  man_name: string;
  model_id: Array<ForModels>;
}
interface ForCats {
  id: number;
  name: string;
}

interface FilterProps {
  deal: number;
  selectedmans: Models[];
  period: string;
  pricefrom: number;
  priceto: number;
  handlefilter: (some: boolean) => void;
  handleshow: (par: boolean) => void;
  show: boolean;
  chosencats: ForCats[];
  settodefault: () => void;
  handledeal: (some: number) => void;
  handleitemchange: (item: boolean) => void;
  item: boolean;
  handleman: (id: string) => void;
  handlemodel: (manId: string, modelId: string, modelName: string) => void;
  handlecat: (catId: number, nm: string) => void;
  handlefrom: (price: string) => void;
  handleto: (price: string) => void;
  handleperiod: (per: string) => void;
}

const FilterItemBar: React.FC<FilterProps> = ({
  deal,
  selectedmans,
  period,
  pricefrom,
  priceto,
  handlefilter,
  handleshow,
  show,
  chosencats,
  settodefault,
  handledeal,
  handleitemchange,
  item,
  handlecat,
  handleman,
  handlemodel,
  handlefrom,
  handleto,
  handleperiod
}) => {
  const [tipi, setTipi] = useState("");
  const [dro, setDro] = useState("");
  const [dan, setDan] = useState("");
  const [mde, setMde] = useState("");
  const [carArray, setCarArray] = useState<Models[]>([]);
  const [catArray, setCatArray] = useState<ForCats[]>([]);

  useEffect(() => {
    console.log(show);
    
    if (show) {
      if (deal === 0) {
        setTipi("იყიდება");
      } else if (deal === 1) {
        setTipi("ქირავდება");
      } else {
        setTipi("");
      }
      if (period === "1h") {
        setDro("1 საათი");
      } else if (period === "2h") {
        setDro("2 საათი");
      } else if (period === "3h") {
        setDro("3 საათი");
      } else if (period === "1d") {
        setDro("1 დღე");
      } else if (period === "2d") {
        setDro("2 დღე");
      } else if (period === "3d") {
        setDro("3 დღე");
      } else if (period === "1w") {
        setDro("1 კვირა");
      } else if (period === "2w") {
        setDro("2 კვირა");
      } else if (period === "3w") {
        setDro("3 კვირა");
      } else {
        setDro("");
      }
      console.log(dro);
      if (pricefrom !== 0) {
        setDan(`ფასი: ${pricefrom} დან`);
      }else{
        setDan("")
      }
      console.log(dan);
      if (priceto !== -1) {
        setMde(`ფასი: ${priceto} მდე`);
      }else{
        setMde("");
      }
      console.log(mde);
      setCarArray(selectedmans);
      console.log(carArray);
      setCatArray(chosencats);
      console.log(catArray);
    }
    console.log(show);
    handleshow(false);
    console.log(show);
  }, [deal, period, pricefrom, priceto, show, selectedmans, chosencats, tipi]);


  return (
    <>
      <div className="FilterItemsBar">
        <img
          src={urn}
          style={{ height: "40px", width: "40px", cursor: "pointer" }}
          onClick={() => {
            settodefault();
            handleshow(true);
            handlefilter(false);
          }}
        ></img>
        <h5 style={{ color: "#d8dbe2" }}>|</h5>

        {(tipi === "იყიდება" || tipi === "ქირავდება") && (
          <div className="custom-container">
            {tipi}
            <span className="custom-icon">
              <svg
                className="custom-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.5 5.5-5 5M5.5 5.5l5 5"
                  stroke="#272A37"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  onClick={() => {
                    handledeal(2);
                    handleshow(true);
                    if (
                      carArray.length === 0 &&
                      catArray.length === 0 &&
                      dan === "" &&
                      mde === "" &&
                      dro === ""
                    ) {
                      handlefilter(false);
                    }

                    handleitemchange(!item);
                  }}
                ></path>
              </svg>
            </span>
          </div>
        )}

        {carArray.map((manmodel) => (
          <>
            <div className="custom-container">
              {manmodel.man_name}
              <span className="custom-icon">
                <svg
                  className="custom-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m10.5 5.5-5 5M5.5 5.5l5 5"
                    stroke="#272A37"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    onClick={() => {
                      handleman(manmodel.man_id);
                      handleshow(true);
                      if (
                        tipi === "" &&
                        carArray.length === 1 &&
                        catArray.length === 0 &&
                        dan === "" &&
                        mde === "" &&
                        dro === ""
                      ) {
                        handlefilter(false);
                      }
                      handleitemchange(!item);
                    }}
                  ></path>
                </svg>
              </span>
            </div>
            {manmodel.model_id.map((model) => (
              <div className="custom-container">
                {model.modelname}
                <span className="custom-icon">
                  <svg
                    className="custom-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m10.5 5.5-5 5M5.5 5.5l5 5"
                      stroke="#272A37"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      onClick={() => {
                        handlemodel(
                          manmodel.man_id,
                          model.modelid,
                          model.modelname
                        );
                        handleshow(true);
                        handleitemchange(!item);
                      }}
                    ></path>
                  </svg>
                </span>
              </div>
            ))}
          </>
        ))}

        {catArray.map((cat) => (
          <div className="custom-container">
            {cat.name}
            <span className="custom-icon">
              <svg
                className="custom-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.5 5.5-5 5M5.5 5.5l5 5"
                  stroke="#272A37"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  onClick={() => {
                    handlecat(cat.id, cat.name);
                    handleshow(true);
                    if (
                      tipi === "" &&
                      carArray.length === 0 &&
                      catArray.length === 1 &&
                      dan === "" &&
                      mde === "" &&
                      dro === ""
                    ) {
                      handlefilter(false);
                    }
                    handleitemchange(!item);
                  }}
                ></path>
              </svg>
            </span>
          </div>
        ))}

        {dan !== "" && (
          <div className="custom-container">
            {dan}
            <span className="custom-icon">
              <svg
                className="custom-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.5 5.5-5 5M5.5 5.5l5 5"
                  stroke="#272A37"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  onClick={() => {
                    handlefrom("");
                    handleshow(true);
                    if (
                      tipi === "" &&
                      carArray.length === 0 &&
                      catArray.length === 0 &&
                      mde === "" &&
                      dro === ""
                    ) {
                      handlefilter(false);
                    }
                    handleitemchange(!item);
                  }}
                ></path>
              </svg>
            </span>
          </div>
        )}

        {mde !== "" && (
          <div className="custom-container">
            {mde}
            <span className="custom-icon">
              <svg
                className="custom-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.5 5.5-5 5M5.5 5.5l5 5"
                  stroke="#272A37"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  onClick={() => {
                    handleto("");
                    handleshow(true);
                    if (
                      tipi === "" &&
                      carArray.length === 0 &&
                      catArray.length === 0 &&
                      dan === "" &&
                      dro === ""
                    ) {
                      handlefilter(false);
                    }
                    handleitemchange(!item);
                  }}
                ></path>
              </svg>
            </span>
          </div>
        )}

        {dro !== "" && (
          <div className="custom-container">
            {dro}
            <span className="custom-icon">
              <svg
                className="custom-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  d="m10.5 5.5-5 5M5.5 5.5l5 5"
                  stroke="#272A37"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  onClick={() => {
                    handleperiod("0");
                    handleshow(true);
                    if (
                      tipi === "" &&
                      carArray.length === 0 &&
                      catArray.length === 0 &&
                      mde === "" &&
                      dan === ""
                    ) {
                      handlefilter(false);
                    }
                    handleitemchange(!item);
                  }}
                ></path>
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterItemBar;
