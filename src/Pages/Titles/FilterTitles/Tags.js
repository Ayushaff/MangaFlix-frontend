import { useEffect } from "react";
import FilterItems from "../../../SharedUI/Filter/FilterItems";
import FilterItemsViev from "../../../SharedUI/Filter/FilterItemsViev";
import styles from "./filter-titles.module.scss";

const Tags = ({ tags = [], isFlexBox = false }) => {
  useEffect (()=>{
    console.log("TGS LESGOOOO",tags);
  },[]);
  return ( 
    <div className={styles.tags} style={{display:'flex' ,flexWrap:'wrap'}}>
      {tags?.map((tag) => {
        return (
          <>
            
              <FilterItemsViev
                key={tag.id}
                title={tag.name}
                id={tag?.id}
                // handleClick={handleClick}
              />
            
            {/* <FilterItems items={tag.tags} isSpecific={isFlexBox} type={tag.type} /> */}
          </>
        );
      })}
    </div>
  );
};

export default Tags;
