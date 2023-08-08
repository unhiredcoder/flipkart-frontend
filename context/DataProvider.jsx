// import React, { useState } from 'react';

// const DataContext = React.createContext({
//   setAccount: (value) => {
//     // Do something with value
//   },
// });

// const DataProvider = ({ children }) => {
//   const [account, setAccount] = useState('');

//   // Return the Provider with the current account value
//   return (
//     <DataContext.Provider value={{account,setAccount}}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export { DataProvider, DataContext };


import React, { createContext, useState } from 'react';

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState('');

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };

