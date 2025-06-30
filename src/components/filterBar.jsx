import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const FilterBar = ({
  filter,
  handleFilterChange,
  sortOption,
  handleSortChange,
  selectedTypes,
  handleTypeChange,
  POKEMON_TYPES,
}) => (
  <Box
    sx={{
      position: 'sticky',
      top: 60,
      zIndex: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(59, 59, 59, 0.1)',
      backdropFilter: 'blur(15px)',
      padding: '0.5rem 1rem',
      flexWrap: 'wrap',
    }}
  >
    {/* Search Bar on the left */}
    <TextField
      value={filter}
      onChange={handleFilterChange}
      variant='outlined'
      placeholder='Enter Pokemon name or ID'
      size='small'
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon sx={{ color: 'seashell' }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        width: { xs: '100%', sm: '270px' },
        borderRadius: '10px',
        backgroundColor: 'maroon',
        mb: { xs: 2, sm: 0 },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'maroon',
          '& fieldset': { borderColor: 'darkred' },
          '&:hover fieldset': { borderColor: 'darkred' },
          '&.Mui-focused fieldset': { borderColor: 'seashell' },
          '& input': { color: 'seashell' },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'seashell',
          },
        },
      }}
    />

    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' },
        width: { xs: '100%', sm: 'auto' },
        flexDirection: { xs: 'column', sm: 'row' },
        '& > .MuiFormControl-root': {
          width: { xs: '100%', sm: 'auto' },
          mb: { xs: 2, sm: 0 },
        },
      }}
    >
      {/* Sort filter */}
      <FormControl
        variant='outlined'
        size='small'
        sx={{
          minWidth: 180,
          borderRadius: '10px',
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'seashell',
          },
        }}
      >
        <InputLabel id='sort-label'>Sort By</InputLabel>
        <Select
          labelId='sort-label'
          id='sort-select'
          value={sortOption}
          onChange={handleSortChange}
          label='Sort By'
          sx={{
            backgroundColor: 'maroon',
            '& .MuiSelect-select': {
              color: 'seashell',
            },
            '.MuiSelect-icon': { color: 'seashell' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'maroon' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'seashell',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'maroon',
            },
          }}
        >
          <MenuItem value='id-asc'>ID Ascending (Default)</MenuItem>
          <MenuItem value='id-desc'>ID Descending</MenuItem>
          <MenuItem value='name-asc'>Name (A-Z)</MenuItem>
          <MenuItem value='name-desc'>Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
      {/* Type filter */}
      <FormControl
        variant='outlined'
        size='small'
        sx={{
          minWidth: 220,
          borderRadius: '10px',
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'seashell',
          },
        }}
      >
        <InputLabel id='type-label'>Filter by Type</InputLabel>
        <Select
          labelId='type-label'
          id='type-select'
          multiple
          value={selectedTypes}
          onChange={handleTypeChange}
          input={<OutlinedInput label='Filter by Type' />}
          renderValue={(selected) =>
            selected.length === 0 ? 'All' : selected.join(', ')
          }
          sx={{
            backgroundColor: 'maroon',
            '& .MuiSelect-select': {
              color: 'seashell',
            },
            '.MuiSelect-icon': { color: 'seashell' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'maroon' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'seashell',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'maroon',
            },
          }}
        >
          {POKEMON_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedTypes.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Box>
);

FilterBar.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  selectedTypes: PropTypes.array.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  POKEMON_TYPES: PropTypes.array.isRequired,
};

export default FilterBar;
