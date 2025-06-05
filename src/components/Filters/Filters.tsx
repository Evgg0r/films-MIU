import {Autocomplete, Box, Checkbox, FormControl, IconButton, InputLabel, MenuItem, Pagination, Paper, Select, Slider, TextField, Tooltip, Typography} from "@mui/material";
import {CheckBox, CheckBoxOutlineBlank, Close} from "@mui/icons-material";
import type {Genre} from "../../types/types.tsx";
import {useFilterContext, useLoadGenres} from "../../hooks/hooks.tsx";
import {PAGINATION_CONFIG, SLIDER_CONFIG, SORT_OPTIONS} from "../../constants/constants.tsx";

export function Filters() {
    const { state, dispatch } = useFilterContext();
    const genres = useLoadGenres();

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 300,
                maxWidth: 300,
                minHeight: 723,
                maxHeight: 723,
                p: 2,
            }}>
            <Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{mt: 2}}
                >
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 500
                        }}
                    >Фильтры
                    </Typography>
                    <Tooltip title="Сброс фильтров">
                        <IconButton
                            edge="end"
                            color="primary"
                            size="small"
                            onClick={() => dispatch({type: 'reset'})}
                        >
                            <Close/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <FormControl
                    fullWidth
                    variant="standard"
                    sx={{mt: 4}}
                >
                    <InputLabel>Сортировать по:</InputLabel>
                    <Select
                        value={state.sortBy}
                        onChange={(event) => dispatch({type: 'setSortBy', value: event.target.value})}>
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography
                    variant="body1"
                    component="span"
                    fontWeight="400"
                    sx={{mt: 4}}
                >
                    Год релиза:
                </Typography>
                <Slider
                    value={state.yearRange}
                    onChange={(_, newValue) => dispatch({type: 'setYearRange', value: newValue as [number, number]})}
                    valueLabelDisplay="auto"
                    max={SLIDER_CONFIG.yearMax}
                    min={SLIDER_CONFIG.yearMin}
                    step={SLIDER_CONFIG.step}
                    sx={{mt: 4}}
                    disableSwap
                    marks={SLIDER_CONFIG.yearMarks.map((year) => ({
                        value: year,
                    }))}
                />
                <Autocomplete
                    sx={{mt: 4}}
                    multiple
                    disableCloseOnSelect
                    options={genres.map((genre: Genre) => genre.name)}
                    value={state.selectedGenres}
                    onChange={(_, value) =>dispatch({type: 'setSelectedGenres', value})}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, {selected}) => {
                        const {key, ...rest} = props;
                        return (
                            <li key={option} {...rest}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize="small"/>}
                                    checkedIcon={<CheckBox fontSize="small"/>}
                                    style={{marginRight: 8}}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Жанры"
                            placeholder="Выберите жанры"
                            variant="standard"
                        />
                    )}/>
            </Box>
            <Pagination
                sx={{mb: 1}}
                count={PAGINATION_CONFIG.count}
                page={state.page}
                onChange={(_, value) => dispatch({type: 'setPage', value})}
                color="primary"
            />
        </Paper>
    );
}