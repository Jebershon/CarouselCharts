import { createElement, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AliceCarousel from 'react-alice-carousel';

function PieChart({ planName, totalAmount, utilizedAmount }) {
    let balanceAmount = Math.round(totalAmount - utilizedAmount);

	let cost = "";
	if(planName.includes("UAE")){
		cost = "AED";
	} else if(planName.includes("KSA")){
		cost = "SAR";
	} else if(planName.includes("IND")){
		cost = "INR";
	} else{
		cost = "SAR";
	}

    const options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent"
        },
        title: {
            text: `<div class="txt-chart-title" >${balanceAmount}</div>`,
            verticalAlign: "middle",
            y: -10,
            useHTML: true
        },
        subtitle: {
            text: `<div class="txt-chart-subtitle" >${cost}</div>`,
            verticalAlign: "middle",
            y: 15,
            useHTML: true
        },
        plotOptions: {
            pie: {
                innerSize: "75%",
                borderRadius: 0,
                size: "100%",
                dataLabels: { enabled: false },
                borderWidth: 0,
                states: {
                    hover: {
                        enabled: false
                    },
                    inactive: {
                        enabled: false
                    }
                }
            }
        },
        series: [
            {
                name: "Amount",
                data: [
                    { name: "Utilized", y: utilizedAmount, color: "#dfe4e8" }, 
                    { name: "Balance", y: balanceAmount, color: "#ec7237" } 
                ]
            }
        ],
        tooltip: { enabled: false },
        credits: { enabled: false }
    };

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
                <div className="chart-cont">
                    <HighchartsReact highcharts={Highcharts} options={options} style={{ width: '300px', height: '300px', margin: '0 auto' }} />
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
            <PieChart
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
