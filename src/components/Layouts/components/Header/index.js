import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import { imgLogo } from '../../../../assets/image';
import Button from '../../../Button';
import { Wrapper as WrapperPopper } from '../../../Popper';
import AccountItem from '../../../AccountItem';
import Menu from '../../../Popper/Menu';
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Languages',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcurts',
    },
];
const menuUser = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to:'/@hoaa'
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to:'/coin'
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Feedback and help',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        separate: true
    },
];
function Header() {
    const currentUser = true;
    const handleMenuChange = (item) => {
        console.log(item);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={imgLogo.logo.default} alt="Tiktok"></img>
                <HeadlessTippy
                    interactive
                    render={(atrrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...atrrs}>
                            <WrapperPopper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </WrapperPopper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Searchs account and videos" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('action')}>
                    {currentUser ? (
                        <Tippy content="Upload video" placement="bottom">
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faCloudUpload} />
                            </button>
                        </Tippy>
                    ) : (
                        <>
                            <Button>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? menuUser : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img
                                className={cx('avatar-user')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/b3b1b0c9af6f2a83c5f3f2411bd997ea~c5_100x100.jpeg?x-expires=1668837600&x-signature=CPb%2BRESdO0U1%2Fe28rjr4HB%2FBmLY%3D"
                                alt="nguyen van a"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
