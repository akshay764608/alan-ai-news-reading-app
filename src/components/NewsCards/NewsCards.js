import React from 'react'
import { Grid, Grow, Typography } from '@material-ui/core'

import useStyles from './styles.js'

import NewsCard from '../NewsCard/NewsCard'

const infoCards = [
  {
    color: '#00838f',
    title: 'Latest News',
    text: 'Give me the latest news',
  },
  {
    color: '#1565c0',
    title: 'News by Categories',
    info:
      'Business, Entertainment, General, Health, Science, Sports, Technology',
    text: ' Give me the latest Entertainment news',
  },
  {
    color: '#4527a0',
    title: 'News by Terms',
    info:
      'Narendra Modi, PlayStation 5, Smartphones, Donald Trump, or any term you prefer...',
    text: "What's up with Coronavirus in India",
  },
  {
    color: '#283593',
    title: 'News by Sources',
    info: 'CNN, The Times of India, BBC News, Google News, IGN, Fox News...',
    text: 'Give me the news from The Times of India',
  },
]

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles()

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems='stretch'
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              className={classes.infoCard}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant='h5'>{infoCard.title}</Typography>
                {infoCard.info ? (
                  <Typography variant='h6'>
                    <strong>{infoCard.title.split(' ')[2]}:</strong>
                    <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant='h6'>
                  <strong>Try Saying:</strong>
                  <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    )
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems='stretch'
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard article={article} activeArticle={activeArticle} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  )
}

export default NewsCards
