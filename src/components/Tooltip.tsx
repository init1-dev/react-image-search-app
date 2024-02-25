import { useState } from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: white;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
`;

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
      setIsVisible(false);
  };

  return (
    <TooltipWrapper onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <TooltipText style={{ visibility: isVisible ? 'visible' : 'hidden', opacity: isVisible ? 1 : 0 }}>
        {text}
      </TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
