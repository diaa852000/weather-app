import React, { useState } from 'react'
import axios from 'axios'
import CountUp from 'react-countup'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then(response => {
        setData(response.data);
        localStorage.setItem('location', location)
        localStorage.setItem('savedData', JSON.stringify(response.data))
      })
    }
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c463390c0dfb2e413f080841045de585`

  return (
    <div className='app font-outFit w-full h-screen relative bg-[rgba(0,0,0,0.45)] text-white flex'>


      <div className="container h-full max-w-[700px] m-auto px-4 flex flex-col items-center justify-evenly py-3">
        <div className=" w-full p-2 max-w-[500px] text-gray-600">
          <div className='bg-[rgba(255,255,255,0.3)] w-full p-2 rounded-full shadow-md'>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder='Enter Location'
              onKeyDown={searchLocation}
              className='outline-none border-0 rounded-full py-2 px-3 shadow-2xl w-full bg-slate-50'
            />
          </div>
        </div>

        <div className="flex flex-col  items-center pt-10">
          <p className='text-lg md:text-[1.4rem] font-semibold uppercase'>{data.name}</p>
          {
            data.main
              ? 
              <h1 className='font-bold'>
                <span>
                  <CountUp
                    start={0}
                    end={data.main.temp.toFixed()}
                    duration={2.5}
                    useEasing={true}
                  />
                  &#730;
                </span>
                <span>C</span>
              </h1>
              : <h1 className='font-bold'>0&#730;<span>C</span></h1>
          }
          <div>
              {
              data.weather 
                ? <div className='flex items-center justify-center gap-1'>
                  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="not found"/> 
                  <p>{data.weather[0]?.main}</p>
                </div>
                : null 
              }
          </div>
        </div>

        <div className="flex justify-between md:justify-evenly px-3 py-4 md:p-4 w-full rounded-2xl bg-[rgba(255,255,255,0.2)] text-sm md:text-lg my-4 filter blur-xs capitalize font-bold">
          <div>
            {
              data.main
                ? <p>{data.main?.feels_like.toFixed()}&#730;<span>C</span></p>
                : <p>0&#730;<span>C</span></p>
            }
            <p className='my-1'>feels like</p>
          </div>
          <div>
            {
              data.main ?
                <p>
                  <span>
                    <CountUp
                      start={0}
                      end={data.main?.humidity}
                      duration={2.5}
                      useEasing={true}
                    />
                  %
                  </span>
                </p>
                : <p>0 %</p>
            }
            <p className='my-1'>humidity</p>
          </div>
          <div>
            {
              data.wind ?
                <p>
                  <span className='mx-1'>
                    <CountUp
                      start={0}
                      end={data.wind.speed.toFixed()}
                      duration={2.5}
                      useEasing={true}
                    />
                  </span>
                  <span>MPH</span>
                </p>
                : <p>0 MPH</p>
            }
            <p className='my-1'>wind speed</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
