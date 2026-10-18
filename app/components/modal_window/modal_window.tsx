'use client';

import { useEffect, useState } from 'react';

interface BookingModalProps { isOpen: boolean; onClose: () => void; }
interface Slot { id: number; starts_at: string; ends_at: string; }
const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotId, setSlotId] = useState<number>();
  const [serviceId, setServiceId] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setToken(localStorage.getItem('nailstudio_token') ?? ''); }, [isOpen]);
  useEffect(() => { if (!isOpen || token === '') return; fetch(`${API}/slots?date=${date}`).then(r => r.json()).then(data => { setSlots(data); setSlotId(data[0]?.id); }); }, [isOpen, token, date]);
  if (!isOpen) return null;

  const submitAuth = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setLoading(true);
    const endpoint = mode === 'login' ? 'login' : 'register';
    const body = mode === 'login' ? { email, password } : { name, email, password, password_confirmation: password };
    const response = await fetch(`${API}/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) { setError(Object.values(data.errors ?? { message: data.message ?? 'Не удалось войти' }).flat().join(' ')); return; }
    localStorage.setItem('nailstudio_token', data.token); setToken(data.token);
  };
  const submitBooking = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setLoading(true);
    const response = await fetch(`${API}/bookings`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ slot_id: slotId, service_id: serviceId }) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) { setError(data.message ?? 'Окно уже заняли. Обновите список.'); return; }
    setSuccess(true); setTimeout(() => { setSuccess(false); onClose(); }, 1800);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"><div className="bg-[#FBF9F4] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 relative">
    <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 text-xl" aria-label="Закрыть">×</button>
    {success ? <div className="py-8 text-center"><div className="text-emerald-600 text-3xl">✓</div><h3 className="text-xl font-serif mt-3">Вы успешно записаны!</h3><p className="text-sm text-stone-500 mt-2">Ждём вас в салоне.</p></div> : !token ? <form onSubmit={submitAuth} className="space-y-4"><h3 className="text-xl font-serif text-center">{mode === 'login' ? 'Вход для записи' : 'Регистрация'}</h3>{mode === 'register' && <input required value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" className="field" />}<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="field" /><input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль (от 8 символов)" className="field" />{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading} className="primary w-full">{loading ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}</button><button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-sm text-stone-500 w-full">{mode === 'login' ? 'Зарегистрироваться' : 'У меня уже есть аккаунт'}</button></form> : <form onSubmit={submitBooking} className="space-y-4"><h3 className="text-xl font-serif text-center">Онлайн-запись</h3><label className="label">Дата<input required type="date" value={date} onChange={e => setDate(e.target.value)} className="field" /></label><label className="label">Свободное окно<select required value={slotId ?? ''} onChange={e => setSlotId(Number(e.target.value))} className="field">{slots.length ? slots.map(slot => <option key={slot.id} value={slot.id}>{new Date(slot.starts_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</option>) : <option value="">Нет свободных окон</option>}</select></label><label className="label">Услуга<select value={serviceId} onChange={e => setServiceId(Number(e.target.value))} className="field"><option value="1">Комплекс (маникюр + покрытие)</option><option value="2">Маникюр без покрытия</option></select></label>{error && <p className="text-sm text-red-600">{error}</p>}<button disabled={loading || !slotId} className="primary w-full">{loading ? 'Бронируем…' : 'Подтвердить запись'}</button></form>}
  </div></div>;
}
