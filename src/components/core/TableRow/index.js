import { styled } from "../../../stitches.config";

const Tr = styled('tr', {});

export const TableRow = ({children}) => {
    return (
        <Tr>
            {children}
        </Tr>
    )
}

export default TableRow;