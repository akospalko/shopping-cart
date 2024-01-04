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
  fill2?: string,
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
export function RemoveIcon({width, height, fill, stroke, strokeWidth, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[]  {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
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

// Search 
export function SearchIcon({width, height, stroke, strokeWidth, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        width={width ||  "100%"}
        height={height || "100%"}
      >
        <path
          stroke={stroke || "#000" }
          strokeWidth={strokeWidth || "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.796 15.811L21 21m-3-10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        ></path>
      </svg>
    </IconWrapper>
  );
}

// Arrow
export function ArrowIcon({width, height, fill, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1920 1920"
        width={width ||  "100%"}
        height={height || "100%"}
      >
        <path
          fillRule="evenodd"
          fill={fill || "#000" }
          d="M1352.005.012l176.13 176.13-783.864 783.989 783.864 783.74L1352.005 1920 391.887 960.13z"
        ></path>
      </svg>
    </IconWrapper>
  );
}
    
// Home
export function HomeIcon({width, height, stroke, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        width={width ||  "100%"}
        height={height || "100%"}
      >
        <g 
          stroke={stroke || "#000" }
          strokeLinejoin="round" 
          strokeWidth="1.5"
        >
          <path d="M19 9v8c0 1.886 0 2.828-.586 3.414C17.828 21 16.886 21 15 21H9c-1.886 0-2.828 0-3.414-.586C5 19.828 5 18.886 5 17V9"></path>
          <path
            strokeLinecap="round"
            d="M3 11l4.5-4 3.171-2.819a2 2 0 012.658 0L16.5 7l4.5 4M10 21v-4a2 2 0 012-2v0a2 2 0 012 2v4"
          ></path>
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

// Heart
export function HeartIcon({width, height, fill, stroke, wrapperCustomStyle}: IconComponentType): ReactElement | ReactElement[] {

  return (
    <IconWrapper wrapperCustomStyle={wrapperCustomStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke={ stroke || "#d10000" }
        viewBox="0 0 24 24"
        width={ width ||  "100%" }
        height={ height || "100%" }
      >
        <path
          fill={ fill || "#d10000" }
          d="M2 9.137C2 14 6.02 16.591 8.962 18.911 10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137z"
        ></path>
      </svg>
    </IconWrapper>
  );
}

// Question Mark
export function QuestionMarkIcon({ width, height, fill, fill2 }: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={ width ||  "100%" }
        height={ height || "100%" }
        fill="#000"
        version="1.1"
        viewBox="0 0 496.158 496.158"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill={ fill || "#d10000" }
            d="M496.158 248.085C496.158 111.063 385.089.003 248.083.003 111.07.003 0 111.063 0 248.085c0 137.001 111.07 248.07 248.083 248.07 137.006 0 248.075-111.069 248.075-248.07z"
          ></path>
          <path
            fill={ fill2 || "#d10000" }
            d="M138.216 173.592c0-13.915 4.467-28.015 13.403-42.297 8.933-14.282 21.973-26.11 39.111-35.486 17.139-9.373 37.134-14.062 59.985-14.062 21.238 0 39.99 3.921 56.25 11.755 16.26 7.838 28.818 18.495 37.683 31.97 8.861 13.479 13.293 28.125 13.293 43.945 0 12.452-2.527 23.367-7.581 32.739-5.054 9.376-11.062 17.469-18.018 24.279-6.959 6.812-19.446 18.275-37.463 34.388-4.981 4.542-8.975 8.535-11.975 11.976-3.004 3.443-5.239 6.592-6.702 9.447-1.466 2.857-2.603 5.713-3.406 8.57-.807 2.855-2.015 7.875-3.625 15.051-2.784 15.236-11.501 22.852-26.147 22.852-7.618 0-14.028-2.489-19.226-7.471-5.201-4.979-7.8-12.377-7.8-22.192 0-12.305 1.902-22.962 5.713-31.97 3.808-9.01 8.861-16.92 15.161-23.73 6.296-6.812 14.794-14.904 25.488-24.28 9.373-8.202 16.15-14.392 20.325-18.567a62.97 62.97 0 0010.547-13.953c2.856-5.126 4.285-10.691 4.285-16.699 0-11.718-4.36-21.605-13.074-29.663-8.717-8.054-19.961-12.085-33.728-12.085-16.116 0-27.981 4.065-35.596 12.195-7.618 8.13-14.062 20.105-19.336 35.925-4.981 16.555-14.43 24.829-28.345 24.829-8.206 0-15.127-2.891-20.764-8.679-5.639-5.786-8.458-12.048-8.458-18.787zm107.226 240.82c-8.937 0-16.737-2.895-23.401-8.68-6.667-5.784-9.998-13.877-9.998-24.279 0-9.229 3.22-16.991 9.668-23.291 6.444-6.297 14.354-9.448 23.73-9.448 9.229 0 16.991 3.151 23.291 9.448 6.296 6.3 9.448 14.062 9.448 23.291 0 10.255-3.296 18.312-9.888 24.17-6.592 5.858-14.208 8.789-22.85 8.789z"
          ></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Menu
export function MenuIcon({ width, height, stroke, strokeWidth, wrapperCustomStyle }: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={ wrapperCustomStyle }>
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={ width ||  "100%" }
      height={ height || "100%" }
      fill="none" 
      viewBox="0 0 24 24">
        <g
          stroke={ stroke || "#000" }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={ strokeWidth || "2"}
        >
          <path d="M19 13a1 1 0 100-2 1 1 0 000 2zM12 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"></path>
        </g>
      </svg>
    </IconWrapper>
  );
}

// Filter
export function FilterIcon({ width, height, stroke, wrapperCustomStyle }: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={ wrapperCustomStyle }>
     <svg 
      width={ width ||  "100%" }
      height={ height || "100%" }
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
     >
      <path
        stroke={ stroke || "#000"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C3.76 3 4.04 3 4.6 3h14.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C21 3.76 21 4.04 21 4.6v1.737c0 .245 0 .367-.028.482a.998.998 0 01-.12.29c-.061.1-.148.187-.32.36l-6.063 6.062c-.173.173-.26.26-.322.36a.998.998 0 00-.12.29c-.027.115-.027.237-.027.482V17l-4 4v-6.337c0-.245 0-.367-.028-.482a1 1 0 00-.12-.29c-.061-.1-.148-.187-.32-.36L3.468 7.47c-.173-.173-.26-.26-.322-.36a1 1 0 01-.12-.29C3 6.704 3 6.582 3 6.337V4.6z"
      ></path>
    </svg>
    </IconWrapper>
  );
}

// Filter reset
export function FilterResetIcon({ width, height, stroke, wrapperCustomStyle }: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={ wrapperCustomStyle }>
     <svg 
      width={ width ||  "100%" }
      height={ height || "100%" }
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
     >
      <path
        stroke={ stroke || "#000" }
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 15l6 6m0-6l-6 6m-5 0v-6.337c0-.245 0-.367-.028-.482a1 1 0 00-.12-.29c-.061-.1-.148-.187-.32-.36L3.468 7.47c-.173-.173-.26-.26-.322-.36a1 1 0 01-.12-.29C3 6.704 3 6.582 3 6.337V4.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C3.76 3 4.04 3 4.6 3h14.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C21 3.76 21 4.04 21 4.6v1.737c0 .245 0 .367-.028.482a.998.998 0 01-.12.29c-.061.1-.148.187-.32.36L17 11"
      ></path>
    </svg>
    </IconWrapper>
  );
}

// Options icon
export function OptionsIcon({ width, height, stroke, wrapperCustomStyle }: IconComponentType): ReactElement | ReactElement[] {
  return (
    <IconWrapper wrapperCustomStyle={ wrapperCustomStyle }>
      <svg 
        width={ width || "100%" }
        height={ height || "100%" }
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
      >
        <g
          fill="none"
          stroke={ stroke || "#000" }
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        >
          <path d="M368 128L448 128"></path>
          <path d="M64 128L304 128"></path>
          <path d="M368 384L448 384"></path>
          <path d="M64 384L304 384"></path>
          <path d="M208 256L448 256"></path>
          <path d="M64 256L144 256"></path>
          <circle cx="336" cy="128" r="32"></circle>
          <circle cx="176" cy="256" r="32"></circle>
          <circle cx="336" cy="384" r="32"></circle>
        </g>
      </svg>
    </IconWrapper>
  );
}