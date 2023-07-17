import React from "react";
import Cars from "./Cars";
import "./Rightbody.css";
import "./items.css";
import urn from "../../../Images/urn.png";
import FilterItemBar from "./FilterItemBar";

interface ProductItem {
  car_id: number;
  status_id: number;
  user_id: number;
  dealer_user_id: number;
  paid_add: number;
  photo: string;
  pic_number: number;
  prod_year: number;
  prod_month: number;
  man_id: number;
  car_model: string;
  price: number;
  price_usd: number;
  first_deposit: number;
  price_value: number;
  fuel_type_id: number;
  gear_type_id: number;
  drive_type_id: number;
  door_type_id: number;
  color_id: number;
  saloon_color_id: number;
  cylinders: number;
  car_run: number;
  car_run_km: number;
  car_run_dim: number;
  engine_volume: number;
  airbags: number;
  abs: boolean;
  esd: boolean;
  el_windows: boolean;
  conditioner: boolean;
  leather: boolean;
  disks: boolean;
  nav_system: boolean;
  central_lock: boolean;
  hatch: boolean;
  right_wheel: boolean;
  alarm: boolean;
  board_comp: boolean;
  hydraulics: boolean;
  chair_warming: boolean;
  climat_control: boolean;
  obstacle_indicator: boolean;
  customs_passed: boolean;
  client_name: string;
  client_phone: number;
  model_id: number;
  location_id: number;
  parent_loc_id: number;
  tech_inspection: boolean;
  checked_for_duplicates: boolean;
  order_number: number;
  stickers: any;
  changable: boolean;
  auction: boolean;
  has_turbo: boolean;
  for_rent: boolean;
  rent_daily: boolean;
  rent_purchase: boolean;
  rent_insured: boolean;
  rent_driver: boolean;
  currency_id: number;
  vehicle_type: number;
  category_id: number;
  vin: string;
  user_type: any;
  prom_color: number;
  special_persons: boolean;
  back_camera: boolean;
  car_desc: string;
  order_date: string;
  video_url: string;
  hp: number;
  hours_used: number;
  photo_ver: number;
  checked: boolean;
  lang_type_id: number;
  el_starter: number;
  start_stop: boolean;
  trunk: boolean;
  windshield: boolean;
  inspected_in_greenway: boolean;
  license_number: string;
  words_checked: number;
  is_payd: boolean;
  condition_type_id: number;
  primary_damage_type: number;
  secondary_damage_type: number;
  auction_has_key: number;
  is_auction: number;
  saloon_material_id: number;
  map_lat: number;
  map_long: number;
  zoom: number;
  predicted_price: string;
  hdd: number;
  map_title: string;
  has_catalyst: number;
  tmp: string;
  views: number;
  dealerId: any;
  has_logo: any;
  logo_ver: any;
  active_ads: any;
  dealer_title: any;
  has_predicted_price: boolean;
  pred_first_breakpoint: number;
  pred_second_breakpoint: number;
  pred_min_price: number;
  pred_max_price: number;
  comfort_features: number[];
}

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

interface CarlistProps {
  prods: ProductItem[];
  total: number;
  handleperiod: (period: string) => void;
  handlesortOrder: (order: string) => void;
  filter: () => Promise<void>;
  mans: MansItem[];
  deal: number;
  selectedmans: Models[];
  period: string;
  pricefrom: number;
  priceto: number;
  isfiltercalled: boolean;
  handlefilter: (par: boolean) => void;
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
}

const Carlist: React.FC<CarlistProps> = ({
  prods,
  total,
  handleperiod,
  handlesortOrder,
  mans,
  filter,
  deal,
  selectedmans,
  period,
  pricefrom,
  priceto,
  isfiltercalled,
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
  handleto
}) => {

 
  return (
    <div className="rightsearch">
      <div className="minibar">
        <span className="txt">{total} განცხადება</span>

        <div className="Period">
          <div>
            <select
              onChange={(e) => {
                handlefilter(true);
                handleshow(true);
                handleperiod(e.target.value);
              }}
              className="FilterByDate"
              defaultValue="none"
            >
              <option className="valuestyle" value={"1h"}>
                ბოლო 1 საათი
              </option>
              <option className="valuestyle" value={"2h"}>
                ბოლო 2 საათი
              </option>
              <option className="valuestyle" value={"3h"}>
                ბოლო 3 საათი
              </option>
              <option className="valuestyle" value={"1d"}>
                ბოლო 1 დღე
              </option>
              <option className="valuestyle" value={"2d"}>
                ბოლო 2 დღე
              </option>
              <option className="valuestyle" value={"3d"}>
                ბოლო 3 დღე
              </option>
              <option className="valuestyle" value={"1w"}>
                ბოლო 1 კვირა
              </option>
              <option className="valuestyle" value={"2w"}>
                ბოლო 2 კვირა
              </option>
              <option className="valuestyle" value={"3w"}>
                ბოლო 3 კვირა
              </option>
            </select>
          </div>

          <div>
            <select
              onChange={(e) => {
                handlefilter(true);
                handleshow(true);
                handlesortOrder(e.target.value);
              }}
              className="FilterByGeneral"
              defaultValue="none"
            >
              <option value={"2"}>თარიღი ზრდადი</option>
              <option value={"1"}>თარიღი კლებადი</option>
              <option value={"4"}>ფასი ზრდადი</option>
              <option value={"3"}>ფასი კლებადი</option>
              <option value={"6"}>გარბენი ზრდადი</option>
              <option value={"5"}>გარბენი კლებადი</option>
            </select>
          </div>
        </div>
      </div>
      {(isfiltercalled && (deal!==2 || period!=="0" || pricefrom!==0 || priceto!==-1 || selectedmans.length!==0 || chosencats.length!==0)) && (
      <FilterItemBar
        deal={deal}
        period={period}
        pricefrom={pricefrom}
        priceto={priceto}
        selectedmans={selectedmans}
        handlefilter={handlefilter}
        show={show}
        handleshow={handleshow}
        chosencats={chosencats}
        settodefault={settodefault}
        handledeal={handledeal}
        handleitemchange={handleitemchange}
        item={item}
        handlecat={handlecat}
        handleman={handleman}
        handlemodel={handlemodel}
        handlefrom={handlefrom}
        handleto={handleto}
        handleperiod={handleperiod}
      />
            )}

      {prods.map((prod) => (
        <Cars
          dzravi={prod.engine_volume}
          man_id={prod.man_id}
          model_id={prod.model_id}
          mans={mans}
          year={prod.prod_year}
          ganbajeba={prod.customs_passed}
          mileage={prod.car_run_km}
          wheelType={prod.right_wheel}
          price={prod.price}
          views={prod.views}
          photo={prod.photo}
          photo_ver={prod.photo_ver}
          id={prod.car_id}
          timepassed={prod.order_date}
        />
      ))}
    </div>
  );
};

export default Carlist;
