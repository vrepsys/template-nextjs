import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const CardGrid = ({ content }: { content?: CardProps[] }) => (
  <nav role="list" className="cards grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
    {content?.map((card, index) => (
      <Card
        key={index}
        title={card.title}
        description={card.description}
        icon={card.icon}
        imageURL={card.imageURL}
        url={card.url}
      />
    ))}
  </nav>
)

type CardProps = {
  title: string
  description: string
  url: string
  icon: React.ComponentType<any>
  imageURL?: string
}

const Card = ({ title, description, url, icon: Icon, imageURL }: CardProps) => (
  <Link
    role="listitem"
    className="overflow-hidden rounded border border-portal-border bg-portal-background-card hover:border-portal-accent-low active:translate-y-[1px]"
    href={url}
  >
    {imageURL && <Image src={imageURL} alt="Picture of the author" width={320} height={320} />}
    <div className="flex gap-3 p-4">
      {Icon && (
        <Icon
          className="mt-0.5 text-portal-content-icon"
          size={20}
          strokeWidth={1.5}
          absoluteStrokeWidth={true}
        />
      )}
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-medium">{title}</span>
        {description && <span className="text-sm text-portal-content-label">{description}</span>}
      </div>
    </div>
  </Link>
)

export default CardGrid
