import axios from "axios";

export default class API {
    static language = "ro";
    static base = axios.create({
        baseURL: `http://localhost:3000/${this.language}/api`,
        headers: {
            "Content-Type": "application/json"
        }
    })

    static async handle(request) {
        try {
            return request.then(d => {
                return d.data;
            }).catch((err) => {
                return err.response.data;
            });
        }
        catch (e) {
            return {
                success: false,
                error: e.message
            }
        }

    }

    /**
     * 
     * @param {string} idx 
     * @param {object} data 
     * @param {number} expires 
     */
    static cache(idx, data, expires = 60 * 60 * 24) {
        const f = {
            __expires: 0,
            ...data
        }
        const expiresDate = new Date().getTime() + expires * 1000;
        f.__expires = expiresDate;
        localStorage.setItem(idx, JSON.stringify(f));
    }

    /**
     * 
     * @param {string} idx 
     * @returns {{__expires: number}}
     */
    static getCache(idx) {
        if (!localStorage.getItem(idx)) {
            return null;
        }

        // if(this.expiredCache(idx)) {
        //     this.deleteCache(idx);
        //     return null;
        // }

        return JSON.parse(localStorage.getItem(idx));
    }

    static deleteCache(idx) {
        localStorage.removeItem(idx);
    }

    /**
     * 
     * @returns {'light'|'dark'}
     */
    static getTheme() {
        return localStorage.getItem("theme") || "light";
    }

    /**
     * 
     * @param {string|'light'|'dark'} theme 
     */
    static setTheme(theme) {
        localStorage.setItem("theme", theme);
    }

    static updateTheme() {
        const theme = this.getTheme();
        const root = document.documentElement;
        console.log(theme, root);

        root.style.setProperty(
            "--go_primary",
            `var(--go_${theme}_primary)`
        );
        root.style.setProperty(
            "--go_secondary",
            `var(--go_${theme}_secondary)`
        );
        root.style.setProperty(
            "--go_tertiary",
            `var(--go_${theme}_tertiary)`
        );
        root.style.setProperty(
            "--go_text",
            `var(--go_${theme}_text)`
        );
        root.style.setProperty(
            "--go_text_secondary",
            `var(--go_${theme}_text_secondary)`
        );
        root.style.setProperty(
            "--go_card",
            `var(--go_${theme}_card)`
        );
        root.style.setProperty(
            "--go_border",
            `var(--go_${theme}_border)`
        );
        root.style.setProperty(
            "--go_bg",
            `var(--go_${theme}_bg)`
        );
        if (theme === "light") {
            root.style.setProperty(
                "--go_white",
                "#fff"
            );
            root.style.setProperty(
                "--go_black",
                "#000"
            );
        } else {
            root.style.setProperty(
                "--go_white",
                "#000"
            );
            root.style.setProperty(
                "--go_black",
                "#fff"
            );
        }
    }

    static expiredCache(idx) {
        const data = this.getCache(idx);
        if (!data) {
            return true;
        }

        if(typeof(data) !== "object") {
            return true;
        }

        if(!data.__expires) {
            return false;
        }

        if (data.__expires <= 0) {
            return false;
        }

        if (data.__expires < new Date().getTime()) {
            return true;
        }

        return false;
    }

    static notExistsOrExpiredCache(idx) {
        const data = this.getCache(idx);
        if (!data) {
            return true;
        }

        return this.expiredCache(idx);
    }

    static async login(email, password) {
        return this.handle(this.base.post("/login/email", {
            email,
            password,
        }));
    }

    static async register(email) {
        return this.handle(this.base.post("/register/email", {
            email
        }));
    }

    static async logout(token) {
        return this.handle(this.base.get("/logout", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }));
    }

    static async verify(code, { password, names, birth, email }) {
        return this.handle(this.base.post(`/register/email-verify/${code}`, {
            password,
            email,
            firstName: names.first,
            lastName: names.last,
            birth
        }));
    }

    static async getUser(token) {
        return this.handle(this.base.get("/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }));
    }

    static async getConfig() {
        return this.handle(this.base.get("/config"));
    }
}