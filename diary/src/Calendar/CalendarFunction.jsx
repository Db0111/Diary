export function prevMonth(year, setYear, month, setMonth) {
    if (month == 0) {
        setYear(year - 1);
        setMonth(11);
    } else {
        setMonth(month - 1);
    }
}

export function gotoToday(setYear, setMonth) {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth());
}

export function nextMonth(year, setYear, month, setMonth) {
    if (month == 11) {
        setYear(year + 1);
        setMonth(0);
    } else {
        setMonth(month + 1);
    }    
}

export function Calendar(props) {
    //     // props.month 을 그릴거야.
        return (<div className = 'thisMonth'>{props.year}년 {props.month}월</div>);
    }