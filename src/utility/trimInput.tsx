// Reusable string input trimmer 
export const trimInput = (input: string | undefined): string => {
  if(!input?.length) return "";
  return input?.trim() || "";
}