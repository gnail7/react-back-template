import {lazy, Suspense} from 'react'

const LazyComponent = ({importFunc, Fallback}) => {
  const LazyComp = lazy(importFunc)
  return (
    <Suspense fallback={ Fallback }>
      <LazyComp />
    </Suspense>
  )
}

export default LazyComponent
