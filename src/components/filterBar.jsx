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
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      flexWrap: 'wrap',
      gap: 2,
    }}
  >
    {/* Search Bar on the left */}
    <TextField
      value={filter}
      onChange={handleFilterChange}
      variant='outlined'
      label='Search Pokemon'
      placeholder='Enter Pokemon name or ID'
      size='small'
      slotProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon sx={{ color: 'seashell' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        width: '240px',
        backgroundColor: 'maroon',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'maroon',
          '& fieldset': { borderColor: 'darkred' },
          '&:hover fieldset': { borderColor: 'darkred' },
          '&.Mui-focused fieldset': { borderColor: 'seashell' },
          '& input': { color: 'seashell' },
        },
        // Remove label color override!
      }}
    />

    {/* Sort and Type filter on the right */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <FormControl
        variant='outlined'
        size='small'
        sx={{
          minWidth: 180,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '4px',
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
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            '& .MuiSelect-select': {
              color: sortOption !== 'default' ? 'gold' : '#aaa',
            },
            '.MuiSelect-icon': { color: 'red' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'red' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'orange',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'red',
            },
          }}
        >
          <MenuItem value='id-asc'>ID Ascending (Default)</MenuItem>
          <MenuItem value='id-desc'>ID Descending</MenuItem>
          <MenuItem value='name-asc'>Name (A-Z)</MenuItem>
          <MenuItem value='name-desc'>Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant='outlined'
        size='small'
        sx={{ minWidth: 220, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
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
