import React, { useCallback, useState, useRef, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Leftsearch from "./Components/Navbar/Leftsearch/Leftsearch";
import Carlist from "./Components/Navbar/Rightbody/Carlist";
import Pagination from "./Components/Navbar/Rightbody/Pagination";
import Vector from "./Images/Vector 1.png";
import Status from "./Components/Navbar/Status";
import "./Media-Query.css";

interface MansItem {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
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

interface Category {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

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

interface ForCats {
  id: number;
  name: string;
}

function App() {
  const [vehicle, setVehicle] = useState<number>(0);
  const [deal, setDeal] = useState<number>(2);
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(-1);
  const [period, setPeriod] = useState<string>("0");
  const [sortOrder, setSortOrder] = useState<string>("0");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, SetLastPage] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [selectedMans, setSelectedMans] = useState<Models[]>([]);
  const [mans, setMans] = useState<MansItem[]>([]);
  const [vehicleType, setVehicleType] = useState<MansItem[]>([]);
  const [make, setMake] = useState<ModelItem[]>([]);
  const [mansAndModels, setMansAndModels] = useState<MansAndModels[]>([]);
  const [models, setModels] = useState<Models[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [filteredCats, setFilteredCats] = useState<Category[]>([]);
  const [chosenCats, setChosenCats] = useState<ForCats[]>([]);
  const [prods, setProds] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterCalled, setIsFilterCalled] = useState(false);
  const [show, setShow] = useState(true);
  const [itemChange, setItemChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://static.my.ge/myauto/js/mans.json"
        );
        const mansData = await response.json();
        setMans(mansData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api2.myauto.ge/ka/cats/get");
        const catsData = await response.json();
        setCats(catsData.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api2.myauto.ge/ka/products?Page=${currentPage}&&vTypeID=${vehicle}`
        );
        const prodsData = await response.json();
        SetLastPage(prodsData.data.meta.last_page);
        setTotalResults(prodsData.data.meta.total);
        setProds(prodsData.data.items);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (vehicleType.length === 0 && cats.length > 0) {
      setVehicleType(
        mans
          .filter((item) => item.is_car === "1")
          .sort((a, b) => a.man_name.localeCompare(b.man_name))
      );
      setFilteredCats(cats.filter((item) => item.category_type === 0));
    }
    console.log(prods);
  }, [vehicleType, cats]);

  const filterVehicleType = (type: number) => {
    if (type === 0) {
      setVehicleType(
        mans
          .filter((item) => item.is_car === "1")
          .sort((a, b) => a.man_name.localeCompare(b.man_name))
      );
      setFilteredCats(cats.filter((item) => item.category_type === 0));
      setVehicle(0);
    } else if (type === 1) {
      setVehicleType(
        mans
          .filter((item) => item.is_spec === "1")
          .sort((a, b) => a.man_name.localeCompare(b.man_name))
      );
      setFilteredCats(cats.filter((item) => item.category_type === 1));
      setVehicle(1);
    } else {
      setVehicleType(
        mans
          .filter((item) => item.is_moto === "1")
          .sort((a, b) => a.man_name.localeCompare(b.man_name))
      );
      setFilteredCats(cats.filter((item) => item.category_type === 2));
      setVehicle(2);
    }
    clearAll();
  };

  const clearAll = () => {
    setSelectedMans([]);
    setMansAndModels([]);
    setChosenCats([]);
  };

  const handleManCheckboxChange = (id: string) => {
    if (!selectedMans.find((man) => man.man_id === id)) {
      const selectedMan = vehicleType.find((man) => man.man_id === id);
      if (selectedMan) {
        setSelectedMans((prevState) => [
          ...prevState,
          {
            man_id: selectedMan.man_id,
            man_name: selectedMan.man_name,
            model_id: [],
          },
        ]);

        getModelsList(id, selectedMan.man_name);
      }
    } else {
      setSelectedMans((prevState) =>
        prevState.filter((man) => man.man_id !== id)
      );
      setMansAndModels((prevState) =>
        prevState.filter((manmodel) => manmodel.man_id !== id)
      );
    }
  };

  const handleRemoveManFromModels = (id: string) => {
    handleManCheckboxChange(id);
  };

  const handleModelCheckboxChange = (
    manId: string,
    modelId: string,
    modelName: string
  ) => {
    setSelectedMans((prevSelectedMans) => {
      return prevSelectedMans.map((man) => {
        if (man.man_id === manId) {
          const existingModelIndex = man.model_id.findIndex(
            (element) => element.modelid === modelId
          );

          if (existingModelIndex !== -1) {
            const updatedModelId = [...man.model_id];
            updatedModelId.splice(existingModelIndex, 1);
            return { ...man, model_id: updatedModelId };
          } else {
            const model = {
              modelid: modelId,
              modelname: modelName,
            };
            return { ...man, model_id: [...man.model_id, model] };
          }
        }

        return man;
      });
    });
  };

  const handleCatsCheckboxChange = (catId: number, nm: string) => {
    setChosenCats((prevChosenCats) => {
      const isCatIdExists = prevChosenCats.find((cat) => cat.id === catId);
      let updatedChosenCats: ForCats[];

      if (isCatIdExists) {
        updatedChosenCats = prevChosenCats.filter((cat) => cat.id !== catId);
      } else {
        const newcat = {
          id: catId,
          name: nm,
        };
        updatedChosenCats = [...prevChosenCats, newcat];
      }

      return updatedChosenCats;
    });
  };

  const getModelsList = useCallback(
    async (id: string, name: string) => {
      try {
        const response = await fetch(
          `https://api2.myauto.ge/ka/getManModels?man_id=${id}`
        );
        const makeData = await response.json();
        setMake(makeData.data);
        console.log("imena akac");

        let tempArray: ModelItem[] = [];

        if (vehicle === 0) {
          tempArray = (makeData.data as ModelItem[]).filter(
            (element) => element.is_car
          );
        } else if (vehicle === 1) {
          tempArray = (makeData.data as ModelItem[]).filter(
            (element) => element.is_spec
          );
        } else {
          tempArray = (makeData.data as ModelItem[]).filter(
            (element) => element.is_moto
          );
        }

        const newItem: MansAndModels = {
          man_id: id,
          man_name: name,
          models: tempArray,
        };

        setMansAndModels((prevMansAndModels) => [
          ...prevMansAndModels,
          newItem,
        ]);
      } catch (error) {
        console.error(error);
      }

      setMansAndModels((prevmanmodels) =>
        prevmanmodels.sort((a, b) => a.man_name.localeCompare(b.man_name))
      );
    },
    [vehicle]
  );

  const handlePeriod = (period: string) => {
    setPeriod(period);
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
  };

  const handleDeal = (deal: number) => {
    setDeal(deal);
  };

  const handlePriceFrom = (price: string) => {
    if (price !== "") {
      setPriceFrom(parseInt(price));
    } else {
      setPriceFrom(0);
    }
  };

  const handlePriceTo = (price: string) => {
    if (price !== "") {
      setPriceTo(parseInt(price));
    } else {
      setPriceTo(-1);
    }
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const filter = async () => {
    var searchstring = `https://api2.myauto.ge/ka/products?Page=${currentPage}&&TypeID=${vehicle}`;
    if (deal !== 2) {
      searchstring += `&&ForRent=${deal}`;
      console.log("deal");
    }
    if (priceFrom !== 0) {
      searchstring += `&&PriceFrom=${priceFrom}`;
      console.log(priceFrom);
    }
    if (priceTo !== -1) {
      searchstring += `&&PriceTo=${priceTo}`;
      console.log(priceTo);
    }
    if (period !== "0") {
      searchstring += `&&Period=${period}`;
      console.log(period);
    }
    if (sortOrder !== "0") {
      searchstring += `&&SortOrder=${sortOrder}`;
      console.log(sortOrder);
    }

    if (selectedMans.length !== 0) {
      var manstring = "";
      selectedMans.forEach((element) => {
        manstring += element.man_id;
        if (element.model_id.length !== 0) {
          element.model_id.forEach((model) => {
            manstring += `.${model.modelid}`;
          });
        }
        if (selectedMans.indexOf(element) !== selectedMans.length - 1) {
          manstring += "-";
        }
      });

      searchstring += `&&Mans=${manstring}`;
    }

    if (chosenCats.length !== 0) {
      var catstring = "";
      chosenCats.forEach((element) => {
        catstring += `${element.id}`;
        if (chosenCats.indexOf(element) !== chosenCats.length - 1) {
          catstring += ".";
        }
      });

      searchstring += `&&Cats=${catstring}`;
    }

    console.log(searchstring);

    try {
      const response = await fetch(searchstring);
      const prodsData = await response.json();
      SetLastPage(prodsData.data.meta.last_page);
      setTotalResults(prodsData.data.meta.total);
      setProds(prodsData.data.items);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };


  const handlefilter = (some: boolean) => {
    if(deal===2&&period==="0"&&priceFrom===0&&priceTo===-1&&selectedMans.length===0&&chosenCats.length===0){
      setIsFilterCalled(false);
    }else{
      setIsFilterCalled(some);
    }
    console.log(deal, period, priceFrom, priceTo, selectedMans, chosenCats)
    console.log(isFilterCalled)
  };

  const handleshow = (par: boolean) => {
    setShow(par);
  };

  const settodefault = () => {
    setDeal(2);
    setMansAndModels([]);
    setSelectedMans([]);
    setChosenCats([]);
    setPriceFrom(0);
    setPriceTo(-1);
    setPeriod("0");
    setSortOrder("0");
    setCurrentPage(1);
  };

  const handleItemChange = (item: boolean) => {
    setItemChange(item);
  };

  useEffect(() => {
    filter();
  }, [period, sortOrder, currentPage, isFilterCalled, itemChange]);

  return (
    <>
      <div className="parent">
        <Navbar />

        <center>
          <span id="coord">
            მთავარი <img src={Vector}></img> ძიება <img src={Vector}></img>{" "}
            <Status value={deal} />
          </span>{" "}
        </center>

        <div className="custom-row">
          <div className="minicustom">
            <div className="left-column">
              <Leftsearch
                handledeal={handleDeal}
                handlepricefrom={handlePriceFrom}
                handlepriceto={handlePriceTo}
                selectedMans={selectedMans}
                vehicletype={vehicleType}
                manmodels={mansAndModels}
                filteredcats={filteredCats}
                chosencats={chosenCats}
                filtervehicletype={filterVehicleType}
                handlemancheckboxchange={handleManCheckboxChange}
                handleremovemanfrommodels={handleRemoveManFromModels}
                handlemodelcheckboxchange={handleModelCheckboxChange}
                handlecatscheckboxchange={handleCatsCheckboxChange}
                getmodelslist={getModelsList}
                filter={filter}
                handlefilter={handlefilter}
                handleshow={handleshow}
                deal={deal}
                from={priceFrom}
                to={priceTo}
              />
            </div>

            <div className="right-column">
              <Carlist
                prods={prods}
                total={totalResults}
                handleperiod={handlePeriod}
                handlesortOrder={handleSortOrder}
                deal={deal}
                selectedmans={selectedMans}
                period={period}
                pricefrom={priceFrom}
                priceto={priceTo}
                mans={mans}
                filter={filter}
                isfiltercalled={isFilterCalled}
                handlefilter={handlefilter}
                handleshow={handleshow}
                show={show}
                chosencats={chosenCats}
                settodefault={settodefault}
                handledeal={handleDeal}
                handleitemchange={handleItemChange}
                item={itemChange}
                handleman={handleRemoveManFromModels}
                handlemodel={handleModelCheckboxChange}
                handlecat={handleCatsCheckboxChange}
                handlefrom={handlePriceFrom}
                handleto={handlePriceTo}
              />
              <Pagination
                totalPages={lastPage}
                handlecurrentpage={handleCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
