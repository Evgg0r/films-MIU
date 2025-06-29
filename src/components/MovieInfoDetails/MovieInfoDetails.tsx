import { Box, Typography } from '@mui/material';

import type { movieDetailsProps } from '@/types';

export function MovieInfoDetails({ movieDetails }: movieDetailsProps) {
    return (
        <Box mt={8}>
            <Typography
                variant="h5"
                mb={3}
                sx={{
                    fontSize: '34px',
                    fontWeight: 500,
                }}
            >
                Детали
            </Typography>
            <Box display="flex" flexDirection={'column'} alignItems="start" gap={1}>
                {movieDetails.map(({ label, value }) => (
                    <Box key={label} display="flex" gap={1}>
                        <Box width={200}>
                            <Typography color="text.secondary">{label}</Typography>
                        </Box>
                        <Box>
                            <Typography>{value}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
