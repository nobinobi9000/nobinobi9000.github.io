'use client'
import React, { useState } from 'react'
import type { Subscription } from '../lib/types'

type EventType = 'renewal' | 'trial'

interface CalendarEvent {
  day: number
  type: EventType
  name: string
  monthlyPrice: number
  subId: string
  billingCycle: 'monthly' | 'annual'
}

/**
 * 該当月のイベント（更新日・トライアル終了日）を収集する
 * renewalDate 未設定の場合は startDate から推定
 */
function getMonthEvents(subs: Subscription[], year: number, month: number): CalendarEvent[] {
  const events: CalendarEvent[] = []
  const today = new Date()

  for (const sub of subs) {
    if (sub.status !== 'active') continue

    // トライアル終了日（renewalDate より優先）
    if (sub.trialEndDate) {
      const d = new Date(sub.trialEndDate)
      if (d.getFullYear() === year && d.getMonth() + 1 === month) {
        events.push({
          day: d.getDate(),
          type: 'trial',
          name: sub.name,
          monthlyPrice: sub.monthlyPrice,
          subId: sub.id,
          billingCycle: sub.billingCycle,
        })
        continue // トライアル中は更新日を別途表示しない
      }
    }

    // renewalDate が明示的に設定されている場合
    if (sub.renewalDate) {
      const d = new Date(sub.renewalDate)
      if (d.getFullYear() === year && d.getMonth() + 1 === month) {
        events.push({
          day: d.getDate(),
          type: 'renewal',
          name: sub.name,
          monthlyPrice: sub.monthlyPrice,
          subId: sub.id,
          billingCycle: sub.billingCycle,
        })
      }
      continue
    }

    // renewalDate 未設定: startDate から推定
    const start = new Date(sub.startDate)
    if (sub.billingCycle === 'monthly') {
      // 毎月 startDate の「日」に更新（ただし未来のみ）
      const estimatedDate = new Date(year, month - 1, start.getDate())
      if (estimatedDate >= today || (estimatedDate.getFullYear() === today.getFullYear() && estimatedDate.getMonth() === today.getMonth())) {
        events.push({
          day: start.getDate(),
          type: 'renewal',
          name: sub.name,
          monthlyPrice: sub.monthlyPrice,
          subId: sub.id,
          billingCycle: sub.billingCycle,
        })
      }
    } else if (sub.billingCycle === 'annual' && start.getMonth() + 1 === month) {
      // 年払い: startDate と同じ月日
      events.push({
        day: start.getDate(),
        type: 'renewal',
        name: sub.name,
        monthlyPrice: sub.monthlyPrice,
        subId: sub.id,
        billingCycle: sub.billingCycle,
      })
    }
  }

  return events.sort((a, b) => a.day - b.day)
}

const DOW_LABELS = ['日', '月', '火', '水', '木', '金', '土']
const accent = '#f97316'
const trialColor = '#ef4444'

interface Props {
  subscriptions: Subscription[]
}

