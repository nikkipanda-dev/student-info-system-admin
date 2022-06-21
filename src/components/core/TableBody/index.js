import { styled } from "../../../stitches.config";

const TblBody = styled('tbody', {});

export const TableBody = ({children}) => {
    return (
        <TblBody>
            {children}
        </TblBody>
    )
}

export default TableBody;