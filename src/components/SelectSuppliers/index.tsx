import { useEffect } from "react";
import Select from "react-select";

const SelectSuppliers = ({ options, onChange }: any) => {

    const handleChange = (event: any) => {
        onChange(event);
      };
    
      useEffect(() => {
       
      }, [options]);

      return (
        <Select
          className="mt-4"
          onChange={handleChange}
          options={options?.map((item: any) => {
            return {
              value: item?.id,
              label: item?.name,
            };
          })}
          isSearchable
        />
      );
}

export default SelectSuppliers;