import { useState } from "react";
import useDebounce from "../useDebounce";
import Select from "react-select";

interface ISearchs{
    brandOrModel: string, setSearch: any
}
export default function SearchsVehicles({brandOrModel, setSearch}: ISearchs)
{
    const [displayValue, setDisplayValue] = useState(brandOrModel);
    const debouncedChange = useDebounce(setSearch, 500);

    function handleChange(event: any) {
        setDisplayValue(event.target.value)
        debouncedChange({brandOrModel: event.target.value})
    }

    function handleChangeFull(event: any) {
        setSearch({fuel: event.label})
    }

    function handleChangeDoors(event: any) {
        setSearch({door: event.label})
    }

    const fuels = [
        { id: 0, name: 'Todos' },
        { id: 1, name: 'Gasolina' },
        { id: 2, name: 'Diesel' },
        { id: 3, name: 'Etanol (Álcool)' }
    ]

    const doors = [
        { id: 0, name: 'Todos' },
        { id: 1, name: '2' },
        { id: 2, name: '4' },
    ]

    return (
        <div className="flex gap-4">
            <div className="flex w-full items-end">
                <input
                name="search"
                value={displayValue}
                onChange={handleChange}
                type="text"
                placeholder="Buscar por marca ou modelo"
                className="border rounded-md h-10 p-2 w-96"
                />
            </div>

            <div className="flex">
                <Select
                    className="w-40"
                    placeholder="Combustível"
                    onChange={handleChangeFull}
                    options={fuels?.map((item: any) => {
                        return { value: item.id, label: item.name };
                    })}
                    isSearchable
                />
            </div>

            <div className="flex">
                <Select
                    className="w-52"
                    placeholder="Quantas portas"
                    onChange={handleChangeDoors}
                    options={doors?.map((item: any) => {
                        return { value: item.id, label: item.name };
                    })}
                    isSearchable
                />
            </div>
        </div>
    )
}