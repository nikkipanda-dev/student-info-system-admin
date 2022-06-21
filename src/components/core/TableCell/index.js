import { styled } from "../../../stitches.config";

const TblCell = styled('td', {});

export const TableCell = ({children}) => {
    return (
        <TblCell>
            {children}
        </TblCell>
    )
}

export default TableCell;