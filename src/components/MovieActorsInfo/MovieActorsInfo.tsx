import { Box, Typography } from '@mui/material';

import type { MovieActorsInfoProps } from '@/types/types';

export function MovieActorsInfo({ castActors }: MovieActorsInfoProps) {
    return (
        <Box>
            <Typography
                variant="h5"
                component="p"
                mb={2}
                sx={{
                    fontSize: '34px',
                    fontWeight: 500,
                }}
            >
                В главных ролях
            </Typography>
            {castActors.slice(0, 4).map((actor) => (
                <Typography
                    variant="h5"
                    component="p"
                    key={actor.id}
                    sx={{
                        fontSize: '20px',
                        fontWeight: 400,
                    }}
                >
                    {actor.name}
                </Typography>
            ))}
        </Box>
    );
}
