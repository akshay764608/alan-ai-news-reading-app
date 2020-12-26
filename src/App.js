import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { Typography } from '@material-ui/core'

import wordsToNumbers from 'words-to-numbers'

import useStyles from './styles.js'

import NewsCards from './components/NewsCards/NewsCards'

const alanKey =
  '15c65a1531aedd64c01448ac8dc4f8f72e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
  const classes = useStyles()
  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if (command === 'highlight') {
          setActiveArticle((prevArticle) => prevArticle + 1)
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number
          const article = articles[parsedNumber - 1]

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...')
          } else if (article) {
            window.open(article.url, '_blank')
            alanBtn().playText('Opening...')
          } else {
            alanBtn().playText('Please try that again...')
          }
        }
      },
    })
  }, [])

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant='h5' component='h2'>
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant='h5' component='h2'>
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src='https://alan.app/voice/images/previews/preview.jpg'
          alt='alan logo'
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant='body1' component='h2'>
            Created by
            <a className={classes.link} href='https://kumarakshay.netlify.app/'>
              {' '}
              Akshay Kumar
            </a>{' '}
            -
            <a
              className={classes.link}
              href='https://www.linkedin.com/in/akshay-kumar-863284187/'
            >
              {' '}
              LinkedIn
            </a>
          </Typography>
        </div>
      ) : null}
    </div>
  )
}

export default App
