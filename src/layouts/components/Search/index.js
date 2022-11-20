import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import AccountItem from '../../../components/AccountItem' ;
import { useDebounce } from '../../../hooks';
import { Wrapper as WrapperPopper } from '../../../components/Popper';
import { SearchIcon } from '../../../components/Icons';
import * as searchService from '../../../services/searchService';
const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetctApi = async () => {
            setLoading(true);
            const res = await searchService.search(debounced);
            setSearchResult(res);
            setLoading(false);
        };

        fetctApi();
    }, [debounced]);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const valueSearch = e.target.value
        if(!valueSearch.startsWith(' ')){
            setSearchValue(valueSearch)
        }
    }

    return (
        // Using a wrapper <div>  tag around the reference element solves 
        // this by creating a new parentNode context. 
       <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                interactive
                render={(atrrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...atrrs}>
                        <WrapperPopper>
                            {searchResult.length > 0 && <h4 className={cx('search-title')}>Accounts</h4>}
                            {searchResult.map((result, index) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </WrapperPopper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        value={searchValue}
                        ref={inputRef}
                        placeholder="Searchs account and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
    
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
       </div>
    );
}

export default Search;
