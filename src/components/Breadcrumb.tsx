import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "./SVGComponents";
import useIsHovered from "../hooks/useIsHovered";
import "./Breadcrumb.css";

// TYPES
type BreadcrumbSegmentsType = {
  breadcrumb?: string | undefined;
  urlPath: string;
};

type BreadcrumbPropsType = {
  pathSegmentsArray: string[];
};

// COMPONENT
const Breadcrumb: React.FC<BreadcrumbPropsType> = ({ pathSegmentsArray }) => {
  // HOOK
  const { isElementHovered, elementMouseEnter, elementMouseLeave } = useIsHovered();

  // UTIL
  // Generate breadcrumb segments
  const generateBreadcrumbSegments = () => {
    let urlPath = "";
    const breadcrumbSegments: BreadcrumbSegmentsType[] = [];

    pathSegmentsArray.forEach((segment, i) => {
      urlPath += `/${ segment }`;

      if (i === pathSegmentsArray.length - 1) {
        breadcrumbSegments.push({ breadcrumb: "", urlPath });
      } else if (i === pathSegmentsArray.length - 2) {
        breadcrumbSegments.push({ breadcrumb: segment, urlPath: `${ urlPath }/about` });
      } else if (i === 0) {
        breadcrumbSegments.push({ breadcrumb: segment, urlPath: `/${ segment }/1` });
      } else if (segment !== "product") {
        breadcrumbSegments.push({ breadcrumb: segment, urlPath });
      }
    });

    return breadcrumbSegments.filter((segmentObj) => segmentObj.breadcrumb && segmentObj.breadcrumb !== "");
  };

  // STYLE
  const buttonSize = "25px";
  const buttonColor = "var(--color-3)";
  const buttonColorHovered = "var(--color-1)";
  
  // JSX
  // Display breadcrumb segments
  const displayedSegments = () => {
    const nonEmptySegments: BreadcrumbSegmentsType[] = generateBreadcrumbSegments();

    return nonEmptySegments.map((segmentObj: BreadcrumbSegmentsType, i) => (
      <div 
        key={ i } 
        className={ `breadcrumb__item${ i === nonEmptySegments.length - 1 ? " breadcrumb__item--non-selectable" : "" }` }
        >
        { i === nonEmptySegments.length - 1 ? (
          segmentObj.breadcrumb
        ) : (
          <>
            <NavLink to={ segmentObj.urlPath }>{ segmentObj.breadcrumb }</NavLink>
            <span>{ "/" }</span>
          </>
        ) }
      </div>
    ));
  };
  
  // Navigation link: Home 
  const navToHomeLink = (
    <NavLink
      to="/all/1"
      className="breadcrumb__home-link"
      onMouseEnter={ elementMouseEnter }
      onMouseLeave={ elementMouseLeave }
    >
      <HomeIcon
        width={ buttonSize }
        height={ buttonSize }
        stroke={ isElementHovered ? buttonColorHovered : buttonColor }
      />
    </NavLink>
  );

  return (
    <div className="breadcrumb">
      { navToHomeLink }
      { displayedSegments() }
    </div>
  );
};

export default Breadcrumb;