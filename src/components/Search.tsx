import { useState, useEffect, useCallback } from "react"
import { queryShow, searchShows$, selected$ } from "../store";
import { ShowInfo } from "../types";
import { Paper, List, InputBase, ListItem, Typography, CardActionArea, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [search, setSearch] = useState("")
  const [shows, setShows] = useState<ShowInfo[]>([])

  useEffect(() => {
    const sub = searchShows$.subscribe(setShows)
    return () => sub.unsubscribe()
  }, [])

  useEffect(() => {
    queryShow(search);
  }, [search])

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
  }, [])

  const handleSelection = useCallback((show: ShowInfo) => {
    selected$.next(show)
    searchShows$.next([])
    setSearch('')
  }, [])

  return (
    <Box
      sx={{
        width: 600,
        margin: '2px auto'
      }}
    >
      <Paper
        sx={{
          p: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Show"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <SearchIcon />
      </Paper>
      {shows.length > 0 &&
        <Paper
          sx={{
            position: 'absolute',
            width: 600,
            margin: 'auto'
          }}
        >
          <List>
            {shows.map(show =>
              <CardActionArea
                onClick={() => handleSelection(show)}
                key={show.show.id}
              >
                <ListItem key={show.show.id}>
                  {
                    show.show.image &&
                    <Paper variant="outlined">
                      <img
                        alt={show.show.name}
                        src={show.show.image.medium}
                      />
                    </Paper>
                  }
                  <Typography>{show.show.name}</Typography>
                </ListItem>
              </CardActionArea>
            )}
          </List>
        </Paper>
      }
    </Box>
  )
}