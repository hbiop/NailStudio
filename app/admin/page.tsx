'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

type Booking = {
  id: number;
  status: 'pending' | 'confirmed' | 'cancelled' | string;
  user?: { name: string; email: string };
  service?: { name: string };
  slot?: { starts_at: string; ends_at: string };
};

const statusLabels: Record<string, string> = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждена',
  cancelled: 'Отменена',
};

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  cancelled: 'bg-red-50 text-red-700 ring-red-200',
};

export default function AdminPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  const load = async () => {
    const token = localStorage.getItem('nailstudio_token');
    if (!token) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.status === 401 || response.status === 403) {
        setAccessDenied(true);
        return;
      }
      if (!response.ok) throw new Error(data.detail ?? 'Не удалось загрузить записи');
      setItems(data.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не удалось загрузить записи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (bookingId: number, status: 'confirmed' | 'cancelled') => {
    const token = localStorage.getItem('nailstudio_token');
    if (!token) {
      setAccessDenied(true);
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`${API}/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (response.status === 401 || response.status === 403) {
        setAccessDenied(true);
        return;
      }
      if (!response.ok) throw new Error(data.detail ?? 'Не удалось изменить статус');
      setItems(current => current.map(item => item.id === bookingId ? { ...item, status: data.status } : item));
      setMessage(status === 'confirmed' ? 'Запись подтверждена.' : 'Запись отменена. Окно снова доступно для записи.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не удалось изменить статус');
    } finally {
      setSaving(false);
    }
  };

  const addAdmin = async (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('nailstudio_token');
    if (!token) {
      setAccessDenied(true);
      return;
    }

    setSaving(true);
    setAdminMessage('');
    try {
      const response = await fetch(`${API}/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: adminName, email: adminEmail, password: adminPassword, password_confirmation: adminPassword }),
      });
      const data = await response.json();
      if (response.status === 401 || response.status === 403) {
        setAccessDenied(true);
        return;
      }
      if (!response.ok) throw new Error(data.detail ?? 'Не удалось создать администратора');
      setAdminName('');
      setAdminEmail('');
      setAdminPassword('');
      setAdminMessage('Новый администратор создан.');
    } catch (error) {
      setAdminMessage(error instanceof Error ? error.message : 'Не удалось создать администратора');
    } finally {
      setSaving(false);
    }
  };

  const addSlot = async (event: FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('nailstudio_token');
    if (!token) {
      setAccessDenied(true);
      return;
    }

    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`${API}/admin/slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ starts_at: starts, ends_at: ends }),
      });
      const data = await response.json();
      if (response.status === 401 || response.status === 403) {
        setAccessDenied(true);
        return;
      }
      if (!response.ok) throw new Error(data.detail ?? 'Не удалось добавить окно');
      setStarts('');
      setEnds('');
      setMessage('Свободное окно добавлено.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не удалось добавить окно');
    } finally {
      setSaving(false);
    }
  };

  const pendingItems = useMemo(() => items.filter(item => item.status === 'pending'), [items]);
  const processedItems = useMemo(() => items.filter(item => item.status !== 'pending'), [items]);
  const stats = useMemo(() => ({
    total: items.length,
    pending: pendingItems.length,
    confirmed: items.filter(item => item.status === 'confirmed').length,
  }), [items, pendingItems]);

  if (loading) {
    return <main className="min-h-screen bg-[#FBF9F4] px-4 py-20 text-center text-stone-500">Загружаем панель управления…</main>;
  }

  if (accessDenied) {
    return <main className="flex min-h-screen items-center justify-center bg-[#FBF9F4] px-4 text-stone-800"><section className="w-full max-w-md rounded-[32px] bg-white p-8 text-center shadow-xl shadow-stone-900/5"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EDE4] text-2xl">🔒</div><h1 className="mt-6 text-3xl font-serif">Нет доступа</h1><p className="mt-3 text-sm leading-6 text-stone-500">Эта страница доступна только авторизованному администратору.</p><div className="mt-7 flex flex-col gap-3"><Link href="/account" className="primary">Войти в аккаунт</Link><Link href="/" className="rounded-full border border-stone-200 py-3 text-sm text-stone-600 hover:bg-stone-50">Вернуться на главную</Link></div></section></main>;
  }

  return <main className="min-h-screen bg-[#F8F5F0] px-4 py-8 text-stone-800 md:px-8"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><Link href="/" className="text-sm text-stone-500 transition hover:text-stone-900">← На главную</Link><p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#BC7C5C]">NailStudio / Admin</p><h1 className="mt-2 text-4xl font-serif md:text-5xl">Панель управления</h1><p className="mt-2 text-sm text-stone-500">Контролируйте расписание и подтверждайте записи клиентов.</p></div><button onClick={load} className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm transition hover:border-[#BC7C5C]">Обновить данные</button></header>
    <section className="mb-8 grid gap-4 sm:grid-cols-3"><StatCard label="Всего записей" value={stats.total} icon="◌"/><StatCard label="Ожидают решения" value={stats.pending} icon="◷" accent="amber"/><StatCard label="Подтверждены" value={stats.confirmed} icon="✓" accent="green"/></section>
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]"><section><div className="mb-4 flex items-center justify-between"><div><h2 className="text-2xl font-serif">Записи клиентов</h2><p className="mt-1 text-sm text-stone-500">Новые записи требуют подтверждения.</p></div></div>{message && <div className="mb-4 rounded-2xl border border-[#E5D4C7] bg-[#FBF3EC] px-5 py-3 text-sm text-[#8C604B]">{message}</div>}{items.length === 0 ? <div className="rounded-3xl bg-white p-10 text-center text-stone-500 shadow-sm">Пока нет записей клиентов.</div> : <div className="space-y-8">{pendingItems.length > 0 && <section className="rounded-[28px] border border-amber-200 bg-amber-50/60 p-4 md:p-5"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-xl font-serif text-amber-950">Ожидают подтверждения</h3><p className="mt-1 text-sm text-amber-800/80">Проверьте данные клиента и подтвердите или отмените запись.</p></div><span className="rounded-full bg-amber-200 px-3 py-1 text-sm font-medium text-amber-900">{pendingItems.length}</span></div><div className="space-y-4">{pendingItems.map(item => <BookingCard key={item.id} item={item} disabled={saving} onStatusChange={updateStatus}/>)}</div></section>}{processedItems.length > 0 && <section><h3 className="mb-4 text-xl font-serif">Обработанные записи</h3><div className="space-y-4">{processedItems.map(item => <BookingCard key={item.id} item={item} disabled={saving} onStatusChange={updateStatus}/>)}</div></section>}{pendingItems.length === 0 && processedItems.length === 0 && <div className="rounded-3xl bg-white p-10 text-center text-stone-500 shadow-sm">Пока нет записей клиентов.</div>}</div>}</section><aside><form onSubmit={addSlot} className="rounded-3xl bg-white p-6 shadow-sm"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BC7C5C]">Расписание</p><h2 className="mt-2 text-2xl font-serif">Добавить окно</h2><p className="mt-2 text-sm leading-6 text-stone-500">Создайте время, которое будет доступно клиентам в кабинете.</p></div><label className="label mb-4">Начало<input required type="datetime-local" value={starts} onChange={event => setStarts(event.target.value)} className="field"/></label><label className="label mb-5">Окончание<input required type="datetime-local" value={ends} onChange={event => setEnds(event.target.value)} className="field"/></label><button disabled={saving} className="primary w-full">{saving ? 'Сохраняем…' : 'Добавить свободное окно'}</button></form><form onSubmit={addAdmin} className="mt-5 rounded-3xl bg-white p-6 shadow-sm"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#BC7C5C]">Команда</p><h2 className="mt-2 text-2xl font-serif">Добавить администратора</h2><p className="mt-2 text-sm leading-6 text-stone-500">Доступно только действующим администраторам.</p></div><label className="label mb-3">Имя<input required value={adminName} onChange={event => setAdminName(event.target.value)} className="field" placeholder="Имя администратора"/></label><label className="label mb-3">Email<input required type="email" value={adminEmail} onChange={event => setAdminEmail(event.target.value)} className="field" placeholder="admin@example.com"/></label><label className="label mb-4">Пароль<input required minLength={8} type="password" value={adminPassword} onChange={event => setAdminPassword(event.target.value)} className="field" placeholder="Минимум 8 символов"/></label>{adminMessage && <p className="mb-3 text-sm text-stone-600">{adminMessage}</p>}<button disabled={saving} className="primary w-full">{saving ? 'Создаём…' : 'Создать администратора'}</button></form><div className="mt-4 rounded-3xl bg-[#E9DED2] p-6"><p className="text-sm font-medium text-[#8C604B]">Подсказка</p><p className="mt-2 text-sm leading-6 text-stone-600">После отмены записи временное окно автоматически снова появится у клиентов.</p></div></aside></div>
  </div></main>;
}

function StatCard({ label, value, icon, accent = 'brown' }: { label: string; value: number; icon: string; accent?: 'brown' | 'amber' | 'green' }) { const colors = { brown: 'bg-[#F4EDE4] text-[#A66A4C]', amber: 'bg-amber-50 text-amber-600', green: 'bg-emerald-50 text-emerald-600' }; return <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${colors[accent]}`}>{icon}</div><div><p className="text-sm text-stone-500">{label}</p><p className="mt-1 text-3xl font-serif">{value}</p></div></div>; }

