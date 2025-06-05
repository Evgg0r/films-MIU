import {Box, Card, CardContent, CardMedia, Typography, Paper} from "@mui/material";
import {Star} from "@mui/icons-material";

export function MovieCard() {
    return (
        <Paper>
            <Card sx={{width: 296, height: 324}}>
                <CardMedia
                    component="img"
                    width="324"
                    image={`https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/cf1970bc-3f08-4e0e-a095-2fb57c3aa7c6/600x900`}
                    alt="123"
                    sx={{
                        height: 240,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" flexDirection="column">
                            <Typography variant="h6">Матрица</Typography>
                            <Typography variant="body2">Рейтинг 123</Typography>
                        </Box>
                        <Star/>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    )
}