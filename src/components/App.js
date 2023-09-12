import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddAlbum from './AddAlbum';
import AlbumsList from './AlbumsList';
import UpdateAlbum from './UpdateAlbum';

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [updateAlbum, setUpdateAlbum] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteAlbumFromList = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE',
      });
      const newAlbums = albums.filter((album) => album.id !== id);
      setAlbums(newAlbums);
      alert('Album Deleted successfully');
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  const updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbum) => {
    try {
      const updatedAlbum =
        id < 100
          ? await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
              method: 'PUT',
              body: JSON.stringify({
                userId: updateUserid,
                id: id,
                title: updateTitle,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }).then((response) => response.json())
          : {
              userId: updateUserid,
              id: id,
              title: updateTitle,
            };

      const updatedAlbums = [...albums];
      const index = updatedAlbums.indexOf(oldAlbum);
      updatedAlbums[index] = updatedAlbum;
      setAlbums(updatedAlbums);
      alert('Update Successfully done');
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const addAlbumToList = async (userId, title) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          title: title,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add album');
      }

      const data = await response.json();
      const album = {
        userId: userId,
        id: data.id,
        title: title,
      };
      setAlbums([...albums, album]);
      alert('New Album added successfully in the bottom');
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AlbumsList albums={albums} setUpdateAlbum={setUpdateAlbum} deleteAlbumFromList={deleteAlbumFromList} />}
        ></Route>
        <Route path="/add-album" element={<AddAlbum addAlbumToList={addAlbumToList} />} />
        <Route path="/update-album" element={<UpdateAlbum album={updateAlbum} updateAlbumInList={updateAlbumInList} />} />
      </Routes>
    </>
  );
}
