import PropTypes from 'prop-types';
import { forwardRef, useState } from "react";
import { imgages } from "../../assets/image";
import classNames from "classnames";
import styles from './Image.mudule.scss'
const Image = forwardRef( ({src, alt, className ,fallback: customFallback = imgages.noImage, ...props},ref) => {
    const [fallback, setFallback] = useState ()
    const handleErrorImg = () => {
        setFallback(customFallback)
    } 
    return <img className={classNames(styles.wrapper,className)} src={fallback || src} alt={alt} ref={ref} {...props} onError={handleErrorImg} />
})
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    classNames: PropTypes.string,
    fallback: PropTypes.string
}

export default  Image;