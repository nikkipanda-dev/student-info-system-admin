import { styled } from "../../../stitches.config";

const Theader = styled('th', {});

export const TableHeader = ({children,}) => {
    return (
        <Theader>
            {children}
        </Theader>
    )
}

export default TableHeader;