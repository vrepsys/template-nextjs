'use client'

import React, { createContext, useContext } from 'react'

const SearchIndexContext = createContext<any>(null)

export const SearchIndexProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: any
}) => {
  return (
    <SearchIndexContext.Provider value={value}>
      {children}
    </SearchIndexContext.Provider>
  )
}

export const useSearchIndex = () => useContext(SearchIndexContext)
