import { Modal as Wrapper, } from "antd"

export const Modal = ({
    title,
    children,
    isVisible,
    bodyStyle,
    closable,
    maskClosable,
    onCancel,
    destroyOnClose,
}) => {
    return (
        <Wrapper 
        title={title} 
        visible={isVisible}
        closable={closable}
        maskClosable={maskClosable} 
        footer={null}
        {...destroyOnClose && {destroyOnClose: destroyOnClose}}
        {...bodyStyle && {bodyStyle: {...bodyStyle}}}
        onCancel={() => onCancel()}>
            {children}
        </Wrapper>
    )
}

export default Modal;