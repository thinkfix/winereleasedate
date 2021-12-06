import './App.css';
import {useState} from "react";

function App() {
    let [code, setCode] = useState('L');
    let [vintage, setVintage] = useState('');
    // let [addDate, setAddDate] = useState(null);

    const onCodeChangeHandler = (e) => {
        let value = e.target.value;
        const regex = /[^L\d+]/g;
        if( ~value.search(regex) ) {
            setCode('L')
        } else {
            setCode(value);
        }
    }


    const onVintageChangeHandler = (e) => {
        let value = e.target.value;
        const regex = /[^L\d+]/g;
        if( ~value.search(regex) ) {
            setVintage('')
        } else {
            setVintage(value);
        }
    }



    const wineCodeConverter = (digits, vintage) => {
        let bottlingYear;

        vintage = vintage || '2015';
        let yearLastDigit = vintage % 10;
        let fullYearBeforeLastDigit = vintage.slice(-4,-1);

        let yearDigit = digits[0];
        let dayDigits = digits.slice(1,4);

        if (dayDigits > 365) {
            dayDigits = digits.slice(0,3);
            yearDigit = digits.slice(3,4)
        }

        if (yearDigit < yearLastDigit) {
            bottlingYear = +fullYearBeforeLastDigit + 1 + yearDigit
        } else {
            bottlingYear = +fullYearBeforeLastDigit + yearDigit
        }

        if(digits.length === 5) {
            yearDigit = digits.slice(1,2);
            dayDigits = digits.slice(2,5);

            if (dayDigits > 365) {
                dayDigits = digits.slice(0,3);
                yearDigit = digits.slice(4,5);
            }

            if (yearDigit < yearLastDigit) {
                bottlingYear = +fullYearBeforeLastDigit + 1 + yearDigit
            } else {
                bottlingYear = fullYearBeforeLastDigit + yearDigit
            }
        }

        let options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(bottlingYear, 0, dayDigits).toLocaleDateString('ru-RU', options);
    };

    return (
        <form className="App">
            <label htmlFor="lcode">Введите L код с этикетки: </label>
            <input type="text" name={"lcode"} value={code} onChange={onCodeChangeHandler}/>
            <br/>
            <label htmlFor="vintage">Винтаж: </label>
            <input type="text" name={"vintage"} value={vintage} onChange={onVintageChangeHandler}/>

            <h3>{(code.length>3) ? wineCodeConverter( code.slice(1), vintage): null}</h3>

            {/*{(addDate) ? <h4>Друга возможная дата:{addDate}</h4>: null}*/}
        </form>

    );
}

export default App;
