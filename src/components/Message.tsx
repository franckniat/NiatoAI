import clsx from "clsx";


const Message = ({ text, isUser, date }:{text:string|null, isUser:boolean, date:string}) => {
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div className={clsx('flex flex-col gap-1 my-3   p-2 rounded-lg max-w-[400px] relative', isUser ? 'justify-end left-0 bg-slate-600 dark:bg-slate-700 text-white ' : 'justify-start right-0 bg-slate-100 dark:bg-slate-200 dark:text-slate-900')}>
        <p  className=" px-2 h-full max-w-lg whitespace-pre-line">
          {text}
        </p>
        <p className="text-xs px-2 text-slate-400 text-end">{date}</p>
      </div>
    </div>
    
  );
};

export default Message;