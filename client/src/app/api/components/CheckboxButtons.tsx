import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react";

interface Props {
    items: string[]
    checked?: string[]
    onChange: (item: string[]) =>void;
}

function CheckboxButtons({items, checked, onChange}: Props) {

    const [checkedItems, setCheckedItems] =useState(checked || []);

    function handelChecked (value: string) {
        const currenctIndex = checkedItems.findIndex(item => item === value);
        let newhecked: string[] = [];
        if(currenctIndex === -1) newhecked= [...checkedItems,value];
        else newhecked =checkedItems.filter(item => item !== value);
        setCheckedItems(newhecked);
        onChange(newhecked);
    }

  return (
    <FormGroup>
            {items.map(item => (
              <FormControlLabel
               control={<Checkbox 
                checked ={checkedItems.indexOf(item) !== -1 }
                onClick ={() => handelChecked(item)}
               />} 
               label={item} key ={item}
               
               />
            ))}
          </FormGroup>
  )
}

export default CheckboxButtons