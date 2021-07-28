import styled from 'styled-components';

 export const Label = styled.label`
    background: ${({value}) => value === "lilac" ? 'purple' : value};
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'default'};
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

export const Input = styled.input.attrs(() => ({type: "checkbox"}))`
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

const Button = styled.button``;

export const GoButton = styled(Button).attrs(() => ({type: "submit"}))`
    width: 57%;
    height: 30px;
    border-radius: 20px;
`;