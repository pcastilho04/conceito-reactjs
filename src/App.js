import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/paulocast04",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });
    
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
      try {
        await api.delete(`repositories/${id}`).then(response => {
         
          setRepositories(repositories.filter((repository) => {
              return repository.id !== id;
            })
          );
        });
      } catch (e) {
          console.error('Failure!');
          console.error(e.response.status);
      }
  }  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id} >{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
