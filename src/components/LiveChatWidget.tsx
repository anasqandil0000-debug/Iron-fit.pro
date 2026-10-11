import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CHAT_QUICK_ACTIONS } from '../data/initialData';
import { MessageCircle, X, Send, Bot, User, CheckCheck } from 'lucide-react';

interface ChatMsg {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC = () => {
  const { chatOpen, setChatOpen, setTrackingModalOpen } = useStore();

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'm-1',
      sender: 'agent',
      text: 'أهلاً بك كابتن! معك كابتن فهد من الدعم الفني والاستشارات الرياضية في IronFit Pro. كيف أقدر أساعدك اليوم في تجهيز صالتك أو تتبع طلبك؟',
      time: 'الآن'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (chatOpen) {
      scrollToBottom();
    }
  }, [messages, chatOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim()) return;

    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: content.trim(),
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Look for preset response or intelligent fallback
    setTimeout(() => {
      let replyText = 'يسعدني خدمتك! فريقنا الفني متاح على مدار الساعة. يمكنك أيضاً تفقد زر "تتبع الشحنات" بالأعلى لتفاصيل أي طلب جاري.';
      
      const foundPreset = CHAT_QUICK_ACTIONS.find(
        (q) => content.includes(q.text) || q.text.includes(content)
      );

      if (foundPreset) {
        replyText = foundPreset.reply;
      } else if (content.includes('سعر') || content.includes('خصم') || content.includes('كوبون')) {
        replyText = 'يسعدنا تقديم كود الخصم الحصري (FIT10) بخصم 10% فوري عند الدفع، مع شحن مجاني لكافة الطلبات فوق 500 ريال!';
      } else if (content.includes('تتبع') || content.includes('طلب') || content.includes('شحن')) {
        replyText = 'بإمكانك تتبع شحنتك فوراً من خلال الضغط على خيار "تتبع الشحنات" بالنافذة العلوية، أو تزويدي برقم الطلب للبحث فوراً.';
      } else if (content.includes('ضمان') || content.includes('صيانة') || content.includes('تركيب')) {
        replyText = 'كافة الأجهزة والمقاعد مشمولة بضمان ذهبي معتمد من سنتين حتى 10 سنوات، وخدمة التركيب مجانية للأجهزة الثقيلة في منزلك.';
      }

      const agentMsg: ChatMsg = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating launcher button in RTL position (bottom-right / bottom-left) */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-amber-500 hover:bg-amber-400 text-zinc-950 p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
          aria-label="افتح الدردشة المباشرة"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline text-xs font-black px-1">مستشارك الرياضي المباشر</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col h-[520px] max-h-[85vh] overflow-hidden text-right animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-zinc-950 p-3.5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                <span>KF</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>كابتن فهد (مستشار التجهيز الرياضي)</span>
                </h4>
                <p className="text-[10px] text-emerald-400">متصل الآن لمساعدتك</p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              aria-label="إغلاق الدردشة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-zinc-950/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none'
                      : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700/60'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9px] text-zinc-500 font-mono mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-[11px] text-zinc-400 bg-zinc-800/60 p-2 rounded-xl w-fit">
                <span>كابتن فهد يكتب الآن</span>
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-200" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ buttons */}
          <div className="p-2 border-t border-zinc-800/80 bg-zinc-900 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {CHAT_QUICK_ACTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.text)}
                className="text-[10px] bg-zinc-950 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-full transition-colors shrink-0"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-zinc-950 border-t border-zinc-800 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب استفسارك للكابتن..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 p-2 rounded-xl transition-colors"
              aria-label="إرسال"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