function BookingCard({ item, disabled, onStatusChange }: { item: Booking; disabled: boolean; onStatusChange: (id: number, status: 'confirmed' | 'cancelled') => void }) { const statusClass = statusStyles[item.status] ?? 'bg-stone-100 text-stone-600 ring-stone-200'; return <article className="rounded-3xl bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F4EDE4] font-serif text-lg text-[#A66A4C]">{item.user?.name?.charAt(0).toUpperCase() ?? '?'}</div><div><h3 className="font-medium text-stone-900">{item.user?.name ?? 'Клиент'}</h3><p className="mt-1 text-sm text-stone-500">{item.user?.email}</p><p className="mt-3 text-sm text-stone-700">{item.service?.name ?? 'Услуга'} <span className="mx-1 text-stone-300">•</span> {item.slot ? new Date(item.slot.starts_at).toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' }) : 'Время не указано'}</p></div></div><div className="flex flex-wrap items-center gap-3 md:justify-end"><span className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ${statusClass}`}>{statusLabels[item.status] ?? item.status}</span>{item.status === 'pending' && <><button disabled={disabled} onClick={() => onStatusChange(item.id, 'confirmed')} className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50">Подтвердить</button><button disabled={disabled} onClick={() => onStatusChange(item.id, 'cancelled')} className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50">Отменить</button></>}</div></div></article>; }
