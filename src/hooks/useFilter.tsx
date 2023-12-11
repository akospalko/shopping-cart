// Custom hook to consume FilterContext & export
import { useContext } from "react";
import FilterContext from "../context/FilterProvider";
import { UseFilterContextType } from "../types/filterProviderTypes";

const useFilter = (): UseFilterContextType => {
  return useContext(FilterContext);
}

export default useFilter;