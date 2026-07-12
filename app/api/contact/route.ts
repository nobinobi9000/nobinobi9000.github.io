import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const TO_EMAIL = 'info@nobi-labo.com'

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"nobi-labo Contact" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[お問い合わせ] ${type ? `${type} - ` : ''}${name}様より`,
      text: [
        `お名前: ${name}`,
        `メール: ${email}`,
        `種類: ${type || '未選択'}`,
        '',
        'メッセージ:',
        message,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('contact error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
