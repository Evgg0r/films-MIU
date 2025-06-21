import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    type SelectChangeEvent,
    Slider,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {CheckBox, CheckBoxOutlineBlank, Close, Search} from "@mui/icons-material";
import type {FiltersProps, Genre} from "../../types/types.ts";
import {useFilterContext, useLoadGenres} from "../../hooks/hooks.tsx";
import {PAGES_LIMIT, SLIDER_CONFIG, SORT_OPTIONS} from "../../constants/constants.ts";
import {memo, useCallback, useMemo} from "react";

export const Filters = memo(( { totalPages }: FiltersProps) => {
    const { state, dispatch } = useFilterContext();
    const genres: Genre[] = useLoadGenres();

    const visiblePages = useMemo(() => {
        return Math.min(totalPages, PAGES_LIMIT);
    }, [totalPages]);

    const safePage = useMemo(() => {
        return Math.min(state.page, visiblePages);
    }, [state.page, visiblePages]);

    const genreOptions = useMemo(
        () => genres.map((genre) => genre.name),
        [genres]
    );

    const handleGenresChange = useCallback(
        (_: any, value: string[]) => {
            dispatch({ type: 'setSelectedGenres', value });
        },
        [dispatch]
    );

    const handleYearChange = useCallback(
        (_: Event, newValue: number | number[]) => {
            dispatch({ type: 'setYearRange', value: newValue as [number, number] });
        },
        [dispatch]
    );

    const handleSortChange = useCallback(
        (event: SelectChangeEvent) => {
            dispatch({ type: 'setSortBy', value: event.target.value });
        },
        [dispatch]
    );

    const handleQueryChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'setQuery', value: event.target.value });
        },
        [dispatch]
    );

    const handlePageChange = useCallback(
        (_: React.ChangeEvent<unknown>, value: number) => {
            dispatch({ type: 'setPage', value });
        },
        [dispatch]
    );

    const handleResetFilters = useCallback(() => {
        dispatch({ type: 'reset' });
    }, [dispatch]);

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
                            onClick={handleResetFilters}
                        >
                            <Close/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <TextField
                    variant="standard"
                    placeholder="Поиск..."
                    fullWidth
                    sx={{mt: 1}}
                    value={state.query}
                    onChange={handleQueryChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton >
                                    <Search/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl
                    fullWidth
                    variant="standard"
                    sx={{mt: 4}}
                >
                    <InputLabel>Сортировать по:</InputLabel>
                    <Select
                        value={state.sortBy}
                        onChange={handleSortChange}>
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
                    onChange={handleYearChange}
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
                    options={genreOptions}
                    value={state.selectedGenres}
                    onChange={handleGenresChange}
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
                count={visiblePages}
                page={safePage}
                onChange={handlePageChange}
                color="primary"
                siblingCount={0}
                boundaryCount={0}
                showFirstButton
                showLastButton
            />
        </Paper>
    );
})