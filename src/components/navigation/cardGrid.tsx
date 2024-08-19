import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const CardGrid = ({ content }: { content?: Array<any> }) => {
  return (
    <nav role="list" className="cards grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {content?.map((item) => (
        <Card
          title={item.title}
          description={item.description}
          icon={item.icon}
          imageURL={item.imageURL}
          url={item.url}
        />
      ))}
    </nav>
  )
}

const Card = ({
  title,
  description,
  url,
  icon: Icon,
  imageURL,
}: {
  title: string
  description: string
  url: string
  icon: React.ComponentType<any>
  imageURL?: string
}) => {
  return (
    <Link
      role="listitem"
      className="bg-portal-background-card border-portal-border hover:border-portal-accent-low overflow-hidden rounded border active:translate-y-[1px]"
      href={url}
    >
      {imageURL && <Image src={imageURL} alt="Picture of the author" width={320} height={320} />}
      <div className="flex gap-3 p-4">
        {Icon && (
          <Icon
            className="text-portal-content-icon mt-0.5"
            size={20}
            strokeWidth={1.5}
            absoluteStrokeWidth={true}
          />
        )}
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-sm font-medium">{title}</span>
          {description && <span className="text-portal-content-label text-sm">{description}</span>}
        </div>
      </div>
    </Link>
  )
}

export default CardGrid
