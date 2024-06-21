import { Tooltip } from "@mui/material";
import styled from "styled-components";

interface ButtonProps {
    onClick: () => void;
    Icon: any;
    tooltipText: string;
}

const ButtonComponent = ({
    onClick,
    Icon,
    tooltipText
}: ButtonProps) => {
    return (
        <Button onClick={onClick}>
            <Tooltip title={tooltipText}>
                <span>
                    <Icon />
                </span>
            </Tooltip>
        </Button>
    );
}

export const Button = styled.button`
    font-size: 20px;
    padding: unset;
    background-color: unset;
    border: unset;
    margin-right: 0rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1.2px rgb(0 0 0 / 0.6));

    &:focus, &:focus-visible {
        outline: unset;
    }

    span svg {
        color: white;

        &:hover {
            color: #0fe10f;
        }
    }
`;

export default ButtonComponent;