import Container from "../../core/Container";

import Text from "../../core/Text";
import Image from "../../core/Image";

export const FilePreview = ({ 
    values, 
    onClick,
    className,
    css,
}) => {
    return (
        <Container 
        className={"d-flex flex-column align-items-center" + (className ? (' ' + className) : '')} 
        {...css && {css: {...css}}}>
            <Text type="span" color="info">
                Click a file to download:
            </Text>
            {
                (values && (Object.keys(values).length > 0)) &&
                Object.keys(values).map((i, val) => <Image
                    key={Object.values(values)[val].id}
                    src={Object.values(values)[val].path}
                    onClick={() => onClick(Object.values(values)[val].slug)} />)
            }
        </Container>
    )
}

export default FilePreview;