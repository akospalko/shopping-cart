// Toggle menu on/off for various components: filter group options
import { useState, useCallback } from 'react';

// TYPE
type IsOpenType = {
  [key: string]: boolean;
};

const useToggleDropdownMenu = () => {
  // STATE
  const [isOpen, setIsOpen] = useState<IsOpenType>({});

  // HANDLERS
  // Toggle on / off
  const toggleDropdownHandler = useCallback((dropdownID: string) => {
    setIsOpen((prevValues) => ({
      ...prevValues,
      [dropdownID]: !prevValues[dropdownID],
    }));
  }, []);

  // Close all
  const closeDropdownHandler = useCallback(() => {
    setIsOpen({});
  }, []);

  return { isOpen, toggleDropdownHandler, closeDropdownHandler }
}

export default useToggleDropdownMenu;