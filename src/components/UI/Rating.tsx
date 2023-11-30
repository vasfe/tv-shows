import { Box } from '@mui/material';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

type RatingProps = {
    score: number
}

export const Rating = (props: RatingProps): JSX.Element => {
    const {score} = props;
    return (
        <Box sx={{display: 'flex' }}>
            {Array.from({ length: Math.floor(score * 5) }).map(() => <StarIcon />)}
            {score * 5 - Math.floor(score * 5) >= .5 && <StarHalfIcon />}
        </Box>
    )
}