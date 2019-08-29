import React, {useState} from 'react';

export default initialState => {
  const [state, setState] = useState(initialState);

  const toggle = () => setState(!state);

  return [state, toggle];
}