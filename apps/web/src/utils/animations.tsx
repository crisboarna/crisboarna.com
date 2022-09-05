import { keyframes } from '@emotion/react';

export const fadeInLeft = keyframes`
  0% {
        opacity: 0;
        -webkit-transform: translateX(-20px);
        transform: translateX(-20px)
    }
    100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
`;

export const fadeInRight = keyframes`
    0% {
        opacity: 0;
        -webkit-transform: translateX(20px);
        transform: translateX(20px)
    }
    100% {
        opacity: 1;
        -webkit-transform: translateX(0);
        transform: translateX(0)
    }
`;

export const fadeInDown = keyframes`
    0% {
        opacity: 0;
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px)
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
`;

export const fadeInUp = keyframes`
    0% {
        opacity: 0;
        -webkit-transform: translateY(20px);
        transform: translateY(20px)
    }
    100% {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0)
    }
`;
