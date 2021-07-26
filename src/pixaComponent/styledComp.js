import styled from 'styled-components';

 export const Label = styled.label`
    background: ${({color}) => color === "lilac" ? 'purple' : color};
    // opacity: ${({disabled}) => disabled ? .4 : 1};
    // cursor: ${({disabled}) => disabled ? 'not-allowed' : 'default'};
    border: ${({selected}) => selected ? '2px solid #6f6f6f' : 'none'};
    // content: ${({children}) => children.checked};
    height: 25px;
    width: 25px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;    

    &.disabled{
        opacity: .3;
    }
`;

export const Input = styled.input.attrs(() => ({type: "checkbox"}))`
    left: -35px;
    position: absolute;

    &.selected:after{
        content: "";
        border-radius: 50%;
        width: 17px;
        height: 17px;
        border: 2px solid #dadada;
        position: absolute;
        left: 31px;
        top: -3px;
    }
`;

export const Span = styled.span`
    background-color: ${({color}) => color === "lilac" ? 'purple' : color};
    position: relative;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    border: 1.1px solid black;
    &:after{
        position: absolute;
        content: "";
        width: 85%;
        height: 87%;
        border: 1px solid white;
    }
`;

const Button = styled.button``;

export const GoButton = styled(Button).attrs(() => ({type: "submit"}))`
    width: 57%;
    height: 30px;
    border-radius: 20px;
`;