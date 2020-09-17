import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


function Chat(){
    const history = useHistory()
    let [messages, setMessages] = useState([] as Array<Message>)
    let [message, setMessage] = useState('')
    let [isGettingResponse, setIsGettingResponse] = useState(false)
    const scrollbar = React.useRef<Scrollbars>(null)
    useEffect(() => {
        scrollbar.current?.scrollToBottom()
    }, [])


    function send() {
        setIsGettingResponse(true)
        pushMessage({
            id: Date.now(),
            isBotResponse: false,
            text: message
        })

        axios.get(`http://localhost:1616/baymax?words=${message}`)
            .then((data) => {
                if (data.data.response === "#beyondcompare") {
                    history.push('/bcompare')
                }
                pushMessage({
                    id: Date.now(),
                    isBotResponse: true,
                    text: data.data.response
                })
                setIsGettingResponse(false)
            })
        setMessage('')
    }

    function pushMessage(data: Message) {
        setMessages(prevs => [...prevs, data])
        setTimeout(() => {
            if (scrollbar.current) {
                console.log(scrollbar.current)
                scrollbar.current.scrollToBottom()
            }
        }, 50);
    }

    function indicator(isGettingResponse: boolean) {
        if (isGettingResponse) {
            return (
                <div className="typing-indicator align-self-start" >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )
        }
        return <></>
    }
    return (
        <div className="row">
            <div className="col-md-4 col-12 offset-md-3 mt-4">

                <div className="col-12 mb-2">
                    <h4 className="fs-13"><img src={require('./images/bot.png')} alt="bot" className="mr-2" style={{width:30}}/> <span style={{color:'#ff8a8a'}}>Baymax</span></h4>
                </div>
                <Scrollbars style={{ height: 200 }}
                    ref={scrollbar}
                >
                    <div id="chat" className="d-flex flex-column pr-3 pl-3 mr-2">
                        {
                            messages.map((m) => {
                                return <p key={m.id} className={`d-block ${m.isBotResponse ? 'align-self-start balon2' : 'align-self-end balon1'}  mb-1 fs-13`}>{m.text}</p>;
                            })
                        }
                        {indicator(isGettingResponse)}
                    </div>
                </Scrollbars>
                <form onSubmit={(e) => { e.preventDefault(); send() }} className="">
                    <div className="form-group mt-3">
                        <input type="text" id="message_input" onChange={(e) => { setMessage(e.target.value) }} value={message} className="form-control" style={{ fontSize: 12, borderRadius: 57 }} />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Chat




interface Message {
    id: number
    text: string
    isBotResponse: boolean
}