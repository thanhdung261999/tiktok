import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import Wrapper from '../Wrapper';
import { useState } from 'react';
import MenuItem from './MenuItem';
import Header from './Header';
const cx = classNames.bind(styles);
const handleFc = () => {};
function Menu({ children, items, onChange = { handleFc } }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <>
            <Tippy
                interactive
                placement="bottom-end"
                visible
                delay={[0,600]}
                offset={[10, 5]}
                render={(attrs) => (
                    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                        <Wrapper className={cx("menu-popper")}>
                            {
                                history.length > 1 &&
                            <Header  title={'Language'} onBack={()=>{
                                setHistory (pre => {
                                   return pre.slice(0,pre.length - 1)                                    
                                })
                            }} />
                            }
                            <div className={cx('menu-language')}>
                            {renderItems()}
                            </div>
                            </Wrapper>
                    </div>
                )}
                onHide = {()=>{
                    setHistory([{data:items}])
                }}
            >
                {children}
            </Tippy>
        </>
    );
}

export default Menu;
