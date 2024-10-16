

// to save state to localStorage
export const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('todos', serializedState);
    } catch (error) {
      console.error('Could not save state', error);
    }
  };
  
  //  to load state from localStorage
  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('todos');
      if (serializedState === null) {
        return undefined; 
      }
      const parsedState = JSON.parse(serializedState);
  
      return {
        todos: {
          todos: parsedState, 
        }
      };
    } catch (error) {
      console.error('Could not load state', error);
      return undefined;
    }
  };
  