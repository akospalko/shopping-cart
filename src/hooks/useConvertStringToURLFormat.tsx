import { useState, useEffect } from 'react';

// CUSTOM HOOK
export const useConvertStringToURLFormat = (inputString: string): string => {

  // STATE
  const [urlString, setURLString] = useState<string>('');

  // EFFECT
  // Convert product name string to url format
  useEffect(() => {
    // replace spaces and special characters with hyphens
    let urlFriendlyString = inputString.replace(/[^a-zA-Z0-9]+/g, '-');
    // remove leading and trailing hyphens
    urlFriendlyString = urlFriendlyString.replace(/^-+|-+$/g, '');
    // replace consecutive hyphens with a single hyphen
    urlFriendlyString = urlFriendlyString.replace(/-{2,}/g, '-');

    setURLString(urlFriendlyString.toLowerCase());

  }, [inputString, urlString]);

  return urlString
};
