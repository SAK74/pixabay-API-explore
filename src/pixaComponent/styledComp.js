import styled from 'styled-components';

export const Label = styled.label`
    background: ${({value}) => value === "lilac" ? 'purple' : value};
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    border: ${({checked}) => checked ? '2px solid #6f6f6f' : 'none'};
    height: 25px;
    width: 25px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;    
    ${({disabled}) => disabled && `
        opacity: .3;
    `}
`;

const Input = styled.input.attrs(() => ({type: "checkbox"}))`
    left: -35px;
    position: absolute;

    &:after{
        ${({checked, disabled}) => checked && `
            content: "";
            border-radius: 50%;
            width: 17px;
            height: 17px;
            border: 2px solid #dadada;
            position: absolute;
            left: 31px;
            top: -3px;
            cursor: ${disabled && 'not-allowed'};
        `}
    }
`;

export const ColorLabel = props => <Label {...props}>
    <Input {...props}/>
</Label>;

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

export const GoButton = styled.button.attrs(() => ({type: "submit"}))`
    width: 57%;
    height: 30px;
    border-radius: 20px;
    cursor: pointer;
`;

export const DivIMGPage = styled.div`
    color: ${({transparent}) => transparent ? 'initial' : "white"};
    position: absolute;
    opacity: 0.8;
    top: 0;
    height: 40px;
    width: 100%;
    font-size: larger;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: linear-gradient( rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0) 100%);background-image: linear-gradient( rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0) 100%);

    & .tag {
        margin-left: 4px;
        padding: 0 0 2px 2px;
    }
    & .tag:hover {
        background-color: rgba(53, 19, 19, 0.5);
        cursor: pointer;
        border-radius: 4px;
        color: white;
    }
    & .right {
        font-size: .8em;
        margin-right: 10px;
        display: flex;
        img {
            width: 25px;
            height: 25px;
        }
    }
`;