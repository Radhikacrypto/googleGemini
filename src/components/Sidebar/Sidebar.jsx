import React ,{useState, useContext}from 'react'
import './sidebar.css'
import{assets} from '../../assets/assets'
import { Context } from '../../context/Context'





 const Sidebar = () => {

    const [extended, setextended]=useState(false)
    const{onSent, prevPrompts, setRecentPrompt, newChat}=useContext(Context)

    const loadPrompt= async (prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setextended(prev=>!prev)}src={assets.menu_icon} alt="" className="menu" />
            <div 
            onClick={()=>newChat()}
            className="new_chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended?<div className="recent">
                <p className="recent_title">Recent</p>
                {prevPrompts.map((item, index)=>{
                    return(
                        <div 
                        onClick={()=>loadPrompt(item)}
                        className="recent_entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)} ....</p>
                </div>
                    )
                })}
                
            </div>:null}
        </div>
        <div className="bottom">
            <div className="recent_entry bottom_item">
                <img src={assets.question_icon} alt="" />
                {extended?<p>help</p>:null}         </div>
            <div className="recent_entry bottom_item">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="recent_entry bottom_item">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>SEtting</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar