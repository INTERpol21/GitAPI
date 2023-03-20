import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Paginator from '../../Components/Paginator'
import Repos from '../../Components/Repos'
import Search from '../../Components/Search'
import SearchContext from '../../Context'
import { getPage } from '../../utils/getPage'
import { GET_REPOS, TOP_REPOS } from '../../GraphQL'
import style from './style.module.css'





export default function Main() {
  const lastRequest = sessionStorage.getItem('lastRequest') || ''
  const lastPage = sessionStorage.getItem('lastPage') || 1

  const [requestRepo, setRequestRepo] = useState<string>(lastRequest)
  const [currentPage, setPage] = useState<number>(Number(lastPage))

  const setRequest = (currentRequest: string): void => {
    sessionStorage.setItem('lastRequest', currentRequest)
    setRequestRepo(currentRequest)
  }

  const setPageRepo = (page: number): void => {
    sessionStorage.setItem('lastPage', String(page))
    setPage(page)
  }

  const { loading, error, data } = lastRequest
    ? useQuery(GET_REPOS, {
        variables: {
          getQuery: `${requestRepo} sort:stars`,
        },
      })
    : useQuery(TOP_REPOS)

  if (error) {
    return <h2 className={style.h2_error}>{error.message}</h2>
  }

  const pages = data && getPage(data.search.nodes, data.search.repositoryCount)

  return (
    <SearchContext.Provider value={{ requestRepo, setRequest }}>
      <Search />

      {loading ? (
        <h3 className={style.h3}>Loading...</h3>
      ) : (
        <>
          <Repos repos={pages.repos[currentPage - 1]} />
          {pages.count > 1 && (
            <Paginator pages={pages.count} currentPage={currentPage} setPage={setPageRepo} />
          )}
        </>
      )}
    </SearchContext.Provider>
  )
}
