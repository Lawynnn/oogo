import { Check, ChevronDown, Search } from "lucide-react";
import React from "react";
import "../styles/Combobox.css";

/**
 * @typedef {Object} ComboBoxProps
 * @property {Array<{name: string, description: ?string}>} items
 * @property {?boolean} search
 * @property {?string} placeholder
 * @property {?string} searchplaceholder
 * @property {?string} errormessage
 * @property {?function({name: string, description: ?string}): void} onItemChange
 * @property {?function(Array<{name: string, description: ?string}>, string): void} onFilterChange
 */

/**
 * 
 * @param {ComboBoxProps} props 
 * @returns 
 */
export default function ComboBox(props) {
    const { items, search, placeholder, searchplaceholder, onItemChange, onFilterChange, errormessage } = props;
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [comboVisible, setComboVisible] = React.useState(false);

    const ref = React.useRef(null);
    const wind = { width: window.innerWidth, height: window.innerHeight };
    const scroll = { x: window.scrollX, y: window.scrollY };

    React.useEffect(() => {
        const rect = ref.current.getBoundingClientRect();
        console.log(rect, wind, scroll, {
            d: document.body.getBoundingClientRect(),
        });
        if (rect.y + 265 > wind.height - scroll.y) {
            console.log("TOO BIG FOR BOTTOM");
            ref.current.style.top = "auto";
            ref.current.style.bottom = "calc(100% + 10px)";
        }
    }, []);

    React.useEffect(() => {
        setFilteredItems(items);
    }, []);

    function handleSearch(e) {
        const value = e.target.value.toLowerCase();

        if (!value) {
            setFilteredItems(items);
            onFilterChange && onFilterChange(items, value);
            return;
        }

        const regex = new RegExp(
            value
                .split("")
                .map((c) => `.*${c}`)
                .join(""),
            "i"
        );
        const filtered = items.filter((item) => {
            const nameMatch = regex.test(item.name);
            const descMatch = item.description
                ? regex.test(item.description)
                : false;
            return nameMatch || descMatch;
        });

        setFilteredItems(filtered);
        onFilterChange && onFilterChange(filtered, value);
    }

    return (
        <div className="combo-wrapper">
            <div
                className="combo-box"
                onClick={(e) => {
                    setComboVisible(!comboVisible);
                }}
            >
                <span className="result">
                    {(selectedItem && selectedItem.name) ||
                        placeholder ||
                        "Select an item"}
                </span>
                <ChevronDown
                    className="icon"
                    data-down={comboVisible ? "true" : "false"}
                />
            </div>
            <div
                className="combo"
                data-visible={comboVisible ? "true" : "false"}
                ref={ref}
            >
                {search && (
                    <div className="combo-header">
                        <Search className="icon" />
                        <input
                            type="text"
                            placeholder={searchplaceholder || "Search..."}
                            onInput={handleSearch}
                        />
                    </div>
                )}
                <div className="combo-body">
                    {filteredItems.length ? filteredItems.map((item, index) => (
                        <div
                            key={index}
                            className="combo-item"
                            onClick={(e) => {
                                setSelectedItem(item);
                                setComboVisible(false);
                                onItemChange && onItemChange(item);
                            }}
                        >
                            <Check
                                className="combo-item-check"
                                data-visible={
                                    selectedItem === item ? "true" : "false"
                                }
                            />
                            <div className="combo-item-header">
                                <h2>{item.name}</h2>
                                {item.description && <p>{item.description}</p>}
                            </div>
                        </div>
                    )) : (
                        <div className="combo-item combo-item-error">
                            <h2>{errormessage || "No items found"}</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
