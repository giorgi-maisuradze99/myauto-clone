import React, {useState, useRef, useEffect} from 'react'
import './Leftsearch'

interface Category {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}
interface ForCats {
  id: number;
  name: string;
}

interface CategoryProps {
  filteredcats: Category[];
  chosencats: ForCats[];
  handlecatscheckboxchange: (catId: number, nm: string) => void;
}

function Categorry(props: CategoryProps) {
  const [dropdownActive, setDropdownActive] = useState(false)
  let dropdownRef = React.useRef<HTMLInputElement>(null)
  const [placeholder, setPlaceholder] = useState<string[]>([]);

useEffect(() => {
  setPlaceholder([]);
  if (props.chosencats.length !== 0) {
    const sortedNames = props.chosencats
      .map((element) => element.name)
    setPlaceholder(sortedNames);
  }
}, [props.chosencats]);

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

   function truncateNames(names: string[]): string {
     const maxLength = 20;
     const truncatedNames = names.join(", ").slice(0, maxLength);

     if (names.join(", ").length > maxLength) {
       return `${truncatedNames}...`;
     } else {
       return truncatedNames;
     }
   }

  const isCatChecked = (id: number) => {
    return props.chosencats.some((cat) => cat.id === id);
  };
  return (
      <div   ref={dropdownRef} >
      <label>კატეგორია</label>
          <div className="dropdown-button" onClick={()=>setDropdownActive(!dropdownActive)}>
            <div>
              <span className="dropdown-button-text">
            {placeholder.length === 0 ? "კატეგორია" : truncateNames(placeholder)}
          </span>
              <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 11-3 3-3-3" stroke="#6F7383" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            </div>
          </div>
          <div className="dropdown-wrapper">
            <div className={dropdownActive ? 'dropdown-div-style' : "none"}>
                <ul>
                  {props.filteredcats.map((cat) => (
                <li key={cat.category_id}>
                  <input
                    type="checkbox"
                    checked={isCatChecked(cat.category_id)}
                    onClick={() =>props.handlecatscheckboxchange(cat.category_id, cat.title)}
                  />
                  {cat.title}
                </li>
              ))}
                </ul>
            </div>
          </div>
    </div>
  )
}

export default Categorry