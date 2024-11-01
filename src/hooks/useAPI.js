import React from 'react'
import axios from 'axios'
import config from '../config.json'
import { useParams } from 'react-router-dom'
import useCache from './useCache'

/**
 * @typedef {Object} APIUser
 * @property {string} email
 * @property {Date} birth
 * @property {string} id
 * @property {string|null} avatar
 * @property {string} locale
 * @property {string} token
 * @property {{first: string, last: string}} names
 */

/**
 * 
 * @param {string} baseURL 
 * @returns 
 */

export default function useAPI(baseURL = config.api_base_url) {
    const { lang } = useParams();
    const userCache = useCache("user");
    const selectedLanguage = React.useMemo(() => lang || config.default_translation, [lang]);

    const base = React.useMemo(() => axios.create({
        baseURL: `${baseURL}/${selectedLanguage}/api`,
        headers: {
            'Content-Type': 'application/json'
        }
    }), [baseURL, selectedLanguage]);

    /**
     * @type {(request: Promise<any>) => Promise<{success: boolean, data?: any, error?: string, message?: string}>}
     */
    const handle = React.useCallback(async (request) => {
        try {
            const data = await request;
            return data.data;
        } catch (e) {

            return e.response.data;
        }
    }, []);

    /**
     * @type {(email: string, password: string) => Promise<{success: boolean, token?: string, error?: string, message?: string}>}
     */
    const login = React.useCallback(async (email, password) => {
        const data = await handle(base.post('/login/email', { email, password }));
        if (data.success) {
            const user = await handle(base.get('/user', {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            }));
            console.log("u", user);
            userCache.store(user.user, 60 * 60 * 24);
        }
        return data;
    }, [base, handle]);

    /**
     * @type {{(token: string): Promise<{success: boolean, user?: APIUser, error?: string, message?: string}>}}
     */
    const user = React.useCallback(async (token) => {
        return handle(base.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }));
    }, [base, handle]);

    const logout = React.useCallback(async () => {
        const response = await handle(base.get('/logout', {
            headers: {
                Authorization: `Bearer ${userCache.cache.token}`
            }
        }));
        if (response.success) {
            userCache.deleteCache();
        }

        return response;
    }, [userCache]);




    return {
        base,
        handle,
        login,
        user,
        logout
    }
}
