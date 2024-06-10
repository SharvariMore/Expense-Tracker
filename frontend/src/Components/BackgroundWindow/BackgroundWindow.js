import React from 'react'
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from '../../utils/useWindowSize';

function BackgroundWindow() {

    const { width, height } = useWindowSize();

    console.log(width, height);

   const moveWindow = keyframes`
        0%{
            transform: translate(0, 0);
        }
        50%{
            transform: translate(${width}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
   `;

   const WindowStyled = styled.div`
        height: 70vh;
        width: 70vh;
        margin-left: -37vh;
        margin-top: -37vh;
        position: absolute;
        border-radius: 50%;
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${moveWindow} 15s alternate linear infinite;
   `;

  return (
    <WindowStyled></WindowStyled>
  )
}

export default BackgroundWindow;
