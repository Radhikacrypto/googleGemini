import React from 'react'
import { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


 const Main = () => {
    const{onSent, recentPrompt, showResult, loading, resultData, setInput, input}=useContext(Context)
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main_container">

            {!showResult?
            <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How Can I help yu TOday</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest Beautiful Place</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest Beautiful Place</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest Beautiful Place</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Suggest Beautiful Place</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>:<div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />{loading?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>:
                    <p dangerouslySetInnerHTML={{_html:resultData}}></p>}
                </div>
                </div>}

            <div className="main_bottom">
                <div className="search_box">
                    <input onChange={(e)=>setInput(e.target.value)} 
                    value={input} 
                    type="text" 
                     placeholder='enter prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img 
                        onClick={()=>onSent}
                        src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom_info">
                    Gemini may display inacurate info, including about people , so double-check its response
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
