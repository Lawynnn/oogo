import React from "react";
import SearchBox from "./SearchBox";
import { Calendar, Map, Users } from "lucide-react";
import useAPI from "../hooks/useAPI";
import useTranslation from "../hooks/useTranslation";
import CalendarInput from "./CalendarInput";
import NumberInput from "./NumberInput";

export default function RideSearch(props) {
    const [fromItems, setFromItems] = React.useState([]);
    const [fromSelectedItem, setFromSelectedItem] = React.useState(null);

    const [toItems, setToItems] = React.useState([]);
    const [toSelectedItem, setToSelectedItem] = React.useState(null);

    const [fromLoading, setFromLoading] = React.useState(false);
    const [toLoading, setToLoading] = React.useState(false);
    const api = useAPI();
    const { translate } = useTranslation();

    function distanceByCoords(coords1, coords2) {
        const R = 6371e3;
        const φ1 = (coords1[0] * Math.PI) / 180;
        const φ2 = (coords2[0] * Math.PI) / 180;
        const Δφ = ((coords2[0] - coords1[0]) * Math.PI) / 180;
        const Δλ = ((coords2[1] - coords1[1]) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return ~~((R * c) / 1000);
    }

    async function performSearch(e) {}

    return (
        <div className="ride-wrapper">
            <div className="ride-search-button-wrapper">
                <div className="ride-search-wrapper">
                    <div className="ride-search">
                        <SearchBox
                            loading={fromLoading}
                            items={fromItems.map((i) => ({
                                title: i.city || i.state || i.country,
                                description: i.formatted,
                                value: i,
                            }))}
                            placeholder={translate("from")}
                            icon={<Map className="icon" />}
                            onInputFinish={async (e) => {
                                setFromLoading(true);
                                const res = await api.searchLocation(
                                    e.target.value
                                );
                                console.log(res);
                                setFromItems(res.data);
                                setFromLoading(false);
                            }}
                            onItemSelect={(item) => {
                                console.log("selected", item);
                                setFromSelectedItem(item);
                            }}
                        />
                        <div className="separator">
                            {fromSelectedItem && toSelectedItem ? (
                                <span className="distance">
                                    {distanceByCoords(
                                        fromSelectedItem.value.coords,
                                        toSelectedItem.value.coords
                                    )}
                                    km
                                </span>
                            ) : (
                                <span className="distance empty">...km</span>
                            )}
                        </div>
                        <SearchBox
                            loading={toLoading}
                            items={toItems.map((i) => ({
                                title: i.city || i.state || i.country,
                                description: i.formatted,
                                value: i,
                            }))}
                            placeholder={translate("to")}
                            icon={<Map className="icon" />}
                            onInputFinish={async (e) => {
                                setToLoading(true);
                                const res = await api.searchLocation(
                                    e.target.value
                                );
                                console.log(res);
                                setToItems(res.data);
                                setToLoading(false);
                            }}
                            onItemSelect={(item) => {
                                console.log("selected to: ", item);
                                setToSelectedItem(item);
                            }}
                        />
                    </div>
                    <div className="circle-separator"></div>
                    <CalendarInput icon={<Calendar className="icon" />} />
                    <NumberInput icon={<Users className="icon" />} />
                </div>
                <button
                    className="search-ride-button"
                    onClick={async (e) => {
                        performSearch(e);
                    }}
                >
                    {translate("search_ride")}
                </button>
            </div>
        </div>
    );
}
