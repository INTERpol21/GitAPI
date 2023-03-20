import style from './style.module.css'
import { IPaginator } from './type'

export default function Paginator({ pages, currentPage, setPage }: IPaginator) {
  const getPagination = (): JSX.Element[] => {
    const markup: JSX.Element[] = []
    for (let i = 1; i <= pages; i += 1) {
      markup.push(
        <li
          key={i}
          className={i === currentPage ? `${style.li} ${style.li__active}` : `${style.li}`}>
          <a
            className={style.a}
            href={String(i)}
            onClick={(evt) => {
              evt.preventDefault()
              setPage(i)
            }}>
            {i}
          </a>
        </li>,
      )
    }

    return markup
  }

  return <ul className={style.ul}>{getPagination()}</ul>
}