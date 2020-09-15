import React, { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Chat = () => {
    const history = useHistory()
    let [messages, setMessages] = useState([] as Array<Message>)
    let [message, setMessage] = useState('')
    const scrollbar = React.useRef<Scrollbars>(null)
    useEffect(() => {
        scrollbar.current?.scrollToBottom()
    }, [])
    function send() {
        pushMessage({
            id: Date.now(),
            isBotResponse: false,
            text: message
        })
        getResponse()
    }
    async function getResponse() {
        let data = await axios.get(`http://localhost:1616/baymax?words=${message}`)
        if (data.data.response === "#beyondcompare") {
            history.push('/bcompare')
        }
        pushMessage({
            id: Date.now(),
            isBotResponse: true,
            text: data.data.response
        })
        setMessage('')
    }

    function pushMessage(data: Message) {
        messages.push(data)
        setMessages(messages)
        setTimeout(() => {
            if (scrollbar.current) {
                console.log(scrollbar.current)
                scrollbar.current.scrollToBottom()
            }
        }, 50);
    }
    return (
        <div className="row">
            <div className="col-md-4 col-12 offset-md-3 mt-4">

                <div className="col-12 mb-2">
                    <h4 className="fs-13">Chatbot</h4>
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