import { styled } from "../../../stitches.config";

const Tbl = styled('table', {});

export const Table = ({children}) => {
    return (
        <Tbl>
            {children}
        </Tbl>
    )
}

export default Table;