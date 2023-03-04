import BetaChat from "@component/components/BetaChat";
import BetaInput from "@component/components/BetaInput";


type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <BetaChat chatId={id} />
      <BetaInput chatId={id} />
    </div>
  );
}

export default ChatPage;
