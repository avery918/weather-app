import {useState} from "react"
import "./css/styles.css";


function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [hasCityInfo, setHasCityInfo] = useState(false);
  const [error, setError] = useState(null)
  const [location, setLocation] = useState("");

  // calls openweather api to retrieve data for given city
  function getLocationData (event){
    event.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c29fa33614df2281f3b08621e7e21bed&units=imperial`)
      .then(res => {
        if(!res.ok){
          throw Error(`City not found`)
        }
        return res.json();
      })
      .then(data => {
        setError(null);
        setWeatherInfo(data);
        setHasCityInfo(true)
        setLocation("");
      })
      .catch( err => {
        setHasCityInfo(false);
        setError(err.message);
      })


  }

  
  // get value from input and update location value
  function setTextValue(event) {
    setLocation(event.target.value);
  }console.log(weatherInfo)
  return (
    <div className={`App ${hasCityInfo ? "flex": ""}`}>
       

        <form onSubmit={getLocationData} className="form-container">
          <input 
            onChange={setTextValue} 
            value={location}
            className="search" 
            placeholder="Enter City Name" />
        </form> 

        {<>
          {error && 
            <div>
              <p className="error">{error}</p>    
            </div>} 
          {hasCityInfo &&
           <> 
            <div className="main">
              <div className="city-info">
                <p className="city-name">{weatherInfo.name}</p>
                <p className="city-temp">{`${weatherInfo.main.temp}\u00b0`}</p>
              </div>
              <img className="icon" src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} />
            </div>

            <div className="detail-list">
              <div>
                <p className="detail-item">{`${weatherInfo.main.feels_like}\u00b0`}</p>
                <p className="detail-item-descript">Feels Like</p>
              </div>

              <div>
                <p className="detail-item">{`${weatherInfo.main.humidity}%`}</p>
                <p className="detail-item-descript">Humidity</p>
              </div>

              <div>
                <p className="detail-item">{`${weatherInfo.weather[0].description}`}</p>
                <p className="detail-item-descript">Weather</p>
              </div>

            </div>
          </>
          
          }
          </>
        }
        
    </div>
  );
}

export default App;
