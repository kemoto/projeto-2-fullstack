import { SearchInput } from './styles';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <SearchInput
      type="text"
      placeholder="Buscar agente por nome"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;