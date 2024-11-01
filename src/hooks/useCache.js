import React from 'react'

export default function useCache(idx) {
    /**
     * @type {null | {__expires: number, __current: number, [key: string]: any}}
     */
    const cache = React.useMemo(() => {
        const item = localStorage.getItem(idx);
        if (!item) {
            return null;
        }
        
        return JSON.parse(item);
    }, [idx]);

    const store = React.useCallback((data, expires = 60 * 60 * 24) => {
        const f = {
            __expires: 0,
            ...data
        }
        const expiresDate = new Date().getTime() + expires * 1000;
        f.__expires = expiresDate;
        f.__current = new Date().getTime();
        localStorage.setItem(idx, JSON.stringify(f));
    }, [idx]);

    const expired = React.useMemo(() => {
        if (!cache) {
            return true;
        }
        return cache.__expires < new Date().getTime();
    }, [cache]);

    const expireTime = React.useMemo(() => {
        if (!cache) {
            return 0;
        }
        return cache.__expires - new Date().getTime();
    }, [cache]);

    const deleteCache = React.useCallback(() => {
        localStorage.removeItem(idx);
    }, [idx]);


    return {
        cache,
        store,
        expired,
        deleteCache,
        expireTime
    }
}
