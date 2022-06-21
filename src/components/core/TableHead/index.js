import { styled } from "../../../stitches.config";

const THead = styled('thead', {});

export const TableHead = ({children}) => {
    return (
        <THead>
            {children}
        </THead>
    )
}

export default TableHead;