export default function CalendarView({ subscriptions }: Props) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1) // 1-indexed

  function prevMonth() {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1) }
    else setViewMonth(m => m + 1)
  }

  const events = getMonthEvents(subscriptions, viewYear, viewMonth)

  // カレンダーグリッド構築
  const firstDow = new Date(viewYear, viewMonth - 1, 1).getDay() // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  // 7の倍数に揃える
  while (cells.length % 7 !== 0) cells.push(null)

  // 日ごとのイベントマップ
  const eventsByDay = new Map<number, CalendarEvent[]>()
  for (const ev of events) {
    const arr = eventsByDay.get(ev.day) ?? []
    arr.push(ev)
    eventsByDay.set(ev.day, arr)
  }

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() + 1 === viewMonth &&
    today.getDate() === day

  const active = subscriptions.filter(s => s.status === 'active')

  return (
    <div style={{ padding: '16px 12px' }}>

      {/* ── 月ナビゲーション ─────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <button onClick={prevMonth} style={navBtnStyle}>‹</button>
        <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '-0.5px' }}>
          {viewYear}年{viewMonth}月
        </span>
        <button onClick={nextMonth} style={navBtnStyle}>›</button>
      </div>

      {/* ── 曜日ヘッダー ─────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
        {DOW_LABELS.map((d, i) => (
          <div key={d} style={{
            textAlign: 'center', fontSize: '10px', fontWeight: 700,
            color: i === 0 ? '#ef4444' : i === 6 ? '#60a5fa' : '#555',
            padding: '4px 0',
          }}>{d}</div>
        ))}
      </div>

      {/* ── カレンダーグリッド ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {cells.map((day, idx) => {
          const dayEvents = day ? (eventsByDay.get(day) ?? []) : []
          const hasTrial = dayEvents.some(e => e.type === 'trial')
          const hasRenewal = dayEvents.some(e => e.type === 'renewal')
          const isCurrentDay = day !== null && isToday(day)
          const dow = idx % 7

          return (
            <div
              key={idx}
              style={{
                minHeight: '44px',
                borderRadius: '6px',
                background: isCurrentDay ? 'rgba(249,115,22,0.12)' : 'var(--panel)',
                border: isCurrentDay ? `1px solid ${accent}` : '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4px 2px 6px',
                gap: '3px',
              }}
            >
              {day !== null && (
                <>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: isCurrentDay ? 900 : 400,
                    color: isCurrentDay ? accent
                      : dow === 0 ? '#ef4444'
                      : dow === 6 ? '#60a5fa'
                      : '#888',
                    lineHeight: 1,
                  }}>{day}</span>
                  {/* イベントドット */}
                  {(hasRenewal || hasTrial) && (
                    <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {hasRenewal && <span style={dot(accent)} />}
                      {hasTrial && <span style={dot(trialColor)} />}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* ── 凡例 ─────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#666' }}>
          <span style={dot(accent)} />更新日
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#666' }}>
          <span style={dot(trialColor)} />試用終了
        </div>
      </div>

      {/* ── 当月イベントリスト ───────────────────────── */}
      <div style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#555', marginBottom: '10px', letterSpacing: '0.5px' }}>
          {viewMonth}月のイベント
        </div>

        {events.length === 0 ? (
          <div style={{ fontSize: '12px', color: '#444', padding: '20px 0', textAlign: 'center' }}>
            {active.length === 0
              ? 'サブスクを登録するとここに表示されます'
              : 'この月のイベントはありません'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {events.map((ev, i) => (
              <div key={`${ev.subId}-${i}`} style={{
                display: 'flex', alignItems: 'center',
                background: 'var(--panel)', borderRadius: '8px',
                border: '1px solid var(--border)',
                padding: '10px 12px', gap: '10px',
              }}>
                {/* 日付 */}
                <div style={{
                  minWidth: '32px', textAlign: 'center',
                  fontSize: '14px', fontWeight: 900,
                  color: ev.type === 'trial' ? trialColor : accent,
                }}>
                  {ev.day}
                </div>
                <div style={{ width: '1px', height: '28px', background: 'var(--border)' }} />
                {/* 名前・種別 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#efefef', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ev.name}
                  </div>
                  <div style={{ fontSize: '10px', color: ev.type === 'trial' ? trialColor : accent, marginTop: '2px' }}>
                    {ev.type === 'trial' ? '⚠️ 試用終了' : ev.billingCycle === 'annual' ? '🔁 年払い更新' : '🔁 更新'}
                  </div>
                </div>
                {/* 金額 */}
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#888', textAlign: 'right', flexShrink: 0 }}>
                  ¥{ev.monthlyPrice.toLocaleString()}
                  <div style={{ fontSize: '9px', color: '#555', marginTop: '1px' }}>
                    {ev.billingCycle === 'annual' ? `年額¥${(ev.monthlyPrice * 12).toLocaleString()}` : '/月'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 月計 ─────────────────────────────────────── */}
      {events.filter(e => e.type === 'renewal').length > 0 && (
        <div style={{
          marginTop: '16px', padding: '12px', borderRadius: '8px',
          background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '11px', color: '#888' }}>{viewMonth}月の更新合計（推定）</span>
          <span style={{ fontSize: '14px', fontWeight: 900, color: accent }}>
            ¥{events
              .filter(e => e.type === 'renewal')
              .reduce((sum, e) => sum + (e.billingCycle === 'annual' ? e.monthlyPrice * 12 : e.monthlyPrice), 0)
              .toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', cursor: 'pointer',
  fontSize: '22px', color: '#888', padding: '4px 12px',
  borderRadius: '6px',
}

function dot(color: string): React.CSSProperties {
  return {
    display: 'inline-block',
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }
}
