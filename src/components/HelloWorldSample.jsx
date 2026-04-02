import { createElement, useEffect, useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuAsterisk } from "react-icons/lu";

function DonutChart({ planName, totalAmount, utilizedAmount, start_date, cost, showdetails, child }) {
    var isExist = true;
    var isAnnualBonus = false;
    let balanceAmount = Math.round(totalAmount - utilizedAmount);
    let body = (typeof window !== 'undefined' && window.document && window.document.body) ? window.document.body : null;
    const hasCyanClass = body ? Array.from(body.classList).some(c => c.toLowerCase().includes('cyan')) : false;
    const donutPrimaryColor = hasCyanClass ? '#42bdb5' : '#ec7237';
    // Format numbers with commas
    const formattedUtilizedAmount = utilizedAmount.toLocaleString();
    const formattedBalanceAmount = balanceAmount.toLocaleString();
    const formattedTotalAmount = totalAmount.toLocaleString();

    const utilizedPercent = (utilizedAmount / totalAmount) * 100;
    const balancePercent = showdetails ? 100 - utilizedPercent : 0;

    let Eligible = totalAmount !== 0 ? 'Yes' : 'No';

    let Month = "Empty";

    if (planName === "Wellbeing Program") {
        isExist = false;
        isAnnualBonus = false;
        if (start_date) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // JS month is 0-based
            if (currentMonth !== 12) {
                Month = `December ${currentDate.getFullYear()}`;
            } else {
                // If current month is December, add 11 months
                const futureDate = new Date();
                futureDate.setMonth(futureDate.getMonth() + 11);
                Month = `December ${futureDate.getFullYear()}`;
            }
        }
    } else if (planName === "Annual Ticket") {
        isExist = false;
        isAnnualBonus = false;
        if (start_date) {
            const startDate = new Date(start_date);
            const today = new Date();
            let effectiveDate;
            if (startDate >= today) {
                // Current year logic
                effectiveDate = startDate;
            } else {
                // Next year logic (+11 months)
                effectiveDate = new Date(startDate);
                effectiveDate.setMonth(effectiveDate.getMonth() + 11);
            }
            Month = effectiveDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
    } else if (planName === "Annual Vacation Allowance") {
        isExist = false;
        isAnnualBonus = false;
        if (start_date) {
            const startDate = new Date(start_date);
            const today = new Date();
            let effectiveDate;
            if (startDate >= today) {
                // Current year logic
                effectiveDate = new Date(startDate);
                effectiveDate.setMonth(effectiveDate.getMonth() - 1);
            } else {
                // Next year logic (+11 months)
                effectiveDate = new Date(startDate);
                effectiveDate.setMonth(effectiveDate.getMonth() + 11);
            }
            Month = effectiveDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
    } else if (planName === "Annual Bonus") {
        isAnnualBonus = true;
        isExist = false;
        if (start_date) {
            const date = new Date(start_date);
            Month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
    } else {
        isExist = true;
        isAnnualBonus = false;
        Month = new Date(start_date).toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    return (
        <div className="dy-card">
            <div className="spread-tb">
                <h3>{planName}</h3>
            </div>
            <div className="in-dy-txt">
                {isExist ? (
                    <div>
                        <div className="txt-card">
                            {child != null && child != undefined && child !== '' ? (
                                <div className="bdr-txt-utilized-ca">
                                    <div className="field-block-ca">
                                        <div className="field-label-ca">Child Name</div>
                                        <div className="field-value-ca">
                                            {showdetails ? child : (
                                                <div className="ast-rep">
                                                    <LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            ) : (<div></div>)}
                            <div className="bdr-txt-utilized">
                                <div className="Utilized-custom">
                                    Consumed {showdetails ? formattedUtilizedAmount : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                            <div className="bdr-txt-utilized">
                                <div className="Balance-custom">
                                    Balance {showdetails ? formattedBalanceAmount : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                            <div className="bdr-txt-utilized">
                                <div className="Total-custom">
                                    Max Compensation {showdetails ? formattedTotalAmount : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div >
                        <div className="txt-card">
                            <div className="bdr-txt-utilized">
                                <div className="Utilized-custom">
                                    Awarded {showdetails ? formattedTotalAmount : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                            <div className="bdr-txt-utilized">
                                <div className="Balance-custom">
                                    Eligible {showdetails ? Eligible : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                            <div className="bdr-txt-utilized">
                                <div className="Total-custom">
                                    {isAnnualBonus ? 'Previous Reward' : 'Next Reward'} {showdetails ? Month : <div className="ast-rep"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Custom Donut */}
                <div className="chart-cont">
                    <div
                        className="donut"
                        style={{
                            background: `conic-gradient(${donutPrimaryColor} ${balancePercent}%, #dfe4e8 ${balancePercent}% 100%)`
                        }}
                    >
                        <div className="donut-center">
                            <div className="txt-chart-title">{showdetails ? formattedBalanceAmount : <div className="ast-rep-amt"><LuAsterisk /><LuAsterisk /><LuAsterisk /><LuAsterisk /></div>}</div>
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
    const [isVisible, setIsVisible] = useState(false);
    let body = (typeof window !== 'undefined' && window.document && window.document.body) ? window.document.body : null;
    const hasCyanClass = body ? Array.from(body.classList).some(c => c.toLowerCase().includes('cyan')) : false;
    const donutPrimaryColor = hasCyanClass ? '#42bdb5' : '#ec7237';

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
                child={item.ChildName}
                start_date={item.EffectiveStartDate}
                cost={item.cost}
                showdetails={isVisible}
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
            <div className="toggle-btn">
                <button className={"eye-button " + (isVisible ? 'Hide' : 'Show')} onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ?
                        <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.199 12.8657C16.9695 12.1008 17.5644 11.3408 17.9532 10.7957C18.2065 10.4404 18.3332 10.2628 18.3332 9.99984C18.3332 9.73692 18.2065 9.55925 17.9532 9.204C16.8148 7.6077 13.9075 4.1665 9.99984 4.1665C9.24334 4.1665 8.52434 4.29547 7.8484 4.51506M5.62269 5.62269C3.94249 6.75584 2.70163 8.28539 2.04654 9.204C1.79318 9.55925 1.6665 9.73692 1.6665 9.99984C1.6665 10.2628 1.79318 10.4404 2.04654 10.7957C3.18492 12.392 6.09215 15.8332 9.99984 15.8332C11.6588 15.8332 13.1374 15.2129 14.377 14.377" stroke={donutPrimaryColor} stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.21488 8.3335C7.77319 8.77516 7.5 9.38541 7.5 10.0594C7.5 11.4074 8.59275 12.5002 9.94075 12.5002C10.6147 12.5002 11.225 12.227 11.6667 11.7852" stroke={donutPrimaryColor} stroke-width="0.833333" stroke-linecap="round" />
                            <path d="M2.5 2.5L17.5 17.5" stroke={donutPrimaryColor} stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </div>
                        :
                        <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.9532 9.204C18.2065 9.55925 18.3332 9.73692 18.3332 9.99984C18.3332 10.2628 18.2065 10.4404 17.9532 10.7957C16.8148 12.392 13.9075 15.8332 9.99984 15.8332C6.09215 15.8332 3.18492 12.392 2.04654 10.7957C1.79318 10.4404 1.6665 10.2628 1.6665 9.99984C1.6665 9.73692 1.79318 9.55925 2.04654 9.204C3.18492 7.6077 6.09215 4.1665 9.99984 4.1665C13.9075 4.1665 16.8148 7.6077 17.9532 9.204Z" stroke={donutPrimaryColor} stroke-width="1.25" />
                            <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke={donutPrimaryColor} stroke-width="1.25" />
                        </svg>
                        </div>} {isVisible ? 'Hide Details' : 'Show Details'}
                </button>
            </div>
        </div>
    );
}
