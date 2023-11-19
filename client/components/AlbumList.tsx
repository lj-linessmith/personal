import { useState, useEffect } from 'react'
import { Album } from '../../models/Albums.ts'
import { getAlbums } from '../apiClient.ts'
import { getAlbums2 } from '../apiClient.ts'
import { Link } from 'react-router-dom'

export default function Albums() {
  const [albums, setAlbum] = useState([] as Album[])

  useEffect(() => {
    async function fetchAlbum() {
      const albumData = await getAlbums()
      setAlbum(albumData.releases)
      console.log(albumData.releases)
      console.log(albums)
    }
    fetchAlbum()
  }, [])

  const [albums2, setAlbum2] = useState([] as Album[])

  useEffect(() => {
    async function fetchAlbum2() {
      const albumData2 = await getAlbums2()
      setAlbum2(albumData2.releases)
      console.log(albumData2.releases)
      console.log(albums2)
    }
    fetchAlbum2()
  }, [])

  function checkBoxSet(format) {
    if (format.some((e) => e.name === 'Box Set')) {
      return '(Box Set)'
    }
  }

  // const array = [
  //   albums.forEach((album) => album),
  //   albums2.forEach((album2) => {
  //     album2
  //   }),
  // ]
  // console.log('array:', array)
  // function removeDuplicates(arr) {
  //   return [...new Set(arr)]
  // }

  // const newArr = removeDuplicates(array)
  // console.log(newArr)

  return (
    <>
      <h1>Albums List</h1>
      {/* {newArr.map((album) => (
        <li key={album.basic_information.id}>
          {album.basic_information.title}
          {album.basic_informtation.artists[0].name}
        </li>
      ))}
      <p>testing</p> */}
      {/* {arr = {albums.map((album) => (album.basic_information.title) )} , {albums2.map((album2) => (album2.basic_information.title))}
  } */}
      {albums.map((album) => (
        <li key={album.basic_information.id}>
          {album.basic_information.title}{' '}
          {checkBoxSet(album.basic_information.formats)} - by:{' '}
          {album.basic_information.artists[0].name}
          <br /> Rating:
          {album.rating}
          {/* <Link to={}>{album.basic_information.title}</Link> */}
        </li>
      ))}
      {albums2.map((album2) => (
        <li key={album2.basic_information.id}>
          {album2.basic_information.title}{' '}
          {checkBoxSet(album2.basic_information.formats)} - by:{' '}
          {album2.basic_information.artists[0].name}
          <br /> Rating: {album2.rating}
          {/* {
            if (album2.artists[0].name == undefined) {
              {''}
            } 
            else {
               {album2.artists[0].name}
              }
           } */}
        </li>
      ))}
    </>
  )
}
