import {ReactElement, CSSProperties } from "react";

// TYPES
type IconWrapperStyleType = {
  children: ReactElement | ReactElement[],
  wrapperCustomStyle?: CSSProperties 
}
type IconComponentType = {
  width?: string,
  height?: string,
  fill?: string,
  stroke?: string,
  strokeWidth?: string,
  wrapperCustomStyle?: CSSProperties 
}

// ICON WRAPPER
function IconWrapper ({children, wrapperCustomStyle}: IconWrapperStyleType): ReactElement | ReactElement[] {
  const wrapperStyle = {
    display: "flex", 
    justifyContent:"center", 
    alignItems:"center",
    width: '100%',
    height: '100%',
    ...wrapperCustomStyle
  }

  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  )
}

// ICON COMPONENTS
// Minus / subtract
export function MinusIcon({width, height, fill, stroke, strokeWidth}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ||  "100%" }
        height={height || "100%"}
        fill={fill || "#888" }
        stroke={stroke || "#000" }
        strokeWidth={strokeWidth || "0.5"}
        baseProfile="tiny"
        version="1.2"
        viewBox="0 0 24 24"
        >
        <path d="M18 11H6a2 2 0 000 4h12a2 2 0 000-4z"></path>
      </svg>
    </IconWrapper>
  );
}

// Plus / add
export function PlusIcon({width, height, fill, stroke, strokeWidth}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ||  "100%" }
        height={height || "100%"}
        viewBox="0 0 16 16"
      >
        <path
          fill={fill || "#888" }
          stroke={stroke || "#000" }
          strokeWidth={strokeWidth || "0.5"}
          d="M8 2a1 1 0 00-1 1v4H3a1 1 0 100 2h4v4a1 1 0 102 0V9h4a1 1 0 100-2H9V3a1 1 0 00-1-1z"
        ></path>
      </svg>
    </IconWrapper>
  );
}

// Checkmark
export function CheckmarkIcon({width, height, fill, stroke, strokeWidth, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ||  "100%" }
        height={height || "100%"}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill={fill || "#03c213" }
          stroke={stroke || "#000" }
          strokeWidth={strokeWidth || "0.5"}
          fillRule="evenodd"
          d="M21.229 6.604a1 1 0 010 1.414L10.256 18.99a1 1 0 01-1.408.006l-6.185-6.075a1 1 0 01-.013-1.414l.7-.714a1 1 0 011.415-.013l4.771 4.687 9.571-9.572a1 1 0 011.415 0l.707.708z"
          clipRule="evenodd"
        ></path>
      </svg>
    </IconWrapper>
  );
}

// Remove / delete all items
export function RemoveIcon({width, height, fill, stroke, strokeWidth}: IconComponentType): ReactElement | ReactElement[]  {
  return (
    <IconWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ||  "100%" }
        height={height || "100%"}
        viewBox="0 0 16 16"
      >
        <path
          fill={fill || "#ff0000" }
          fillRule="evenodd"
          stroke={stroke || "#000" }
          strokeWidth={strokeWidth || "0.5"}
          d="M11.293 3.293a1 1 0 111.414 1.414L9.414 8l3.293 3.293a1 1 0 01-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 8 3.293 4.707a1 1 0 011.414-1.414L8 6.586l3.293-3.293z"
        ></path>
      </svg>
    </IconWrapper>
  );
}

export function CartIcon({width, height, fill, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        width={width ||  "100%"}
        height={height || "100%"}
      >
        <g fill={fill || "#000"}>
          <path d="M2.237 2.288a.75.75 0 10-.474 1.423l.265.089c.676.225 1.124.376 1.453.529.312.145.447.262.533.382.087.12.155.284.194.626.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337.12.9.38 1.658.982 2.26.601.602 1.36.86 2.26.981.866.117 1.969.117 3.336.117H18a.75.75 0 000-1.5h-7c-1.435 0-2.436-.002-3.192-.103-.733-.099-1.122-.28-1.399-.556-.235-.235-.4-.551-.506-1.091h10.12c.959 0 1.438 0 1.814-.248.376-.248.565-.688.943-1.57l.428-1c.81-1.89 1.215-2.834.77-3.508C19.533 6 18.506 6 16.45 6H5.745a8.996 8.996 0 00-.047-.833c-.055-.485-.176-.93-.467-1.333-.291-.404-.675-.66-1.117-.865-.417-.194-.946-.37-1.572-.58l-.305-.1zM7.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM16.5 18a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Logo
export function LogoIcon({width, height, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="105.39 30.64 101.44 141.79"
        width={width ||  "100%" }
        height={height || "100%"}
      >
        <g stroke="#000">
          <path
            fill="#fff"
            strokeWidth="0.896"
            d="M-216.47 73.905v94.332h20.635v61.905h26.531v-26.531h38.322v26.531h26.531v-114.97h-20.635l.174-42.005-91.559.735"
            transform="translate(300.13 -34.583) scale(.89754)"
          ></path>
          <path
            fillRule="evenodd"
            strokeWidth="0.857"
            d="M-210.58 79.801v82.541h14.739v-26.531h64.853v-56.01zm14.739 14.739h49.865l.249 26.531h-50.114z"
            style={{ mixBlendMode: "normal" }}
            transform="translate(300.13 -34.583) scale(.89754)"
          ></path>
          <path
            strokeWidth="0.896"
            d="M-189.94 141.71v82.541h14.739V197.72h50.114v26.531h14.739V141.71h-65.749zm14.739 14.739h50.114v26.531h-50.114z"
            transform="translate(300.13 -34.583) scale(.89754)"
          ></path>
          <path
            strokeWidth="1.153"
            d="M-125.09 121.07v14.739h14.739V121.07z"
            transform="translate(300.13 -34.583) scale(.89754)"
          ></path>
        </g>
      </svg>
    </IconWrapper>
  );
}