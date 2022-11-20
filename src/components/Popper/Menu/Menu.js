import PropTypes from 'prop-types';
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
    const hanleBack = () => {
        setHistory((pre) => {
            return pre.slice(0, pre.length - 1);
        });
    }
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper className={cx('menu-popper')}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={hanleBack}
                    />
                )}
                <div className={cx('menu-language')}>{renderItems()}</div>
            </Wrapper>
        </div>
    )
    const resetMenu = () => {
        setHistory([{ data: items }]);
    }
    return (
        <>
            <Tippy
                interactive
                placement="bottom-end"
                delay={[0, 600]}
                offset={[10, 5]}
                render={renderResult}
                onHide={resetMenu}
            >
                {children}
            </Tippy>
        </>
    );
}
Menu.propTypes = {
    children : PropTypes.node.isRequired,
    items : PropTypes.array.isRequired,
    onChange : PropTypes.func
};

export default Menu;
