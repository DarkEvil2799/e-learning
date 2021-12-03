import { DocumentTextIcon } from "@heroicons/react/outline"
import { Message } from "../../types/Message"

type Props = {
  message: Message
}

export const ChatMessage = ({
  message
}: Props) => {
  return (
    <div className="">
        <div className="flex items-start">
          { message.avatar ? (
            <img src={message.avatar} alt="My profile" className="w-6 h-6 rounded-full" />          
          ) : (
            <span className="flex-none w-6 h-6 bg-blue-500 rounded-full"></span>
          ) }
          <div className="flex-grow flex flex-col text-sm mx-2 items-start">
              <div className="space-x-1 font-medium">
                { message.isCurrentUser && (
                  <span className="px-2 bg-green-500 rounded text-white font-medium">me</span>
                ) }
                { message.isLecturer && (
                  <span className="px-2 bg-red-500 rounded text-white font-medium">lecturer</span>
                ) }                
                <span>{message.author}</span>
                <span className="text-gray-400">at <time>{message.timestamp}</time></span>
              </div>
              <p className="">
                {message.content}
              </p>
              { message.attachment !== undefined && (
                <a href={message.attachment.url} className="flex flex-row items-center mt-2 w-full text-left gap-1 text-white font-medium bg-blue-500 hover:bg-blue-600 p-2 rounded">
                    <DocumentTextIcon className="flex-none p-1 rounded h-6 w-6" />
                    <span className="flex-grow">{message.attachment.name}</span>
                    <span className="flex-none font-normal">{message.attachment.size} MB</span>
                </a>
              ) } 
          </div>
        </div>
    </div>
  )
}