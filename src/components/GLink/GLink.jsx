import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStyles } from 'antd-style'

const useStyles = createStyles(({ token }) => {
  return {
    link: {
      'color': token.colorPrimary,
      'cursor': 'pointer',
      'textDecoration': 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  }
})

export default function GLink({ text, path }) {
  const navigate = useNavigate()
  const { styles } = useStyles()
  const handleClick = useCallback((e) => {
    e.preventDefault()
    navigate(path)
  }, [text])

  return (
    <a className={styles.link} onClick={(e) => handleClick(e)}>{text}</a>
  )
}
