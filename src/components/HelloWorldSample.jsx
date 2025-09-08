import { createElement, useEffect, useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";

function DonutChart({ planName, totalAmount, utilizedAmount }) {
    let balanceAmount = Math.round(totalAmount - utilizedAmount);

    let cost = "";
    if (planName.includes("UAE")) cost = "AED";
    else if (planName.includes("KSA")) cost = "SAR";
    else if (planName.includes("IND")) cost = "INR";
    else cost = "SAR";

    // percentages
    const utilizedPercent = (utilizedAmount / totalAmount) * 100;
    const balancePercent = 100 - utilizedPercent;

    return (
        <div className="dy-card">
            <div className="spread-tb">
                <h3>{planName}</h3>
            </div>
            <div className="in-dy-txt">
                <div className="txt-card">
                    <div className="bdr-txt-utilized">
                        <div className="Utilized-custom">
                            Utilized : {utilizedAmount}
                        </div>
                    </div>
                    <div className="bdr-txt-utilized">
                        <div className="Balance-custom">
                            Balance : {balanceAmount}
                        </div>
                    </div>
                    <div className="bdr-txt-utilized">
                        <div className="Total-custom">
                            Total Compensation : {totalAmount}
                        </div>
                    </div>
                </div>

                {/* Custom Donut */}
                <div className="chart-cont">
                    <div
                        className="donut"
                        style={{
                            background: `conic-gradient(#ec7237 ${balancePercent}%, #dfe4e8 ${balancePercent}% 100%)`
                        }}
                    >
                        <div className="donut-center">
                            <div className="txt-chart-title">{balanceAmount}</div>
                            <div className="txt-chart-subtitle">{cost}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HelloWorldSample(props) {
    const { data, animationDuration } = props;
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        try {
            if (data) {
                const parsed = JSON.parse(data.value);
                if (Array.isArray(parsed)) {
                    setJsonData(parsed);
                } else {
                    console.error("Provided JSON is not an array:", parsed);
                }
            }
        } catch (err) {
            console.error("Invalid JSON string in data expression:", err);
        }
    }, [data]);

    const items = jsonData.map((item, index) => (
        <div key={index}>
            <DonutChart
                planName={item.IndiviualCompType}
                totalAmount={item.TotalAllowedComp}
                utilizedAmount={item.UtilizedAmount}
            />
        </div>
    ));

    return (
        <div className="carousel-container">
            <AliceCarousel
                items={items}
                autoPlay
                autoPlayInterval={animationDuration}
                infinite
                disableDotsControls={false}
                disableButtonsControls={false}
                mouseTracking
            />
        </div>
    );
}
