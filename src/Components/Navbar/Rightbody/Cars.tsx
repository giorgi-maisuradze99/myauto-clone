import React, { useEffect, useState } from "react";
import run from "../../../Images/run.png";
import wheel from "../../../Images/wheel.png";
import transmis from "../../../Images/transmis.png";
import engine from "../../../Images/engine.png";
import heart from "../../../Images/heart.png";
import Ganbajeba from "./Ganbajeba";
import "./Rightbody.css";
import "./items.css";
import "../../../Media-Query.css";
import invalid from "../../../Images/invalid.png";

import { error } from "console";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import { da } from "date-fns/locale";

interface MansAndModels {
  man_id: string;
  man_name: string;
  models: ModelItem[];
}

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

interface MansItem {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface CarlistProps {
  year: number;
  ganbajeba: boolean;
  mileage: number;
  wheelType: boolean;
  price: number;
  views: number;
  photo: string;
  photo_ver: number;
  id: number;
  man_id: number;
  model_id: number;
  mans: MansItem[];
  dzravi: number;
  timepassed: string;
}

const Cars: React.FC<CarlistProps> = ({
  year,
  ganbajeba,
  mileage,
  wheelType,
  price,
  views,
  photo,
  photo_ver,
  id,
  man_id,
  model_id,
  dzravi,
  mans,
  timepassed,
}) => {
  const [customs, setCustoms] = useState<number>(0);
  const [wheeltype, SetWheeltype] = useState<string>("მარცხენა");
  const [name, setName] = useState<string>();
  const [model, setModel] = useState<ModelItem[]>([]);
  const [engin, setEngin] = useState<string>();
  const [date, setDate] = useState<string>();
  const [srcc, setSrcc] = useState<string>(invalid);

  function getTimeAgo(date: Date): string {
    const currentDate = new Date();

    const minutesAgo = differenceInMinutes(currentDate, date);
    if (minutesAgo < 60) {
      return `${minutesAgo} წუთის წინ`;
    }

    const hoursAgo = differenceInHours(currentDate, date);
    if (hoursAgo < 24) {
      return `${hoursAgo} საათის წინ`;
    }

    const daysAgo = differenceInDays(currentDate, date);
    if (daysAgo < 7) {
      return `${daysAgo} დღის წინ`;
    }

    const weeksAgo = differenceInWeeks(currentDate, date);
    if (weeksAgo < 4) {
      return `${weeksAgo} კვირის წინ`;
    }

    const monthsAgo = differenceInMonths(currentDate, date);
    if (monthsAgo < 12) {
      return `${monthsAgo} თვის წინ`;
    }

    const yearsAgo = differenceInYears(currentDate, date);
    return `${yearsAgo} წლის წინ`;
  }

  useEffect(() => {
    setModel(model);
    if (ganbajeba) {
      setCustoms(1);
    }
    if (wheelType) {
      SetWheeltype("მარჯვენა");
    }
    setEngin((dzravi / 1000).toFixed(1));
    const targetdate = new Date(timepassed);
    const timeago = getTimeAgo(targetdate);
    setDate(timeago);
  }, [customs, wheelType, ganbajeba, engin, date]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`
        );
        const data = await response.json();
        setModel(data.data);

        const car = mans.find((man) => parseInt(man.man_id) === man_id);
        const mdl = data.data.find(
          (mod: ModelItem) => mod.model_id === model_id
        );
        const namestring = `${car?.man_name} ${mdl?.model_name}`;
        setName(namestring);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [man_id, model_id, mans]);

  return (
    <div>
      <div className="product">
        {photo === "0" ? (
          <img id="ForImg" src={invalid} />
        ) : (
          <img
            id="ForImg"
            src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${id}_1.jpg?v=${photo_ver}`}
          />
        )}

        <div className="specifications">
          <div id="ForName">
            <div id="gn">
              <span id="carName">{name}</span>
              <span id="year">{year}</span>
            </div>

            <div id="gn">
              <span>
                <Ganbajeba int={customs} />
              </span>
              <span id="location">თბილისი</span>
            </div>
          </div>

          <div id="ForMiddle">
            <div id="ForMiddle-Left">
              <div className="itm1">
                <img src={engine} />
                {engin} ბენზინი
              </div>
              <div className="itm1">
                <img src={run} />
                {mileage} კმ
              </div>
              <div className="itm1">
                <img src={transmis} />
                ავტომატიკა
              </div>
              <div className="itm1">
                <img src={wheel} />
                {wheeltype}
              </div>
            </div>

            <div id="ForMiddle-Right">
              <span id="value">{price}</span>
              <span id="currency">₾</span>
            </div>
          </div>

          <hr></hr>

          <div id="ForViews">
            <div id="gn">
              <span id="views">{views} ნახვა</span>
              <span id="views">{date}</span>
            </div>

            <div id="gn">
              <span>
                <img src={heart} />
              </span>
              <span>
                <img src={heart} />
              </span>
              <span>
                <img src={heart} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
