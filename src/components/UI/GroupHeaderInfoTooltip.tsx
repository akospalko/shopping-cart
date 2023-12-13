// Sidebar component that displays grouped checkbox logic for product property filtering 
import { Tooltip } from "react-tooltip";
import { QuestionMarkIcon } from "../SVGComponents";
import { PRODUCT_GROUP_TOOLTIP_DATA } from "../../data/tooltipDataConstant";
import { GroupKeysType } from "../../types/productsProviderTypes";
import "./GroupHeaderInfoTooltip.css";

// TYPES
type GroupHeaderInfoTooltipPropsType = { content: string }

// Group header information tooltip
const GroupHeaderInfoTooltip = ({ content }: GroupHeaderInfoTooltipPropsType) => {
  
  // STYLE
  const QuestionMarkSize = "16px";
  const QuestionMarkSizeFill = "var(--color-2)"; 
  const QuestionMarkSizeFill_2 = "var(--color--light)"; 

  // JSX
  // Tooltip content
  const tooltipContent = (title: string, description: string) => (
    <>
      <div className="group-header-info-title">
        <span>{ title }</span>
      </div>
      <div className="group-header-info-tooltip__description">
        <span>{ description }</span>
      </div>
    </>
  )

  return (
    <div className="group-header-info-tooltip__wrapper">
      <a 
        id="my-anchor-element"
        data-tooltip-content={ content }
      >
        <QuestionMarkIcon 
          fill={ QuestionMarkSizeFill }
          fill2={ QuestionMarkSizeFill_2 }
          width={ QuestionMarkSize }
          height={ QuestionMarkSize }
        />
      </a>
      { <Tooltip
        className="group-header-info-tooltip"
        anchorSelect="#my-anchor-element"
        render={({ content }) => content && tooltipContent(content, PRODUCT_GROUP_TOOLTIP_DATA[content as GroupKeysType] ?? "Default Description")}
        // openOnClick // click to close
        /> 
      }
    </div>
  )
}

export default GroupHeaderInfoTooltip;