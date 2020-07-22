import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import numeral from 'numeral'
import cns from 'classnames'
import ReactSelect from 'react-select'
import './Pagination.scss'

const SIZE_OPTIONS = [
  {
    value: 10,
    label: 10
  },
  {
    value: 25,
    label: 25
  },
  {
    value: 50,
    label: 50
  },
  {
    value: 100,
    label: 100
  },
]

function Pagination(props) {
  const {
    defaultCurrent,
    defaultPageSize,
    innerRef,
    onChange,
    pageSizeMenuPlacement,
    pageSizeOptions,
    pageStep,
    totalItems,
  } = props
  const [currentPage, setCurrentPage] = useState(defaultCurrent)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [totalPages, setTotalPages] = useState(rounup(totalItems / pageSize))
  const initialOptions = useRef({ defaultCurrent, defaultPageSize })

  useEffect(() => {
    if (totalItems > 0 && (pageSize * currentPage) > totalItems) {
      setCurrentPage(rounup(totalItems / pageSize))
    }
    // eslint-disable-next-line
  }, [totalItems, pageSize])

  useEffect(() => {
    function calcPageLength() {
      if (totalItems > 0) {
        const length = totalItems / pageSize
        if (isInfinity(length)) return totalItems > 10 ? rounup(totalItems / 10) : 1
        return rounup(length)
      }
      return 0
    }
    setTotalPages(calcPageLength())
  }, [totalItems, pageSize])

  function rounup(value) {
    return Math.ceil(value)
  }

  function isInfinity(number) {
    return !_.isFinite(number)
  }

  function score(number) {
    return numeral(number).format('0,0')
  }

  function onClickItem(item) {
    if (item === 'prev') return setCurrentPage(currentPage - 1 || 1)
    if (item === 'next') return setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
    return setCurrentPage(item)
  }

  function onChangePageSize({ value }) {
    setPageSize(value)
  }

  function getSizeOptionValue() {
    return (pageSizeOptions || []).find(({ value }) => value === pageSize) || null
  }

  useEffect(() => {
    onChange(currentPage, pageSize)
    // eslint-disable-next-line
  }, [currentPage, pageSize])

  useEffect(() => {
    innerRef.current = {
      reinitial: () => {
        setCurrentPage(initialOptions.current.defaultCurrent)
        setPageSize(initialOptions.current.defaultPageSize)
      }
    }
    // eslint-disable-next-line
  }, [])

  const isNoResult = totalItems === 0

  function createItemProps(item) {
    const isDisabledPrev = isNoResult || currentPage === 1
    const isDisabledNext = isNoResult || currentPage === totalPages
    const isCurrent = item === currentPage
    const base = { onClick: event => onClickItem(item, event) }

    if (item === 'prev') return { ...base, className: cns('pagination-item prev-item', { 'is-disabled': isDisabledPrev }) }
    if (typeof item === 'number') return { ...base, item, className: cns('pagination-item page-item', { 'is-current': isCurrent }) }
    if (item === 'next') return { ...base, className: cns('pagination-item next-item', { 'is-disabled': isDisabledNext }) }
  }

  function createPattern(data) {
    return [
      createItemProps(1),
      createItemProps('prev'),
      ...data,
      createItemProps('next'),
      createItemProps(totalPages)
    ]
  }

  const itemList = useMemo(() => {
    const data = []
    for (let i = 0; i < totalPages; i++) {
      data.push(createItemProps(i + 1))
    }
    const boundary = pageStep * 2 + 1

    if (totalPages > boundary + 2) {
      if (currentPage < boundary) return createPattern(data.slice(1, boundary))
      if (currentPage >= totalPages - (boundary - 2)) return createPattern(data.slice(totalPages - boundary, totalPages - 1))
      if (currentPage >= boundary) return createPattern(data.slice(currentPage - (pageStep + 1), currentPage + pageStep))
    }
    return data.length ? data : [createItemProps(0)]
    // eslint-disable-next-line
  }, [currentPage, totalPages])

  return (
    <div
      className={cns(
        'pagination',
        { 'is-disabled': isNoResult }
      )}
    >
      <div className="pagination-option">
        <div className="pagination-size">
          <div className="pagination-size-text">Show :</div>
          <ReactSelect
            value={getSizeOptionValue()}
            options={pageSizeOptions}
            name="pagination-size-select"
            className="pagination-size-select"
            classNamePrefix="pagination-size-select"
            menuPlacement={pageSizeMenuPlacement}
            onChange={onChangePageSize}
            isSearchable={false}
          />
          <div className="pagination-size-text">of {score(totalItems)} results</div>
        </div>
      </div>
      <div className="pagination-list">
        {itemList.map(({ item, ...rest }, idx) => (
          <div key={idx} {...rest}>{score(item)}</div>
        ))}
      </div>
    </div>
  )
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  defaultCurrent: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageStep: PropTypes.number,
  pageSizeMenuPlacement: PropTypes.string,
  pageSizeOptions: PropTypes.array,
  onChange: PropTypes.func,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ])
}

Pagination.defaultProps = {
  totalItems: 10,
  defaultCurrent: 1,
  defaultPageSize: 10,
  pageStep: 2,
  innerRef: { current: null },
  pageSizeMenuPlacement: 'bottom',
  pageSizeOptions: SIZE_OPTIONS,
  onChange: () => { },
}

export default Pagination
