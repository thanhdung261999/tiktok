import Button from "../../Button";
import styles from './Menu.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
function MenuItem({data, onClick}) {
    const classs = cx('menu-item',{
        separate: data.separate
    })
    console.log(data.separate)
    return (
    <Button className={classs} to={data.to} leftIcon={data.icon} onClick={onClick}>{data.title}</Button>
    )
}

export default MenuItem;