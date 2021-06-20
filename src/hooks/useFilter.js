import { useCallback, useState} from 'react';

export default function useFilter() {
    const [filterState, setFilterState] = useState(null);
    const setFilter = useCallback((mode) => {
        setFilterState(mode);
      }, [])
    
    return [filterState, setFilter]
};
