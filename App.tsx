import React, { useState, useCallback, useEffect } from 'react'
import { Page } from './types'
import type { ShoppingList, ListItem } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import LoginPage from './components/LoginPage'
import ListsDashboardPage from './components/ListsDashboardPage'
import ListDetailPage from './components/ListDetailPage'
import ShoppingModePage from './components/ShoppingModePage'
import ComparisonPage from './components/ComparisonPage'

import { initialLists } from './data/mockData'

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [currentPage, setCurrentPage] = useState<Page>(Page.Login)
  const [lists, setLists] = useLocalStorage<ShoppingList[]>('shoppingLists', [])
  const [activeListId, setActiveListId] = useState<string | null>(null)

  useEffect(() => {
    if (lists.length === 0) {
      setLists(initialLists)
    }
  }, [lists.length, setLists])

  useEffect(() => {
    setCurrentPage(isLoggedIn ? Page.ListsDashboard : Page.Login)
  }, [isLoggedIn])

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true)
    setCurrentPage(Page.ListsDashboard)
  }, [setIsLoggedIn])

  const handleCreateNewList = useCallback(() => {
    const newListId = `list-${Date.now()}`
    setActiveListId(newListId)
    setCurrentPage(Page.ListDetail)
  }, [])

  const handleSelectList = useCallback((listId: string) => {
    setActiveListId(listId)
    setCurrentPage(Page.ListDetail)
  }, [])

  const handleStartShopping = useCallback((listId: string) => {
    setActiveListId(listId)
    setCurrentPage(Page.ShoppingMode)
  }, [])

  const handleComparePrices = useCallback((listId: string) => {
    setActiveListId(listId)
    setCurrentPage(Page.Comparison)
  }, [])

  const handleGoToDashboard = useCallback(() => {
    setActiveListId(null)
    setCurrentPage(Page.ListsDashboard)
  }, [])

  const saveList = useCallback(
    (list: ShoppingList) => {
      setLists((prevLists) => {
        const existingList = prevLists.find((l) => l.id === list.id)
        if (existingList) {
          return prevLists.map((l) =>
            l.id === list.id
              ? { ...list, updatedAt: new Date().toISOString() }
              : l
          )
        }
        return [
          ...prevLists,
          {
            ...list,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]
      })
      handleGoToDashboard()
    },
    [setLists, handleGoToDashboard]
  )

  const deleteList = useCallback(
    (listId: string) => {
      setLists((prev) => prev.filter((l) => l.id !== listId))
    },
    [setLists]
  )

  const activeList = lists.find((l) => l.id === activeListId)

  const renderPage = () => {
    switch (currentPage) {
      case Page.Login:
        return <LoginPage onLogin={handleLogin} />
      case Page.ListsDashboard:
        return (
          <ListsDashboardPage
            lists={lists}
            onCreateNew={handleCreateNewList}
            onSelectList={handleSelectList}
            onDeleteList={deleteList}
            onStartShopping={handleStartShopping}
            onComparePrices={handleComparePrices}
          />
        )
      case Page.ListDetail:
        return (
          <ListDetailPage
            list={
              activeList || {
                id: activeListId!,
                name: '',
                imageUrl: `https://picsum.photos/seed/${activeListId}/400/225`,
                items: [],
                createdAt: '',
                updatedAt: '',
              }
            }
            onSave={saveList}
            onBack={handleGoToDashboard}
          />
        )
      case Page.ShoppingMode:
        if (!activeList) {
          handleGoToDashboard()
          return null
        }
        return (
          <ShoppingModePage
            list={activeList}
            onListUpdate={saveList}
            onBack={handleGoToDashboard}
          />
        )
      case Page.Comparison:
        if (!activeList) {
          handleGoToDashboard()
          return null
        }
        return <ComparisonPage list={activeList} onBack={handleGoToDashboard} />
      default:
        return <LoginPage onLogin={handleLogin} />
    }
  }

  return <div className="min-h-screen">{renderPage()}</div>
}

export default App
