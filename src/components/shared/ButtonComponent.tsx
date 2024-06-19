import { Tooltip } from "@mui/material";
import { Button } from "../../css/SavedResults";

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

export default ButtonComponent;