import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";

/**
 *
 * @param {{
 * icon: React.ReactNode,
 * placeholder: string,
 * onInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
 * onInputFinish: (e: React.ChangeEvent<HTMLInputElement>) => void,
 * items: { title: string, description: string, value: any }[]
 * inputTimeout: number
 * onItemSelect: (item: { title: string, description: string, value: any }) => void
 * loading: boolean
 * }} props
 * @returns
 */
export default function SearchBox(props) {
    const {
        icon,
        placeholder = "",
        onInput,
        onInputFinish,
        items = [],
        inputTimeout = 700,
        onItemSelect,
        loading = false,
    } = props;
    const [search, setSearch] = React.useState("");
    const [searchItems, setSearchItems] = React.useState(items);
    const [showItems, setShowItems] = React.useState(false);
    const [tm, setTm] = React.useState(null);

    const barRef = React.useRef(null);
    const bodyRef = React.useRef(null);

    React.useEffect(() => {
    }, [])

    React.useEffect(() => {
        console.log("items updated", items);
        setSearchItems(items);
    }, [items]);

    return (
        <div className="search-box">
            <div className="search-header" onClick={e => barRef.current.focus()}>
                {loading ? <Loader2 className="loader-icon" /> : icon}
                <input
                    ref={barRef}
                    onFocus={e => {
                        setShowItems(true);
                    }}
                    onBlur={e => {
                        setTimeout(() => {
                            setShowItems(false);
                        }, 100);
                    }}
                    type="text"
                    className="search-bar"
                    placeholder={placeholder}
                    value={search}
                    onInput={(e) => {
                        setSearch(e.target.value);
                        onInput && onInput(e);
                        if (setTm) clearTimeout(tm);

                        if(e.target.value === "") {
                            setSearchItems([]);
                            return;
                        }

                        setTm(
                            setTimeout(() => {
                                onInputFinish &&
                                    e.target.value &&
                                    onInputFinish(e);
                            }, inputTimeout)
                        );
                    }}
                />
            </div>
            {showItems && searchItems.length > 0 && (
                <div className="search-body" ref={bodyRef}>
                    {searchItems.map((item, index) => (
                        <div
                            key={index}
                            className="search-item"
                            onClick={(e) => {
                                // setSearchItems([]);
                                setSearch(item.value.formatted);
                                onItemSelect && onItemSelect(item);
                            }}
                        >
                            <header>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </header>
                            <ChevronRight className="icon" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
