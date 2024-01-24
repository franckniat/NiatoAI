
const Message = ({ text, isUser, date }:{text:string|null, isUser:boolean, date:string}) => {
  return (
    <div style={{ textAlign: isUser ? 'right' : 'left' }} className="my-3 bg-gray-100 p-2 rounded">
      <p style={{ padding: '8px', display: 'inline-block' }} className=" px-2 h-full">
        {text}
      </p>
      <p className="text-xs px-2">{date}</p>
    </div>
  );
};

export default Message;