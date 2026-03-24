import type { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

type Props = { blocks: BlockObjectResponse[] }

export default function NotionBlocks({ blocks }: Props) {
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    // Group list items
    if (block.type === 'bulleted_list_item') {
      const items: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        items.push(blocks[i])
        i++
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {items.map((b) => (
            <li key={b.id}>
              <RichText texts={(b as any).bulleted_list_item.rich_text} />
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (block.type === 'numbered_list_item') {
      const items: BlockObjectResponse[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        items.push(blocks[i])
        i++
      }
      elements.push(
        <ol key={`ol-${i}`}>
          {items.map((b) => (
            <li key={b.id}>
              <RichText texts={(b as any).numbered_list_item.rich_text} />
            </li>
          ))}
        </ol>
      )
      continue
    }

    elements.push(<Block key={block.id} block={block} />)
    i++
  }

  return <>{elements}</>
}

function Block({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p>
          <RichText texts={block.paragraph.rich_text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <RichText texts={block.heading_1.rich_text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <RichText texts={block.heading_2.rich_text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <RichText texts={block.heading_3.rich_text} />
        </h3>
      )
    case 'quote':
      return (
        <blockquote>
          <RichText texts={block.quote.rich_text} />
        </blockquote>
      )
    case 'code':
      return (
        <pre>
          <code>{block.code.rich_text.map((t) => t.plain_text).join('')}</code>
        </pre>
      )
    case 'divider':
      return <hr />
    case 'image': {
      const src =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.type === 'file'
          ? block.image.file.url
          : ''
      const caption =
        block.image.caption?.map((t) => t.plain_text).join('') ?? ''
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption} />
          {caption && <figcaption style={{ textAlign: 'center', fontSize: '12px', color: '#777', marginTop: '8px' }}>{caption}</figcaption>}
        </figure>
      )
    }
    case 'callout': {
      const emoji =
        block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '💡'
      return (
        <div className="callout">
          <span className="callout-icon">{emoji}</span>
          <div className="callout-text">
            <RichText texts={block.callout.rich_text} />
          </div>
        </div>
      )
    }
    case 'bookmark':
      return (
        <p>
          <a href={block.bookmark.url} target="_blank" rel="noopener noreferrer">
            {block.bookmark.url}
          </a>
        </p>
      )
    default:
      return null
  }
}

function RichText({ texts }: { texts: RichTextItemResponse[] }) {
  return (
    <>
      {texts.map((t, i) => {
        let content: React.ReactNode = t.plain_text

        if (t.annotations.code) content = <code key={i}>{content}</code>
        else {
          if (t.annotations.bold) content = <strong key={i}>{content}</strong>
          if (t.annotations.italic) content = <em key={i}>{content}</em>
          if (t.annotations.strikethrough) content = <s key={i}>{content}</s>
        }

        if (t.href) {
          return (
            <a key={i} href={t.href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          )
        }

        return <span key={i}>{content}</span>
      })}
    </>
  )
}
